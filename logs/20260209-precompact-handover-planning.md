---
date: 2026-02-09 22:50 EST
title: PreCompact Handover System Planning
type: planning
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/a32e6444-495c-4cd7-bb4e-2c30107525cd.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
plan_file: /Users/jtnt/.claude/plans/gentle-foraging-tiger.md
---

# Chief of Staff: PreCompact Handover System Planning

## What Was Done

Explored and designed a PreCompact handover system to complement the existing SessionEnd auto-capture. The session produced a comprehensive implementation plan for a hook-based system that automatically generates handover summaries before auto-compaction occurs, preserving context that would otherwise be lost when long sessions hit memory limits.

**Key components designed:**
- Hook script (`~/.claude/hooks/pre-compact-handover.sh`) - Lightweight validator and background spawner
- Handover skill (`~/.claude/skills/precompact-handover/SKILL.md`) - Autonomous workflow for generating summaries
- Settings configuration for PreCompact hook with `auto` matcher only
- Handover file format with strategic sections (decisions, blockers, architecture state)
- Output location: `HANDOVER-YYYY-MM-DD-[session-id].md` saved to working directory

**Architecture follows proven patterns:** Mirrors the SessionEnd auto-capture system but optimized for mid-session context preservation rather than retrospective session logs.

## Key Decisions

**Use `auto` matcher only, not `manual`:** Manual `/compact` is intentional and user-controlled. Auto-compaction is the surprise case that needs automatic handovers to prevent context loss.

**Save handovers to working directory, not git-commit:** Unlike session-capture logs, handovers are drafts for review. They help continue the current session but shouldn't be auto-committed. User can choose to keep or discard them.

**Content focus differs from session-capture:** Session-capture creates retrospective logs ("what happened") for future sessions. Handovers create continuity aids ("what you need to keep working") for the same session post-compaction.

**Non-blocking background execution:** Handover generation happens in background using `disown`, doesn't interrupt the compaction or ongoing work.

**Minimum transcript size filter (50KB):** Prevents noise from trivial sessions that wouldn't benefit from handovers.

## Reasoning

**Why build this when Claude Code has built-in compaction summaries?**
The built-in summary tries to preserve working context, but it's optimized for continuing the conversation flow, not for strategic continuity. A handover specifically captures:
- Decisions and their rationale (why, not just what)
- Active blockers and open questions
- Architectural context that might not seem "active" but matters
- Files modified and their relationships

The handover file exists on disk, so post-compaction sessions can explicitly `Read` it to recover context that the automatic summary might have compressed away.

**Why complement rather than replace session-capture?**
Different timing and purposes:
- **SessionEnd**: Fires when session ends, creates permanent record for future sessions
- **PreCompact**: Fires mid-session before memory compression, creates continuity aid for same session

Most sessions never hit compaction, so SessionEnd remains the primary capture mechanism. PreCompact handles the edge case of unusually long sessions.

**Pattern to remember:** Hook/skill separation keeps the hook lightweight (fast validation, no blocking) and delegates heavy work (transcript analysis, summary generation) to autonomous background Claude sessions. This pattern scales well and prevents hook failures from blocking the main workflow.

## Plan (Claude Code)

**Plan file:** `/Users/jtnt/.claude/plans/gentle-foraging-tiger.md`

# Implementation Plan: PreCompact Handover System

## Context

**Problem:** Long sessions that hit context limits get auto-compacted, causing loss of working memory and context. Users need to manually rebuild context after compaction, which is time-consuming and error-prone.

**Solution:** Implement a PreCompact hook system that automatically generates a handover summary before auto-compaction occurs. This preserves strategic context, decisions, and blockers that would otherwise be lost.

**Relationship to existing system:** Complements the SessionEnd auto-capture system:
- **SessionEnd**: Captures what happened in normal session endings (most sessions)
- **PreCompact**: Captures context before memory loss in unusually long sessions (edge case)

## Architecture Design

Following the proven patterns from the SessionEnd auto-capture system:

```
Auto-Compaction Triggered
    ↓
PreCompact hook fires (auto matcher)
    ↓
pre-compact-handover.sh (validates, spawns background Claude)
    ↓
Background Claude + precompact-handover skill
    ↓
HANDOVER-YYYY-MM-DD-[session-id].md saved to project
    ↓
User continues with compacted session, handover available for review
```

### Hook vs Skill Separation

