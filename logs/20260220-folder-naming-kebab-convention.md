---
date: 2026-02-20 16:28 EST
title: Folder Naming Kebab Convention
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects/9decc5bf-de10-4915-91e4-94a47b9600ae.jsonl
working_directory: /Users/jtnt/Documents/Projects
---

# Projects: Folder Naming Kebab Convention

## What Was Done

Renamed three project folders from underscore to kebab-case convention and updated all references system-wide.

**Directories renamed:**
1. `chief_of_staff/` → `chief-of-staff/`
2. `context_profile_framework/` → `context-profile-framework/`
3. `job_search/` → `job-search/`

Also renamed corresponding `.claude/projects/` session dirs (the macOS title-case dirs `Chief-of-Staff/` and `Context-Profile-Framework/` already existed on the case-insensitive filesystem, so those resolved to the existing dirs — session history was preserved intact). One minor cleanup was needed: the `mv` commands created nested subdirectories inside the existing title-case dirs (`Chief-of-Staff/chief_of_staff/`), which were removed after confirming the nested memory dirs were outdated duplicates.

**References updated across all active files:**
- [[/Users/jtnt/Documents/Projects/CLAUDE.md]] — project directory table
- [[/Users/jtnt/Documents/Projects/chief-of-staff/CLAUDE.md]] — path references
- [[/Users/jtnt/Documents/Projects/chief-of-staff/project-sources.md]] — Source paths for all three projects
- [[/Users/jtnt/Documents/Projects/chief-of-staff/project-index.md]] — Source paths for all three projects
- [[/Users/jtnt/Documents/Projects/chief-of-staff/project-knowledge.md]] — any path references
- [[/Users/jtnt/.claude/hooks/allow-cos-edit.sh]] — chief-of-staff path
- [[/Users/jtnt/.claude/skills/note/SKILL.md]] — chief-of-staff path
- [[/Users/jtnt/.claude/skills/link/SKILL.md]] — chief-of-staff path
- [[/Users/jtnt/.claude/skills/session-capture/SKILL.md]] — chief-of-staff path
- [[/Users/jtnt/.claude/settings.json]] — chief-of-staff path in allowed edit paths

**Left unchanged:** All log files (historical records — old paths in logs are correct context), `z_archive` folders (user's explicit preference to keep underscores), any other projects not mentioned.

## Key Decisions

- **z_archive folders stay as underscores** — explicitly requested by user.
- **Log files not updated** — historical records should preserve the paths as they were at time of writing.
- **Nested dirs cleaned up** — the `mv` collision on case-insensitive macOS created nested dirs (`Chief-of-Staff/chief_of_staff/memory/`); compared memory file contents and deleted the outdated nested copies.

## Reasoning

- **Why not update log files:** Log files are historical records. Changing paths in them would be misleading — they should reflect what was true when written, not the current state.
- **Pattern to remember:** On macOS (case-insensitive filesystem), `mv old_name new_name` when a `New_Name` dir already exists doesn't fail — it moves the dir INTO the existing one. Always check for title-case equivalents before renaming on macOS.

## Changes Made

**Files edited:**
- [[/Users/jtnt/Documents/Projects/CLAUDE.md]] — kebab-case paths in project directory table
- [[/Users/jtnt/Documents/Projects/chief-of-staff/CLAUDE.md]] — kebab-case paths
- [[/Users/jtnt/Documents/Projects/chief-of-staff/project-sources.md]] — Source paths for chief-of-staff, context-profile-framework, job-search
- [[/Users/jtnt/Documents/Projects/chief-of-staff/project-index.md]] — Source paths for same
- [[/Users/jtnt/Documents/Projects/chief-of-staff/project-knowledge.md]] — any path references
- [[/Users/jtnt/.claude/hooks/allow-cos-edit.sh]] — chief-of-staff path
- [[/Users/jtnt/.claude/skills/note/SKILL.md]] — chief-of-staff path
- [[/Users/jtnt/.claude/skills/link/SKILL.md]] — chief-of-staff path
- [[/Users/jtnt/.claude/skills/session-capture/SKILL.md]] — chief-of-staff path
- [[/Users/jtnt/.claude/settings.json]] — chief-of-staff path

**Directories renamed:**
- `/Users/jtnt/Documents/Projects/chief_of_staff/` → `chief-of-staff/`
- `/Users/jtnt/Documents/Projects/context_profile_framework/` → `context-profile-framework/`
- `/Users/jtnt/Documents/Projects/job_search/` → `job-search/`
- Nested collision dirs removed: `chief-of-staff/chief_of_staff/`, `context-profile-framework/context_profile_framework/`

## Open Items

- The `project-sources.md` git history still has a commit message `Sync job_search: MicroStrategy...` using old underscore name — purely cosmetic, no action needed.
- Confirm that any scripts or tooling outside `.claude/` (e.g., shell aliases, external automation) that referenced old underscore paths are updated if they exist.
