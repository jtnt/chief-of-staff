---
date: 2026-02-08 12:32 EST
session-log: ../logs/20260208-stale-line-number-fix.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/124303a7-a1da-4b61-ab8f-b8fe6a026e97.jsonl
---

# Session Patterns

## Observations

**What worked well:**
- Systematic analysis of all three interfaces (Claude Code, Obsidian, dashboard) and their write patterns
- Creating a table of write operations to visualize the risk landscape
- Walking through concrete scenarios to demonstrate the bug
- Validating the fix by reading back the modified code

**Pattern discovered:**
When building systems where multiple interfaces edit shared files, caching structural information (line numbers, byte offsets, indexes) creates data integrity risks. The fix is to validate cached structural data before using it — compare expected content against actual content, and fall back to content-based search when they don't match.

This applies beyond task management — any time you cache pointers into files that can be edited externally (log viewers, diff tools, collaborative editors, etc.).

## CLAUDE.md Suggestions

### For Project CLAUDE.md

```suggestion:project
## Dashboard Data Integrity

The dashboard caches line numbers when parsing tasks from `project-knowledge.md`. When you edit these files in Obsidian or through Claude Code, the dashboard's cached line numbers can become stale.

**Current safeguards:**
- All write operations validate line content before modifying
- If validation fails (lines shifted), code searches by content
- If content search fails (task deleted), operation fails safely with error

**This means:** You can safely edit tasks in any interface without corrupting data. The dashboard will find the right task even if line numbers changed. However, the dashboard UI won't auto-refresh when you edit elsewhere — navigate away and back to see external changes.
```

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Multi-Interface File Editing

When building systems where multiple tools edit the same files:

**Principle:** Never trust cached structural information (line numbers, byte offsets, indexes) when the file can be modified externally.

**Pattern:** Validate before write — compare cached content against actual file content at the target location. If they don't match, fall back to content-based search. If content search fails, fail safely with an error.

**This prevents:** Wrong-line modifications when external edits shift line numbers, silent data corruption when content changes unexpectedly.

**Examples:**
- Task management UIs that cache line numbers
- Log viewers that bookmark line positions
- Diff tools that cache file structure
- Collaborative editors with optimistic updates
```
