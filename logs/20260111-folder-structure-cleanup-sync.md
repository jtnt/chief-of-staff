---
title: Folder Structure Cleanup
---

# Chief of Staff: Folder Structure Cleanup

**Date:** January 11, 2026
**Session Type:** meta-work
**Context:** Fixed structural inconsistencies in project tracking folders

---

## The Problem

Project folders under `Projects/` had inconsistent structure:
- **Razzo:** Had subfolders (reference/, session-logs/, strategy/) with one document in session-logs
- **CPF:** Had a duplicate `project-knowledge.md` file that was outdated
- **Standard violated:** Chief of Staff should only track projects via dated sync files, not store their content

## Root Cause

Initial Chief of Staff setup (Jan 9) wasn't clear about the standard. Created Razzo subfolders thinking it would help organize content, but this violated the principle that CoS only tracks, doesn't store.

Later, when running `/update-knowledge` in CPF, it created a knowledge file in the CoS tracking folder instead of just a sync entry.

## What Was Fixed

1. **Converted Razzo session-logs content** to proper sync file:
   - Read `/Projects/Razzo/session-logs/20260109-razzo-sprint-positioning.md`
   - Created `/Projects/Razzo/20260109-sprint-positioning-sync.md` with same insights
   - Deleted session-logs/ folder

2. **Removed duplicate CPF knowledge file:**
   - Verified real project has current project-knowledge.md (updated Jan 10)
   - CoS version was outdated (Jan 9)
   - Deleted CoS copy

3. **Removed empty Razzo subfolders:**
   - Deleted reference/ and strategy/ (were empty)

4. **Updated CLAUDE.md** with explicit standard:
   - Added "Projects Folder Standard" section
   - Clear rule: ONLY dated sync files (YYYYMMDD-*.md)
   - No subfolders, no duplicated files, no stored content
   - Updated folder tree to show standard

## The Standard (Now Documented)

**Each project folder contains ONLY:**
- Dated sync files: `YYYYMMDD-*.md` or `YYYYMMDD-[identifier]-sync.md`
- Flat structure (no subfolders)

**Each sync file documents:**
- Date and context
- What changed
- Current state
- Key insights
- Open items

**Why:** Chief of Staff tracks projects, doesn't store their content. All actual project files live in real project folders.

## Current State

All project folders now follow the standard:
- Razzo: 2 sync files
- CPF: 4 sync files
- Chief of Staff: 15+ sync files
- All other projects: clean

Structure is now consistent and maintainable.
