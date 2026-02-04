---
date: 2026-02-04 04:56 PM EST
session-log: ../logs/20260204-runaway-mcp-cleanup.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/07588046-ca58-4859-9874-d1bceb28d780.jsonl
---

# Session Patterns

## Observations

**User corrected speculation with investigation.** When user asked "why is my computer fan going crazy", I speculated it was from my briefing tool calls. User response: "no it didn't. don't guess. investigate." When I ran `ps aux`, found 22 runaway notebooklm-mcp processes burning 400% CPU - completely different root cause.

**Diagnostic commands reveal truth.** System performance issues (fan noise, high load, memory pressure) have observable causes. Running diagnostics (`ps aux`, `top`, memory checks) shows exactly what's happening instead of guessing based on what "seems likely."

**MCP servers can create process bloat.** The NotebookLM MCP server had spawned 22 processes throughout the day - 4 actively burning CPU, 18 idle orphans. Each Claude Code session/reconnection may spawn new instances without cleanup.

## CLAUDE.md Suggestions

### For Global ~/.claude/CLAUDE.md

```suggestion:global
### Investigate, Don't Speculate

**When the user reports a system issue** (performance, errors, unexpected behavior), run diagnostic commands first. Don't theorize about causes before looking. Check processes, logs, and system state — then report what you find.
```

**Status:** ✅ Applied during session

This principle was added to global CLAUDE.md under Core Principles, right after "Never Make Things Up" (since it's a related pattern about not fabricating explanations).
