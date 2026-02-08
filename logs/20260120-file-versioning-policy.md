---
title: File Versioning Policy
---

# Chief of Staff: File Versioning Policy

**Date:** 2026-01-20 05:07 PM EST
**Session Type:** meta-work

## What Was Done

1. **Added File Editing Policy to global CLAUDE.md** - New section specifying that when revising markdown files, Claude should create new versions with version numbers (e.g., `document-v2.md`) rather than editing in place. Edit-in-place only when explicitly instructed.

2. **Fixed /save permission prompts** - Added Edit permissions to global `settings.json` for Chief of Staff files (`project-index.md`, `project-sources.md`, `project-knowledge.md`) and Write permission for [[logs/**]]. This allows `/save` from other projects to update CoS without prompting for permission.

## Key Decisions

- **Version files, don't overwrite** - User preference to preserve original files when making revisions to markdown documents. Creates clear revision history.
- **Global permissions for CoS files** - The `allowedTools` frontmatter in commands doesn't grant permissions; actual permissions must be in `settings.json`.

## Changes Made

- `~/.claude/CLAUDE.md` - Added "File Editing Policy" section (lines 172-188)
- `~/.claude/settings.json` - Added 4 new permission entries for Edit/Write to CoS files

## Open Items

None identified.
