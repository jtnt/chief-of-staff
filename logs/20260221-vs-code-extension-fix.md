---
date: 2026-02-21 21:26 EST
title: VS Code Extension Install Fix
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief-of-staff/b95f3d62-c758-48aa-a112-ac0b063dfe68.jsonl
working_directory: /Users/jtnt/Documents/Projects/chief-of-staff
---

# Chief of Staff: VS Code Extension Install Fix

## What Was Done

User ran `/ide` to install the Claude Code VS Code extension and got an error: `ERR_STREAM_PREMATURE_CLOSE: code --force --install-extension anthropic.claude-code`. Restarting VS Code didn't help.

Root cause: the `code` CLI wasn't in PATH, so the `/ide` command couldn't invoke it.

Fix offered:
1. In VS Code, run **"Shell Command: Install 'code' command in PATH"** via Command Palette (`Cmd+Shift+P`)
2. Restart terminal, retry `/ide`
3. Alternative: install manually from Extensions panel (`Cmd+Shift+X`), search "Claude Code" by Anthropic

Session ended before confirming resolution.

## Key Decisions

No major decisions.

## Reasoning

Routine session — no notable reasoning to capture.

## Changes Made

No files were modified.

## Open Items

- Unclear if VS Code extension was successfully installed — user may need to follow up with manual install if PATH fix doesn't work.
