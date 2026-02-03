---
date: 2026-02-03 02:51 PM PST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/eed1b0dc-9c2d-4b5a-8b0d-5b4f622b5da9.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Claude Code Alias Setup

## What Was Done

Brief session focused on Claude Code command-line usage and shell convenience. User asked about available run command options, specifically launch flags like `--dangerously-skip-permissions`. Provided comprehensive overview of Claude Code CLI flags including:

- Dangerous/bypass flags (`--dangerously-skip-permissions`, `--allow-dangerously-skip-permissions`)
- Permission control options (`--permission-mode`, `--allowedTools`, `--disallowedTools`)
- Session behavior flags (`--init`, `--init-only`, `--maintenance`, `--fork-session`)
- Feature toggles (`--chrome`, `--ide`, `--disable-slash-commands`, `--remote`)
- Configuration overrides (`--settings`, `--mcp-config`, `--plugin-dir`)
- Debug options (`--debug`, `--verbose`)

User then asked about model selection, learned about `--model` flag with aliases (sonnet, opus, haiku) and `--fallback-model` option.

Final request was to create shell aliases combining model selection with permission bypassing. Added three new aliases to `.zshrc`:
- `haiku` → `claude --model haiku --dangerously-skip-permissions`
- `sonnet` → `claude --model sonnet --dangerously-skip-permissions`
- `opus` → `claude --model opus --dangerously-skip-permissions`

## Key Decisions

No major decisions - straightforward documentation lookup and shell configuration.

## Reasoning

Routine session - no notable reasoning to capture.

## Changes Made

**Files Modified:**
- `~/.zshrc` - Added three new aliases for convenient Claude Code model access with permission bypassing

No git changes detected in this repository - the shell configuration change was external.

## Open Items

None identified - aliases are ready to use after shell reload or new terminal.