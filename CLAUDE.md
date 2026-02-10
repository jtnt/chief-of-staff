# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

This is a personal Chief of Staff system - a knowledge management and strategic planning repository, not a codebase. The purpose is to help the user track work across multiple projects, synthesize information, analyze patterns, and make strategic decisions.

## Session Start: Strategic Briefing

When you see `BRIEFING_REQUIRED` in session context, execute strategic briefing instructions from:
```
~/.claude/hooks/briefing-template.md
```

This runs 1-3x daily (critical workflow). Full steps, edge cases, and format templates are documented in the hook file.

**Quick reference:** Calendar → Projects → Content → Inbox → Meetings

## Proactive Knowledge Capture

**Goal:** Capture significant insights and decisions during sessions so they persist in `project-knowledge.md`.

**When significant things happen** (strategic decisions, major insights, milestones, new blockers), update `project-knowledge.md` immediately:
- Don't wait until session end
- Anything that should survive if session ends unexpectedly should be documented
- Use your judgment on "significant" - not every small decision, but lasting insights

## Important Rules

- **Never guess which project something belongs to.** If it's not clear, ask.
- **Never edit files in external project folders.** Only read from them.
- **When the user says "remind me" or "don't let me forget"**, always create a persistent artifact (task file, inbox item, or note). Never rely on conversational promises.

## Core Responsibilities

1. **Synthesize** - When new documents are added (session summaries, transcripts, notes), extract key information and update `project-knowledge.md`
2. **Organize** - File new content into the appropriate project folder and subfolder
3. **Analyze** - Identify patterns in how time is spent, what's working, what's stuck
4. **Plan** - Help think through priorities, plan days/weeks, and make strategic decisions
5. **Remember** - Maintain continuity by keeping `project-knowledge.md` current

## Folder Structure

```
Chief of Staff/
├── Check-Ins/                          # Personal check-ins and reflections
│   ├── daily/                          # Morning and evening check-ins
│   ├── thoughts/                       # Quick captures (quotes, links, ideas)
│   └── journal/                        # Personal reflections
│
├── logs/                               # Chief of Staff's own session logs
│   └── YYYYMMDD-*.md                   # Dated sync files for CoS itself
│
├── Resources/                          # Reference materials and guides
│   ├── Claude Code/                    # Claude Code documentation
│   └── Donald Miller StoryBrand Framework.md  # Marketing reference
│
├── Tasks/                              # Detailed specs for complex tasks (linked from project-knowledge.md)
│   └── YYYYMMDD-*.md                   # Task specs with checklists and context
│
├── Tools/                              # Interactive tools and utilities
│   └── dashboard/                      # Web-based project dashboard (see Dashboard section)
│
├── Weekly Reviews/                     # Periodic synthesis documents
│
├── CLAUDE.md                           # Instructions for Claude Code (this file)
├── project-knowledge.md                # About Chief of Staff itself (system state, decisions)
├── project-index.md                    # Summaries of all tracked projects
└── project-sources.md                  # External project folder locations for syncing
```

## Where Logs Live (Important)

**Detailed logs live WITH their projects, not in Chief of Staff.**

**Log filename convention:** `YYYYMMDD-[identifier].md` where identifier is 2-4 descriptive words (e.g., `20260204-meeting-review-rewrite.md`, not `20260204-session.md`).

**Why:** Projects are portable. When you move/archive a project, its complete history travels with it. Chief of Staff is an index/dashboard, not a repository.

**Chief of Staff's role:**
- Maintains `project-index.md` with **summaries** of each tracked project
- Maintains `project-knowledge.md` for CoS system info (its own state, decisions, work)
- Reads from project `logs/` folders when it needs detail
- Has its own `logs/` folder for Chief of Staff system work

## Dashboard

**Location:** `Tools/dashboard/`

A browser-based dashboard for visualizing and managing projects, tasks, and activity:
- **Home**: Cross-project task inbox, recent activity feed, health alerts
- **Project pages**: Per-project tasks, logs, patterns, and knowledge
- **Patterns**: Session pattern analysis with CLAUDE.md suggestions
- **Health**: Project health metrics (PK freshness, inbox load, documentation)

**Key files:**
- `index.html` - Home page with cross-project view
- `project.html` - Individual project dashboard
- `patterns.html` - Session patterns browser
- `health.html` - Project health dashboard
- `js/app.js` - Core application logic and date formatting

**Opening:** Open `Tools/dashboard/index.html` in Chrome. Uses File System Access API for live file editing.

## When Updating project-index.md

- Update the "Last Updated" date at the top
- Keep project status current (Active, Paused, Completed)
- Move completed open items out; add new ones
- Add to "Patterns & Observations" when cross-project insights emerge
- Keep it concise - this is a summary, not an archive

