---
title: Rival Search Mcp
---

# Chief of Staff: Rival Search Mcp

**Date:** 2026-01-20 05:50 PM EST
**Session Type:** meta-work

## What Was Done

Added RivalSearchMCP as an additional MCP server alongside Brave Search. User found a free alternative to Brave Search and asked to add it while keeping Brave. Investigated the GitHub repo, identified the hosted server URL, and configured it with HTTP transport after SSE transport failed to connect.

## Key Decisions

- **Keep both search providers:** User explicitly wanted both Brave Search (existing) and RivalSearchMCP (new) rather than replacing one with the other
- **Use hosted version:** Selected hosted server (`https://RivalSearchMCP.fastmcp.app/mcp`) over self-hosting for simplicity
- **HTTP transport:** SSE transport didn't connect; HTTP transport worked

## Changes Made

Added MCP server to user config (`~/.claude.json`):
- `rival-search` - HTTP transport to `https://RivalSearchMCP.fastmcp.app/mcp`

New tools available after session restart:
- DuckDuckGo/Yahoo/Wikipedia search with fallbacks
- Social media scanning (Reddit, HN, Dev.to, Product Hunt, Medium)
- GitHub repository search
- Academic paper search (arXiv, Semantic Scholar)
- Document analysis (PDF, Word, images with OCR)
- News aggregation

## Open Items

- User needs to restart Claude Code session for new tools to become available
- May want to test which search provider gives better results for different query types
