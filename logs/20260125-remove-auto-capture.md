---
title: Remove Auto Capture
---

# Chief of Staff: Remove Auto Capture

**Date:** 2026-01-25 12:13 PM EST
**Session Type:** meta-work

## What Was Done

Removed the auto-capture session logging system from Claude Code configuration. This system was producing lower quality logs than `/save`, had broken duplicate detection, and added complexity without clear benefit. The change simplifies the logging approach to use only `/save` for explicit session capture.

## Key Decisions

- **Remove auto-capture entirely rather than fix it:** The system added complexity (two parallel logging approaches, marker files, queue fallbacks) without enough benefit over just using `/save` when needed.
- **Archive rather than delete the script:** Kept `capture-session.sh` in `~/.claude/scripts/archive/` for reference in case any patterns are useful later.

## Changes Made

```
 M CLAUDE.md
```

Files modified:
- `~/.claude/settings.json` - Removed SessionEnd hook block
- `~/.claude/commands/save.md` - Removed auto-capture note and Step 1.5 (marker file logic)
- `CLAUDE.md` - Removed "Automatic Session Capture" section, simplified "Workflow Commands" section

Files archived:
- `~/.claude/scripts/capture-session.sh` → `~/.claude/scripts/archive/capture-session.sh.disabled`

Files deleted:
- `~/.claude/scripts/capture-session.sh.broken`
- `~/.claude/hooks/process-synthesis-queue.sh`
- `~/.claude/data/last-saved-session`

## Open Items

None identified. The auto-capture system is now fully disabled.
