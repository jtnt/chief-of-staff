---
date: 2026-01-31 11:57 PM PST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/56f93c53-920e-4a86-9259-a578c3821d7b.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: Claude Code Plugin Investigation
---

# Chief of Staff: Claude Code Plugin Investigation

## What Was Done

**Investigated Claude Code tooling differences:**

1. **Skills vs Commands Comparison** - Clarified that `/export-session` is an older command while `/session-capture` is a newer skill, with different purposes:
   - `/session-capture`: Automated post-session processing (creates logs, extracts patterns, commits to git)
   - `/export-session`: Manual transcript export to readable markdown

2. **Plugin System Discovery** - Found that Claude Code has a plugin marketplace system separate from MCP servers:
   - Notion plugin available as bundled integration (`"Notion@claude-plugins-official": false` in settings)
   - Plugin system wraps MCP configurations for easier setup
   - No performance difference vs manual MCP configuration

3. **GitHub Integration Analysis** - Researched token efficiency trade-offs:
   - Bash git commands: Zero token cost, good for basic operations
   - GitHub MCP server: Token overhead but enables PR/issue management
   - Recommendation: Use bash for git, MCP for GitHub-specific features

## Key Decisions

**No major decisions made** - this was a knowledge-gathering session about Claude Code capabilities and best practices.

## Reasoning

**Why investigate tooling differences:**
- User working extensively with Claude Code and needs to understand efficiency trade-offs
- Token costs matter for frequent operations
- Plugin vs MCP understanding affects future integration choices

**Plugin vs MCP pattern discovered:**
- Plugins are convenience wrappers around MCP servers
- Same functionality, different packaging (maintained vs self-managed)
- Choose based on maintenance preference, not performance

## Changes Made

**No files were modified during this session.**

The session was purely investigative - gathering information about Claude Code's plugin system, skill differences, and integration options. All findings were delivered as explanations rather than implemented changes.

## Open Items

**None identified** - all user questions about Claude Code tooling differences were addressed. User now has clarity on:
- When to use skills vs commands
- Plugin vs MCP server trade-offs
- Git bash vs GitHub MCP efficiency considerations