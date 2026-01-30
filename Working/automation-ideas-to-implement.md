# Automation Ideas to Implement

Two analysis sessions on 2026-01-30 identified automation opportunities for Chief of Staff.

---

## Session 1: Morning Analysis (07:17 AM)
**Focus**: Stack-aware recommendations based on existing automation maturity

### Current State
- **18 plugins** installed
- **4 custom skills**: session-capture, review-patterns, cpf-research, cpf-system
- **4 custom agents**: cpf-company-researcher, cpf-verifier, meeting-processor, save-sync-agent
- **6 hooks**: SessionStart (briefing), SessionEnd (capture), UserPromptSubmit (morning greeting + git model), 3 PermissionRequest auto-allows
- **MCP integrations**: Google Calendar, Gmail, Notion, PostHog, Playwright, context7

### Recommendations from Session 1

#### 1. Notification Hook - Know When Background Work Finishes ⭐ LOW EFFORT
**Why**: SessionEnd spawns background Claude for session capture. Long tasks via `/lfg` and parallel agents have no completion notification.

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

---

#### 2. Block External Edits Hook ⭐ LOW EFFORT
**Why**: CLAUDE.md says "Never edit files in external project folders. Only read from them." Currently enforced by instructions alone, not a hook.

**Where**: `~/.claude/settings.json` → new PreToolUse hook

**What it does**: When working in Chief of Staff, block any Edit or Write to paths outside `/Users/jtnt/Documents/Projects/Chief of Staff/`.

**Value**: Turns a "please don't" into a "can't" - removes possibility of accidental cross-project edits.

---

#### 3. Skill: `/project-health` - On-Demand Project Dashboard
**Why**: Briefing runs at session start, but mid-session you sometimes want a quick health check on all projects.

**Where**: `~/.claude/skills/project-health/SKILL.md`

**What it does**:
1. Read `project-sources.md` for all tracked projects
2. Check each project's latest log file (date + topic)
3. Check for `cos-inbox.md` items across projects
4. Check git status of each project (uncommitted work, unpushed commits)
5. Output compact dashboard: last activity, open items, git state

**Invocation**: User-only. Supports arguments: `/project-health` (all) or `/project-health Razzo` (one project).

**Effort**: Medium

---

#### 4. Skill: `/weekly-review` - Automated Weekly Synthesis
**Why**: `Weekly Reviews/` folder exists and Monday mornings trigger weekly synthesis via `/morning`. But no dedicated skill pulls together cross-project patterns with more depth.

**Where**: `~/.claude/skills/weekly-review/SKILL.md`

**What it does**:
1. Read all logs from the past 7 days across all tracked projects
2. Read daily check-ins and thoughts from the week
3. Pull calendar events for the week (retrospective)
4. Classify time spent: project-work vs meta-work vs planning
5. Identify cross-project patterns and blockers
6. Generate structured review in `Weekly Reviews/YYYYMMDD-weekly-review.md`

**Invocation**: User-only

**Effort**: Medium

---

#### 5. Subagent: `cross-project-synthesizer`
**Why**: 11 tracked projects and 125+ session logs. When patterns span projects, no automated way to surface those connections.

**Where**: `~/.claude/agents/cross-project-synthesizer.md`

**What it does**:
- Read recent logs (last 7-14 days) across all tracked projects
- Identify themes, repeated decisions, or insights that connect projects
- Flag opportunities: "CPF atomization principle could simplify your Razzo content strategy"
- Output brief synthesis with actionable connections

**Model**: sonnet

**Effort**: Medium

---

### Priority Order (Session 1)

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 1 | Notification hook | Low | Quality of life - immediate |
| 2 | Block external edits hook | Low | Safety - prevents mistakes |
| 3 | `/project-health` skill | Medium | Visibility - useful daily |
| 4 | `/weekly-review` skill | Medium | Synthesis - useful weekly |
| 5 | Cross-project synthesizer | Medium | Intelligence - compounds over time |

---

## Session 2: Afternoon Analysis (03:39 PM)
**Focus**: Session start visibility problem + broader automation landscape

### Session Start Visibility Problem

**Issue**: SessionStart hooks can only inject context for Claude to see (`additionalContext`). There's no way to force visible terminal output that appears directly to the user.

