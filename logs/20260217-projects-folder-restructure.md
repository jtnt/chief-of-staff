---
date: 2026-02-17 20:23 EST
title: Projects Folder Restructure
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief-of-staff/4ea940c3-663d-4afc-b678-ba316a5a60d3.jsonl
working_directory: /Users/jtnt/Documents/Projects/chief_of_staff
---

# Chief of Staff: Projects Folder Restructure

## What Was Done

Executed a full restructure of `~/Documents/Projects/` from a plan created in a prior session. The work had four goals: (1) move Clients/ into Razzo/, (2) standardize all folder names to lowercase_with_underscores, (3) create a shared `Projects/CLAUDE.md` context layer, and (4) add session routing guidance to CoS CLAUDE.md.

**Structural changes:**
- `Clients/` moved to `razzo/clients/` — every client is a Razzo client, one session context for all business work
- `fractional-caio-engagement-model.md` moved from `Clients/z_context/` → `razzo/z_context/`
- `clients/` added to `razzo/.gitignore` (entire directory stays untracked/local)
- 5 top-level folders renamed: `Chief of Staff` → `chief_of_staff`, `Razzo` → `razzo`, `Code` → `code`, `Context Profile Framework` → `context_profile_framework`, `Job Search` → `job_search`
- ~25 second-level folders renamed (lowercase with underscores): `Check-Ins` → `check_ins`, `Tools` → `tools`, `Weekly Reviews` → `weekly_reviews`, `Assets` → `assets`, `Beekeeper Group` → `beekeeper_group`, `JRAD` → `jrad`, `Filing Cabinet` → `filing_cabinet`, etc.

**New files:**
- `~/Documents/Projects/CLAUDE.md` — shared context layer; auto-loads for ANY session under `~/Projects/`; contains project directory table, writing standards pointer, session routing guidance
- Session Routing section added to `chief_of_staff/CLAUDE.md`

**Cross-references updated (17 files):**
- `project-sources.md` — all 17 paths updated, standalone Clients entry removed (absorbed into Razzo)
- `project-index.md` — all paths updated, Clients section renamed to "Razzo Clients"
- `~/.claude/settings.json` — 9 permission paths updated from "Chief of Staff" to "chief_of_staff" (and Meetings → meetings)
- 5 skill files: session-capture, review-patterns, link, note, razzo-proposal
- `allow-cos-edit.sh` hook — updated hardcoded "Chief of Staff" path
- `chief_of_staff/tools/dashboard/js/app.js` — updated hardcoded `'Chief of Staff'` string
- `razzo/CLAUDE.md` — updated folder structure to lowercase + added Clients section with confidentiality rules
- `razzo/clients/CLAUDE.md` — updated Razzo reference path
- Auto-memory `MEMORY.md` updated to reflect new lowercase paths and folder structure

**APFS CWD hazard discovered:** When `Chief of Staff/` was renamed to `chief_of_staff/` mid-session, the running bash shell's CWD became invalid. Bash and search tools broke for the rest of the session; Read/Edit/Write tools continued working fine. Resolved by delegating remaining bash operations to Task agents (which spawn fresh processes).

**git committed and pushed:** Razzo committed as "Restructure: lowercase folders, absorb Clients, add shared context". CoS edits were committed by a concurrent writing session sync that ran `git add -A` (picked up all pending changes).

## Key Decisions

- **Clients entirely untracked in Razzo git:** Client work is sensitive local content. Adding `clients/` to `.gitignore` means JRAD (nested git repo) stays tracked by its own git, while everything else stays local. No accidental commits of client files into the Razzo repo.
- **`fractional-caio-engagement-model.md` moved to `razzo/z_context/`** (not `razzo/clients/z_context/`) — it's about Razzo's engagement model, not a client-specific file.
- **Auto-memory dirs:** APFS case-insensitivity means old `Chief of Staff` path-encoded dir and new `chief_of_staff` dir resolve identically. New sessions auto-create properly-cased dirs. MEMORY.md was copied to new path-encoded dir to be safe.
- **Session routing added to CoS CLAUDE.md** — not because anything was broken, but as a helpful reference for when to start in a project folder vs. CoS.

## Reasoning

- **Why absorb Clients into Razzo:** Every client is a Razzo client. Having them as siblings at the top level created split context — a proposal session would start in Razzo but reference Clients, or vice versa. One folder = one session.
- **Why lowercase_with_underscores:** APFS is case-insensitive, so renames like `Razzo` → `razzo` needed a two-step process (`mv Foo foo.tmp && mv foo.tmp foo`). Git repos inside needed `git mv -f`. The convention matches Unix standard practice and avoids quoting hell in shell scripts.
- **CWD hazard lesson:** Renaming the directory you're currently in breaks the bash shell process. Plan for this: either do top-level renames last, or use a bash process running from a parent directory. Task agents (fresh processes) are the right workaround once it happens.
- **Pattern to remember:** When a "concurrent session" commits mid-task (session-capture auto-commit), it will sweep up all pending changes. This is a quirk of sessions running simultaneously — the last `git add -A` wins. Not necessarily bad, but worth knowing.

## Changes Made

**Files written/edited (from transcript):**
- [[/Users/jtnt/Documents/Projects/CLAUDE.md]] — created (new shared context layer)
- [[chief_of_staff/project-sources.md]] — all paths updated to lowercase
- [[chief_of_staff/project-index.md]] — all paths updated, Clients → Razzo Clients
- [[chief_of_staff/CLAUDE.md]] — folder structure updated, Session Routing section added
- [[chief_of_staff/tools/dashboard/js/app.js]] — hardcoded 'Chief of Staff' string updated
- [[/Users/jtnt/Documents/Projects/razzo/CLAUDE.md]] — lowercase folders + Clients section
- [[/Users/jtnt/Documents/Projects/razzo/clients/CLAUDE.md]] — Razzo reference path updated
- [[/Users/jtnt/Documents/Projects/razzo/.gitignore]] — added `clients/`
- [[/Users/jtnt/.claude/settings.json]] — 9 permission paths updated
- [[/Users/jtnt/.claude/skills/session-capture/SKILL.md]] — Chief of Staff paths updated
- [[/Users/jtnt/.claude/skills/review-patterns/SKILL.md]] — path updated
- [[/Users/jtnt/.claude/skills/link/SKILL.md]] — path updated
- [[/Users/jtnt/.claude/skills/note/SKILL.md]] — path updated
- [[/Users/jtnt/.claude/skills/razzo-proposal/SKILL.md]] — Clients z_context path updated
- [[/Users/jtnt/.claude/hooks/allow-cos-edit.sh]] — hardcoded path updated
- [[/Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief_of_staff/memory/MEMORY.md]] — updated with new paths, added Folder Structure section

**Git commits:**
- Razzo: "Restructure: lowercase folders, absorb Clients, add shared context" (+ pre-restructure snapshot commit)
- CoS: changes swept into concurrent writing session commit

## Open Items

- Verify that JRAD (nested git repo under `razzo/clients/jrad/`) still has its git remote configured and can push/pull correctly
- Session-capture will now log to `chief_of_staff/` path — verify next session that the auto-capture SessionEnd hook fires correctly with new path
- Auto-memory path-encoded dirs: `~/.claude/projects/-Users-jtnt-Documents-Projects-chief_of_staff/` (new lowercase) vs `-Users-jtnt-Documents-Projects-Chief-of-Staff/` (old) — confirm new sessions load MEMORY.md from the right location
- Gmail and Google Calendar MCP reconnection: user reconnected via claude.ai but CLI still shows "Failed to reconnect" — may need MCP server restart or settings.json update
