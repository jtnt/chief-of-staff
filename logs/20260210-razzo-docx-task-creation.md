---
date: 2026-02-10 11:04 EST
title: Razzo-docx Skill Task Creation
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/c213f532-6bcd-4af7-bde2-d75983fc5725.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Razzo-docx Skill Task Creation

## What Was Done

Created tasks in [[project-knowledge.md]] for improving the razzo-docx skill, which is currently producing formatting issues when generating Word documents. The session identified five specific formatting problems:

1. **Title/subtitle formatting** - Claude centers titles and subtitles when they should be left-aligned per template, and adds unwanted line breaks between them
2. **Horizontal lines overuse** - Using bordered paragraphs instead of actual horizontal lines, and inserting them between every section when they shouldn't be there
3. **Missing footer horizontal line** - Footer is missing the horizontal line shown in template
4. **Template anonymization** - Completed during session: renamed sample proposal from `Proposal_ RAZZO AI Advisory for SalesIntel.docx` to `RAZZO-Proposal-Template.docx` and verified skill file references were updated
5. **Dashboard subtask parsing** - Discovered during task creation that dashboard doesn't properly parse subtasks with bold titles and description lines, doesn't show descriptions, and doesn't render copy buttons for subtasks

Tasks were structured with complete context (file paths to both skill and sample template) so each can be copied from dashboard as a self-contained prompt.

Also identified and corrected multiple violations of documentation standards during task creation:
- WikiLinks not being used for file references (corrected to use `[[path/to/file]]` format)
- Task titles too long without separate descriptions (restructured to short bold titles with description lines)
- Subtasks missing individual context (fixed so each subtask has complete context including file paths)

## Key Decisions

**Task structure for dashboard integration** - Each subtask needs complete context (file paths, problem description) in its description line, not just in the parent task. This allows the dashboard's copy functionality to capture a self-contained prompt for any individual subtask. Previously tried to factor context up to parent level, but that breaks the dashboard's single-task copy feature.

**Template anonymization** - User completed this during session, renaming file and updating skill references. Verified all references in SKILL.md updated correctly (old filename only remains in .bak backup).

## Reasoning

**Why complete context per subtask:** The dashboard is designed to let users copy any individual task/subtask as a prompt to start work. If context is only in the parent task, copying a subtask gives insufficient context. Each subtask must be self-contained with file paths and full problem description, even though this creates some repetition between subtasks.

**Pattern to remember:** When creating tasks meant to be used from the dashboard, always include complete context (file paths, relevant details) at the level where the copy button will appear. Dashboard architecture assumes each task/subtask is an independent unit.

## Changes Made

```bash
git status --short
 M Tools/dashboard/js/app.js
 M project-knowledge.md
```

**Modified:**
- [[project-knowledge.md]] - Added two tasks to ## Tasks section:
  1. **Fix razzo-docx skill formatting issues** (parent task with 4 formatting subtasks)
  2. **Fix dashboard subtask parsing** (new task for dashboard improvements to handle bold titles, descriptions, and copy buttons)

**Read during session:**
- [[~/.claude/skills/razzo-docx/SKILL.md]] - Verified template filename references
- [[Tools/dashboard/js/app.js]] - Examined subtask parsing logic to understand limitations

## Open Items

None - tasks are created and ready for work. Dashboard subtask parsing will need to be fixed to properly display these tasks with descriptions and copy buttons.
