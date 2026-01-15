# Chief of Staff Sync: Remove Automatic session.md Deletion

**Date:** January 9, 2026 (late night)
**Type:** Workflow Fix

---

## The Issue

User questioned: "wait. it deletes the session.md file? What if there are things in there that aren't complete or need saving?"

**The problem:** `/update-knowledge` was automatically deleting session.md after extracting notes to CLAUDE.md. But this assumes session.md is "done" when you run the command - which isn't necessarily true.

**Valid use cases:**
- Update knowledge files mid-session while still working
- Keep session.md active for continuity
- Decide yourself when to delete it

---

## The Fix

Removed automatic deletion from `/update-knowledge`.

**Changes made:**
1. Removed step: `4. **Delete session.md** (if it existed) - the technical notes are now preserved in CLAUDE.md`
2. Removed from summary: `- Deleted session.md (if it existed)`
3. Updated note from: `session.md is temporary - extract notes then delete`
   To: `session.md is left alone - user decides when to delete it`

Now `/update-knowledge` will:
- Read session.md if it exists
- Extract notes to CLAUDE.md
- **Leave session.md alone** for user to manage

---

## Files Modified

- `/Users/jtnt/.claude/commands/update-knowledge.md` - Removed all session.md deletion logic
- `project-knowledge.md` - Added note about this change

---

## Design Principle

Don't delete user files automatically. Extract what's needed, leave the source alone. Let the user decide when something is done.