**Hook script** (`pre-compact-handover.sh`):
- Lightweight bash script (< 100 lines)
- Receives PreCompact event JSON on stdin
- Validates transcript exists and has minimum size
- Spawns background Claude session with handover skill
- No blocking operations (uses `disown`)
- Logs to `~/.claude/precompact-handover.log`

**Skill** (`precompact-handover/SKILL.md`):
- Heavyweight autonomous workflow (similar to session-capture)
- Reads full transcript before compaction
- Extracts strategic context, decisions, blockers
- Generates handover summary
- Saves to project folder
- No git operations (handovers are drafts)

## Critical Files to Modify/Create

### New Files

1. **`~/.claude/hooks/pre-compact-handover.sh`**
   - Hook script that spawns background handover generation
   - Pattern: Similar to `session-end.sh` structure
   - Filters: Minimum transcript size, valid project, not already running

2. **`~/.claude/skills/precompact-handover/SKILL.md`**
   - Autonomous workflow for generating handover summaries
   - Sections: Context Analysis, Key Decisions, Active Blockers, Architecture State
   - Pattern: Similar to session-capture skill structure

### Modified Files

3. **`~/.claude/settings.json`**
   - Add PreCompact hook configuration with `auto` matcher
   - Location: `hooks.PreCompact` section

4. **`~/.claude/hooks/README.md`**
   - Document the new PreCompact hook
   - Add to "Active Hooks" section

## Implementation Details

### 1. Hook Script Design (`pre-compact-handover.sh`)

**Input (stdin JSON):**
```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/Users/...",
  "trigger": "auto",
  "hook_event_name": "PreCompact"
}
```

**Validation checks:**
- Skip if `trigger != "auto"` (only auto-compaction, not manual /compact)
- Skip if transcript doesn't exist or is < 50KB (not enough context)
- Skip if background session (prevent infinite loops via `CLAUDE_BACKGROUND_SESSION`)
- Skip if lock file exists (prevent duplicate processing)

**Background spawn:**
```bash
nice -n 19 claude \
  --no-session-persistence \
  --cwd "$CWD" \
  --tool-allowed Edit \
  --tool-allowed Write \
  --tool-allowed Read \
  --tool-allowed Bash \
  -m "Generate handover summary for session before compaction" \
  -f ~/.claude/skills/precompact-handover/SKILL.md \
  --environment CLAUDE_BACKGROUND_SESSION=true \
  --environment TRANSCRIPT_PATH="$TRANSCRIPT_PATH" \
  --environment SESSION_ID="$SESSION_ID" \
  --environment CWD="$CWD"
```

**Lock file:** `~/.claude/precompact-handover-${SESSION_ID}.lock`

### 2. Handover Skill Design (`precompact-handover/SKILL.md`)

**Workflow steps:**

1. **Read transcript** (`$TRANSCRIPT_PATH`)
   - Parse JSONL format
   - Extract key information: files touched, decisions made, blockers encountered

2. **Analyze session context**
   - Identify what was being worked on
   - Extract strategic decisions and reasoning
   - Find open questions and blockers
   - Note architectural context

3. **Generate handover summary**
   - Filename: `HANDOVER-YYYY-MM-DD-[session-id-short].md`
   - Location: `$CWD/HANDOVER-*.md` (saved to working directory)
   - Format:
     ```markdown
     # Handover Summary

     **Session:** [session-id]
     **Generated:** [timestamp]
     **Reason:** Auto-compaction triggered

     ## What Was Being Worked On
     [Brief summary of the active work]

     ## Key Decisions Made
     [Strategic decisions that should persist]

     ## Active Blockers
     [Things that were blocking progress]

     ## Architecture Context
     [Important architectural context to preserve]

     ## Files Modified
     [List of files that were touched]

     ## Next Steps
     [What should happen next]

     ## Open Questions
     [Unanswered questions]
     ```

4. **Save handover file**
   - Use Write tool to create handover file
   - No git operations (handovers are drafts for review)
   - Log completion to `~/.claude/precompact-handover.log`

**Key difference from session-capture:**
- Session-capture: Creates detailed log of what happened + commits to git
- PreCompact handover: Creates strategic summary for continuity + no git operations

