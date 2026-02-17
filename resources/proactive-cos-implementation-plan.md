# Plan: Make Chief of Staff Actually Proactive

*Saved: 2026-01-22*

## Problems to Solve

1. **Permission prompts during /save** - prompts 1-3 times per run (mkdir, writes to CoS from other projects)
2. **Long wait time during /save** - can't do other work while it runs
3. **Zero proactive features work** - all are documentation-only, no hooks implemented
4. **Daily cadence not happening** - no prompting for morning check-ins

---

## Root Cause Analysis

### Why /save Prompts for Permission

Looking at settings.json permissions:
- `Bash(mkdir:*)` and `Bash(mkdir -p:*)` ARE allowed (lines 54-55)
- `Edit(/Users/jtnt/Documents/Projects/Chief of Staff/project-*.md)` ARE allowed (lines 154-156)
- `Write(/Users/jtnt/Documents/Projects/Chief of Staff/logs/**)` IS allowed (line 157)

But the prompts still happen because:
1. **The Write permission is too specific** - only allows CoS logs, but /save writes logs to CURRENT project's logs folder
2. **Cross-project Edit might not match** - when running from Razzo and editing CoS files

### Why Proactive Features Don't Work

All documented features depend on Claude "remembering" to:
- Check for cos-inbox.md at session start (global CLAUDE.md line 55-59)
- Calculate meta-work ratio (CoS CLAUDE.md lines 27-52)
- Run auto-sync (CoS CLAUDE.md lines 54-69)

**Problem:** No hooks guarantee these happen. Claude follows instructions inconsistently.

---

## Implementation Plan

### Phase 1: Fix /save Permissions

**Option A: PermissionRequest Hook (Recommended)**

Add a PermissionRequest hook that auto-allows /save operations:

```json
"PermissionRequest": [
  {
    "matcher": "Write",
    "hooks": [
      {
        "type": "command",
        "command": "input=$(cat); path=$(echo \"$input\" | jq -r '.tool_input.file_path // empty'); if echo \"$path\" | grep -qE '/logs/[0-9]{8}-.+\\.md$'; then echo '{\"hookSpecificOutput\":{\"hookEventName\":\"PermissionRequest\",\"decision\":{\"behavior\":\"allow\"}}}'; fi"
      }
    ]
  },
  {
    "matcher": "Edit",
    "hooks": [
      {
        "type": "command",
        "command": "input=$(cat); path=$(echo \"$input\" | jq -r '.tool_input.file_path // empty'); if echo \"$path\" | grep -qE 'Chief of Staff/(project-index|project-sources|project-knowledge)\\.md$'; then echo '{\"hookSpecificOutput\":{\"hookEventName\":\"PermissionRequest\",\"decision\":{\"behavior\":\"allow\"}}}'; fi"
      }
    ]
  },
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "input=$(cat); cmd=$(echo \"$input\" | jq -r '.tool_input.command // empty'); if echo \"$cmd\" | grep -qE '^mkdir'; then echo '{\"hookSpecificOutput\":{\"hookEventName\":\"PermissionRequest\",\"decision\":{\"behavior\":\"allow\"}}}'; fi"
      }
    ]
  }
]
```

This auto-allows:
- Write to any `logs/YYYYMMDD-*.md` file (in any project)
- Edit to CoS project-index.md, project-sources.md, project-knowledge.md
- Bash mkdir commands

**Why hooks instead of more allow patterns:**
- Hooks can inspect the actual file path/command and make intelligent decisions
- More flexible than static patterns for the varied project structure (Clients/X, direct projects, etc.)

---

### Phase 2: Make /save Run in Background + Use Haiku

**Model Strategy:**
- **Sonnet** (main session): Conversation analysis and log content generation - needs to understand nuance
- **Haiku** (background): Git operations, file updates, CoS sync - straightforward tasks

**New /save Flow:**

```markdown
# save.md - refactored

## Step 1: Analyze & Write Log (Sonnet - in main session)
1. Analyze conversation for: what was done, decisions, open items
2. Generate log content
3. Write to ./logs/YYYYMMDD-[identifier].md
4. Report: "Saved: ./logs/20260122-feature.md"

## Step 2: Background Sync (Haiku - async)
Launch save-sync-agent with run_in_background: true
Pass: project_path, project_name, log_file_path

User can continue working immediately after Step 1.
```

**Background Agent:** `~/.claude/agents/save-sync-agent.md`

```yaml
---
name: save-sync-agent
description: Background git + CoS sync for /save
model: haiku
tools: Bash, Read, Edit
allowedTools:
  - Bash(git:*)
  - Bash(~/.claude/scripts/sync-to-cos.sh:*)
  - Read
  - Edit(/Users/jtnt/Documents/Projects/Chief of Staff/**)
---

Sync project to git and Chief of Staff. Runs in background.

Input: project_path, project_name, log_file_path

## Tasks (all use simple file operations - no analysis needed)

1. **Git commit** (in project_path):
   - git add -A
   - git diff --cached --name-status (to generate commit message)
   - git commit -m "[auto-generated from changes]"
   - git push

2. **Update CoS project-index.md**:
   - Read the log file at log_file_path
   - Find project entry in project-index.md
   - Update "Last synced" date
   - Update "Recent Work" with summary (first paragraph from log's "What Was Done")

3. **Update CoS project-sources.md**:
   - Find project entry
   - Update "Last synced" date

4. **Report only if errors occur**

All operations are file reads, edits, and git commands - no complex reasoning required.
```

