---
title: Smart Project Status Detection
---

# Chief of Staff: Smart Project Status Detection

**Date:** January 9, 2026 (late night - continued)
**Source:** `/Users/jtnt/Documents/Projects/Chief of Staff`

## Recent Git Activity

```
86cac3d Add smart project status detection to CLAUDE.md
f087aa0 Add late-night sync entry and update project sources
c955fef Update project-knowledge.md: Document three-layer model establishment
6276dae Document session file convention and update project sources
084bd05 Refine /update-knowledge workflow and sync system
```

## Current State

The Chief of Staff knowledge management system now includes smart project status detection to reduce noise from inactive projects while ensuring no work is missed.

**Key Capabilities:**
- Two-way sync workflows
- Project tracking for 6 projects
- Three-layer documentation model
- **NEW: Smart project status detection**

## Recent Work

### Session: Smart Project Status Detection

**Problem Identified:** When checking project status, all projects were checked equally, creating noise from inactive projects (like LinkedIn extensions that haven't changed).

**Solution Implemented:** Smart detection that only reports projects with actual changes.

**Detection Logic:**
- **Git repos:** Check `git status --short` (uncommitted) + `git log --since` (new commits)
- **Non-git folders:** Check file modification dates via `find -newermt`
- Only flag projects with changes
- Summarize quiet projects briefly

**Implementation:**
- Added "Checking Project Status" section to CLAUDE.md
- Documents workflow for status checks
- Covers both git and non-git projects
- Minimal overhead (parallel checks, minimal tokens)

**Files Modified:**
- `CLAUDE.md` - Added smart detection workflow guidance
- `project-knowledge.md` - Updated with smart detection feature
- `~/.claude/commands/update-knowledge.md` - Removed unnecessary user question about CLAUDE.md updates

**Philosophy Maintained:** Only add information that's clearly significant. Don't create noise.

## Open Items

- Monitor effectiveness of smart detection in practice
- Verify it correctly handles edge cases (non-git projects, mixed scenarios)
