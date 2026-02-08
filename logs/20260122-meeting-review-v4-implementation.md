---
title: Meeting Review V4 Implementation
---

# Chief of Staff: Meeting Review V4 Implementation

**Date:** 2026-01-22 04:04 PM EST
**Session Type:** meta-work

## What Was Done

Implemented Meeting Review v4 fixes based on the approved plan:

1. **False positive transcript detection fix** - Added `validate_transcript_time()` function to `meeting-review.py` that verifies transcript timestamps are within 2 hours of calendar event start time. This prevents calendar ID prefix matching from incorrectly linking events to wrong transcripts.

2. **Orphan transcripts mode** - Added new `get_orphan_transcripts()` function and `"orphans"` mode to the Python script. This finds recordings without calendar events (like "Replit Live Build" webinars).

3. **Configurable lookback window** - Added `days_back` parameter to both `status` and `orphans` modes (default: 7 days). Updated `meeting-review.md` to prompt user for lookback period at start.

4. **Multi-source meeting assets support** - Updated `meeting-review.md` workflow to:
   - Ask for ALL additional materials (transcripts, notes, images, PDFs)
   - Document expanded folder structure: `transcript.md`, `transcript-external.md`, `notes.md`, `assets/`
   - Generate summaries from ALL available sources, not just one

5. **Permissions** - Added to `settings.json`:
   - `Write(/Users/jtnt/Documents/Projects/*/Meetings/**)`
   - `Write(/Users/jtnt/.claude/data/processed-meetings.json)`
   - `Bash(mkdir -p /Users/jtnt/Documents/Projects/*/Meetings/*)`
   - `Bash(cp:*)`

6. **Testing** - Verified all changes work:
   - Status mode with 14-day lookback returns 6 unprocessed meetings
   - Orphans mode correctly identifies "Replit Live Build" recording
   - Python syntax valid, settings JSON valid

7. **Reset for testing** - Cleared processed-meetings.json, Meeting folders, and cos-inbox files to prepare for full v4 testing.

## Key Decisions

- Time validation uses 2-hour window (not user-configurable) for matching accuracy
- Unified meeting view (Issue 6) deferred to separate effort as noted in plan
- Multi-source assets stored in flat structure within meeting folder rather than nested

## Changes Made

Files modified (outside CoS):
- `~/.claude/scripts/meeting-review.py` - Added time validation, orphans mode, days_back parameter
- `~/.claude/commands/meeting-review.md` - Lookback prompt, orphan category, multi-source flow
- `~/.claude/settings.json` - Added meeting write permissions

Files modified (in CoS):
- `cos-inbox.md` - Reset to empty template for testing
- `Meetings/` - Cleared test meeting folders

## Open Items

- Run `/meeting-review` to fully test v4 implementation end-to-end
- After testing, run `~/.claude/scripts/meeting-review-test.sh restore` to restore original state
