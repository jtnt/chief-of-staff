---
title: Bidirectional Information Flow
---

# Chief of Staff: Bidirectional Information Flow

**Date:** January 10, 2026 (evening)
**Source:** `/Users/jtnt/Documents/Projects/Chief of Staff`

## Recent Git Activity

```
ff315fb Update project knowledge and CLAUDE.md: Implement bidirectional flow
af78485 Sync Chief of Staff: Check-in system implementation
3de615d Update project knowledge: Document check-in system implementation
0682990 Add check-in system with four types: morning, evening, thought, and journal
36780bf Sync Chief of Staff: Fix critical /save-progress logic bug
b515c61 Update project knowledge: Document Git Commit Policy and fix critical /save-progress logic bug
ea8da7c Document command dependencies in CLAUDE.md
78b7d4d Refactor /save-progress to call commands instead of duplicating logic
8aba428 Fix /save-progress to incorporate all recent improvements
e3847f7 Fix directory switching bug in /update-cos
```

## Current State

Chief of Staff knowledge management system is operational with:
- Project tracking and syncing (6 projects)
- Three-layer documentation model
- Check-in system for daily planning/reflection
- **NEW: Bidirectional information flow (CoS ↔ Projects)**

## Recent Work (2026-01-10 Evening)

### Bidirectional Information Flow Implementation

**Problem:** Check-ins could route to CoS internal log, but items didn't surface when opening projects. User wanted insights from CoS conversations to persist in projects where they're actionable.

**Solution:** Implemented `cos-inbox.md` mechanism for pushing items to projects.

### How It Works

1. **During CoS check-ins** (morning, evening, thought):
   - When project mentioned: "Want to add to [Project]'s inbox?"
   - If yes: Dual write to both locations

2. **Dual write locations:**
   - Project inbox: `/Users/jtnt/Documents/Projects/[ProjectName]/cos-inbox.md`
   - CoS internal log: `Projects/[Name]/YYYYMMDD-checkin-note.md`

3. **When user opens that project:**
   - Global `~/.claude/CLAUDE.md` instructs Claude to check for `cos-inbox.md`
   - Auto-notification: "You have X items from Chief of Staff"
   - Lists pending items

4. **Inbox structure:**
   ```markdown
   ## Pending
   - Items with date, source, context, content

   ## Archive
   - Processed items moved here manually
   ```

5. **Archive workflow:**
   - User says "archive that" or "done with that item"
   - Item moves from Pending to Archive section

### Files Modified

**Check-in commands (project routing updates):**
- `/Users/jtnt/.claude/commands/morning.md`
- `/Users/jtnt/.claude/commands/evening.md`
- `/Users/jtnt/.claude/commands/thought.md`

**Changes:** Now ask "Want to add to [Project]'s inbox?" and write to both:
1. Project's `cos-inbox.md` (so user sees it when opening project)
2. CoS internal log (keeps record in Chief of Staff)

**Global configuration:**
- `/Users/jtnt/.claude/CLAUDE.md` - Added "Chief of Staff Inbox Check" section
  - Auto-check for `cos-inbox.md` at session start
  - Notify if pending items exist
  - Document archive workflow

**Chief of Staff documentation:**
- `CLAUDE.md` - Updated "Project Routing" section to document bidirectional flow

### Key Design Decisions

1. **Dual write strategy:** Items written to both project inbox AND CoS log
   - Ensures visibility where actionable (project)
   - Maintains historical record (CoS)

2. **Manual archive:** User decides when items are done
   - No auto-deletion
   - Archive preserves history

3. **Session start notification:** Automatic, not opt-in
   - Low friction
   - User can't miss items

4. **Flexible source tracking:** Each inbox entry notes source (morning/evening/thought)
   - Provides context for where item came from
   - Helps understand patterns

### Impact

**Before:** CoS check-ins could log project-related items to internal CoS folder, but they weren't visible when opening that project. Items got "lost" in CoS.

**After:** Items pushed to project's inbox surface immediately when opening that project. User can act on them, discuss them, or archive them. Truly bidirectional flow.

## Open Items

- Test the bidirectional flow in practice
- Validate inbox notification works across different projects
- Refine archive workflow based on actual usage
- Consider batch archive operation if many items accumulate
