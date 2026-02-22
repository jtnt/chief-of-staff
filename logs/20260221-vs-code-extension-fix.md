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

**Resolution process:**
1. Diagnosed missing `code` CLI via `which code` check
2. User installed "Shell Command: Install 'code' command in PATH" via VS Code Command Palette
3. Confirmed `code` CLI was now available with `code --version`
4. Discovered Claude Code extension was already installed (v2.1.49)
5. `/ide` command appears to have display glitch when extension already exists

**Final status:** Extension working, user directed to reload VS Code window to ensure Claude Code sidebar appears.

## Key Decisions

No major decisions.

## Reasoning

Routine session — no notable reasoning to capture.

## Changes Made

No files were modified.

## Open Items

None identified - VS Code extension issue resolved.
