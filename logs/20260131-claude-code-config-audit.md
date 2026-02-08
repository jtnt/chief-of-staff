---
date: 2026-01-31 08:16 PM EST
type: meta-work
title: Claude Code Config Audit
---

# Chief of Staff: Claude Code Config Audit

## What Was Done

Comprehensive audit of all Claude Code configuration (skills, commands, hooks, agents, plugins) and creation of a Notion database to catalog and analyze everything.

**Audit:** Inventoried 40 items across 5 categories:
- 7 skills, 20 commands, 6 hooks, 4 agents, 3 plugins

**Notion database created:** "Claude Code Configuration Audit" with properties for Type, Status, Category, Model, Recommendation, and detailed page content for each item.

**Streamlining analysis page created:** "Claude Code Streamlining Analysis & Roadmap" with 5 big moves to reduce 40 items to 29 (28% reduction):
1. Delete dead code (save-sync-agent)
2. Unify check-ins (morning+evening+thought+journal → /checkin)
3. Unify link imports (4 import commands → /import-links)
4. Unify analysis (analyze-sessions+review-checkins → /analyze)
5. Unify audio (podcast-extract+transcribe → /extract-insights)

**Move 1 completed:** Backed up save-sync-agent.md to .bak (confirmed no references anywhere).

**Move 5 started:** Explored existing podcast automation (launchd + fswatch + podcast_auto_process.py). Discovered automation's insight extraction has been broken (Claude CLI path wrong in podcast_auto_process.py). Designed /extract-insights skill to handle 3 input paths: audio files, existing transcripts, and transcribe-only mode. User chose `/extract-insights` as the name over `/podcast` since it handles podcasts, interviews, webinars, and YouTube videos. Plan written but not yet approved.

## Key Decisions

- **/log and /save kept:** User wants to retain these as manual mid-session options rather than deleting them. Changed recommendation from "Remove" to "Convert to Skill."
- **Skill named /extract-insights:** User rejected /podcast as too specific. The skill handles any audio/transcript content type.
- **Automation left alone:** The broken folder watcher (podcast_auto_process.py looking for Claude CLI at wrong path) is a separate concern from the skill work.

## Reasoning

- **Why audit everything first:** Building the full inventory before making changes prevents accidentally breaking dependencies. The Notion database makes it easy to filter/sort by recommendation type and work through changes systematically.
- **Why merge vs just convert:** Several commands share identical pipelines (all link imports use Haiku batch processing, all check-ins output to Check-Ins/). Merging reduces both user cognitive load ("which command?") and maintenance burden.
- **Model cost opportunity:** Commands don't specify models, defaulting to Opus. Most could run on Sonnet or Haiku. Converting to skills forces explicit model selection.

## Changes Made

- Backed up: `~/.claude/agents/save-sync-agent.md` → `.bak`
- Created: Notion database "Claude Code Configuration Audit" (40 pages)
- Created: Notion page "Claude Code Streamlining Analysis & Roadmap"
- Created: Plan file at `~/.claude/plans/quizzical-dazzling-starfish.md` (pending approval)

## Open Items

- Approve and implement /extract-insights skill plan (Move 5)
- Moves 2-4 still pending (check-ins, link imports, analysis)
- 8 straight command-to-skill conversions queued
- Broken podcast automation (wrong Claude CLI path) noted but not addressed
