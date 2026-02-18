---
date: 2026-02-18 14:02 EST
title: PK Loading and Resume-Project Skill Migration
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief-of-staff/4da6ba36-5361-4bd6-a390-cccb9aceb918.jsonl
working_directory: /Users/jtnt/Documents/Projects/chief_of_staff
---

# Chief of Staff: PK Loading and Resume-Project Skill Migration

## What Was Done

Two pieces of session continuity infrastructure were implemented and cleaned up.

**1. Session Start PK Loading (CLAUDE.md)**

Implemented the planned "Session Start" instruction in `~/.claude/CLAUDE.md`. Added a new `### Session Start` subsection under `## Core Principles`, after the "Cross-Session Memory" block (around line 29). The instruction:

> **Read `./project-knowledge.md`** at the start of every session. This is your project context — tasks, decisions, current state. If the file doesn't exist, move on.

This completes the three-layer session context model:
1. **Handoff** (SessionStart hook, mechanical) — specific in-flight task when it exists
2. **PK loading** (CLAUDE.md, every session) — ambient project awareness
3. **`/resume-project`** (manual, on demand) — deep context with full log reading

**2. `/resume-project` Command → `nt-resume-project` Skill Migration**

The old `/resume-project` command at `~/.claude/commands/resume-project.md` was migrated to a proper skill at `~/.claude/skills/nt-resume-project/SKILL.md`.

The skill was created using the skill-creator workflow (skipped init_skill.py since it's instructions-only — no scripts, assets, or references needed). The skill implements a two-phase workflow:

- **Phase 1 (orientation):** Lists 3-5 most recent logs, presents a brief summary menu with open items
- **Phase 2 (context loading):** When user selects something, reads the full log, parses for file references, reads referenced files, reads `project-knowledge.md` — then confirms context loaded and what's next

The old command file was deleted. The skill uses the `nt-` naming convention and has comprehensive triggering keywords in the description ("resume", "pick up where I left off", "what was I working on", "continue previous work", "resume project", "/resume-project").

## Key Decisions

- **`nt-` prefix for the skill** — Consistent with other `nt-` prefixed skills in the system (`nt-editor`). The user confirmed the name during the session.
- **Skills replace commands** — Global CLAUDE.md already has this rule. The migration was straightforward.
- **No CLAUDE.md references to update** — The user asked to update references from `/resume-project` command to the skill, but on investigation there were no such references in any of the three CLAUDE.md files (global, Projects/, chief_of_staff/). The "three layers" model was only in conversation context, not written anywhere.
- **skill-creator process followed** — Used the skill-creator skill for guidance rather than writing the skill directly, which produced a proper structure with good description triggering.

## Reasoning

- **Why PK loading is simple enough to trust:** The instruction is unconditional ("read it every session") — simpler instructions get followed more reliably than conditional ones. The file is 100-400 lines, cheap to read, and the handoff hook already handles targeted task resumption. PK covers ambient awareness.
- **Why skill over command:** Skills have cleaner triggering (via description matching), are more discoverable, and the whole system is moving that direction. No reason to keep commands around once migrated.
- **Why two-phase design for resume-project:** Phase 1 keeps the common case fast (quick orientation), Phase 2 handles the real need (full context loading). Most sessions don't need deep context; the menu lets the user opt in.

## Changes Made

Files checked against git (no uncommitted changes at capture time — all changes are to `~/.claude/` which isn't in this repo):

- **Created:** `~/.claude/skills/nt-resume-project/SKILL.md` — New skill with two-phase workflow
- **Deleted:** `~/.claude/commands/resume-project.md` — Old command removed
- **Edited:** `~/.claude/CLAUDE.md` — Added `### Session Start` subsection with PK loading instruction (after "Cross-Session Memory" block)

## Open Items

None identified. Both features are complete and verified:
- PK loading: instruction in global CLAUDE.md
- Resume skill: at `~/.claude/skills/nt-resume-project/SKILL.md`, old command deleted
