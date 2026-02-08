---
title: Humanizer Integration
---

# Chief of Staff: Humanizer Integration

**Date:** 2026-01-21 05:41 PM EST
**Session Type:** meta-work

## What Was Done

Integrated humanizer patterns into the writing system so they inform writing inline (not just as a post-process cleanup):

1. **Replaced `dont-sound-like-ai.md`** with enhanced version (404 lines, up from 147):
   - Added "Personality and Soul" section at the top - the key insight that avoiding AI patterns is only half the job
   - Merged all 24 patterns from the blader/humanizer repository (based on Wikipedia's AI Cleanup guide)
   - Preserved unique patterns from original (LinkedIn-bro phrases, Mirror Questions, Friendly Hedger)
   - Added Quick Reference section with 5 self-check questions

2. **Updated global CLAUDE.md writing section**:
   - Added "The soul principle (most important)" as a new subsection
   - Five key points: have opinions, vary rhythm, acknowledge complexity, use "I", be specific about feelings
   - Updated file description to mention "24 AI patterns + how to add personality"
   - Added reference to `/humanize` command for explicit cleanup

3. **Created `/humanize` command** (`~/.claude/commands/humanize.md`):
   - Full standalone command for explicit post-draft cleanup
   - Can take a file path or work on pasted text
   - Includes all 24 patterns + soul guidance + process + example

## Key Decisions

- **Replace vs add**: Replaced `dont-sound-like-ai.md` entirely rather than adding a separate file - the humanizer content is a superset, and having one source of truth is cleaner
- **Soul principle placement**: Put it prominently in CLAUDE.md so it's applied inline during writing, not just remembered for cleanup
- **Source attribution**: Added blader/humanizer GitHub repo as primary source, with Wikipedia reference

## Changes Made

Files modified (not in git repos):
- `/Users/jtnt/Documents/Projects/[[Writing/Standards/dont-sound-like-ai.md]]` - replaced with enhanced content
- `/Users/jtnt/.claude/CLAUDE.md` - updated writing section (lines 246-276)
- `/Users/jtnt/.claude/commands/humanize.md` - new file

## Open Items

None - implementation complete per plan.
