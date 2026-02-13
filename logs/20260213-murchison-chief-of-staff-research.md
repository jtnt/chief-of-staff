---
date: 2026-02-13 14:32 EST
title: Murchison Chief of Staff Research
type: project-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/4c649c03-3003-4c1e-981c-28e9a9bebf50.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Murchison Chief of Staff Research

## What Was Done

Captured and analyzed Mike Murchison's (CEO of Ada) AI Chief of Staff implementation via his Twitter/X video demonstration and open-source GitHub repository. Created comprehensive research capture with three documents:

1. **Video transcript** — 19-minute walkthrough of his system in action (auto-generated captions, cleaned)
2. **System analysis** — Deep dive into architecture, comparing his approach to our CoS system
3. **Business opportunity** — Service offering synthesis connecting to Razzo Sprint model and CPF

**Key findings:**

Murchison's system processes ~500 background jobs/day with 15+ MCP integrations (143 tools total), covering email triage across 5 channels, calendar management, relationship CRM for 160+ contacts, task execution, goal tracking, morning briefings, and meeting prep. He claims it doubled his productivity (90 min→5 min for daily inbox processing).

The architecture is surprisingly simple: ~10 core files (CLAUDE.md, goals.yaml, my-tasks.yaml, schedules.yaml, 4 command files, contact profiles) plus cron scheduling. No code, no database, no web app. The entire system is markdown + YAML + MCP + Claude's context window.

**Transferability insight:** User noted the simplicity makes this a viable service business — helping executives set up similar systems. This maps almost perfectly to Razzo Sprint model (2-week engagement, build working system, ongoing tuning retainer).

## Key Decisions

- **Created three separate files** (transcript, analysis, business-opportunity) instead of one consolidated document — allows different access patterns (reference transcript vs. strategic synthesis)
- **Cloned GitHub repo** to `/tmp/` for deep analysis rather than surface-level reading
- **Added task to project-knowledge.md** to evaluate specific patterns for adoption rather than implementing immediately

## Reasoning

**Why deep analysis over quick capture:** This isn't just "interesting article" — it's a reference implementation of a system architecturally similar to ours but with different design choices. Understanding the differences reveals our own implicit assumptions.

**Key architectural insights:**
- His system is simpler (10 files vs our 30+) but more functionally complete for daily operations
- Breadth-first integration (connect everything, process everything) vs our depth-first knowledge management (capture sessions, extract patterns)
- Background processes via cron + slash commands (no hooks, skills, or framework) vs our hook-based auto-capture pipeline
- CLAUDE.md as sole abstraction (~500 lines, one file + sub-files) vs our multi-layered system (skills, commands, hooks, dashboard)

**Business model pattern:** The "moat is in the CLAUDE.md, not the code" observation is the CPF thesis applied to productivity tooling. Context is the bottleneck. Setup guidance + CLAUDE.md crafting is exactly what CPF does for knowledge work. This could be a concrete implementation channel for CPF methodology.

**Pricing math:** 85 min/day recaptured × 250 days = 354 hrs/year. At CEO equivalent of $500/hr = $177K+ value. A $5K-$10K setup engagement pays for itself in first week. Retainer for ongoing tuning writes itself.

## Changes Made

**Verified against git:**

```bash
git status --short
```

**Files created:**
- [[research/20260213_ai-chief-of-staff-claude-code-mike-murchison/transcript.md]] — Full 19-min video transcript (cleaned from auto-captions)
- [[research/20260213_ai-chief-of-staff-claude-code-mike-murchison/analysis.md]] — System architecture comparison, feature analysis
- [[research/20260213_ai-chief-of-staff-claude-code-mike-murchison/business-opportunity.md]] — Service business synthesis, Razzo Sprint fit, CPF connection

**Files modified:**
- [[research/INDEX.md]] — Added two new entries for analysis and business-opportunity files
- [[project-knowledge.md]] — Added task to evaluate patterns for adoption, updated last modified date

**Files read for context:**
- Murchison's GitHub repo files: CLAUDE.md, all command files (gm, triage, my-tasks, enrich), goals.yaml, schedules.yaml, install.sh, setup docs, customization guide
- Our CoS files: project-knowledge.md, research/INDEX.md
- External: `/tmp/yt-transcript.en.vtt` (YouTube auto-captions), cleaned transcript

## Open Items

**From project-knowledge.md task added:**
- Evaluate Murchison patterns for adoption: morning briefing, inbox triage with acceptance rate tracking, contact/relationship management, multiplayer to-do list, goal-aligned filtering, CLAUDE.md sub-files

**Research follow-ups (not yet tasked):**
- Test his install.sh to understand setup friction points
- Map our existing MCP integrations against his 15+ servers to identify gaps
- Prototype acceptance rate tracking for our system
- Draft Razzo Sprint engagement structure for "AI Chief of Staff Setup" service offering
