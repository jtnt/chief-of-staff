---
date: 2026-02-10 11:04 EST
session-log: ../logs/20260210-razzo-docx-task-creation.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/c213f532-6bcd-4af7-bde2-d75983fc5725.jsonl
---

# Session Patterns

## Observations

**Documentation standards required multiple corrections** - Session required four corrections for standards that are explicitly documented in both global and project CLAUDE.md files:
1. Not using WikiLinks for file references (corrected after reminder)
2. Writing long task titles without separate descriptions (corrected after feedback)
3. Putting context only in parent task instead of each subtask (corrected after explanation)
4. Not understanding that dashboard copies individual subtasks, not parent+subtask together

Each correction required user intervention despite these patterns being documented. The WikiLink standard is particularly well-documented and was still missed.

**Task structure for dashboard integration was not intuitive** - It took three iterations to arrive at the correct pattern: each subtask needs complete context because the dashboard's copy function operates at the individual task/subtask level. Claude initially tried to optimize by factoring common context up to the parent level, which broke the intended usage pattern.

**Why this happened:** The dashboard's architecture (copy buttons on individual tasks/subtasks) wasn't clear from the CLAUDE.md instructions. The instructions mention "mini prompts" and "context needed" but don't explicitly state "dashboard copies individual tasks independently, so each must be self-contained."

## CLAUDE.md Suggestions

### For Project CLAUDE.md

```suggestion:project
## Task Structure for Dashboard

When creating tasks in project-knowledge.md that will be used from the dashboard:

**Each task/subtask must be self-contained** - The dashboard's copy function operates at the individual task/subtask level. When a user clicks copy on a subtask, only that subtask's content is included, not the parent task.

**Required elements per task/subtask:**
- Bold title on checkbox line: `- [ ] **Title**`
- Description line (indented): `- Context and details`
- File paths: Include WikiLinks to all relevant files in the description
- Complete context: Problem description, file locations, relevant details

**Example:**
```
- [ ] **Fix razzo-docx formatting**
	- Title/subtitle formatting broken in [[~/.claude/skills/razzo-docx/SKILL.md]]
	- [ ] **Fix title centering**
		- Titles centered instead of left-aligned. Template: [[~/.claude/skills/razzo-docx/assets/RAZZO-Proposal-Template.docx]]
	- [ ] **Fix horizontal lines**
		- Using bordered paragraphs instead of actual horizontal lines in [[~/.claude/skills/razzo-docx/SKILL.md]]
```

Each subtask can be copied independently with full context.
```

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Documentation Standards - Enforcement

WikiLinks are documented in multiple places but still frequently missed. When creating or editing documentation, check:
- [ ] Are all file references using WikiLinks (`[[path/to/file]]`)?
- [ ] Are tasks structured with bold titles + description lines?
- [ ] Do subtasks include complete context (not just parent task)?

If the user corrects a documentation standard violation, acknowledge specifically what was documented where, not just that you'll fix it.
```
