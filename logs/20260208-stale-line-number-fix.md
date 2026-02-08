---
date: 2026-02-08 12:32 EST
title: Stale Line Number Bug Fix
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/124303a7-a1da-4b61-ab8f-b8fe6a026e97.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Stale Line Number Bug Fix

## What Was Done

Investigated and fixed a data integrity bug in the dashboard task management system. The user raised a concern about three interfaces (Claude Code, Obsidian, dashboard) all editing the same `project-knowledge.md` files and whether they could corrupt each other.

Analysis revealed:
- **All three interfaces share the same source files on disk** — no separate database to sync
- **Claude Code and Obsidian are safe by design** — Claude uses string matching (fails safely if text changed), Obsidian watches filesystem and auto-reloads
- **Dashboard had a critical bug** — it cached line numbers when parsing tasks, then used those stale numbers when writing changes

**The bug:** If you loaded the dashboard, then added/removed lines in Obsidian or Claude Code, the dashboard's cached line numbers became stale. When you clicked a checkbox or triaged a task, the dashboard would read the file fresh (good) but jump to the **old line number** (bad), potentially modifying the **wrong task**.

**The fix:** Added content validation to all dashboard write operations (`toggleInboxCheckbox()`, `triageTask()`, and their call sites in `createTaskItemEl()`). Now before modifying, they compare the cached line content against what's actually at that line number. If they don't match (lines shifted), the code falls back to searching by content. If the task was deleted externally, it fails safely with a console error instead of corrupting data.

Files modified:
- [[Tools/dashboard/js/app.js]] — 5 changes across write validation and call sites

## Key Decisions

**Added content validation before writes** — All dashboard write operations now validate that the line they're about to modify matches what they expect. This prevents wrong-task modifications when external editors shift line numbers.

**Fail-safe fallback** — If validation fails, search by content. If content search also fails (task deleted externally), fail with error instead of silently corrupting data.

## Reasoning

- **Why content validation over re-parsing:** Re-parsing the entire file on every click would work but is expensive. Content validation gives the safety we need (prevents wrong-task bug) with minimal performance cost — fast path uses cached line number, fallback only activates when needed.

- **Why fail safely instead of auto-reloading:** When a task can't be found, it likely means it was deleted or significantly edited elsewhere. Silently doing nothing or auto-reloading would be confusing. Logging an error and showing the "Failed to save" alert tells the user something went wrong and to refresh.

- **Pattern to remember:** When caching structural information (line numbers, indexes) about files that can be edited externally, always validate before using. The cost of validation is trivial compared to the cost of data corruption.

## Changes Made

**Git status verification:**
```bash
git status --short
# M  Tools/dashboard/js/app.js

git log --oneline --since="2 hours ago" --name-only
# 30880bb7 Fix stale line number bug in dashboard task writes
# Tools/dashboard/js/app.js
```

**Modified files:**
- [[Tools/dashboard/js/app.js]] (1 file, 5 logical changes):
  - `toggleInboxCheckbox()` — Added `expectedLine` parameter and validation logic with content-search fallback
  - `handleCheckboxToggle()` — Pass `expectedLine` through
  - `createTaskItemEl()` main task checkbox — Pass `item.rawLine` to handler
  - `createTaskItemEl()` subtask checkbox — Pass `st.rawLine` to handler
  - `triageTask()` — Added same validation pattern

**Files read for investigation:**
- [[Tools/dashboard/index.html]] — To understand checkbox binding
- [[Tools/dashboard/project.html]] — To check for duplicate checkbox handlers
- [[Tools/dashboard/js/app.js]] — To trace all write operations

## Open Items

None identified. The fix is complete and committed.
