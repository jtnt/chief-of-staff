---
date: 2026-02-18 08:49 EST
title: Review Patterns Analysis Overhaul
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief-of-staff/de6a7ef5-4134-422b-a081-50332c918199.jsonl
working_directory: /Users/jtnt/Documents/Projects/chief_of_staff
---

# Chief of Staff: Review Patterns Analysis Overhaul

## What Was Done

Overhauled the `/review-patterns` skill to reduce the cognitive load of reviewing CLAUDE.md suggestions. The session started from a previously written plan to build an HTML playground, then evolved significantly based on user feedback.

**Phase 1 — Initial HTML playground (plan implementation)**
- Rewrote `~/.claude/skills/review-patterns/SKILL.md` to generate an HTML file instead of asking AskUserQuestion one-at-a-time
- Built `playground.html` template: suggestion cards grouped by target CLAUDE.md, Approve/Skip/Dismiss buttons, keyboard nav (`j`/`k`/`a`/`s`/`d`), copy-prompt output at the bottom
- Created `extract.py` Python script to scan all project pattern files and serialize suggestions as JSON for injection into the HTML
- First version populated with 37 suggestions from 27 pattern files across 5 projects (Chief of Staff: 27, CPF: 5, Beekeeper Group: 2, Razzo Clients: 2, SalesIntel: 1)

**Phase 2 — User feedback: "still a wall of text"**
- Added Why/What/Where context layers per card: observations from the session (purple), the suggestion itself (blue), target CLAUDE.md preview (yellow)
- Added session date and log reference on each card
- Still not enough — user felt it wasn't reducing cognitive load, just styling the same text

**Phase 3 — Analysis step added**
- Proposed pre-analyzing each suggestion before generating the HTML
- Launched a subagent to read all 37 suggestions + existing CLAUDE.md files and produce: plain-English summary, approve/skip/dismiss recommendation, reasoning, overlap flags, durability assessment
- First analysis run: 8 approve, 8 skip, 21 dismiss
- Updated HTML template to show recommendation badge + summary + reasoning up front, with raw text collapsed; added "Accept all recommendations" bulk action
- Updated SKILL.md to include analysis as Step 3 in the workflow

**Phase 4 — Criteria refinement (official CLAUDE.md guidance)**
- User asked about whether there's a reference for CLAUDE.md best practices — Claude fetched Anthropic's official documentation
- Official criteria distilled: Does removing this rule cause Claude to make mistakes? Is it specific enough to trigger exact behavior? Can Claude infer it from context? Is it a frequent enough scenario? Is it stable? Does it duplicate existing rules? Does it have the right placement?
- Relaunched analysis against 8 official criteria; result: 5 approve (down from 8), 26 dismiss, 6 skip
- Redesigned HTML from cards to compact table view, grouped into 10 themes (e.g., "Meta-rules about CLAUDE.md itself", "Dashboard UI", "Skill design & routing")
- Each theme has a synthesis sentence and per-theme "Accept recs" button; dismissed suggestions hidden by default; "Dismiss all recommended-dismiss" bulk action clears 26 items in one click

**Final state committed as `070fc41`**: 3 files changed — SKILL.md rewritten, extract.py and playground.html added to `~/.claude/skills/review-patterns/`.

## Key Decisions

- **No playground plugin dependency** — generate HTML directly in the skill rather than depending on the disabled playground plugin
- **Prompt-paste-back interface** — copy prompt from browser → paste to Claude → Claude applies decisions. Avoids file system access from browser, keeps Claude in the loop for actual CLAUDE.md edits
- **Analysis step is critical** — without pre-analysis, the playground just styles raw text; the value comes from Claude's recommendation + reasoning reducing user cognitive load from 37 judgments to ~11
- **Official criteria over intuition** — using Anthropic's documented CLAUDE.md best practices as the evaluation framework produces stricter, more defensible dismissals (26 vs 21)
- **Table + themes over cards** — cards with expand/collapse don't help when there are 37 items; a compact table with thematic grouping lets the user scan at a glance

## Reasoning

- **Why analysis subagent instead of inline**: 37 suggestions × reading CLAUDE.md files + evaluating each would burn the main context window; background agent keeps it isolated
- **Thinking evolution**: Initial implementation solved the wrong problem — reducing clicks/questions doesn't help if you still have to read 37 raw blocks of text. The real load is the judgment call ("is this worth adding?"). Analysis step offloads that.
- **Pattern to remember**: When building review UIs, the cognitive bottleneck is usually evaluation, not navigation. Don't optimize navigation until evaluation is handled.

## Changes Made

All changes are in `~/.claude/skills/review-patterns/` (not tracked in CoS git):

- **[[~/.claude/skills/review-patterns/SKILL.md]]** — Fully rewritten. Now has 6 steps: Find → Extract → Analyze (subagent with 8 official criteria) → Generate HTML → Apply (paste-back) → Summary
- **[[~/.claude/skills/review-patterns/extract.py]]** — New Python script. Scans project-sources.md, reads all session-pattern files, extracts suggestion blocks with observations, dates, target CLAUDE.md contents; outputs structured JSON
- **[[~/.claude/skills/review-patterns/playground.html]]** — New HTML template. Table-based layout, 10 theme groups, analysis-driven recommendation badges, bulk dismiss action, copy-prompt output panel

CoS git commit `070fc41` was made during the session for these files. No changes to CoS repo files themselves.

## Open Items

- **User hasn't actually reviewed the 37 suggestions yet** — the playground was built and opened, session ended before reviewing. Next session: run `/review-patterns` to re-generate with the new skill, then review
- The skill's Step 5 (paste-back and apply) is written but untested — no paste-back happened this session
