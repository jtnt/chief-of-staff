---
date: 2026-02-06 08:14 PM PST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/54b90ded-cc64-424f-b15a-b07c8eec639e.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: Enable Agent Teams
---

# Chief of Staff: Enable Agent Teams

## What Was Done

Enabled experimental agent teams feature in Claude Code by modifying `~/.claude/settings.json`. Added the environment variable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: "1"` to the `env` section of the settings file.

The user asked how to enable agent teams, was presented with two options (settings.json or environment variable), and chose the standard settings.json approach for persistent configuration.

Agent teams allow spawning multiple AI teammates that coordinate via a shared task list. Display modes can be controlled via `teammateMode` setting (auto/in-process/tmux).

## Key Decisions

- **Settings.json over environment variable** - Chose the persistent configuration approach rather than per-session environment variable. This makes the feature available in all future sessions without additional setup.

## Reasoning

Routine session - no notable reasoning to capture.

## Changes Made

**Modified:**
- `~/.claude/settings.json` - Added `env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: "1"` to enable agent teams feature

**Git status shows additional uncommitted changes:**
- `.mcp.json` - Added `GMAIL_CREDENTIALS_PATH` environment variable (from previous session, not related to this session's work)
- `Research/` - New untracked directory (from previous session)
- [[Working/domain-taste-vs-aesthetic-taste.md]] - New untracked file (from previous session)

## Open Items

None identified.