**Current behavior**: Hook outputs JSON → Claude sees it in context → Claude *should* mention it → If Claude doesn't, it's invisible to user.

**Architecture limitation**: Claude Code hooks cannot display terminal output independent of Claude's conversation context.

#### Solution Options

##### Option 1: Strengthen CLAUDE.md (Simplest)
Add explicit requirement in `~/.claude/CLAUDE.md`:

```markdown
## Session Start Context Flags - CRITICAL

When you see these flags in session context, you MUST mention them in your very first response:

- **BRIEFING_REQUIRED**: Execute strategic briefing
- **COS_INBOX**: Show inbox items in brief list format
- **PATTERNS_PENDING**: Mention "X pattern files have suggestions. Run /review-patterns when ready."
- **META_WORK_HIGH**: Mention meta-work percentage and ask if user wants to focus on deliverables

Never skip mentioning these flags. They're critical workflow triggers.
```

**Pros**: No code changes, works within existing architecture
**Cons**: Still relies on Claude noticing and acting

---

##### Option 2: macOS Notifications
Have SessionStart hook trigger macOS notifications independent of Claude.

**Update**: `~/.claude/hooks/cos-session-start.sh`

```bash
# After building context, before outputting JSON
if [ "$inbox_count" -gt 0 ]; then
    osascript -e "display notification \"$inbox_count pending items\" with title \"CoS Inbox\"" &
fi

if [ "$patterns_pending" -gt 0 ]; then
    osascript -e "display notification \"$patterns_pending files with CLAUDE.md suggestions\" with title \"Patterns Pending\"" &
fi

if [ "$pct" -gt 70 ]; then
    osascript -e "display notification \"${pct}% meta-work in last 7 days\" with title \"Meta-Work Alert\"" &
fi
```

**Pros**: Guaranteed visibility, works outside Claude
**Cons**: macOS-specific, notification fatigue, doesn't block for attention

---

##### Option 3: Pre-Session Check Script
Run a status check **before** launching Claude.

**Create**: `~/bin/cos-check.sh`

```bash
#!/bin/bash
# Pre-flight check before launching Claude in CoS

cos_dir="/Users/jtnt/Documents/Projects/Chief of Staff"

echo "📋 Chief of Staff Status Check"
echo "================================"
echo ""

# Check inbox
inbox="$cos_dir/cos-inbox.md"
if [ -f "$inbox" ]; then
    count=$(awk '/^## Pending/,/^## Archive/' "$inbox" | grep -c '^### ' 2>/dev/null || echo 0)
    if [ "$count" -gt 0 ]; then
        echo "📥 Inbox: $count pending items"
        awk '/^## Pending/,/^## Archive/' "$inbox" | grep '^### ' | head -3 | sed 's/^###/  -/'
        [ "$count" -gt 3 ] && echo "  ... and $((count - 3)) more"
        echo ""
    fi
fi

# Check patterns
patterns=$(find "$cos_dir/session-patterns" -name "*.md" -exec grep -l "suggestion:" {} \; 2>/dev/null | wc -l | tr -d ' ')
if [ "$patterns" -gt 0 ]; then
    echo "🔍 Patterns: $patterns files with CLAUDE.md suggestions"
    echo "   Run /review-patterns to review"
    echo ""
fi

# Check meta-work ratio
total=$(find "$cos_dir/logs" -name "*.md" -mtime -7 2>/dev/null | wc -l | tr -d ' ')
meta=$(find "$cos_dir/logs" -name "*.md" -mtime -7 -exec grep -l "meta-work\|automation" {} \; 2>/dev/null | wc -l | tr -d ' ')
if [ "$total" -gt 0 ]; then
    pct=$((meta * 100 / total))
    if [ "$pct" -gt 70 ]; then
        echo "⚠️  Meta-work: ${pct}% of last 7 days ($meta/$total sessions)"
        echo "   Consider focusing on project deliverables"
        echo ""
    fi
fi

echo "================================"
echo ""

# Launch Claude in CoS directory
cd "$cos_dir"
exec claude
```

**Make executable**: `chmod +x ~/bin/cos-check.sh`
**Alias**: Add to `~/.zshrc`: `alias cos='~/bin/cos-check.sh'`