### 3. Settings Configuration

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreCompact": [
      {
        "matcher": "auto",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/pre-compact-handover.sh"
          }
        ]
      }
    ]
  }
}
```

**Matcher choice:** `"auto"` only (not `"manual"`)
- Rationale: Manual `/compact` is intentional, user can create handover themselves
- Auto compaction is unexpected, needs automatic handover

## File Output Locations

**Handover files saved to working directory:**
- `$CWD/HANDOVER-YYYY-MM-DD-[session-id-short].md`
- Example: `/Users/jtnt/Documents/Projects/Writing/HANDOVER-2026-02-09-a1b2c3d.md`

**Why working directory:**
- Context-specific to the work being done
- Easy to find (in same location as the work)
- Can be git-ignored or committed later (user's choice)
- Survives session end (unlike .claude/plans/ which are ephemeral)

**Log file:**
- `~/.claude/precompact-handover.log` (append-only)
- Contains: timestamp, session_id, transcript path, handover file location, errors

**Lock files:**
- `~/.claude/precompact-handover-${SESSION_ID}.lock` (temporary)
- Removed after handover generation completes

## User Experience Flow

1. **Normal work:** User works on a long session, context window fills up
2. **Auto-compaction triggered:** Claude Code detects context limit approaching
3. **PreCompact hook fires:** Hook spawns background handover generation
4. **Compaction proceeds:** Claude Code compacts the conversation (no blocking)
5. **Handover saved:** Background process saves `HANDOVER-*.md` to project folder
6. **User continues:** User continues work with compacted context
7. **Later review:** User can read handover file to recall pre-compaction context

**Key UX principle:** Non-blocking. Handover generation happens in background, doesn't interrupt the session.

## Verification Steps

After implementation, test the system end-to-end:

1. **Test hook execution:**
   ```bash
   # Simulate PreCompact event
   echo '{
     "session_id": "test123",
     "transcript_path": "/tmp/test-transcript.jsonl",
     "cwd": "/Users/jtnt/Documents/Projects/Chief of Staff",
     "trigger": "auto",
     "hook_event_name": "PreCompact"
   }' | ~/.claude/hooks/pre-compact-handover.sh
   ```

2. **Verify background spawn:** Check that background Claude process starts
   ```bash
   ps aux | grep "claude.*precompact-handover"
   ```

3. **Check log output:**
   ```bash
   tail -f ~/.claude/precompact-handover.log
   ```

4. **Verify handover file creation:**
   - Look for `HANDOVER-*.md` in working directory
   - Validate YAML frontmatter and sections

5. **Test with real auto-compaction:**
   - Create a very long session that triggers auto-compaction
   - Verify handover is generated before compaction
   - Confirm handover contains relevant context

6. **Test filtering:**
   - Verify manual `/compact` doesn't trigger handover (matcher is "auto" only)
   - Verify small transcripts don't trigger handover (< 50KB filter)
   - Verify background sessions don't trigger handover (CLAUDE_BACKGROUND_SESSION check)

## Optional Future Enhancements

Not in initial implementation, but consider for later:

1. **Manual `/handover` skill:** For generating handovers on demand (not just before compaction)
2. **Handover index:** Maintain `~/.claude/handover/INDEX.md` with links to all handovers
3. **Auto-commit option:** Optional setting to auto-commit handovers to git
4. **CoS integration:** Sync handover summaries to Chief of Staff project-index.md
5. **Context restoration:** Tool to import handover context back into a new session

## References

**Existing patterns to follow:**
- `~/.claude/hooks/session-end.sh` - Hook script structure
- `~/.claude/skills/session-capture/SKILL.md` - Autonomous workflow structure
- `~/.claude/hooks/README.md` - Documentation format

**Claude Code documentation:**
- PreCompact hook reference (from claude-code-guide agent)
- Hooks configuration format
- Background session spawning patterns

## Changes Made

**Files modified:**

- [[project-knowledge.md]] - Added task to Inbox: "Implement PreCompact handover hook" with link to plan file

**Files created:**

- `/Users/jtnt/.claude/plans/gentle-foraging-tiger.md` - Complete implementation plan for PreCompact handover system (shown in Plan section above)

**Files read:**

- [[~/.claude/hooks/README.md]] - Reviewed hook documentation to understand PreCompact hook capabilities
- [[project-knowledge.md]] - Read to add task to inbox

## Open Items

- Implement the PreCompact handover hook script (`~/.claude/hooks/pre-compact-handover.sh`)
- Create the handover skill (`~/.claude/skills/precompact-handover/SKILL.md`)
- Add PreCompact hook configuration to `~/.claude/settings.json`
- Document the new hook in `~/.claude/hooks/README.md`
- Test end-to-end with simulated and real auto-compaction scenarios
