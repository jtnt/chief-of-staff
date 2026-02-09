---
date: 2026-02-09 17:40 EST
session-log: ../logs/20260209-research-capture-razzo-skill-update.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/5a3a3d27-5bca-4ee8-868f-0c5c62b46e2f.jsonl
---

# Session Patterns

## Observations

User downloaded a skill from Claude.ai (`razzo-docs`) and asked to review it for Claude Code use. The skill had several portability issues:

1. **References to platform-specific features** — mentioned "docx skill" and "theme-factory skill" that exist in Claude.ai but not in Claude Code
2. **Missing implementation workflow** — described *what* the output should look like (brand guidelines) but not *how* to create it in Claude Code (needs python-docx instructions)
3. **Stale metadata** — version numbers, Claude.ai thread links, last-updated dates that are noise in Claude Code context
4. **Missing frontmatter** — no `user_invocable` field (Claude Code convention)

The review workflow was efficient:
- Read the skill to identify issues
- Propose specific changes grouped by category
- Create backup (non-git file) before editing
- Update skill with all changes at once
- Rename folder and update skill metadata

**What worked well:**
- User knew the skill needed review before first use (proactive quality check)
- Backup before editing gave safety net
- Grouping all portability issues into one update batch vs iterative fixes

**Friction point:**
- The skill referenced a sample asset (SalesIntel proposal) that exists but wasn't in the skill's assets/ folder — had to use convert-docx to access it. If the user adds a sample .docx directly to the skill assets, that reference will be cleaner.

## CLAUDE.md Suggestions

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Skills Portability Between Claude.ai and Claude Code

When adapting skills from Claude.ai to Claude Code (or vice versa):

**Claude.ai → Claude Code:**
- Remove version numbers, thread links, last-updated timestamps
- Replace artifact-system references with actual file creation instructions (e.g., python-docx for Word docs)
- Remove references to Claude.ai-specific skills/tools
- Add `user_invocable` frontmatter (true/false)
- If the skill references sample files, include them in the skill's assets/ folder
- Back up the original before editing (non-git files)

**Claude Code → Claude.ai:**
- Replace file creation tool instructions with artifact system references
- Remove bash/file-system specific workflows
- Add version/source metadata if tracking iterations
```
