---
title: Meeting Review
---

# Chief of Staff: Meeting Review

**Date:** 2026-01-22 04:00 PM EST
**Session Type:** project-work

## What Was Done

Processed 2 webinar recordings from the past 7 days using the /meeting-review workflow:

1. **"Building AI Champions in 2026"** (Jan 15) - Section webinar with Manulife's Oya
   - Saved to: Razzo/Meetings/20260115-building-ai-champions-2026/
   - Extracted transcript (53 min, 76 segments)
   - Generated summary with key takeaways on champions network design
   - Routed to Razzo project (AI training/enablement relevance)

2. **"The Level 5 SKO with Marcus Sheridan and QFG"** (Jan 21) - Sales training webinar
   - Saved to: Chief of Staff/Meetings/20260121-level-5-sko-marcus-sheridan/
   - Extracted transcript (85 min, 364 segments)
   - Generated summary covering The Honest Agreement and Pushback Pivot techniques
   - Routed to Chief of Staff (general sales/communication training)
   - Extracted 2 follow-up items (self-awareness exercises, practice techniques)

Both meetings auto-matched with Granola transcripts via Python script. Updated processed-meetings.json tracking index with metadata for future reference.

## Key Decisions

- Classified both meetings as "webinar" type (solo attendance, educational content)
- Routed meeting 1 to Razzo (AI champions model directly relevant to enterprise training approach)
- Routed meeting 2 to Chief of Staff (general professional development, not project-specific)
- Did not create inbox entries for follow-ups (personal learning items, kept in summaries)

## Changes Made

**Files created:**
- Razzo/Meetings/20260115-building-ai-champions-2026/transcript.md
- Razzo/Meetings/20260115-building-ai-champions-2026/summary.md
- Chief of Staff/Meetings/20260121-level-5-sko-marcus-sheridan/transcript.md
- Chief of Staff/Meetings/20260121-level-5-sko-marcus-sheridan/summary.md

**Files updated:**
- /Users/jtnt/.claude/data/processed-meetings.json (added 2 meeting entries to tracking index)

**Files deleted (old location format):**
- Meetings/2026/01/20260121-level-5-sko-marcus-sheridan.md
- Meetings/2026/01/20260121-nicholas-ken-intro.md

Git status shows migration to new project-centric storage structure working correctly.

## Open Items

- 4 additional meetings from past 7 days remain unprocessed:
  1. Maven LIVE: How to use AI for Account Executives (Jan 15)
  2. More Vang / Mythos AI Training - Day 4 (Jan 15)
  3. Nicholas + Nadeen (Jan 19)
  4. Nicholas & Ken - intro + trade war stories (Jan 21)

User can run /meeting-review again to process remaining meetings when ready.
