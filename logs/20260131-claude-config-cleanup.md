---
date: 2026-01-31 07:05 PM PST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/f6f74313-5215-4f2e-9375-ac4fb5e33a6d.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: Claude Config Cleanup
---

# Chief of Staff: Claude Config Cleanup

## What Was Done

Cleaned up unwanted files in the `~/.claude/` configuration directory that were left over from earlier experimentation:

**Files removed:**
- `~/.claude/get-shit-done/` directory - GSD framework files that belonged only in the chatbot-linebreaker project
- `~/.claude/statusline.sh` - orphaned duplicate of statusline script
- `~/.claude/hooks/statusline.sh` - unused "GSD Edition" statusline script

**Files committed and pushed:**
- `hooks/session-end.sh` - CWD→git root fix
- `output-styles/discuss.md` - question quality filter
- `settings.json` - enabled Notion, claude-md-management, claude-code-setup plugins
- `skills/session-capture/SKILL.md` - execution plan extraction, structured content analysis
- Deleted deprecated files: `agents/save-sync-agent.md`, `commands/podcast-extract.md`, `commands/transcribe.md`

**Discovery:** Both orphaned statusline files were unused. The global statusline is an inline command in `settings.json` (`dir | model | context%`), and the GSD statusline properly lives in the chatbot-linebreaker project as `.claude/hooks/gsd-statusline.js`.

## Key Decisions

- **Removed all GSD framework references from global config** - These tools are project-specific to chatbot-linebreaker and shouldn't pollute the global Claude Code configuration
- **Kept .bak files untracked** - Safety copies of deleted commands/agents, but not cluttering the git history
- **Committed pending config changes** - Previous session improvements to hooks and skills were ready to persist

## Reasoning

- **Why clean global config:** GSD (Get Shit Done) framework is specific to the chatbot-linebreaker project workflow, not a general-purpose tool. Keeping it in global `~/.claude/` would cause confusion across all projects.
- **Why keep orphaned statusline files:** Both were experimental copies created during statusline setup. The real implementations are in `settings.json` (global) and chatbot-linebreaker project (GSD version).

## Changes Made

**Verified via git status and recent commits:**

```bash
# Committed and pushed to ~/.claude
7 files changed:
- hooks/session-end.sh (modified)
- output-styles/discuss.md (modified)
- settings.json (modified)
- skills/session-capture/SKILL.md (modified)
- agents/save-sync-agent.md (deleted)
- commands/podcast-extract.md (deleted)
- commands/transcribe.md (deleted)

# Removed from filesystem (not in git):
- get-shit-done/ directory
- statusline.sh (root level)
- hooks/statusline.sh
```

**Chief of Staff changes:** No files modified in this repository during this session.

## Open Items

None identified - cleanup complete.