---
date: 2026-02-06 08:52 PM PST
session-log: ../logs/20260206-session-context-loading.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/88bb9c07-242d-49ae-8684-4ae8c3f8c336.jsonl
---

# Session Patterns

## Observations

**What worked well:**
- User asked good diagnostic questions ("Is this a good idea? What's the tradeoff?") before committing to implementation
- Analyzing existing behavior across multiple files (briefing template, session workflow, project CLAUDE.md files) revealed the gap clearly
- Decision to use global CLAUDE.md rather than per-project updates was efficient and maintainable

**Friction point identified:**
- Passive references in instructions ("see project-knowledge.md") don't trigger automatic behavior
- There's a difference between documenting what's available vs directing Claude to use it
- Session-start behaviors need explicit imperatives to be reliable

## CLAUDE.md Suggestions

### For Global ~/.claude/CLAUDE.md

```suggestion:global
**Pattern: Imperative vs Passive Directives**

When writing instructions for session-start behaviors or automatic actions:
- Use explicit imperatives: "Read X at session start", "Check Y before responding"
- Avoid passive references: "X contains strategic context", "See Y for details"

Passive references document what's available but don't trigger action. Imperative directives ensure reliable automatic behavior.

Example:
- ❌ "For strategic context, see project-knowledge.md"
- ✅ "At session start, if project-knowledge.md exists, read it immediately before responding"
```
