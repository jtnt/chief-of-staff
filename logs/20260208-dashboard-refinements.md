---
date: 2026-02-08 11:07 AM EST
title: Dashboard Refinements
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/4ee17251-71e3-43f2-a39f-dfee9c564095.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Dashboard Refinements

## What Was Done

Implemented a pre-approved 5-step plan to restructure the CoS dashboard, then refined based on user feedback. The final result makes the home page a true cross-project command center and each project page a mini-dashboard.

### Initial Implementation (Commit 0674ab42)

**Home page transformation:**
- Replaced CoS-only inbox with cross-project task aggregation via new `loadAllTasks()` function
- Tasks grouped by priority tier (Active, Inbox, Backlog) with lightweight sub-headers
- Project pills on each task showing which project it belongs to
- Total pending count stat reflects all projects (not just CoS)

**Project page restructure:**
- Added stats row (pending tasks, total logs, last active date)
- Two-column grid layout: Tasks (left) + Recent Activity cards (right, top 10 logs)
- Project Knowledge, Session Patterns, and All Session Logs sections default-collapsed for cleaner initial view
- New `renderProjectActivityColumn()` renders logs in activity-item format (date, title, preview, resume buttons)

**Technical details:**
- `loadAllTasks()` reads all `project-knowledge.md` files in parallel via `Promise.all()`
- Collects unchecked items with metadata: `{item, filePath, projectName, projectSlug, sectionName, priority}`
- Priority ordering: Active/Tasks = 1, Inbox = 2, Backlog = 3 (Done skipped)
- Modified `createTaskItemEl()` signature to accept optional 4th param `projectName` for backward-compatible pill support
- Quick-add input on home page scoped to CoS Inbox
- Checkbox toggles write back to each task's own project file

### User Feedback Round

User identified three issues with the initial implementation:

1. **Home page overwhelming** — Flat task list with priority tier labels and individual project pills was hard to scan
2. **Project pills misaligned** — Pills appeared on second line (meta row with date/tags), not aligned with task title
3. **Stats row noise** — Pending tasks, active projects, recent sessions stats were informational noise with no actionable value

### Refinements (Uncommitted)

**Home page restructure:**
- Replaced flat priority-tier groups with **per-project collapsible sections**
- Each project gets a collapsible header with chevron, project name, and task count badge
- Removed individual project pills (grouping replaces them)
- Tasks within each project still sorted by priority (Active → Inbox → Backlog)
- Increased `loadAllTasks` limit from 20 to 50 (grouping makes room for more tasks)
- Fixed project name centering issue (`.section-header` had `justify-content: space-between` spreading elements apart; added `justify-content: flex-start` to override)

**Stats removal:**
- Removed stats row from both home page and project page
- Removed `updateStats()` function and all call sites
- Cleaner, more actionable interface focused on tasks and activity

**CSS updates:**
- Replaced `.task-group-label` (priority tier headers) with `.project-group-header` (collapsible project sections)
- Added chevron rotation for collapsed state
- Reused existing `.collapsible-section` pattern

## Key Decisions

**Per-project grouping over priority tiers** — User found the flat priority-tier list overwhelming. Grouping by project with collapsible sections makes it much easier to scan and focus on specific projects. The priority ordering still works within each project group.

**Remove stats row** — User correctly identified that the stats were informational noise. Tasks and activity are actionable; counts are not.

**Project page two-column layout retained** — The project page grid (tasks left, activity right) was not mentioned in feedback, suggesting it works well. Kept as-is.

## Reasoning

**Why project grouping over pills:** Individual project pills on every task created visual noise and required scanning each line to find a specific project's tasks. Collapsible sections group related items together naturally — you expand the projects you care about and collapse the rest. The Map insertion order preserves priority sorting within each group, so you still see active tasks before inbox/backlog.

**Why remove stats instead of making them actionable:** Stats like "5 pending tasks" don't tell you what to do next. The task list itself is actionable — you can check items, click to view details, expand projects. Adding click actions to stats would just duplicate existing functionality (e.g., clicking "5 pending" to filter tasks when the task list is right there).

**Pattern to remember:** When UI feels overwhelming, group and collapse. Flat lists with inline metadata (pills, labels) don't scale well. Hierarchical sections with expand/collapse give users control over information density.

## Changes Made

**Files modified (committed in 0674ab42):**
- [[Tools/dashboard/js/app.js]] — Added `loadAllTasks()` function, modified `createTaskItemEl()` signature
- [[Tools/dashboard/index.html]] — Rewrote left column to call `loadCrossProjectTasks()`
- [[Tools/dashboard/project.html]] — Added stats row, two-column grid, activity column
- [[Tools/dashboard/css/style.css]] — Added `.project-grid`, `.task-group-label`, pill spacing

**Files modified (uncommitted refinements):**
- [[Tools/dashboard/index.html]] — Replaced priority tier groups with per-project collapsible sections, removed stats row
- [[Tools/dashboard/project.html]] — Removed stats row
- [[Tools/dashboard/css/style.css]] — Replaced `.task-group-label` with `.project-group-header`, removed stats CSS
- `project-knowledge.md` — Updated (likely via manual edits during testing)

## Open Items

None identified. The dashboard refinements are complete and uncommitted changes are ready to commit when user chooses.
