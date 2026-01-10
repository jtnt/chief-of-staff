# Chief of Staff Sync: Directory Safety Fix for /update-cos

**Date:** January 9, 2026 (late night)
**Type:** Bug Fix

---

## The Bug

User ran `/update-cos` from Context Profile Framework project. Transcript showed:

```
cd "/Users/jtnt/Documents/Projects/Chief of Staff" && git add -A && git commit...
cd "/Users/jtnt/Documents/Projects/Chief of Staff" && git push
```

Then when user asked about git status in their project, Claude got confused:

```
❯ anything need to be committed or pushed to git from this project?

⏺ Bash(git status)
  On branch main
  nothing to commit, working tree clean  # ← This is CoS status, not CPF!

⏺ Bash(pwd)
  /Users/jtnt/Documents/Projects/Chief of Staff  # ← Still in CoS directory!
```

**Root cause:** Using `cd` in Bash changed the working directory for all subsequent commands in the session. Claude stayed "stuck" in the CoS directory.

---

## The Fix

Updated `/update-cos` with two changes:

### 1. Added "Directory Safety" section

```markdown
## Directory Safety

**IMPORTANT:** Never use `cd` to change directories during this command. All operations on Chief of Staff files should use:
- Absolute paths for file reads/writes
- `git -C <path>` for git commands

This ensures you stay in the original project directory throughout.
```

### 2. Added explicit Step 7 with correct git syntax

```bash
git -C "/Users/jtnt/Documents/Projects/Chief of Staff" add -A
git -C "/Users/jtnt/Documents/Projects/Chief of Staff" commit -m "..."
git -C "/Users/jtnt/Documents/Projects/Chief of Staff" push
```

Using `git -C <path>` runs git commands in that directory **without changing the current working directory**.

Also made git commit/push explicit in the workflow (it was happening anyway, just implicitly).

---

## Why This Matters

Commands have persistent state. When you `cd` in one Bash call, you're still there in the next Bash call. This creates subtle bugs where:
- You think you're in project A
- You're actually in project B
- Commands run in wrong place

The fix: Never rely on current directory state. Always use absolute paths or `-C` flags.

---

## Files Modified

- `/Users/jtnt/.claude/commands/update-cos.md` - Added Directory Safety section and explicit git step
- `project-knowledge.md` - Documented the bug and fix

---

## Design Principle

Command workflows should be **stateless** - don't rely on or change persistent shell state like working directory.
