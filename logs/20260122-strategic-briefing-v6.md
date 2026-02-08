---
title: Strategic Briefing V6
---

# Chief of Staff: Strategic Briefing V6

**Date:** 2026-01-22 09:36 AM EST
**Session Type:** meta-work

## What Was Done

Implemented Strategic Morning Briefing v6 - transforming the CoS briefing from a "stats dump" into strategic orientation that surfaces what matters, connects dots, and biases toward high-impact work.

Two changes made:
1. **Simplified hook script** (`~/.claude/hooks/cos-session-start.sh`) - Removed v5 priority tracking additions (P0 counting, client logs, writing cadence, neglected projects). Hook now only provides: meta-work ratio, inbox count, recent CoS log filenames. Claude reads project data directly for better context.

2. **Updated CLAUDE.md briefing section** - New 5-step strategic briefing process:
   - Reads ALL tracked projects from `project-sources.md`
   - Categorizes as 🟢 Active / 🟡 Needs Attention / ⚪ Stable
   - Content & Writing section checks Published, Drafts, and thoughts for suggestions
   - Key principles: surface blockers, connect dots, be specific, suggest (not just report)

Also added explicit instruction to use Glob/Read tools instead of Bash/ls commands to avoid permission prompts during briefing execution.

## Key Decisions

- Moved complexity from hook (bash) to Claude (at runtime) - more flexible and allows context-rich output
- All tracked projects assessed, not just P0 projects - gives full portfolio visibility
- Briefing should suggest, not just report - "Consider finishing that draft" vs "Last writing 7 days ago"

## Changes Made

- `~/.claude/hooks/cos-session-start.sh` - Simplified from 126 to 55 lines
- `CLAUDE.md` - Replaced briefing section with strategic instructions

## Open Items

- Test the new briefing in a fresh session to verify it works without permission prompts
