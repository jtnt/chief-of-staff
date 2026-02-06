---
date: 2026-02-06 08:52 PM PST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/88bb9c07-242d-49ae-8684-4ae8c3f8c336.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Session Context Loading

## What Was Done

Added a **Session Context Loading** directive to global CLAUDE.md (`~/.claude/CLAUDE.md`) to ensure Claude proactively reads `project-knowledge.md` at the start of every project session. This closes a significant gap in context continuity.

**The problem identified:** While CoS briefings read the most recent log per project for status lines, and session workflow supports on-demand log searches, there was no mechanism to automatically load strategic context when starting a project session. Claude would start "fresh" each time, with only static CLAUDE.md instructions, while `project-knowledge.md` files (strategic decisions, competitive intel, session history) went unused unless explicitly requested.

**The solution:** Added directive under "Documentation Model" section that instructs Claude to:
1. Check if `project-knowledge.md` exists in project root
2. Read it immediately before responding to first user message
3. Do this proactively, not reactively

This applies globally to all projects (Razzo, CPF, Job Search, etc.) without requiring individual CLAUDE.md updates.

Also documented the `z_context/` folder convention for curated project reference materials in the same commit.

Additionally, added `yt-dlp` to allowed Bash permissions in `~/.claude/settings.json`.

## Key Decisions

**Chose project-knowledge.md only, not recent logs** — User considered having Claude read the last week of logs but decided against it due to:
- Context window cost (7 days × multiple projects = 10-20 files)
- Redundancy (`project-knowledge.md` should already capture strategic insights from sessions)
- Slower briefings

Decision was to trust that `project-knowledge.md` contains the synthesized intelligence from recent sessions, making raw log reading unnecessary for routine session starts. On-demand log searches remain available via session workflow when needed.

**Global vs per-project directive** — Placed directive in global CLAUDE.md rather than updating each project's CLAUDE.md individually, for automatic propagation to all current and future projects.

## Reasoning

**Why project-knowledge.md matters for continuity:**
- Contains strategic context, key decisions, competitive analysis, session history
- Functions as the "living memory" of a project
- Without proactive loading, Claude starts every session without knowledge of past work
- Previously only loaded reactively when user asked or Claude happened to need it

**Why the directive needs to be explicit:**
- Existing project CLAUDE.md files referenced project-knowledge.md passively ("see project-knowledge.md for...") but didn't direct Claude to read it
- Passive references don't trigger automatic loading at session start
- The new directive makes loading **mandatory and immediate** — "read it immediately before responding to the user's first message"

**Pattern to remember:** For session-start behaviors to be reliable, they must be explicit imperatives ("read X at session start"), not passive references ("X contains strategic context"). The latter documents what's available; the former ensures it gets loaded.

## Changes Made

**Modified files:**

1. **~/.claude/CLAUDE.md** — Added "Session Context Loading" subsection under "Documentation Model" and documented `z_context/` folder convention
   - Commit: `762ea6c` - "Add session context loading directive and z_context docs"

2. **~/.claude/settings.json** — Added `Bash(yt-dlp:*)` to permissions
   - Commit: `c9dd794` - "Add yt-dlp to allowed Bash permissions"

Both commits pushed to remote.

## Open Items

None identified. The directive is in place and will apply to all subsequent project sessions.
