---
date: 2026-02-04 09:45 PM PST
session-log: ../logs/20260204-project-knowledge-backfill.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/554295bc-b942-4fde-ac53-4a2401584b28.jsonl
---

# Session Patterns

## Observations

**Side effects are fragile when moving from interactive to background agents:**

The project-knowledge.md gap revealed a pattern: behavior that worked fine in interactive sessions (via CLAUDE.md instructions) disappeared when the same workflow moved to a background agent that only follows its SKILL.md. The old `/save` and `/log` commands never explicitly updated project-knowledge.md — it stayed current as a side effect of working in sessions where Claude followed "Proactive Knowledge Capture."

When capture moved to SessionEnd hook → background Sonnet agent, that side effect vanished. The agent had no instructions to touch project-knowledge.md.

**What worked well:**

- Using parallel Task agents to read recent logs and draft updates (much faster than doing sequentially)
- Condensing verbose entries during backfill (CoS p-k.md: 284 lines → 75 lines)
- Adding quality guidelines to the new Step 4 to prevent bloat going forward
- Updating all three documentation locations (skill, global CLAUDE.md, project CLAUDE.md) in the same session

**What could improve:**

- When designing background agents/skills, audit what relies on CLAUDE.md vs explicit instructions
- Make critical behaviors explicit rather than incidental
- Test edge cases before deploying (would have caught this gap before all files went stale)

## CLAUDE.md Suggestions

### For Project CLAUDE.md

No suggestions. CoS CLAUDE.md was already updated to reflect the new Step 4.

### For Global ~/.claude/CLAUDE.md

No suggestions. Global CLAUDE.md was already updated.

```suggestion:global
## Designing Background Agents and Skills

When moving behavior from interactive sessions to background agents (SessionEnd hooks, auto-capture, etc.):

1. **Audit what relies on CLAUDE.md instructions** — Behavior that works via CLAUDE.md during interactive sessions won't carry over to background agents that only follow their SKILL.md
2. **Make critical behaviors explicit** — Don't rely on side effects. If something is important, wire it into the agent's instructions
3. **Test before deploying** — Run the background agent manually on a test session to verify all expected behaviors happen
4. **Document the full pipeline** — When a workflow has multiple steps, document them in: the skill itself, global CLAUDE.md (if it affects all projects), and project CLAUDE.md (if project-specific)
```
