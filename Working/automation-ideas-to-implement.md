# Automation Ideas to Implement

**Created**: 2026-01-30 03:39 PM EST
**Status**: Review and decide what to implement

---

## Session Start Visibility Problem

**Issue**: SessionStart hooks can only inject context for Claude to see. There's no way to force visible terminal output.

**Current**: Hook outputs `additionalContext` → Claude sees it → Claude *should* mention it → If Claude doesn't, it's invisible

**Solution Options**:

### Option 1: Strengthen CLAUDE.md (Simplest)
Add explicit requirement that Claude MUST mention session start flags in first response.

### Option 2: macOS Notifications
Add `osascript` notifications to cos-session-start.sh for inbox/patterns/meta-work alerts.

### Option 3: Pre-Session Script
Create `~/bin/cos-check.sh` that shows status before launching Claude. Alias as `cos`.

**Decision needed**: Which approach?

---

## High-Value Skills to Create

### 1. `/cross-project-synthesis`
Analyze recent logs across all 12 tracked projects to identify patterns, blockers, opportunities.

### 2. `/strategic-decision`
Formalize decision-making with context, options, rationale, implications. Save to `Decisions/`.

### 3. `/content-repurpose`
Transform content across platforms (blog → LinkedIn → thread) following writing standards.

---

## MCP Servers to Add

### Linear MCP
For Job Search task tracking (applications, follow-ups, interview prep).
**Verify exists first**: `claude mcp add linear`

### Slack MCP
For Razzo team coordination and status updates.
**Verify exists first**: `claude mcp add slack`

---

## Hooks to Add

### 1. PostToolUse: Auto-update project-knowledge.md
When logs are created, extract insights and update project-knowledge.md immediately.

### 2. PreToolUse: Block external project edits
Enforce "never edit external project files" rule with blocking hook.

---

## Subagents to Create

### 1. `project-health-monitor`
Weekly analysis of project activity, meta-work %, stagnation signals.

### 2. `content-synthesizer`
Extract key info from meeting transcripts, chat logs, strategy docs.

---

## Document Generation
**Status**: Could not verify working MCP servers exist for docx/pdf generation.
**Decision needed**: Worth investigating further or use Claude.ai web/desktop instead?

---

## Next Actions

- [ ] Decide on session start visibility approach
- [ ] Create `/cross-project-synthesis` skill
- [ ] Add block-external-project-edits hook
- [ ] Verify Linear/Slack MCP servers exist before adding
- [ ] Consider which other items are worth implementing
