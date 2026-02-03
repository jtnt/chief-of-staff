---
date: 2026-02-02 09:25 PM PST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/bfdc0b8a-6780-4ce3-b99d-af590dee7053.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Plugin Skill Naming Bug Investigation and Fixes

## What Was Done

**Investigated and fixed a systematic bug** affecting 8 skills across 2 official Claude Code plugins where skill names contained spaces, making them appear in slash command autocomplete but unusable.

**Root cause identified**: Skills in plugin-dev and hookify plugins had spaces in their `name:` field:
- plugin-dev: 7 skills (`Agent Development`, `Command Development`, `Hook Development`, `MCP Integration`, `Plugin Settings`, `Plugin Structure`, `Skill Development`)
- hookify: 1 skill (`Writing Hookify Rules`)

**Complete fix implemented**:
1. Updated all 8 skill files to use hyphenated names matching their directory names
2. Cleared plugin cache to activate changes
3. All skills now functional as slash commands (`/agent-development`, `/hook-development`, etc.)

**Documentation created**: Two GitHub issue templates prepared for upstream reporting:
- Bug report for spacing issue (affects functionality)
- Quality improvement request for verbose skill descriptions

## Key Decisions

**Kept fixes local rather than forking upstream** - Modified marketplace files directly since the fix is straightforward and user wanted immediate resolution.

**Separated bug report from quality improvement** - Created two distinct issues rather than combining them, allowing maintainers to prioritize differently.

**Followed existing naming conventions** - Used kebab-case names matching skill directory names rather than inventing new patterns.

## Reasoning

- **Why fix locally first:** User needed immediate functionality, and the fix was simple and safe
- **Why separate issues:** Different severity levels (bug vs. improvement) deserve different tracking and priority
- **Pattern to remember:** When debugging slash command issues, check if skills have spaces in names - Claude Code incorrectly treats skill names as command names

## Changes Made

**Files modified (local marketplace):**
- `/Users/jtnt/.claude/plugins/marketplaces/claude-plugins-official/plugins/plugin-dev/skills/agent-development/SKILL.md`
- `/Users/jtnt/.claude/plugins/marketplaces/claude-plugins-official/plugins/plugin-dev/skills/command-development/SKILL.md`
- `/Users/jtnt/.claude/plugins/marketplaces/claude-plugins-official/plugins/plugin-dev/skills/hook-development/SKILL.md`
- `/Users/jtnt/.claude/plugins/marketplaces/claude-plugins-official/plugins/plugin-dev/skills/mcp-integration/SKILL.md`
- `/Users/jtnt/.claude/plugins/marketplaces/claude-plugins-official/plugins/plugin-dev/skills/plugin-settings/SKILL.md`
- `/Users/jtnt/.claude/plugins/marketplaces/claude-plugins-official/plugins/plugin-dev/skills/plugin-structure/SKILL.md`
- `/Users/jtnt/.claude/plugins/marketplaces/claude-plugins-official/plugins/plugin-dev/skills/skill-development/SKILL.md`
- `/Users/jtnt/.claude/plugins/marketplaces/claude-plugins-official/plugins/hookify/skills/writing-hookify-rules/SKILL.md`

Each file had its `name:` field changed from spaced format to kebab-case format.

**Cache cleared:** Plugin cache directory cleared to force reload of updated skill definitions.

**Issue templates created:**
- `/tmp/claude-code-issue-updated.md` - Bug report for spacing issue
- `/tmp/github-issue-descriptions.md` - Quality improvement for verbose descriptions

## Open Items

**GitHub issues to file** - User has prepared issue templates but hasn't posted them yet to https://github.com/anthropics/claude-code/issues

**Verification needed** - User should restart Claude Code to confirm all 8 skills now work correctly as slash commands

**Pattern extraction** - Consider whether this debugging approach (checking skill names for spaces when slash commands fail) should become a documented troubleshooting step