## When Updating project-knowledge.md (CoS itself)

- Update the "Last Updated" date
- Document significant decisions about the CoS system
- Update "Current State" when capabilities change
- Keep "Recent Work" section current with CoS system work
- This is about Chief of Staff itself, not tracked projects

## Documentation Standards

**WikiLinks:** Always use Obsidian-style WikiLinks (`[[filename]]` or `[[path/to/filename]]`) when referencing files in documentation and session logs. This creates backlinks in Obsidian for better cross-referencing. Examples:
- File in same project: `[[project-knowledge.md]]`
- File in subdirectory: `[[logs/20260208-session.md]]`
- File in another project: `[[../Writing/standards/elements-of-style.md]]`

Never use plain text file references or markdown links for internal files.

## Resources Folder

**When adding to Resources:**
- Extract and synthesize - don't just dump raw content
- Write clear summaries with examples
- Keep materials project-agnostic (specific applications go in project folders)
- Use descriptive filenames

## Tasks

Tasks live in the `## Tasks` section at the **top** of each project's `project-knowledge.md` (right after the title/header). Uses Obsidian-native checkboxes (`- [ ]` / `- [x]`).

**CoS project-knowledge.md** uses subsections: `### Inbox` (untriaged) → `### Active` (this week) → `### Backlog` (later) → `### Done` (completed)

**External projects** use a flat list under `## Tasks` with a `### Done` subsection.

**Task line format:**
```
- [ ] **Title**
	- Context description `#source` `2026-02-08` [[optional Tasks/link]]
```

- Title goes on the first line (checkbox + bold title only)
- Description/context goes on an indented sub-bullet (tab + `- `)
- `#source` tags: `#meeting`, `#session`, `#thought`, `#link`, `#manual`
- Sub-tasks indent under parent as checkboxes (`- [ ]`); max 3, use Tasks/ file + wikilink for more
- New items go to `### Inbox` in CoS, or top of `## Tasks` in external projects (newest at top). User triages to Active or Backlog.
- Completed items: `- [x]` with `done:YYYY-MM-DD` appended

**Completed task archival:** The `### Done` section in `project-knowledge.md` keeps only the **last 5** completed items. When a new item completes and pushes past 5, move the oldest to the project's `completed-tasks.md` file (newest at top). Create the file if it doesn't exist. Tasks are always per-project — never aggregate completed items from multiple projects into one file.

**Tasks/ folder** holds detailed specs for complex tasks, linked from Tasks section via `[[wikilinks]]`.

**When adding to Tasks/:**
- Use descriptive filenames: `YYYYMMDD-description.md`
- Include YAML frontmatter with `status: active` and `created:` date
- If a task grows into a larger project, migrate it to a tracked project folder

**When routing to a project's tasks:** Add to `## Tasks` section in that project's `project-knowledge.md`:
```
- [ ] **Title**
	- Context description `#source` `YYYY-MM-DD`
```

**Note:** Auto-capture skips the CoS sync step for this repo (we ARE CoS).

## Check-In System

**See global CLAUDE.md** (`~/.claude/CLAUDE.md`) for check-in triggers, commands, and natural language detection.

### CoS-Specific: Folder Structure

```
Check-Ins/
├── daily/           # Morning and evening check-ins
├── thoughts/        # Quick captures (quotes, links, ideas)
└── journal/         # Personal reflections (never routed)
```

**Filename convention for thoughts:** Use descriptive, searchable filenames (e.g., `20260114-maven-ai-product-sense-vibe-code-personal-os.md` not `20260114-maven-course.md`).

### CoS-Specific: Project Routing

When check-in content relates to a tracked project:

1. Ask user: "This mentions [Project]. Want me to add it to that project's tasks?"
2. If yes, add to `## Tasks` section in that project's `project-knowledge.md` (newest at top):
     ```
     - [ ] **Title**
     	- Context description `#source` `YYYY-MM-DD`
     ```
   If no `## Tasks` section exists, append one at the end of the file.
3. Also create project log: `[ProjectName]/logs/YYYYMMDD-checkin-note.md`

**On project open:** SessionStart hook checks `project-knowledge.md` for pending tasks → injects `COS_INBOX` flag → Claude notifies user.

**Original check-in stays in Check-Ins/** (single source of truth). Journal entries never routed.

## Note: Cowork Mode Git Config Issue

If git push fails with "GH007: Your push would publish a private email address" after using Cowork mode:

```bash
git config --local --unset user.email
```

Then retry push. Otherwise, workflows are identical to CLI.

## Calendar Preferences

When checking calendar or asking "what's on my calendar":
- Always check BOTH calendars: `primary` (jtntolson@gmail.com) and `nicholas@razzohq.com`
- Combine and show events from both calendars

## Current Projects

See `project-sources.md` for full list with paths and sync dates.
