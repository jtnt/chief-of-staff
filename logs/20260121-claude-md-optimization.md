---
title: Claude Md Optimization
---

# Chief of Staff: Claude Md Optimization

**Date:** 2026-01-21 09:45 PM EST
**Session Type:** meta-work

## What Was Done

Optimized global CLAUDE.md file based on official best practices and community recommendations:

- Researched CLAUDE.md best practices from Anthropic, HumanLayer, Builder.io, and community sources
- Created backup: `~/.claude/CLAUDE.md.backup-20260121`
- Condensed global CLAUDE.md from 275 lines to 90 lines (67% reduction)
- Created `~/.claude/workflows/session-workflow.md` to hold detailed procedures previously embedded in main file
- Added "IMPORTANT:" emphasis to critical rules (never fabricate, only commit when asked)
- Preserved all essential behaviors while moving verbose examples and explanations to workflow reference file

**Key insight from research:** Frontier LLMs can follow ~150-200 instructions reliably. Claude Code's system prompt uses ~50, leaving limited budget for CLAUDE.md content. The 275-line file likely contained 100+ distinct instructions, which could degrade instruction following.

## Key Decisions

**Progressive disclosure strategy:** Instead of embedding all workflow details in CLAUDE.md, moved detailed procedures to `~/.claude/workflows/session-workflow.md` and referenced it. Main file now contains only essential rules.

**Target length:** Aimed for ~100-120 lines (moderate reduction) to balance context savings with user preference for ensuring nothing breaks. Achieved 90 lines, better than target.

**Content preservation:** All CoS-related content stayed in global file because it's used by other projects (inbox check, /log and /save commands, session.md workflow, project-knowledge.md pattern).

## Changes Made

**Created:**
- `~/.claude/CLAUDE.md.backup-20260121` (backup of original)
- `~/.claude/workflows/` directory
- `~/.claude/workflows/session-workflow.md` (detailed procedures: session.md lifecycle, project-knowledge.md updates, cross-session memory search commands, inbox archiving)

**Modified:**
- `~/.claude/CLAUDE.md` (275 → 90 lines)

**What was condensed:**
- Removed redundant examples (git command blocks, file versioning progression)
- Tightened prose throughout (kept "what", trimmed "why")
- Moved bash examples to workflow file (Claude knows grep/git commands)
- Removed bullet lists where single sentence sufficed

**What stayed intact:**
- All core principles (Never Make Things Up, No Empty Promises, Discovery ≠ Direction, Cross-Session Memory)
- Git policy (only commit when asked, use `git -C` for cross-repo)
- File editing policy (version markdown files)
- CoS integration (inbox check, /log and /save commands)
- Meta-work awareness trigger
- Writing style references (already followed best practice of linking to external files)

## Open Items

**Testing needed:** User should verify key behaviors work in new Claude Code sessions:
- Inbox check at session start in tracked projects
- Cross-session memory search when referencing past work
- Writing style consultation when doing writing tasks
- No auto-commit behavior

If anything breaks, restore from backup:
```bash
cp ~/.claude/CLAUDE.md.backup-20260121 ~/.claude/CLAUDE.md
```

**Potential future optimization:** Could create additional workflow reference files for git-specific examples or CoS integration details if further reduction desired, but current 90 lines is well within best practice range (<100 lines recommended for root files).
