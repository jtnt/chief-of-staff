---
date: 2026-02-18 08:52 EST
session-log: ../logs/20260218-claude-md-engineering-draft.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief-of-staff/bd5a62ec-6a5e-423e-ba32-8f7ef706a5e9.jsonl
---

# Session Patterns

## Observations

**Handoff gap:** The `/handoff` skill writes a `.claude/handoff.md` file but nothing tells the next session to look for it. When the user opened a fresh session in `writing/`, they asked "how do I tell it to pick up?" and noted it felt like "a hole in the system." The handoff file is useful only if the next session actually reads it.

**Session routing friction:** Session started in CoS because the user was brainstorming; by the time writing started, the session was already "logged to CoS." User wanted session log to end up in `writing/logs/`. Neither mid-session routing nor retroactive log placement is currently possible. This came up again (it has come up before).

## CLAUDE.md Suggestions

### For Project CLAUDE.md (`writing/CLAUDE.md` or CoS `CLAUDE.md`)

```suggestion:project
## Handoff Resume

At session start: check if `.claude/handoff.md` exists in the current project folder. If it does, read it and offer to resume from the handoff prompt before doing anything else.
```

### For Global ~/.claude/CLAUDE.md

No global suggestion — this is project-level behavior.

### Potential Hook

A SessionStart hook for writing/ (or globally) could auto-detect and surface handoff.md:
- Check `$CWD/.claude/handoff.md` exists
- If yes, print a notice: "Handoff file found. Read it before starting."
- User can then paste the resume prompt or skip

This is more reliable than a CLAUDE.md instruction because it fires automatically, not based on Claude remembering to check.
