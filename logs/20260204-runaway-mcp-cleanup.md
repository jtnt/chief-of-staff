---
date: 2026-02-04 04:56 PM EST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/07588046-ca58-4859-9874-d1bceb28d780.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Session Log

## What Was Done

**Morning briefing delivered** - pulled calendar, project health (11 active/paused projects), inbox (11 items across CoS/Razzo/CPF), tasks, and unprocessed meetings.

**Diagnosed runaway MCP processes** - user's fan was running hard. Instead of speculating, ran `ps aux` diagnostics and found 22 `notebooklm-mcp` processes, with 4 pegged at 97-100% CPU each. Combined they'd accumulated ~400% CPU load (5.5 hours on oldest process). System load average was 6.22, memory nearly maxed (15G used, 82M free).

**Cleaned up processes** - killed all 22 notebooklm-mcp instances (4 active, 18 idle orphans). Removed `notebooklm` MCP server from global config (`~/.claude.json`) using `claude mcp remove notebooklm -s user`.

**Updated CLAUDE.md** - added "Investigate, Don't Speculate" principle to global CLAUDE.md under Core Principles. When user reports observable system issues (performance, errors, unexpected behavior), run diagnostics first before theorizing about causes.

## Key Decisions

**Investigation over speculation** - codified as CLAUDE.md principle. When something observable is happening, check system state before offering theories.

**NotebookLM MCP disabled** - removed entirely rather than trying to fix the spawn/cleanup issue. It was creating process bloat without clear value.

## Reasoning

**Why "Investigate, Don't Speculate" matters:** I initially guessed the fan noise was from my briefing tool calls (calendar lookups, file reads, etc.). User had to stop me and say "don't guess, investigate." When I checked `ps aux`, found the real cause - runaway MCP processes burning 400% CPU. Speculation wastes time and can miss the actual problem. Observable issues (performance, errors, unexpected behavior) should trigger diagnostics first.

**Pattern to remember:** MCP servers can spawn orphan processes. When system performance degrades, `ps aux | grep mcp` is a useful diagnostic. Each Claude Code session/reconnection may spawn new MCP instances without cleaning up old ones.

## Changes Made

**Global CLAUDE.md** (`~/.claude/CLAUDE.md`):
- Added "Investigate, Don't Speculate" section under Core Principles (after "Never Make Things Up")
- Instructs to run diagnostic commands first when user reports system issues

**System config** (`~/.claude.json`):
- Removed `notebooklm` MCP server via `claude mcp remove notebooklm -s user`

**Processes killed:**
- 22 `notebooklm-mcp` processes (4 active at ~100% CPU, 18 idle orphans)

## Open Items

None identified - cleanup complete.
