---
date: 2026-02-02 09:25 PM PST
session-log: ../logs/20260202-plugin-skill-naming-fixes.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/bfdc0b8a-6780-4ce3-b99d-af590dee7053.jsonl
---

# Session Patterns

## Observations

**Effective systematic debugging approach**: When faced with "/Hook Development" command that appeared but didn't work, immediately searched the plugin system to find root cause rather than guessing. This revealed a broader systematic issue affecting 8 skills.

**Good issue separation strategy**: User correctly identified that a functional bug (spaces in names) and a quality issue (verbose descriptions) should be tracked separately, even though they affect the same files. This allows different prioritization and assignment.

**Fix-first, report-later approach worked well**: User wanted immediate functionality, so we fixed it locally first, then prepared upstream reports. For straightforward bugs in marketplace files, this approach provides immediate relief.

## CLAUDE.md Suggestions

### For Project CLAUDE.md

```suggestion:project
## Claude Code Plugin Debugging

**Slash command appears but doesn't work**: Check if it's a skill with spaces in the name. Skills show up in autocomplete but fail if their `name:` field contains spaces.

**Quick fix**: Change skill's `name:` field from "Spaced Name" to "kebab-case-name" matching its directory, then clear plugin cache.

**Plugin cache location**: `~/.claude/plugins/cache/` - clear when making marketplace file changes.
```

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Claude Code Debugging Patterns

**When slash commands appear but fail "Unknown skill" error**: Check if it's a plugin skill with spaces in the `name:` field. Skills incorrectly appear in slash command autocomplete when their names have spaces.

**Plugin troubleshooting workflow**:
1. Identify the plugin (`find ~/.claude/plugins -name "plugin.json" -path "*[plugin-name]*"`)
2. Check marketplace vs cached versions (marketplace is source of truth)
3. Fix in marketplace files, then clear cache to reload
4. Test locally before reporting upstream

**Bug reporting principle**: Separate functional bugs from quality improvements, even when affecting same files. Different severity deserves different tracking.
```