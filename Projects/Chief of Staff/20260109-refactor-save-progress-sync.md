# Chief of Staff Sync: Refactor /save-progress to Call Commands

**Date:** January 9, 2026 (late night)
**Type:** Refactoring

---

## The Problem

User asked: "does /save-progress run /update-cos or does it update the CoS using its own internal logic?"

Answer: It had its **own internal copy** of both `/update-knowledge` and `/update-cos` logic.

**Why this is bad:**
- When we fix `/update-knowledge` or `/update-cos`, those fixes don't automatically apply to `/save-progress`
- We have to maintain the same logic in 3 places
- They can (and did) drift apart
- Already happened: we fixed the commands but had to manually update `/save-progress`

---

## The Solution

Refactored `/save-progress` to just **call the commands** instead of duplicating their logic.

**Before:**
```markdown
### Step 2: Update Knowledge Files

Follow the update-knowledge workflow:

1. **Check for session.md**:
   - If exists: Read it, extract technical notes for CLAUDE.md
   - Leave session.md alone - don't delete it

2. **Update project-knowledge.md**:
   ...
   [30+ lines of detailed logic]

### Step 6: Sync to Chief of Staff

Update-cos workflow:

1. Identify project name from directory
2. Gather context:
   ...
   [20+ lines of detailed logic]
```

**After:**
```markdown
### Step 2: Update Knowledge Files

Run the `/update-knowledge` workflow (but skip the "Ask About Chief of Staff Sync" step at the end - we'll handle CoS sync in Step 6).

### Step 6: Sync to Chief of Staff

Check if current project should sync to Chief of Staff:

1. Get current working directory path
2. Check if it's under `/Users/jtnt/Documents/Projects/`
3. If no: Skip this step (ephemeral projects don't sync)
4. If yes: Run the `/update-cos` workflow
```

---

## Benefits

1. **Single source of truth** - Each workflow lives in one place
2. **Automatic propagation** - Fix `/update-knowledge` once, `/save-progress` inherits it
3. **Simpler** - `/save-progress` is now an orchestrator, not duplicating logic
4. **Maintainable** - Don't have to remember to update multiple files

---

## Design Principle

**DRY (Don't Repeat Yourself)** - When you have the same logic in multiple places, extract it into a shared component and call it.

This is basic software engineering, and it applies to command workflows too.

---

## Files Modified

- `/Users/jtnt/.claude/commands/save-progress.md` - Simplified Steps 2 and 6 to call commands
- `project-knowledge.md` - Documented the refactoring
