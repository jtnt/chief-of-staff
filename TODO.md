# Claude Code Automation Recommendations for Chief of Staff

**Date:** 2026-01-30 07:17 AM EST
**Status:** To review and implement

---

## Context

Analyzed the full Chief of Staff automation stack (hooks, skills, agents, plugins, MCP servers) and identified gaps worth filling. The existing stack is mature - these are targeted additions, not basics.

### Current State
- **18 plugins** installed
- **4 custom skills**: session-capture, review-patterns, cpf-research, cpf-system
- **4 custom agents**: cpf-company-researcher, cpf-verifier, meeting-processor, save-sync-agent
- **6 hooks**: SessionStart (briefing), SessionEnd (capture), UserPromptSubmit (morning greeting + git model), 3 PermissionRequest auto-allows
- **MCP integrations**: Google Calendar, Gmail, Notion, PostHog, Playwright, context7

---

## Recommendations

### 1. Notification Hook - Know When Background Work Finishes

**Why**: SessionEnd spawns background Claude for session capture. Long tasks via `/lfg` and parallel agents have no completion notification. You have to check manually.

**Where**: `~/.claude/settings.json` → `hooks.Notification`

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "idle_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude is waiting for input\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

**Value**: macOS notification when Claude needs attention. Useful when tabbing away during long operations.

**Effort**: Low - single JSON addition to settings.

---

### 2. Skill: `/weekly-review` - Automated Weekly Synthesis

**Why**: `Weekly Reviews/` folder exists and Monday mornings trigger weekly synthesis via `/morning`. But no dedicated skill pulls together cross-project patterns, check-in themes, and calendar/log analysis into a structured review. Currently embedded in morning flow - standalone skill would allow running anytime with more depth.

**Where**: `~/.claude/skills/weekly-review/SKILL.md`

**What it would do**:
1. Read all logs from the past 7 days across all tracked projects
2. Read daily check-ins and thoughts from the week
3. Pull calendar events for the week (retrospective)
4. Classify time spent: project-work vs meta-work vs planning
5. Identify cross-project patterns and blockers
6. Generate structured review in `Weekly Reviews/YYYYMMDD-weekly-review.md`

**Invocation**: User-only (`disable-model-invocation: true`)

**Effort**: Medium - skill file + template design.

---

### 3. Skill: `/project-health` - On-Demand Project Dashboard

**Why**: Briefing runs at session start, but mid-session you sometimes want a quick health check on all projects - especially after a day of work across multiple repos. Lighter-weight than the full briefing, focused purely on project status.

**Where**: `~/.claude/skills/project-health/SKILL.md`

**What it would do**:
1. Read `project-sources.md` for all tracked projects
2. Check each project's latest log file (date + topic)
3. Check for `cos-inbox.md` items across projects
4. Check git status of each project (uncommitted work, unpushed commits)
5. Output compact dashboard: last activity, open items, git state

**Invocation**: User-only. Supports arguments: `/project-health` (all) or `/project-health Razzo` (one project).

**Effort**: Medium - skill file + git/file reading logic.

---

### 4. Subagent: `cross-project-synthesizer`

**Why**: 11 tracked projects and 125+ session logs. When patterns span projects (CPF insight affecting Razzo positioning, job search learning applying to writing), no automated way to surface those connections. `project-index.md` tracks summaries, but cross-project synthesis requires reading across log folders.

**Where**: `~/.claude/agents/cross-project-synthesizer.md`

**What it would do**:
- Read recent logs (last 7-14 days) across all tracked projects
- Identify themes, repeated decisions, or insights that connect projects
- Flag opportunities: "CPF atomization principle could simplify your Razzo content strategy"
- Output brief synthesis with actionable connections

**Model**: sonnet (balanced - reads a lot but analysis isn't architecture-level)

**Effort**: Medium - agent definition + prompt engineering.

---

### 5. Hook: Block Edits to External Project Files

**Why**: CLAUDE.md says "Never edit files in external project folders. Only read from them." Currently enforced by instructions alone, not a hook. A PreToolUse hook on Edit/Write would make this a hard boundary.

**Where**: `~/.claude/settings.json` → new PreToolUse hook

**What it would do**: When working in Chief of Staff, block any Edit or Write to paths outside `/Users/jtnt/Documents/Projects/Chief of Staff/` (except already-allowed `logs/` and `cos-inbox.md` patterns).

**Value**: Turns a "please don't" into a "can't" - removes possibility of accidental cross-project edits from CoS sessions.

**Effort**: Low - shell script + JSON config.

---

## Priority Order

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 1 | Notification hook | Low | Quality of life - immediate |
| 2 | Block external edits hook | Low | Safety - prevents mistakes |
| 3 | `/project-health` skill | Medium | Visibility - useful daily |
| 4 | `/weekly-review` skill | Medium | Synthesis - useful weekly |
| 5 | Cross-project synthesizer | Medium | Intelligence - compounds over time |
