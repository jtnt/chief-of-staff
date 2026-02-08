---
title: Read Permissions Fix
---

# Chief of Staff: Read Permissions Fix

**Date:** 2026-01-22 10:08 AM EST
**Session Type:** meta-work

## What Was Done

Fixed missing Read permissions in `~/.claude/settings.json` that were causing permission prompts during the strategic morning briefing. Identified that the briefing was correctly using the Read tool (not Bash) per CLAUDE.md guidance, but no Read permissions were configured in settings.json.

Added two Read permission patterns to allow reading from all tracked projects:
- `Read(/Users/jtnt/Documents/Projects/**)`
- `Read(~/Documents/Projects/**)`

Both path formats are needed because Claude Code doesn't expand tildes when matching permission patterns.

## Key Decisions

- Used broad permission for entire Projects directory rather than per-project permissions - all content in ~/Documents/Projects is trusted, and this prevents needing to update settings.json every time a new project is tracked
- Rejected hook-based approach (would fire for EVERY Read operation, adds maintenance overhead)
- Matches existing pattern of broad permissions like `Bash(git -C:*)`

## Changes Made

- `~/.claude/settings.json` - Added two Read permission entries (lines 158-159)

## Open Items

None identified.