**Why Haiku for background:**
- Git operations are deterministic
- File updates follow fixed patterns
- Faster execution (Haiku responds quicker)
- Lower cost for routine operations

---

### Phase 3: Implement Proactive Hooks

**3a. SessionStart Hook for cos-inbox Detection**

```json
"SessionStart": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "output=''; if [ -f \"$CLAUDE_PROJECT_DIR/cos-inbox.md\" ]; then count=$(grep -c '^- \\[ \\]' \"$CLAUDE_PROJECT_DIR/cos-inbox.md\" 2>/dev/null || echo 0); if [ \"$count\" -gt 0 ]; then output=\"COS_INBOX: $count pending item(s) from Chief of Staff. Run: cat cos-inbox.md to review.\"; fi; fi; if [ -n \"$output\" ]; then echo \"{\\\"hookSpecificOutput\\\":{\\\"hookEventName\\\":\\\"SessionStart\\\",\\\"additionalContext\\\":\\\"$output\\\"}}\"; fi"
      }
    ]
  }
]
```

This:
- Runs on every session start in every project
- Checks if cos-inbox.md exists and has unchecked items
- Injects reminder into Claude's context automatically

**3b. CoS-Specific SessionStart Hook**

```json
{
  "hooks": [
    {
      "type": "command",
      "command": "if [ \"$CLAUDE_PROJECT_DIR\" = \"/Users/jtnt/Documents/Projects/Chief of Staff\" ]; then echo '{\"hookSpecificOutput\":{\"hookEventName\":\"SessionStart\",\"additionalContext\":\"IN_COS=true. Run meta-work check and auto-sync.\"}}'; fi"
    }
  ]
}
```

When Claude sees `IN_COS=true`, the CLAUDE.md instructions tell it to:
- Check meta-work ratio (20% threshold)
- Run auto-sync

**3c. Morning Detection via UserPromptSubmit**

Add to existing UserPromptSubmit hooks:

```json
{
  "hooks": [
    {
      "type": "command",
      "command": "input=$(cat); hour=$(date +%H); prompt=$(echo \"$input\" | jq -r '.prompt // \"\"' | tr '[:upper:]' '[:lower:]'); if [ \"$hour\" -lt 12 ] && echo \"$prompt\" | grep -qE '(^|[^a-z])(good morning|morning|starting my day|hello|hey|hi)([^a-z]|$)'; then echo '{\"hookSpecificOutput\":{\"hookEventName\":\"UserPromptSubmit\",\"additionalContext\":\"MORNING_GREETING_DETECTED. Consider offering morning check-in if not done today.\"}}'; fi"
    }
  ]
}
```

When Claude sees `MORNING_GREETING_DETECTED`:
- Check if morning check-in exists for today in `Check-Ins/daily/`
- If not, offer: "Would you like to do a morning check-in?"

---

### Phase 4: Simplify CLAUDE.md Files

**Create backups first:**
- `Chief of Staff/CLAUDE.md` → `Chief of Staff/CLAUDE.md.backup-20260122`
- `~/.claude/CLAUDE.md` → `~/.claude/CLAUDE.md.backup-20260122`

**Changes to `Chief of Staff/CLAUDE.md`:**
1. Remove "At session start, check..." sections (hooks handle this)
2. Add "When you see X flag, do Y" sections:
   - `IN_COS=true` → Run meta-work check, run auto-sync
   - `COS_INBOX:` → Surface the items
3. Keep: folder structure, file purposes, sync workflow docs

**Changes to `~/.claude/CLAUDE.md`:**
1. Remove manual cos-inbox check instruction (line 55-59) - hook handles it
2. Keep: writing style, git policy, preferences

---

## Files to Modify

| File | Change |
|------|--------|
| `~/.claude/settings.json` | Add PermissionRequest hooks, SessionStart hooks, UserPromptSubmit morning detection |
| `~/.claude/commands/save.md` | Refactor to use background sync agent |
| `~/.claude/agents/save-sync-agent.md` | New: background agent for git/CoS sync |
| `Chief of Staff/CLAUDE.md` | Simplify, add hook-triggered instructions, backup first |
| `~/.claude/CLAUDE.md` | Remove manual cos-inbox check, backup first |

---

## Verification

1. **Run /save in Razzo** → Zero permission prompts, immediate "Saved: ./logs/..." message, sync happens in background
2. **Create cos-inbox.md in CPF with pending items, start new session** → Claude mentions pending items automatically
3. **Start new CoS session** → Meta-work warning appears (we're definitely >20%)
4. **Say "good morning" before noon in any project** → Claude offers morning check-in

---

## Implementation Order

1. PermissionRequest hooks (immediate friction fix)
2. Background sync agent + /save refactor (makes /save fast)
3. SessionStart hooks (cos-inbox, CoS detection)
4. UserPromptSubmit morning detection
5. CLAUDE.md simplification (after hooks are working)

---

## What This Plan Doesn't Include

- No scheduled/cron automation (Claude Code doesn't support this natively yet)
- No always-on background agent (resource intensive, not needed)
- No external integrations (keep system simple)

Goal: **Make documented features actually work via hooks, not add new features.**
