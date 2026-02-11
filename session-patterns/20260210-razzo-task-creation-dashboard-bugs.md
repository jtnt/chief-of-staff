---
date: 2026-02-10 20:04 EST
session-log: ../logs/20260210-razzo-task-creation-dashboard-bugs.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/c213f532-6bcd-4af7-bde2-d75983fc5725.jsonl
---

# Session Patterns

## Observations

**Task format requirements surfaced through iteration:**

The session revealed that CoS tasks serve a dual purpose:
1. Track work to be done
2. Serve as portable prompts via dashboard copy functionality

This dual purpose requires specific formatting:
- **Bold title on checkbox line** - Short, scannable task name
- **Description on indented line below** - Full context including file paths, specifics, rationale
- **WikiLinks for all file references** - Enables Obsidian backlinks
- **Complete context in each sub-task** - Each sub-task should be copyable as standalone prompt

**Friction point:** The current task format examples in CLAUDE.md show the simpler format (title + source tag + date) but don't explicitly document the "portable prompt" requirement. This led to multiple iterations to get the format right.

**What worked well:** Iterative refinement process - user provided clear feedback about why format wasn't working, which surfaced the underlying requirement (dashboard copy needs complete context).

## CLAUDE.md Suggestions

### For Project CLAUDE.md

```suggestion:project
## Task Format: Portable Prompts

Tasks in `project-knowledge.md` serve dual purposes:
1. Track work to be done
2. Provide portable prompts via dashboard copy functionality

**Format for sub-tasks with complete context:**
```markdown
- [ ] **Short Title**
	- Full description with [[WikiLinks]] to all relevant files, specific details about what needs fixing, and enough context that copying this text creates a self-contained prompt for starting work on this sub-task independently.
```

**Why complete context matters:** The dashboard's copy button should allow you to paste any sub-task into a new AI session and start working immediately, without needing to reference the parent task or hunt for file paths.

**Example:**
```markdown
- [ ] **Fix razzo-docx horizontal lines**
	- Skill at [[~/.claude/skills/razzo-docx/SKILL.md]] uses bordered paragraphs for horizontal lines. Template [[~/.claude/skills/razzo-docx/assets/RAZZO-Proposal-Template.docx]] uses proper HR elements. Update skill to use `document.add_paragraph().paragraph_format.borders.bottom` or similar for proper horizontal lines.
```
```

### For Global ~/.claude/CLAUDE.md

No global suggestions - this is CoS-specific task formatting.
