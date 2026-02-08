---
title: Mcp Configuration Brave Search
---

# Chief of Staff: Mcp Configuration Brave Search

**Date:** 2026-01-20 04:49 PM EST
**Session Type:** meta-work

## What Was Done

Fixed MCP configuration understanding and added Brave Search MCP server to user-level configuration. Key accomplishments:

1. **Corrected MCP configuration misunderstanding:**
   - Initially created incorrect `~/.claude/mcp.json` file (doesn't exist in Claude Code)
   - Researched official Claude Code MCP documentation to understand proper structure
   - Learned that ALL MCP config lives in `~/.claude.json` at different levels (user, local, project)

2. **Added Brave Search MCP:**
   - Removed incorrect `~/.claude/mcp.json` file
   - Added brave-search to user-level `mcpServers` in `~/.claude.json`
   - User added their Brave Search API key: BSAWq1zjCu6qPLqSpOIiAJnPNbj4Zgq
   - Configured with proper stdio type and npx command

3. **Fixed /save and /log permission issues:**
   - Added `"Bash(git -C:*)"` permission for cross-repo git operations
   - Added `"Bash(mkdir -p:*)"` permission for creating logs directories
   - These were causing permission prompts during /save and /log workflows

4. **Documented MCP configuration structure:**
   - User-level MCPs: `~/.claude.json` → `mcpServers` (global, all projects)
   - Local MCPs: `~/.claude.json` → `projects[path]` → `mcpServers` (private, per-project)
   - Project MCPs: `.mcp.json` in project root (shared via version control)

## Key Decisions

**MCP configuration location:** Brave Search belongs at user-level (in `~/.claude.json`) not project-level because it's a general-purpose search tool that should be available globally across all projects. Project-specific MCPs like Gmail and Google Calendar stay in Chief of Staff's `.mcp.json` because they use project-specific OAuth credentials.

**Permission patterns vs. one-off permissions:** Added general patterns (`git -C:*`, `mkdir -p:*`) instead of specific one-off permissions to prevent future prompts. The settings.json was accumulating too many one-off permissions (125+ entries) when patterns would cover multiple use cases.

## Changes Made

**Modified:**
- `~/.claude/settings.json` - Added two new permission patterns
- `~/.claude.json` - Added brave-search MCP server configuration (user modified to add API key)

**Created (then deleted):**
- `~/.claude/mcp.json` - Created incorrectly, then deleted after learning proper structure

**User modifications:**
- User added Brave Search API key to `~/.claude.json`
- User modified `project-index.md` (added SalesIntel project entry)

## Open Items

- User needs to restart Claude Code for Brave Search MCP to load
- Consider documenting MCP configuration structure in Chief of Staff CLAUDE.md or as a resource file for future reference
- Watch for whether the new permission patterns actually prevent prompts on next /save or /log usage
