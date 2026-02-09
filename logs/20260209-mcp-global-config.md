---
date: 2026-02-09 17:38 EST
title: MCP Global Config Migration
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/ca09b94c-403c-496c-bdc2-f2199999c17e.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: MCP Global Config Migration

## What Was Done

Migrated Gmail and Google Calendar MCP server configurations from project-local scope to global scope, making them available across all projects.

**Process:**
1. Backed up [[~/.claude/settings.json]] (non-git-tracked file)
2. Used `claude mcp add --scope user` to register both servers in [[~/.claude.json]]
3. Cleared MCP entries from project-local [[.mcp.json]]

The credential files remain in their original location (`/Users/jtnt/Documents/Projects/Chief of Staff/.claude/credentials/`) and are referenced by absolute path, so they work from any project.

## Key Decisions

No major decisions — straightforward configuration move from project to global scope.

## Reasoning

Routine configuration change — no notable reasoning to capture.

## Changes Made

**Modified files:**
- [[~/.claude.json]] — Added `google-calendar` and `gmail` MCP servers with environment variable paths to credentials
- [[~/.claude/settings.json]] — Backup created before editing
- [[.mcp.json]] — Removed the two MCP server entries (now in global config)

**Git status:**
- Modified: [[.mcp.json]] (removed MCP server entries)
- Untracked: This log file

Global config changes in [[~/.claude.json]] and [[~/.claude/settings.json.bak]] are outside this repo.

## Open Items

None identified.

