# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

This is a personal Chief of Staff system - a knowledge management and strategic planning repository, not a codebase. The purpose is to help the user track work across multiple projects, synthesize information, analyze patterns, and make strategic decisions.

## At the Start of Each Session

Always read `project-knowledge.md` first. This is the living document that maintains context across sessions - current project status, recent decisions, open items, and observations.

### Auto-Sync on Session Start

When a Chief of Staff session starts, a SessionStart hook injects the `AUTORUN_SYNC_ALL` flag via additionalContext.

**When you see this flag in the session context:**
1. Immediately (without asking) run the project sync workflow
2. Read `project-sources.md` to get tracked projects
3. For each project:
   - Read git log since last sync
   - Read key files
   - Create dated sync entry in Projects/[Name]/YYYYMMDD-sync.md
   - Update project-knowledge.md with new information
4. Update "Last synced" dates in project-sources.md
5. Provide brief summary: "Synced [N] projects: [names]"

This happens automatically - no user confirmation needed.

## Important Rules

- **Never guess which project something belongs to.** If it's not clear, ask.
- **Never edit files in external project folders.** Only read from them.

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
├── Projects/                           # Project-specific tracking and logs
│   ├── Caregiver App/                  # YYYYMMDD-*.md sync files only
│   ├── Chief of Staff/                 # YYYYMMDD-*.md sync files only
│   ├── Context Profile Framework/      # YYYYMMDD-*.md sync files only
│   ├── LinkedIn My Posts Extractor/    # YYYYMMDD-*.md sync files only
│   ├── LinkedIn Scraper Extension/     # YYYYMMDD-*.md sync files only
│   └── Razzo/                          # YYYYMMDD-*.md sync files only
│
├── Resources/                          # Reference materials and guides
│   ├── Claude Code/                    # Claude Code documentation
│   └── Donald Miller StoryBrand Framework.md  # Marketing reference
│
├── Weekly Reviews/                     # Periodic synthesis documents
│
├── CLAUDE.md                           # Instructions for Claude Code (this file)
├── project-knowledge.md                # Master context (update frequently)
└── project-sources.md                  # External project folder locations for syncing
```

## Projects Folder Standard

**CRITICAL RULE:** Each project folder under `Projects/` contains **ONLY dated sync files** (format: `YYYYMMDD-*.md` or `YYYYMMDD-[identifier]-sync.md`).

**Do NOT:**
- Create subfolders (reference/, session-logs/, strategy/, etc.)
- Duplicate project-knowledge.md files
- Store project content or reference materials
- Create any structure beyond flat dated sync files

**Why:** Chief of Staff tracks projects, it doesn't store their content. All actual project files (project-knowledge.md, CLAUDE.md, code, docs) live in the real project folders. Chief of Staff only maintains sync logs documenting what changed and what was learned.

**Each sync file should contain:**
- Date and context
- What changed (from git history, file reads)
- Current state summary
- Key insights or decisions
- Open items or next steps

## When Updating project-knowledge.md

- Update the "Last Updated" date
- Keep project status current (Active, Paused, Completed)
- Move completed open items out; add new ones
- Add to "Patterns & Observations" when insights emerge
- Keep it concise - this is a summary, not an archive

## Document Types You May Receive

- **Session summaries**: Like the Razzo Sprint positioning doc - extract strategic insights and open items
- **Meeting transcripts**: Summarize key decisions and action items
- **AI chat transcripts**: Pull out what was decided or built
- **Strategy documents**: File in appropriate project folder, reference key points in project-knowledge.md
- **Raw notes**: Help organize and clarify
- **Podcast transcripts / Reference materials**: Extract insights and save to Resources/ folder

## Resources Folder

The `Resources/` folder contains reference materials that inform strategic work across projects:

- **Marketing frameworks** (e.g., Donald Miller's StoryBrand)
- **Claude Code documentation** (hooks, commands, guides)
- **Industry insights** (transcripts, articles with extracted key points)
- **Methodologies and frameworks** (repeatable approaches)

**When adding to Resources:**
- Extract and synthesize - don't just dump raw content
- Write clear summaries with examples
- Keep materials project-agnostic (specific applications go in project folders)
- Use descriptive filenames

## Session Files in Technical Projects

Some technical/coding projects may have a `session.md` file during active development. This is Claude's working memory for complex sessions.

**Key points:**
- Session files are temporary - used during active work, then deleted
- They capture technical details needed for continuity (CSS selectors, error messages, debugging notes)
- When work completes, lasting technical notes get extracted to that project's CLAUDE.md
- Outcomes and strategic decisions get summarized to that project's project-knowledge.md
- **Do NOT sync session file contents to Chief of Staff** - only sync outcomes from project-knowledge.md

**Lifecycle**: Create during significant work → Update throughout session → Extract notes to CLAUDE.md → Delete session.md

Git commits already capture granular history, so session files don't need to persist long-term.

## Checking Project Status

When asked "what's the status" or "does anything need syncing":

1. Read `project-sources.md` to get all projects and last sync dates
2. For each project, check for changes:
   - **Git repos:** Run `git status --short` (uncommitted changes) + `git log --since="[last sync date]" --oneline` (new commits)
   - **Non-git folders:** Run `find /path -type f -newermt "[last sync date]" -not -path "*/.*" | head -5` (modified files)
3. Report only projects with changes (uncommitted or new commits)
4. Summarize quiet projects briefly (e.g., "3 projects quiet, no changes")

This keeps noise down while ensuring no work is missed.

## Project Sync Workflow

Some projects have external source folders (e.g., separate Claude Code projects). These are tracked in `project-sources.md`.

**Two ways to sync:**

1. **From Chief of Staff (pull):** Say "update [project]" or "sync all" here
2. **From any project (push):** Run `/update-cos` from that project's Claude Code session

**When user says "update [project]" or "sync all":**

1. Read `project-sources.md` to get source path and last sync date
2. Run `git log --since="[last sync date]"` in source folder to see what changed
3. Read key files listed for that project (e.g., `project-knowledge.md`, `CLAUDE.md`)
4. Create dated sync entry: `Projects/[Name]/YYYYMMDD-sync.md` documenting:
   - What changed (from git history)
   - Current state summary
   - New insights or open items
5. Update `project-knowledge.md` with refreshed project summary
6. Update "Last synced" date in `project-sources.md`

## Command Dependencies

Three commands work together and should be modified carefully:

- **`/update-knowledge`** - Updates project-knowledge.md and CLAUDE.md based on conversation analysis
- **`/update-cos`** - Syncs project to Chief of Staff (creates sync entry, updates CoS knowledge files, commits/pushes)
- **`/save-progress`** - All-in-one: calls `/update-knowledge`, then commits/pushes project changes, then calls `/update-cos`

**When modifying these commands:**
- `/update-knowledge` and `/update-cos` are standalone - changes here automatically flow to `/save-progress`
- `/save-progress` orchestrates the other two - it should just call them, not duplicate logic
- Test all three after making changes to any one

**Locations:**
- `/Users/jtnt/.claude/commands/update-knowledge.md`
- `/Users/jtnt/.claude/commands/update-cos.md`
- `/Users/jtnt/.claude/commands/save-progress.md`

## Syncing Chief of Staff Itself

**IMPORTANT:** Chief of Staff tracks its own work just like any other project.

When running `/update-knowledge` or `/save-progress` while working IN the Chief of Staff repo:

1. Update `project-knowledge.md` as normal
2. **Also create a sync entry** in `Projects/Chief of Staff/YYYYMMDD-[identifier]-sync.md` documenting what was done
3. Then commit and push to git

**Do NOT skip the sync entry step.** Chief of Staff maintains its own activity log in `Projects/Chief of Staff/` just like all other tracked projects.

## Check-In System

The Chief of Staff includes a check-in system for daily reflections, planning, and thought capture. Four types:

### Natural Language Detection

Recognize check-in intent from natural language and offer to capture appropriately:

**Morning check-ins** - Triggered by:
- "Good morning" / "Starting my day" / "Here's what I want to do today"
- Response: Offer to do morning check-in or proceed directly

**Evening check-ins** - Triggered by:
- "End of day" / "Wrapping up" / "Here's what I got done"
- Response: Offer to do evening check-in or proceed directly

**Thoughts** - Triggered by:
- "Random thought" / "Quick note" / "Here's a link" / sharing a quote or article
- User pastes a URL or shares something brief and standalone
- Response: Capture as a thought or confirm: "Sounds like a thought. Want me to save this?"

**Journal entries** - Triggered by:
- Extended personal reflection / "I've been thinking about..." / life musings
- Anything introspective about feelings, life, personal matters
- Response: Offer to save as journal entry or confirm: "This sounds like a journal entry. Want me to save it?"

### Slash Commands

Explicit commands are also available:
- `/morning` - Morning check-in with optional prompts
- `/evening` - Evening check-in with optional prompts
- `/thought` - Quick thought capture
- `/journal` - Personal journal entry
- `/review-checkins` - Analyze check-ins for patterns and insights

### Project Routing (Bidirectional Flow)

When check-in content relates to a tracked project:

**Push to project (NEW - bidirectional):**
1. Ask user: "This mentions [Project]. Want me to add it to that project's inbox?"
2. If yes, write to project's inbox: `/Users/jtnt/Documents/Projects/[ProjectName]/cos-inbox.md`
   - If file doesn't exist, create it with standard structure (Pending / Archive sections)
   - Add entry under "## Pending" with: date, source, context, content
3. ALSO create CoS internal log: `Projects/[Name]/YYYYMMDD-checkin-note.md` (keeps CoS record)

**When the user opens that project:**
- Global `~/.claude/CLAUDE.md` instructs Claude to check for `cos-inbox.md` at session start
- Claude notifies: "You have X item(s) from Chief of Staff" and lists them
- User decides what to do (act on, archive, discuss)

**Original check-in stays in Check-Ins/ folder** (single source of truth)

**Journal entries are never routed** (always private)

## Current Projects

- **Context Profile Framework** (Active): Framework + service for AI context libraries. Source tracked in `project-sources.md`.
- **Razzo** (Active): AI training for sales/marketing teams. Sprint-first go-to-market strategy.
- **Caregiver App** (Paused): Web app for caregiver communication. Early stage, not actively being worked on.
