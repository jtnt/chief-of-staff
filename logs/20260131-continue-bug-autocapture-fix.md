# Session Log: --continue Bug Investigation and Auto-Capture Fix

**Date:** 2026-01-31 09:25 AM EST
**Project:** Chief of Staff
**Session Type:** Meta-work (debugging/infrastructure)

## What Was Done

1. **Reviewed and dismissed all pending CLAUDE.md suggestions** — 7 suggestions across 4 pattern files from 2 projects (CPF, CoS). All dismissed as already encoded in skills or too generic for CLAUDE.md.

2. **Investigated `--continue` hang** — User reported `claude --continue` hanging (never showing a prompt). Found a hung process (PID 55438) running since 7:43 AM consuming 40% CPU. Killed it. Determined this is a known Claude Code bug with large session files (#21067 on GitHub), not related to SessionStart hooks.

3. **Discovered auto-capture has been failing silently since last night** — 7 capture processes spawned today, 0 successful commits. Capture output logs from earlier today were missing. The two remaining logs showed processes dying before or during `claude --print` launch.

4. **Removed destructive log cleanup from session-end.sh** — The script contained `find -delete` that removed capture output logs older than 7 days, destroying diagnostic evidence. This violated the "never delete what you can't recover" CLAUDE.md principle. Removed the line.

5. **Disabled SessionEnd hook** — Since auto-capture is broken and spawning orphaned processes that fail silently, disabled the hook entirely (`"SessionEnd": []` in settings.json). Manual `/log` is the capture method until root cause is found.

## Key Findings

- `--continue` hang is a known Claude Code bug with large session JSONL files, not caused by hooks
- Auto-capture broke sometime last night — unknown root cause, diagnostic logs were being deleted
- A previous Claude session wrote a `find -delete` line that violated core CLAUDE.md principles

## What's Broken

- Auto-capture disabled (SessionEnd hook emptied)
- Root cause of capture failure unknown — need to re-enable and monitor with logs preserved

## Reasoning

Disabled auto-capture rather than trying to fix blind because:
- We don't know what broke (logs were deleted)
- Broken captures spawn orphaned processes
- Manual `/log` works reliably
- Can re-enable once we understand the failure mode
