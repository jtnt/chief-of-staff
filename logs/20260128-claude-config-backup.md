---
title: Claude Config Backup
---

# Chief of Staff: Claude Config Backup

**Date:** 2026-01-28 11:31 AM EST
**Session Type:** meta-work

## What Was Done

Set up GitHub backup for Claude Code configuration (~/.claude):

1. **Explored ~/.claude directory** - Comprehensive inventory of all files, hooks, skills, commands, scripts, agents, and data directories
2. **Designed backup strategy** - Separated config (valuable IP) from session data (security-sensitive)
3. **Created .gitignore** - Excludes session transcripts, history, caches, and ephemeral state
4. **Initialized git repo** - Set up ~/.claude as git repo linked to https://github.com/jtnt/cc-config.git
5. **Pushed initial commit** - All config files (~960 KB) now backed up to GitHub
6. **Created backup-config.sh script** - One-command backup utility in ~/.claude/scripts/
7. **Added shell alias** - `ccbackup` alias added to .zshrc for easy updates

## Key Decisions

**Config only, no session data:**
- Session data (projects/, history.jsonl) contains sensitive info (emails, calendar, business strategy)
- Would require private repo + careful gitignore management
- Time Machine already handles local backup
- Decision: Keep session data local, back up config only

## Reasoning

- **Why config-only:** Session transcripts contain full conversation history including emails, calendar data, business strategy discussions. Even with a private repo, this is unnecessary risk. Config files are the valuable IP (hooks, skills, commands) - session data is replaceable.
- **Why a dedicated script:** Running raw git commands requires remembering the commit message format and navigating to ~/.claude. A script with auto-generated message reduces friction.

## Changes Made

**Created:**
- `~/.claude/.gitignore` - Exclusions for sensitive/ephemeral content
- `~/.claude/scripts/backup-config.sh` - Backup utility script

**Modified:**
- `~/.zshrc` - Added `ccbackup` alias

**Git:**
- Initialized ~/.claude as git repo
- Pushed to https://github.com/jtnt/cc-config.git (2 commits: initial + backup script)

## Open Items

None - setup complete. Use `ccbackup` after making config changes.