**Pros**: Guaranteed visibility, blocks for review, integrates with workflow
**Cons**: Separate script to maintain, only works when launched via alias

---

### Additional Recommendations from Session 2

#### High-Value Skills

##### `/cross-project-synthesis` (User-invocable)
Analyze recent logs across all 12 tracked projects to identify patterns, blockers, opportunities.

**Similar to Session 1's cross-project-synthesizer subagent**, but as user-invoked skill rather than background agent.

---

##### `/strategic-decision` (User-invocable)
Formalize decision-making with context, options, rationale, implications.

**Create**: `.claude/skills/strategic-decision/SKILL.md`

Guide user through:
1. Decision to make
2. Context (why now?)
3. Options (2-4 approaches via AskUserQuestion)
4. Trade-offs
5. Choice + rationale
6. Implications

Save to: `Decisions/YYYYMMDD-[decision-name].md`

**Value**: Captures strategic thinking process, not just outcomes.

---

##### `/content-repurpose` (User-invocable)
Transform content across platforms following writing standards.

**Where**: `.claude/skills/content-repurpose/SKILL.md`

Consult `/Users/jtnt/Documents/Projects/Writing/Standards/` and generate:
1. LinkedIn post (1300 char limit)
2. Twitter/X thread (5-7 tweets)
3. Email newsletter version (Substack)

Apply `/humanize` to all outputs.

**Value**: Streamlines multi-platform publishing workflow.

---

#### MCP Servers to Add

##### Linear MCP
For Job Search task tracking (applications, follow-ups, interview prep).

**Install**: `claude mcp add linear` (verify exists first)

---

##### Slack MCP
For Razzo team coordination and status updates.

**Install**: `claude mcp add slack` (verify exists first)

---

#### Hooks from Session 2

##### PostToolUse: Auto-update project-knowledge.md
When logs are created, extract insights and update project-knowledge.md immediately.

**Different from Session 1**: This is a proactive extraction hook, not just a safety boundary.

---

#### Subagents from Session 2

##### `project-health-monitor`
Weekly analysis of project activity, meta-work %, stagnation signals.

**Similar to Session 1's `/project-health` skill**, but as background agent vs. on-demand skill.

---

##### `content-synthesizer`
Extract key info from meeting transcripts, chat logs, strategy docs.

---

#### Document Generation
**Status**: Could not verify working MCP servers exist for docx/pdf generation.
**Decision needed**: Worth investigating further or use Claude.ai web/desktop instead?

---

## Overlaps Between Sessions

| Concept | Session 1 | Session 2 |
|---------|-----------|-----------|
| Block external edits | Hook (PreToolUse) | Hook (PreToolUse) |
| Cross-project synthesis | Subagent | Skill |
| Project health monitoring | Skill (`/project-health`) | Subagent (`project-health-monitor`) |
| Weekly synthesis | Skill (`/weekly-review`) | - |
| Session start visibility | - | Three solution options |

---

## Combined Next Actions

### High Priority (Low Effort, High Impact)
- [ ] **Notification hook** (Session 1 #1) - macOS notifications for background work
- [ ] **Block external edits hook** (Both sessions) - enforce read-only rule
- [ ] **Session start visibility** (Session 2) - choose Option 1, 2, or 3

### Medium Priority (Skills)
- [ ] **`/project-health`** (Session 1 #3) - on-demand dashboard
- [ ] **`/weekly-review`** (Session 1 #4) - automated weekly synthesis
- [ ] **`/cross-project-synthesis`** (Session 2) - pattern identification skill
- [ ] **`/strategic-decision`** (Session 2) - formalize decision process
- [ ] **`/content-repurpose`** (Session 2) - multi-platform publishing

### Exploratory
- [ ] **Linear MCP** (Session 2) - verify exists, add for Job Search
- [ ] **Slack MCP** (Session 2) - verify exists, add for Razzo
- [ ] **Cross-project synthesizer subagent** (Session 1 #5) - background pattern detection
- [ ] **Document generation MCP** (Session 2) - investigate or skip

### Decide: Skill vs. Subagent
- [ ] Cross-project synthesis: User-invoked skill OR background subagent?
- [ ] Project health: On-demand skill OR weekly monitoring subagent?
