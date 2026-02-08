---
date: 2026-02-04 03:44 PM PST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/a4629f60-bf05-4d18-8e92-26b92d6bfc9f.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
plan_file: /Users/jtnt/.claude/plans/declarative-juggling-stearns.md
title: Meeting Review Elegant Rewrite
---

# Chief of Staff: Meeting Review Elegant Rewrite

## What Was Done

**Elegant rewrite of the meeting review system.** Previous session had built an overengineered 866-line system with 4 known bugs. User requested to "scrap this and implement the elegant solution." Achieved 64% reduction in instructions (866 → 314 lines) while maintaining quality.

### Phase 1: Investigation and Planning
- Read existing system: `meeting-review-v2.py` (393 lines, working), `meeting-processor.md` (471 lines), `skill.md` (395 lines)
- Entered plan mode, wrote concise 88-line plan vs previous 885-line plan
- Plan approved immediately

### Phase 2: Implementation
- Rewrote `~/.claude/skills/meeting-review/skill.md` from 395 → 134 lines
- Rewrote `~/.claude/agents/meeting-processor.md` from 471 → 180 lines
- Kept `meeting-review-v2.py` unchanged (already working from previous session)
- Key changes: multi-select meetings, linear workflow, YYYYMMDD-slug file naming

### Phase 3: End-to-End Test
- User ran `/meeting-review`, selected 2 Granola meetings (Apollo Sales, Let's Talk AI)
- Both assigned to Beekeeper Group project
- Launched both meeting-processor agents in parallel
- **3 bugs found:**
  1. File naming - agents used generic names (summary.md) instead of YYYYMMDD-slug prefix
  2. Wrong project path - meeting 2 written to `/Projects/Beekeeper Group/` instead of `/Projects/Clients/Beekeeper Group/`
  3. Slug trailing hyphen - `apollo-sales-30-minutes-ae-alex-dickson-` ends with `-`

### Phase 4: Bug Fixes
- Updated `meeting-processor.md` with bold **CRITICAL RULES** at top emphasizing project_path and YYYYMMDD-slug naming
- Added PREFIX/FOLDER variable pattern to agent instructions
- Fixed slug generation to strip trailing hyphens after truncating to 40 chars
- Manually moved misplaced meeting 2 files to correct location
- Removed misplaced cos-inbox.md

### Phase 5: Validation Run (End of Session)
- User ran skill again successfully
- Requested filename clarification for main summary file
- Asked for validation that extraction script captures all relevant content

**Meeting summaries produced:** Both test meetings (Apollo Sales, Let's Talk AI) generated excellent-quality summaries with proper discussion points, decisions, and action items.

## Key Decisions

**Simplification over specification:** Decided to trust the model with clear inputs/outputs/templates rather than writing verbose procedural instructions. Root cause of original system hanging was 866 lines of instructions causing confusion.

**Strengthen agent rules vs pre-compute paths:** When agent ignored file naming conventions during testing, chose to strengthen agent instructions with bold CRITICAL RULES rather than pre-computing all file paths in the skill. Keeps the architecture simpler.

**Parallel agent processing:** Confirmed that launching multiple meeting-processor agents simultaneously works correctly and saves time.

**File naming convention:** YYYYMMDD-slug pattern for all files in meeting folders, with `PREFIX-type.md` suffix (e.g., `20260204-design-review-transcript-granola.md`).

## Reasoning

**Why simplification worked:** The original verbose instructions (Step 1, Step 2, substep 2a, etc.) were causing the model to get confused and hang. By reducing to clear input/output contracts and trusting the model, achieved both better reliability and 64% size reduction.

**Why CRITICAL RULES in bold:** The agent ignored file naming conventions in testing despite them being in the instructions. Adding bold "CRITICAL RULES" section at the very top with explicit "do not deviate" language increases salience and should improve compliance.

**Why keep Python script unchanged:** The meeting-review-v2.py script from the previous session already handles the new Granola cache format (double-encoded JSON, TipTap conversion) correctly. No need to rewrite working code.

**Pattern to remember:** When debugging agent instruction-following issues, strengthen the rules first (salience, placement, explicitness) before resorting to pre-computation or architectural changes. The model CAN follow rules when they're clear enough.

## Plan (Claude Code)

**Plan file:** `/Users/jtnt/.claude/plans/declarative-juggling-stearns.md`

The plan captured the elegant rewrite approach in 88 lines (vs 885 in previous version):

# Meeting Review Rebuild - Elegant Solution

**Goal:** Rebuild meeting-review from scratch with minimal, clear instructions. Trust the model.

## Core Insight from Previous Session

The original system had:
- 866 lines of procedural instructions across 3 files
- Complex nested workflows causing hanging
- 4 known bugs from over-specification

**Root cause:** Too many instructions. The model got confused.

**Solution:** Minimal instructions. Clear inputs, clear outputs, clear templates. Trust the model.

## What Already Works (Keep)

- `~/.claude/scripts/meeting-review-v2.py` (393 lines) - Parses new Granola cache format, TipTap conversion, two modes (recent-list, extract). **Tested and working.**

## What Needs Rewriting

### Skill: `~/.claude/skills/meeting-review/skill.md`
Current: 395 lines of procedural steps
New: ~100 lines

**Workflow:**
1. List recent Granola recordings (run Python script)
2. Let user multi-select meetings OR choose manual processing
3. For each meeting:
   - Ask for additional materials (Google Meet exports, notes, images)
   - Extract Granola data if applicable
   - Determine metadata (title, date, type, project)
   - Generate slug
   - Build materials JSON
   - Launch meeting-processor agent
   - Update processed-meetings.json
4. Report results

### Agent: `~/.claude/agents/meeting-processor.md`
Current: 471 lines of procedural steps
New: ~150 lines

**Contract:**
- Input: JSON with project, date, title, type, slug, materials, calendar_event
- Output: JSON with success, summary_path, follow_ups
- Actions: Create folder, save materials, generate summary, extract follow-ups, route to inbox

**Template formats:**
- Meeting summary template (preserved from original - good quality)
- Webinar summary template
- Follow-up routing format

## File Naming Convention

All files in meeting folders use YYYYMMDD-slug prefix:
- Folder: `[Project]/Meetings/YYYYMMDD-slug/`
- Summary: `YYYYMMDD-slug.md`
- Transcripts: `YYYYMMDD-slug-transcript-granola.md`, `YYYYMMDD-slug-transcript-google-meet.md`
- Notes: `YYYYMMDD-slug-notes-granola-ai.md`, `YYYYMMDD-slug-notes.md`
- Assets: `assets/[original-filename]`

## Implementation Order

1. Rewrite skill (orchestration)
2. Rewrite agent (processing)
3. Test end-to-end with 2-3 meetings
4. Validate quality vs original system

## Success Criteria

- System processes meetings without hanging
- Multi-select works
- File naming follows YYYYMMDD-slug pattern
- Summary quality matches original
- Total instructions < 400 lines (vs 866)

## Changes Made

**Files modified:**
- `~/.claude/skills/meeting-review/skill.md` - Complete rewrite (395 → 134 lines)
- `~/.claude/agents/meeting-processor.md` - Complete rewrite (471 → 180 lines, updated twice for bug fixes)
- `~/.claude/plans/declarative-juggling-stearns.md` - New 88-line plan

**Files unchanged:**
- `~/.claude/scripts/meeting-review-v2.py` - Already working correctly (393 lines)
- `~/.claude/data/processed-meetings.json` - Data tracking file

**Meeting folders created during testing:**
- `/Users/jtnt/Documents/Projects/Clients/Beekeeper Group/Meetings/20260204-apollo-sales-30-minutes-ae-alex-dickson-/` (initially with generic file names)
- `/Users/jtnt/Documents/Projects/Clients/Beekeeper Group/Meetings/20260203-lets-talk-ai-meeting/` (validated at end of session)

**Key files examined:**
- `~/.claude/skills/meeting-review/skill.md` (read to understand workflow)
- `~/.claude/agents/meeting-processor.md` (read to understand agent contract)
- `/Users/jtnt/Documents/Projects/Chief of Staff/project-sources.md` (to verify Beekeeper Group path)
- Meeting summaries produced during testing (to validate quality)

## Open Items

**Validate file naming fix:** The CRITICAL RULES added to meeting-processor.md haven't been fully validated yet. The end-of-session test may have confirmed this, but needs explicit verification that agents now use `YYYYMMDD-slug-type.md` naming consistently.

**Update processed-meetings.json:** The two meetings processed during testing (Apollo Sales, Let's Talk AI) should be added to `~/.claude/data/processed-meetings.json` to prevent reprocessing.

**Clarify main summary filename:** User noted that `20260203-lets-talk-ai-meeting.md` (the main summary file) needs a clearer name that indicates it's the canonical meeting notes. Consider: `20260203-lets-talk-ai-meeting-summary.md` or `20260203-lets-talk-ai-meeting-notes.md`.

**Verify extraction completeness:** User wants confirmation that the extraction script captures all relevant content from Granola and doesn't leave anything important out. Should review a processed meeting folder to validate completeness.
