---
date: 2026-02-08 12:00 PM PST
title: CoS System Cleanup and Task Architecture
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/8d50e22d-4042-4f57-bb7c-a757019aca6d.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: CoS System Cleanup and Task Architecture

## What Was Done

Conducted a comprehensive cleanup and reorganization of the Chief of Staff system, establishing clearer conventions for task management across all tracked projects.

**Key accomplishments:**

1. **Trimmed project-index.md** from 720 → 275 lines (62% reduction)
   - Cut session-log-level detail from Recent Work sections (should live in project logs/)
   - Reorganized into sections: Active Projects, Client Projects, Utility Tools, Other Projects
   - Kept only 2-4 strategic highlights per project

2. **Archived AirOps project**
   - Created `z_archive/` folder
   - Moved `AirOps Cohort Feb 2026` folder there
   - Removed from `project-index.md` and `project-sources.md`

3. **Reorganized JRAD**
   - Moved folder from `Projects/JRAD` → `Projects/Clients/JRAD`
   - Updated both index files with new path
   - Marked as "Client - Inactive / On Request"
   - Created minimal `project-knowledge.md` with DNS completion in Done section

4. **Established task architecture convention**
   - **Tasks are ALWAYS per-project** — never aggregate across projects
   - **`## Tasks` goes at TOP** of project-knowledge.md (after title/header)
   - **`### Done` keeps last 5 completed items** — older items roll to `completed-tasks.md`
   - CoS uses Inbox → Active → Backlog → Done; external projects use flat list + Done

5. **Fixed task section placement**
   - Moved `## Tasks` to top in 5 project-knowledge.md files: CoS, Razzo, CPF, Beekeeper, JRAD
   - Updated 4 instruction files (CoS CLAUDE.md, project-knowledge.md, thought skill, evening skill, meeting-processor agent)
   - Updated global `~/.claude/CLAUDE.md` with task management section

6. **Created completed task archival system**
   - Established `completed-tasks.md` convention for per-project archives
   - Created `completed-tasks.md` for CoS (replacing misnamed `completed-items.md`)
   - Documented convention in CoS CLAUDE.md and global CLAUDE.md
   - Updated auto memory with "tasks are always per-project" principle

7. **Comprehensive system audit and fixes**
   - Fixed Writing project-knowledge.md bug (had copy-pasted CoS template text)
   - Created 8 minimal project-knowledge.md files for projects missing them:
     - Job Search, Chatbot Linebreaker, Feed Digest
     - LinkedIn My Posts Extractor, LinkedIn Scraper Extension, qontext-clone
     - Mythos-More Vang, Party Rental
   - Deleted 3 deprecated files: `CLAUDE.md.bak`, `completed-items.md.bak`, `cos-inbox.md.deprecated`
   - Updated global CLAUDE.md backup policy: .bak only for non-git-tracked files

8. **Post-compact work**
   - Added task archival convention to global CLAUDE.md (missing after initial update)
   - Committed dashboard improvements and project-knowledge.md updates
   - Moved "Client-facing envoy skills" task from Active to Backlog

## Key Decisions

1. **Tasks at top of project-knowledge.md** — More usable in Obsidian and dashboard. Tasks are current state, should appear before historical context.

2. **Per-project task archives** — Each project owns its own `completed-tasks.md` rather than centralizing. Preserves project portability and enables per-project analysis.

3. **Keep last 5 in Done section** — Balances context (recent completions visible) with file size (full history in archive).

4. **No .bak files for git-tracked projects** — Git history is the backup. Only use .bak for non-git-tracked system files.

5. **Minimal project-knowledge.md for all projects** — Even utility tools and paused projects get the standard structure. Makes the system predictable.

## Reasoning

**Why tasks at top over tasks at end:**
- Obsidian users interact with tasks frequently — having them below 200+ lines of context creates friction
- Dashboard pulls tasks first — file structure should match usage pattern
- Current state (tasks) is more immediately relevant than historical context

**Why per-project archives over centralized:**
- Logs live WITH projects, not in CoS — same principle applies to task history
- When you move/archive a project, its complete history (logs + tasks) travels with it
- Cross-project analysis can still search across `completed-tasks.md` files
- Violating "tasks are per-project" creates the same confusion we saw with JRAD completion appearing in CoS file

**Why explicit task management section in global CLAUDE.md:**
- Convention was only in CoS CLAUDE.md and auto memory
- Skills running in other projects had no visibility
- Global conventions need global documentation

## Changes Made

**Chief of Staff repo:**
- `project-index.md` — trimmed from 720 → 275 lines, reorganized sections
- `project-sources.md` — removed AirOps, updated JRAD path
- `project-knowledge.md` — Tasks moved to top, task item removed, architecture decision updated
- `CLAUDE.md` — task placement instruction, completed task archival convention
- `completed-tasks.md` — created (replacing `completed-items.md`)
- Deleted: `CLAUDE.md.bak`, `completed-items.md.bak`, `cos-inbox.md.deprecated`

**Project repos:**
- `Razzo/project-knowledge.md` — Tasks moved to top, added Done subsection
- `Context Profile Framework/project-knowledge.md` — Tasks moved to top, fixed stray "done:" tag
- `Clients/Beekeeper Group/project-knowledge.md` — Tasks moved to top, added Done subsection
- `Clients/JRAD/project-knowledge.md` — created with DNS completion in Done section
- [[Writing/project-knowledge.md]] — Tasks moved to top, removed copy-paste bug
- Created minimal `project-knowledge.md` for 8 projects (listed above)

**Global system files:**
- `~/.claude/CLAUDE.md` — added Task Tracking section, updated .bak policy
- `~/.claude/skills/thought/SKILL.md` — task placement instruction
- `~/.claude/skills/evening/SKILL.md` — task placement instruction
- `~/.claude/agents/meeting-processor.md` — task placement instruction
- `~/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/memory/MEMORY.md` — added Task System section

**Folder moves:**
- `Projects/JRAD` → `Projects/Clients/JRAD`
- `Projects/AirOps Cohort Feb 2026` → `Projects/z_archive/AirOps Cohort Feb 2026`

**Dashboard:**
- Cross-project task aggregation improvements
- Two-column project page layout
- Collapsible sections

**Git commits (Chief of Staff):**
1. `95e1565e` — Dashboard updates and minor file changes
2. `63fcc4a3` — CoS system cleanup: trim index, tasks at top, per-project archives
3. `0674ab42` — Dashboard: cross-project tasks and project page improvements

## Open Items

None identified. All cleanup work completed, conventions documented, and changes committed/pushed.
