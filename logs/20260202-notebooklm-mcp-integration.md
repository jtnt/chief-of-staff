---
date: 2026-02-02 02:47 PM PST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/d759b26c-05a4-4398-b522-7fd0c4b64729.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: NotebookLM MCP Integration
---

# Chief of Staff: NotebookLM MCP Integration

## What Was Done

Successfully integrated the NotebookLM MCP server into Claude Code, expanding research and knowledge management capabilities. The PleasePrompto/notebooklm-mcp server was installed at user scope, making it available across all projects.

**Integration steps completed:**
1. Reviewed existing MCP server configuration (Gmail, Google Calendar already active)
2. Added NotebookLM MCP server using `claude mcp add --transport stdio --scope user notebooklm -- npx -y notebooklm-mcp`
3. Verified successful installation and connection status
4. Documented authentication requirements and available functionality

**New capabilities unlocked:**
- Create and manage NotebookLM notebooks programmatically
- Add sources (URLs, documents) to notebooks via Claude Code
- Query and research across notebook collections
- Generate summaries and insights from NotebookLM data
- Integration with existing Chief of Staff knowledge management workflows

## Key Decisions

**Chose PleasePrompto/notebooklm-mcp over alternatives:** This was the most popular and well-maintained NotebookLM MCP server option found in the research.

**User-scope installation:** Installed at user level rather than project-specific to make NotebookLM tools available across all projects, consistent with other MCP servers (Gmail, Calendar).

## Reasoning

**Why NotebookLM integration:** Extends Chief of Staff's research and synthesis capabilities by connecting to Google's NotebookLM AI research assistant. This creates a bridge between project-specific knowledge capture (in CLAUDE.md and project-knowledge.md files) and broader research synthesis.

**Pattern to remember:** MCP servers add persistent capabilities that survive session boundaries, unlike tools that need to be discovered each time. The deferred tool pattern requires ToolSearch to load capabilities when needed.

## Changes Made

**No files were modified** in the project itself - this was purely system configuration. Changes were made to Claude Code's global MCP configuration at the system level.

**System changes:**
- Added notebooklm MCP server to user-scope configuration
- Server now appears in `claude mcp list` alongside existing Gmail and Google Calendar servers

## Open Items

**Authentication required:** First use of NotebookLM tools will require Google account authentication. User should run `/mcp` command when ready to authenticate.

**Workflow integration:** Consider how NotebookLM capabilities integrate with existing Chief of Staff research workflows - potentially useful for:
- Research synthesis across multiple sources
- Content analysis for Context Profile Framework
- Strategic document analysis and insight extraction

**Testing needed:** Create a test notebook to verify full functionality and document the authentication flow.