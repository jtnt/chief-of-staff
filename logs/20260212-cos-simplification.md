---
date: 2026-02-12 22:06 EST
title: CoS Simplification Implementation
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/4209eca9-8955-4116-a297-ec41fa8ec693.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: CoS Simplification Implementation

## What Was Done

Executed the complete simplification plan for the Chief of Staff system, removing unused features and flattening the task management structure.

**Removed (14 items):**
- 4 skills: `/morning`, `/evening`, `/journal`, `/capture`
- 1 command: `review-checkins`
- 2 hook files: `morning-greeting.sh`, `briefing-template.md`
- 1 hook config: `UserPromptSubmit` entry from settings.json
- Archived 3 check-in folders to `Check-Ins/_archive/`

**Created (1 item):**
- `/todo` skill — adds task checkboxes to any project's `project-knowledge.md`

**Renamed (1 item):**
- `thought/` → `note/` skill — saves to `Notes/`, no project routing, redirects URLs to `/link`

**Simplified (9 files):**
- `cos-session-start.sh` — stripped from ~100 to ~17 lines (PATTERNS_PENDING only)
- `~/.claude/CLAUDE.md` — replaced Task Tracking + CoS Integration sections
- `Chief of Staff/CLAUDE.md` — removed briefing, check-ins, task format specs
- `project-knowledge.md` — flattened tasks from 4 subsections (Inbox/Active/Backlog/Done) to plain checkboxes + `### Done`
- `MEMORY.md` — updated system state
- `settings.json` — removed UserPromptSubmit hook, fixed JSON validity
- Dashboard files (3): `js/app.js`, `index.html`, `project.html` — updated task parsing and quick-add logic to match flat checkbox format

**What remains:**
- Auto-capture (SessionEnd hook)
- `/link`, `/note`, `/todo` skills
- `/review-patterns` and PATTERNS_PENDING
- `/analyze-sessions` command
- Bookmark management commands (5)
- `project-knowledge.md` separate from CLAUDE.md

## Key Decisions

**Flat checkboxes over 4-state workflow** — The Inbox/Active/Backlog/Done triage system was unused. Tasks are now just checkboxes in `## Tasks`, completed items move to `### Done` (last 5 kept, older roll to `completed-tasks.md`).

**Skills replace commands** — Created `/todo` as a skill (not command) since skills are the modern approach.

**Dashboard backward compatibility** — Updated dashboard to expect flat format but kept `parseTaskLine` logic that handles old `**bold**` format for projects that haven't migrated yet.

**Rename not delete** — `/thought` → `/note` preserves the capture behavior but aligns naming with the actual folder (`Notes/`). Project routing removed entirely (that's `/todo`'s job).

## Reasoning

**Why flatten tasks:** The 4-subsection system required triage discipline that never materialized. Natural language parsing (`BRIEFING_REQUIRED`) and morning prompts were designed to enforce it, but those systems were also unused. Flat checkboxes match actual usage — add items, check them off when done.

**Why keep `/analyze-sessions`:** Even though `/insights` exists, it pulls only 50 transcripts. `/analyze-sessions` can search across all projects and custom date ranges. Different use cases.

**Why archive not delete check-ins:** Check-in files contain historical context (daily reflections, journal entries). Moving to `_archive/` preserves them without cluttering active workspace.

**Pattern to remember:** When a system has multiple interdependent features (briefing → morning greeting → task triage → review-checkins), removing it requires touching many files. Made a comprehensive inventory first (11 deleted, 1 created, 1 renamed, 9 modified) to ensure nothing was missed.

## Changes Made

**Git status shows 3 uncommitted dashboard files:**
- `Tools/dashboard/index.html`
- `Tools/dashboard/js/app.js`
- `Tools/dashboard/project.html`

**Full file change inventory:**

**Deleted:**
- `~/.claude/skills/morning/SKILL.md`
- `~/.claude/skills/evening/SKILL.md`
- `~/.claude/skills/journal/SKILL.md`
- `~/.claude/skills/capture/SKILL.md`
- `~/.claude/commands/review-checkins.md`
- `~/.claude/hooks/morning-greeting.sh`
- `~/.claude/hooks/briefing-template.md`

**Moved:**
- `Check-Ins/daily/` → `Check-Ins/_archive/daily/`
- `Check-Ins/weekly/` → `Check-Ins/_archive/weekly/`
- `Check-Ins/journal/` → `Check-Ins/_archive/journal/`
- `Check-Ins/thoughts/` → `Notes/`

**Created:**
- `~/.claude/skills/todo/SKILL.md`

**Renamed:**
- `~/.claude/skills/thought/` → `~/.claude/skills/note/`

**Modified:**
- `~/.claude/settings.json` — removed UserPromptSubmit hook entry, updated Skill permission from `thought` to `note`, fixed JSON validity
- `~/.claude/hooks/cos-session-start.sh` — stripped from ~100 to ~17 lines (PATTERNS_PENDING detection only)
- `~/.claude/CLAUDE.md` — replaced Task Tracking section (lines 77-83) and Chief of Staff Integration section (lines 154-185)
- `Chief of Staff/CLAUDE.md` — removed Strategic Briefing section, updated folder structure, replaced Tasks section (lines 139-175), replaced Check-In System section (lines 177-210)
- `Chief of Staff/project-knowledge.md` — flattened `## Tasks` from 4 subsections to plain checkboxes + `### Done`, updated Current State section, updated Last Updated timestamp
- `~/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/memory/MEMORY.md` — added Task System and Quick Capture sections documenting 2026-02-12 simplification
- `Tools/dashboard/js/app.js` — updated 6 functions: `parseTaskLine`, `addQuickTask`, `buildQuickAddBar`, `loadAllTasks`, `createTaskItemEl`, `triageTask`
- `Tools/dashboard/index.html` — updated `addNewTask` function and quick-add placeholder
- `Tools/dashboard/project.html` — updated `addProjectTask` function and quick-add placeholder

## Open Items

None identified — simplification is complete. Dashboard changes are uncommitted (see git status above) but ready to commit.
