---
title: Status Line Display Fix
---

# Chief of Staff: Status Line Display Fix

**Date:** 2026-01-17 07:15 AM EST
**Session Type:** meta-work

## What Was Done

Fixed a display issue where the status line in Claude Code CLI was breaking the directory name "Chief of Staff" across multiple lines (appearing as "Chief", "of", "Staff" on separate lines).

## Key Decisions

**Use full path instead of basename:** Chose to display the full path (`~/Documents/Projects/Chief of Staff`) rather than just the directory name. This approach:
- Prevents line-breaking issues with spaces
- Provides better context about which project you're in
- Avoids needing quotes around the directory name (user preference)

**User preference noted:** No quotes in status line display, even though they could solve the wrapping issue.

## Changes Made

- Modified `~/.claude/settings.json` statusLine command
- Removed the `| xargs basename` pipe from the command
- Status line now shows full path instead of just directory name

## Open Items

None - fix is complete and working.
