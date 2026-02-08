---
date: 2026-02-07 10:30 AM EST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/6483422e-0f11-4691-813d-9f25cd3b4753.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: CLAUDE.md Optimization
---

# Chief of Staff: CLAUDE.md Optimization

## What Was Done

Implemented the CLAUDE.md optimization plan to reduce context window usage by removing redundant content that Claude can figure out on its own. Applied the principle: only include what Claude can't discover by reading the codebase.

**Global CLAUDE.md** (`~/.claude/CLAUDE.md`): 208 → 189 lines (-19)
- Removed "Session Context Loading" section (meta-instruction about following instructions)
- Removed "Auto-Capture System (SessionEnd)" section (describes automated hook behavior)

**Project CLAUDE.md** (`Chief of Staff/CLAUDE.md`): 257 → 166 lines (-91)
- Removed "Document Types You May Receive" (Claude knows what summaries/transcripts are)
- Trimmed "Resources Folder" (removed description bullets, kept behavioral rules)
- Trimmed "Tasks Folder" (removed description bullets, kept behavioral rules)
- Removed example folder trees from "Where Logs Live" section
- Removed "Auto-Capture System" section (redundant with global)
- Replaced "Syncing Chief of Staff Itself" with one-liner noting CoS sync skip
- Removed "Current Projects" list (kept pointer to `project-sources.md`)

**Total savings:** 110 lines across both files.

Backups created at `.bak` for both files before editing.

## Key Decisions

No major decisions — purely mechanical implementation of an already-approved plan.

## Reasoning

Routine session - no notable reasoning to capture.

## Changes Made

```bash
# Uncommitted changes
?? CLAUDE.md.bak

# Recent commits (within 2 hours)
8d6d2f64 Trim CLAUDE.md: remove redundant descriptions, keep behavioral rules
  - CLAUDE.md
```

**Files modified:**
- `~/.claude/CLAUDE.md` - Removed 2 sections (19 lines)
- `Chief of Staff/CLAUDE.md` - 7 edits removing redundant descriptions (91 lines)
- Created `.bak` backups for both files

**Git commits:**
- Chief of Staff: `8d6d2f64` committed and pushed
- Global CLAUDE.md: committed and pushed to `~/.claude` repo

## Open Items

- `.bak` backup files can be removed after confirming edits work as expected
- 5 pattern files still have CLAUDE.md suggestions pending review (`/review-patterns`)
