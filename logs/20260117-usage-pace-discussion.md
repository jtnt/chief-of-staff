---
title: Usage Pace Discussion
---

# Chief of Staff: Usage Pace Discussion

**Date:** 2026-01-17 04:51 PM EST
**Session Type:** mixed

## What Was Done

1. **Usage pace calculation** - User asked if they were ahead or behind on Claude subscription usage (30% used). Initial calculation was wrong (assumed weekly cycle started today). Corrected to recognize the cycle runs Monday-Monday, showing user is actually well under budget (~7.5%/day vs 23%/day capacity remaining).

2. **Explored automating usage tracking** - Investigated whether Claude Code exposes subscription usage data programmatically for automatic pace checking:
   - `/usage` is interactive-only (can't be piped or captured)
   - `stats-cache.json` has local activity data but not subscription limits
   - No API or file exposes the "% used" or reset date

3. **Designed but abandoned tooling** - Created a plan for semi-automated tracking (manual input + automatic calculation), but user decided the mental math is simple enough that tooling isn't worth the overhead.

## Key Decisions

- **No usage tracking tooling created** - The calculation is straightforward: `(% used) / (days elapsed)` compared against `(days remaining)`. User prefers mental math over maintaining a command/state file.

## Changes Made

No code changes. Explored configuration and data files:
- Read `~/.claude/settings.json` (hooks, permissions)
- Read `~/.claude/stats-cache.json` (local usage stats)
- Read Claude Code documentation on commands and hooks

## Open Items

- If Anthropic ever exposes usage data programmatically, automation would become possible
- Current usage pace formula for quick reference: daily rate = used% / days_elapsed; sustainable if daily_rate × days_remaining ≤ remaining%
