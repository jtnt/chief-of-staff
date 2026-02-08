---
title: Meta Work Warning System
---

# Chief of Staff: Meta Work Warning System

**Date:** 2026-01-17 10:49 AM EST
**Session Type:** meta-work

## What Was Done

Implemented a meta-work warning system to alert user when spending too much time on system/tooling work vs actual project deliverables.

**Three components built:**

1. **Session Type field in `/log` command** - Logs now include classification (project-work, meta-work, mixed, planning) with detection heuristics to help auto-classify.

2. **In-session awareness in global CLAUDE.md** - Guidance to notice meta-work patterns during sessions and gently flag after ~15-20 turns of continuous meta-work.

3. **Session-start ratio check in CoS CLAUDE.md** - Scans last 7 days of logs at session start, calculates meta-work ratio, displays warning if > 30%.

Also added instruction that logs are the primary source for understanding recent work (not git history) - addressing the user's observation that I went to git first when the whole point of logs is to use them.

## Key Decisions

1. **Time + ratio triggers, both delivery points** - User wanted both time-based (in-session) and ratio-based (cross-session) warnings, delivered both during sessions and at session start.

2. **Session Type values:** project-work, meta-work, mixed, planning - kept simple. Planning is neutral (doesn't count toward ratio).

3. **30% threshold for warning** - Target is 80/20 project vs meta. Warn when meta exceeds 30%.

4. **Guidance-based, not hook-based** - Uses CLAUDE.md instructions rather than technical hooks. Simpler to maintain.

5. **"I will remember" requires instructions** - User caught me making an empty promise ("going forward, I will use logs first"). Added explicit instruction to CLAUDE.md so I actually will.

## Changes Made

```
 M CLAUDE.md (Chief of Staff)
 M ~/.claude/commands/log.md
 M ~/.claude/CLAUDE.md
```

## Open Items

- Existing logs don't have Session Type fields - ratio check will build up as new logs are created
- Consider backfilling Session Type on recent logs for immediate ratio calculation (optional)
