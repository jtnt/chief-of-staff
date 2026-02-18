---
date: 2026-02-18 08:52 EST
session-log: ../logs/20260218-claude-md-engineering-draft.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief-of-staff/bd5a62ec-6a5e-423e-ba32-8f7ef706a5e9.jsonl
---

# Session Patterns

## Observations

**Handoff gap:** The `/handoff` skill writes a `.claude/handoff.md` file but nothing tells the next session to look for it. When the user opened a fresh session in `writing/`, they asked "how do I tell it to pick up?" and noted it felt like "a hole in the system." The handoff file is useful only if the next session actually reads it.

**Session routing friction:** Session started in CoS because the user was brainstorming; by the time writing started, the session was already "logged to CoS." User wanted session log to end up in `writing/logs/`. Neither mid-session routing nor retroactive log placement is currently possible. This came up again (it has come up before).

## Resolution (implemented in same session)

**Handoff gap fixed** — session continued past initial capture and implemented the fix:
- `~/.claude/hooks/cos-session-start.sh` updated to check for `.claude/handoff.md` and emit `HANDOFF_PENDING` context
- `~/.claude/CLAUDE.md` updated with handler under "Chief of Staff Integration > Hooks"
- `~/.claude/skills/handoff/SKILL.md` updated to note auto-detection

**Remaining gap:** Hook injects context but nothing displays to user until they type the first message. User must type something before Claude acts on `HANDOFF_PENDING`. Could add stderr output for a visual heads-up in terminal before first prompt — not yet implemented.

**Session routing friction remains unresolved** — no mechanism for mid-session log routing or retroactive placement.

## CLAUDE.md Suggestions

### For Global ~/.claude/CLAUDE.md

Already implemented — HANDOFF_PENDING handler added to global CLAUDE.md. No further suggestion needed.

### Remaining suggestion: stderr heads-up for handoff

```suggestion:global
## Handoff Visual Indicator

When `HANDOFF_PENDING` is in session context, tell the user you see a handoff file and will summarize it now. Don't wait for them to ask.
```
