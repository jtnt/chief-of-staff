---
title: Links Model Switching Investigation
---

# Chief of Staff: Links Model Switching Investigation

**Date:** 2026-01-17 03:59 PM EST
**Session Type:** meta-work
**Project:** Chief of Staff

## What Was Done

1. **Saved another test link** - Claude Code + Obsidian integration article saved to [[Links/Technical]]

2. **Investigated model switching** - Discovered that the `model` frontmatter in slash commands does NOT actually switch models when the user invokes the command directly. Status line remained on Opus during `/thought` execution despite `model: claude-haiku-4-5` in frontmatter.

## Key Finding

**The `model` frontmatter field in slash commands doesn't work as documented.**

- Documentation says it should switch models for direct user invocation
- Status line did not change during `/thought` execution
- `/cost` on subscription plans doesn't show token breakdown to verify
- This appears to be either a bug or unimplemented feature

## Current State

- `/thought` command has `model: claude-haiku-4-5` in frontmatter (correctly configured)
- But it runs on whatever model the session is using (doesn't switch)
- Bulk import commands use Task tool with `model: "haiku"` which should work (subagent spawning)

## Options Discussed

1. Accept it - single link captures aren't expensive even on Opus
2. File a bug report with Claude Code team
3. Manual workaround - run `/model haiku` before `/thought` (tedious)
4. Different approach - invoke via Skill tool (untested)

## Open Items

- [ ] File bug report about `model` frontmatter not working on direct invocation
- [ ] Test if Skill tool invocation respects model field
- [ ] Test bulk import commands to verify Task tool model switching works
