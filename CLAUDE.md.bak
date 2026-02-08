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
├── Tasks/                              # Detailed specs for complex tasks (linked from cos-inbox.md)
│   └── YYYYMMDD-*.md                   # Task specs with checklists and context
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

## Resources Folder

**When adding to Resources:**
- Extract and synthesize - don't just dump raw content
- Write clear summaries with examples
- Keep materials project-agnostic (specific applications go in project folders)
- Use descriptive filenames

## Inbox & Tasks

**`cos-inbox.md`** is the central task list. Uses Obsidian-native checkboxes (`- [ ]` / `- [x]`).

**Sections:** Inbox (untriaged) → Active (this week) → Backlog (later) → Done (completed)

**Task line format:**
```
- [ ] **Title** — one-line context `#source` `2026-02-07` [[optional Tasks/link]]
```

- `#source` tags: `#meeting`, `#session`, `#thought`, `#link`, `#manual`
- Sub-tasks indent under parent (max 3; use Tasks/ file + wikilink for more)
- New items go to `## Inbox` (newest at top). User triages to Active or Backlog.
- Completed items: `- [x]` with `done:YYYY-MM-DD` appended

**Tasks/ folder** holds detailed specs for complex tasks, linked from inbox via `[[wikilinks]]`.

**When adding to Tasks/:**
- Use descriptive filenames: `YYYYMMDD-description.md`
- Include YAML frontmatter with `status: active` and `created:` date
- If a task grows into a larger project, migrate it to a tracked project folder

**When routing to a project inbox:** Add a checkbox line under `## Pending` (external projects keep Pending/Archive sections):
```
- [ ] **Title** — context `#source` `YYYY-MM-DD`
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

1. Ask user: "This mentions [Project]. Want me to add it to that project's inbox?"
2. If yes, write to: `/Users/jtnt/Documents/Projects/[ProjectName]/cos-inbox.md`
   - Create file if needed (Pending / Archive sections)
   - Add checkbox line under `## Pending` (newest at top):
     ```
     - [ ] **Title** — context `#source` `YYYY-MM-DD`
     ```
3. Also create project log: `[ProjectName]/logs/YYYYMMDD-checkin-note.md`

**On project open:** SessionStart hook checks for `cos-inbox.md` → injects `COS_INBOX` flag → Claude notifies user.

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
