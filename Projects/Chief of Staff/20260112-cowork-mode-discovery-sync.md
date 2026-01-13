# Chief of Staff: Sync Entry

**Date:** 2026-01-12 (evening)
**Context:** Cowork mode vs CLI differences discovered

## What Happened

First session using Cowork mode (Claude desktop app) instead of Claude Code CLI. Discovered several important limitations and differences between the two environments.

## Key Discoveries

### Slash Commands Don't Work in Cowork Mode
- Tried to run `/journal` - returned "Unknown skill: journal" error
- Same error for `/morning`, `/update-knowledge`, and other custom commands
- All commands exist in `~/.claude/commands/` but aren't accessible from Cowork mode
- **Conclusion:** Slash commands are CLI-only feature

### MCP Connector Availability
- Gmail connector configured globally but not available in Cowork session
- Some MCP servers work (Notion, Apple Notes, Chrome browser automation)
- Others don't appear or aren't accessible
- Inconsistent availability between CLI and Cowork mode

### File Access Restrictions
- Can only read files within selected workspace folder
- Cannot access `~/.claude/commands/` or other system directories
- Accidentally created `.claude/commands/journal.md` in Chief of Staff folder thinking commands were missing
- Actually, commands exist globally but are outside accessible scope

## Workarounds Implemented

1. **Manual command execution:** User uploaded `/update-knowledge` command file directly, asked me to execute it
2. **Natural language triggers:** Can request workflows via natural language ("run update-knowledge workflow")
3. **Git operations work normally:** Can still commit, push, and manage repository

## Changes Made

**Updated project-knowledge.md:**
- Added session entry documenting all discoveries
- Captured implications for workflow design
- Updated "Last Updated" date to 2026-01-12

**Updated CLAUDE.md:**
- Added "Cowork Mode vs CLI Differences" section
- Created comparison table showing capabilities
- Documented workarounds for Cowork mode usage
- Established design principle: natural language triggers as primary interface

## Strategic Insight

Cowork mode and CLI are different environments with different capabilities. Workflows need to be designed to work in both, or clearly documented which features require which environment.

**Design principle moving forward:** Use natural language triggers as the primary interface, with slash commands as CLI convenience shortcuts.

## Open Questions

- Will MCP connector availability improve in Cowork mode?
- Should check-in system be redesigned around natural language exclusively?
- Are there other Cowork mode limitations we haven't discovered yet?
