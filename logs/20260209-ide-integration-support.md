---
date: 2026-02-09 21:23 PST
title: IDE Integration Support
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/1bbe1b1a-b05a-4ef2-aef3-f3eaae93ae27.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: IDE Integration Support

## What Was Done

User asked about controlling which IDE opens when pressing Ctrl-G in Claude Code. Provided instructions on how IDE detection works and how to uninstall the Claude Code extension from Cursor.

**Key findings:**
- The `/ide` command auto-detects available IDEs and doesn't accept arguments to specify preference
- No current setting exists to explicitly choose which IDE to prefer when multiple are installed
- The workaround is to only install the Claude Code extension in the preferred IDE
- Uninstallation instructions: `Cmd+Shift+X` → Search "Claude Code" → Click gear icon → "Uninstall"

The session ended with user reporting the uninstallation didn't work, but the issue was not resolved.

## Key Decisions

No major decisions.

## Reasoning

Routine session - no notable reasoning to capture.

## Changes Made

No files were modified. This was a purely conversational support session.

The git status shows modified files ([[CLAUDE.md]] and [[Tools/dashboard/js/app.js]]) but these are from a previous session, not this one.

## Open Items

- User reported that uninstalling Claude Code extension from Cursor "didn't work" but session ended before troubleshooting further
