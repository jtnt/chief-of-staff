---
title: Synthesis Prompt Improvement
---

# Chief of Staff: Synthesis Prompt Improvement

**Date:** 2026-01-25 06:53 AM EST
**Session Type:** meta-work (continuation from overnight session)

## Context

This is the tail end of a multi-hour overnight session that started with fixing the auto-capture duplicate check and evolved into a fundamental rethinking of how session logs should capture context.

## What Was Done

Improved the auto-capture synthesis prompt to read OTHER transcripts from the same day, not just the current session. The key insight came from the user pointing out what we did manually in this very session:

1. Read one transcript, wrote incomplete summary (65 lines)
2. User: "We went back and forth a million times...You captured none of that"
3. User pointed out missing Gastown reference
4. I searched other transcripts, found missing context
5. User: "JFC. look at what we did in this very session to get the proper and complete log file. do that in this script"

The script now:
- Finds other today's transcripts (>10KB to skip trivial sessions)
- Extracts user messages from each (up to 10KB per transcript)
- Includes all content in the synthesis prompt (capped at 30KB)
- Tells the model to use it to connect dots across sessions

## Key User Feedback (Verbatim)

On the incomplete log:
- "Really? We've worked for hours on this and you summed all of that up in 65 lines of Markdown?"
- "We went back and forth a million times about the right way to structure a chief of staff system and you did a bunch of research. You captured none of that."
- "How could you not mention something about Gastown?"

On the synthesis approach:
- "JFC. What did we learn from this very session?! You looked at just one transcript and wrote a summary. that wasn't enough."
- "JFC. look at what we did in this very session to get the proper and complete log file. do that in this script"

On scope:
- "three days!" (when I suggested 3 days of context - changed to today only)

## Changes Made

`~/.claude/scripts/capture-session.sh`:
- Added code to find and read other today's transcripts
- Updated synthesis prompt to include other session content
- Prompt now instructs model to find connections across sessions

## Open Items

1. **Test the updated synthesis** - Need to verify it produces better connected logs
2. **Fundamental architecture question remains**: API-based synthesis costs money per call. User identified this but we proceeded with prompt improvements. May want to revisit whether to use API synthesis at all vs. minimal metadata capture.

## Files Referenced

- `~/.claude/scripts/capture-session.sh` (modified)
- `/Users/jtnt/Documents/Projects/Chief of Staff/[[logs/20260124-cos-system-design-and-implementation.md]]` (610-line comprehensive log from overnight session)
- `/Users/jtnt/Documents/Projects/Chief of Staff/[[logs/20260124-auto-capture-fixes-session.md]]`

---
*This session is a continuation of the overnight work. Main log is at `20260124-cos-system-design-and-implementation.md`*
