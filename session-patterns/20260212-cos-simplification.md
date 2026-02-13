---
date: 2026-02-12 22:06 EST
session-log: ../logs/20260212-cos-simplification.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/4209eca9-8955-4116-a297-ec41fa8ec693.jsonl
---

# Session Patterns

## Observations

**Multi-file refactoring requires comprehensive inventory** — When removing interdependent features (briefing → morning greeting → task triage → review-checkins), created a table listing all affected files: 11 deleted, 1 created, 1 renamed, 9 modified. This prevented orphaned references across two repos (~/.claude/ and Chief of Staff/).

**Parallel execution for independent changes** — Batched independent file operations (delete 4 skills + delete command + delete 2 hooks) into single Bash calls. Reduced from 7 sequential commands to 3 parallel batches.

**Backward compatibility in parsers** — When changing data format (4-subsection tasks → flat checkboxes), updated dashboard to expect new format but kept logic that parses old format. Other projects not yet migrated won't break.

**Archive not delete for historical data** — Check-in folders contained dated reflections. Moved to `_archive/` instead of deleting. Preserves context without cluttering active workspace.

## CLAUDE.md Suggestions

### For Project CLAUDE.md

No project-specific suggestions — changes were to the CoS system itself.

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Multi-File Refactoring

When removing interdependent features spanning multiple files/repos:
1. Create an inventory table listing all affected files (deleted, created, renamed, modified)
2. Check for orphaned references: search codebase for removed function/file names
3. Batch independent operations for parallel execution
4. Archive historical data rather than deleting when it contains dated context

Example: Removing briefing system touched 20+ files across 2 repos. Inventory prevented missing hook config entries and stale skill references.
```
