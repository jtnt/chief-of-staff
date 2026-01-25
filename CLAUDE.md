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
├── Weekly Reviews/                     # Periodic synthesis documents
│
├── CLAUDE.md                           # Instructions for Claude Code (this file)
├── project-knowledge.md                # About Chief of Staff itself (system state, decisions)
├── project-index.md                    # Summaries of all tracked projects
└── project-sources.md                  # External project folder locations for syncing
```

## Where Logs Live (Important)

**Detailed logs live WITH their projects, not in Chief of Staff.**

Each tracked project has its own `logs/` folder:
```
Razzo/
├── logs/
│   ├── 20260109-sync.md
│   └── 20260111-storybrand-sync.md
├── project-knowledge.md
└── CLAUDE.md

Context Profile Framework/
├── logs/
│   └── 20260109-sync.md
├── project-knowledge.md
└── CLAUDE.md
```

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


## Workflow Commands

- **`/log`** - Quick capture: creates a log entry in `./logs/` (no git, no sync)
- **`/save`** - Full workflow: log + git commit/push + syncs to Chief of Staff

**Locations:**
- `/Users/jtnt/.claude/commands/log.md`
- `/Users/jtnt/.claude/commands/save.md`

## Syncing Chief of Staff Itself

**IMPORTANT:** Chief of Staff tracks its own work just like any other project.

When running `/log` or `/save` while working IN the Chief of Staff repo:

1. Create log entry in `logs/YYYYMMDD-[identifier].md` documenting what was done
2. Update `project-knowledge.md` as needed
3. If `/save`: commit and push to git (but skip CoS sync - we ARE CoS)

**Do NOT skip the log entry step.** Chief of Staff maintains its own activity log in `logs/` just like all other tracked projects.

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
- "Random thought" / "Quick note" / sharing a quote or personal idea
- Anything that sparked an idea, relates to current projects, or could become content
- Response: Capture as a thought or confirm: "Sounds like a thought. Want me to save this?"
- **Filename convention:** Use descriptive filenames that will be searchable and distinguishable later (e.g., `20260114-maven-ai-product-sense-vibe-code-personal-os.md` not `20260114-maven-course.md`). Include enough detail to differentiate from similar items.

**Links** - When user shares a URL:
- Assess the content type and propose the right destination:
  - **Thoughts** - Ideas, inspiration, content seeds, things related to active projects
  - **Resources** - Reference materials, guides, documentation, how-to articles for later use
- Propose destination with brief rationale and ask for confirmation
- Example: "This looks like a reference guide for CLAUDE.md structure - I'd put it in Resources/Claude Code/. Sound right?"

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
- `/meeting-review` - Review recent meetings, match with Granola transcripts, capture briefings

### Project Routing (Bidirectional Flow)

When check-in content relates to a tracked project:

**Push to project (bidirectional):**
1. Ask user: "This mentions [Project]. Want me to add it to that project's inbox?"
2. If yes, write to project's inbox: `/Users/jtnt/Documents/Projects/[ProjectName]/cos-inbox.md`
   - If file doesn't exist, create it with standard structure (Pending / Archive sections)
   - Add entry under "## Pending" with: date, source, context, content
3. ALSO create log in project: `[ProjectName]/logs/YYYYMMDD-checkin-note.md` (keeps record with project)

**When the user opens that project:**
- SessionStart hook checks for `cos-inbox.md` and injects `COS_INBOX` flag
- Claude notifies: "You have X item(s) from Chief of Staff" and lists them
- User decides what to do (act on, archive, discuss)

**Original check-in stays in Check-Ins/ folder** (single source of truth)

**Journal entries are never routed** (always private)

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

- **Context Profile Framework** (Active): Framework + service for AI context libraries. Source tracked in `project-sources.md`.
- **Razzo** (Active): AI training for sales/marketing teams. Sprint-first go-to-market strategy.
- **Caregiver App** (Paused): Web app for caregiver communication. Early stage, not actively being worked on.
