# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

This is a personal Chief of Staff system - a knowledge management and strategic planning repository, not a codebase. The purpose is to help the user track work across multiple projects, synthesize information, analyze patterns, and make strategic decisions.

## At the Start of Each Session

Always read these two files first:
1. **`project-knowledge.md`** - About Chief of Staff itself (system state, recent CoS work, key decisions)
2. **`project-index.md`** - Summaries of all tracked projects (status, recent work, open items)

Together these maintain context across sessions.

### Logs Are the Primary Source

**When analyzing recent work across projects, read the `logs/` folders first - not git history.**

Logs capture what git commits don't: decisions, rationale, context, open items. Git commits are terse; logs are narrative. The whole point of maintaining logs is to use them.

- To understand what happened in a project: read its `logs/` folder
- To understand cross-project patterns: read logs from multiple projects
- Git history is a fallback, not the primary source

### Meta-Work Balance Check

After reading those files, check the meta-work ratio from recent logs:

1. List files in `logs/` folder from the last 7 days
2. Read each log's `Session Type` field (if present)
3. Count: project-work, meta-work, mixed, planning sessions
4. Calculate: meta-work sessions / total sessions

**If meta-work ratio > 30%, display warning:**
```
---
META-WORK ALERT

Last 7 days: X of Y sessions were meta-work (Z%)
Target: 20% meta-work

The Chief of Staff system is working. Consider focusing on Razzo or CPF revenue work today.
---
```

**Notes:**
- Logs without Session Type field = skip (don't count either way)
- Mixed sessions count as 0.5 meta-work
- Planning sessions are neutral (don't count toward ratio)
- This is informational, not blocking - user decides what to do

### Auto-Sync on Session Start

When a Chief of Staff session starts, a SessionStart hook injects the `AUTORUN_SYNC_ALL` flag via additionalContext.

**When you see this flag in the session context:**
1. Immediately (without asking) run the project sync workflow
2. Read `project-sources.md` to get tracked projects
3. For each project:
   - Read git log since last sync
   - Read key files
   - Create dated sync entry in project's `logs/` folder
   - Update Chief of Staff's project-index.md with summary
4. Update "Last synced" dates in project-sources.md
5. Provide brief summary: "Synced [N] projects: [names]"

This happens automatically - no user confirmation needed.

## Proactive Knowledge Capture

**Goal:** Capture insights continuously throughout the session, not just at session end.

### Session Context File

At the start of any Chief of Staff session where substantive work will happen:

1. **Create `session-context.md`** if it doesn't exist:
```markdown
# Session Context
*Started: [timestamp from `date "+%Y-%m-%d %I:%M %p %Z"`]*

## Session Goals
[What we're trying to accomplish - extracted from user's initial request]

## Decisions Made
[Updated as decisions happen during session]

## In Progress
[Current work being done]

## Open Questions
[Questions that emerged during work]

## Notes for Later
[Insights to merge into project-knowledge.md]
```

2. **Update it throughout the session:**
   - After clarifying session goals
   - After making decisions (capture decision + brief rationale)
   - When switching focus to different work
   - When insights or patterns emerge

3. **After context compaction:** If you notice you've lost context (conversation history seems short), read `session-context.md` immediately to recover what was happening.

### Proactive project-knowledge.md Updates

**Don't wait for session end.** When *significant* things happen, update `project-knowledge.md` immediately:

- Strategic decisions with lasting impact
- Major insights or pattern discoveries
- Completed milestones
- New open questions that need tracking

Use your judgment on "significant" - not every small decision, but anything that should survive even if the session ends unexpectedly.

### Session End

When `/log` or `/save` runs:
1. Merge any remaining `session-context.md` contents into `project-knowledge.md`
2. Delete `session-context.md` after successful merge

This ensures nothing is lost while keeping `project-knowledge.md` as the permanent record.

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
2. **From any project (push):** Run `/save` from that project's Claude Code session

**When user says "update [project]" or "sync all":**

1. Read `project-sources.md` to get source path and last sync date
2. Run `git log --since="[last sync date]"` in source folder to see what changed
3. Read key files listed for that project (e.g., `project-knowledge.md`, `CLAUDE.md`)
4. Create dated sync entry in the project's `logs/` folder documenting:
   - What changed (from git history)
   - Current state summary
   - New insights or open items
5. Update `project-index.md` with refreshed project summary
6. Update "Last synced" date in `project-sources.md`

## Workflow Commands

Two commands for saving work (simplified from the previous three-command system):

- **`/log`** - Quick capture: creates a log entry in `./logs/` (no git, no sync). Use before context compaction or for mid-session checkpoints.
- **`/save`** - Full workflow: creates log + git commit/push + syncs to Chief of Staff via `sync-to-cos.sh` script.

**Key insight:** Logs are created by Claude (who has conversation context), while cross-repo sync operations are handled by the `sync-to-cos.sh` script.

**Locations:**
- `/Users/jtnt/.claude/commands/log.md`
- `/Users/jtnt/.claude/commands/save.md`
- `/Users/jtnt/.claude/scripts/sync-to-cos.sh`

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
- "Random thought" / "Quick note" / "Here's a link" / sharing a quote or article
- User pastes a URL or shares something brief and standalone
- Response: Capture as a thought or confirm: "Sounds like a thought. Want me to save this?"
- **Filename convention:** Use descriptive filenames that will be searchable and distinguishable later (e.g., `20260114-maven-ai-product-sense-vibe-code-personal-os.md` not `20260114-maven-course.md`). Include enough detail to differentiate from similar items.

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

**Push to project (bidirectional):**
1. Ask user: "This mentions [Project]. Want me to add it to that project's inbox?"
2. If yes, write to project's inbox: `/Users/jtnt/Documents/Projects/[ProjectName]/cos-inbox.md`
   - If file doesn't exist, create it with standard structure (Pending / Archive sections)
   - Add entry under "## Pending" with: date, source, context, content
3. ALSO create log in project: `[ProjectName]/logs/YYYYMMDD-checkin-note.md` (keeps record with project)

**When the user opens that project:**
- Global `~/.claude/CLAUDE.md` instructs Claude to check for `cos-inbox.md` at session start
- Claude notifies: "You have X item(s) from Chief of Staff" and lists them
- User decides what to do (act on, archive, discuss)

**Original check-in stays in Check-Ins/ folder** (single source of truth)

**Journal entries are never routed** (always private)

## Cowork Mode vs CLI Differences

**IMPORTANT:** Chief of Staff was originally designed for Claude Code CLI but is now also used in Cowork mode (Claude desktop app). These environments have different capabilities:

### CLI (Command Line)
- ✅ Slash commands work (`/journal`, `/morning`, `/log`, `/save`, etc.)
- ✅ All custom commands in `~/.claude/commands/` accessible
- ✅ Full MCP connector availability
- ✅ Can read files anywhere on system (within permissions)

### Cowork Mode (Desktop App)
- ❌ Slash commands return "Unknown skill" errors
- ❌ Cannot access `~/.claude/commands/` (outside workspace folder)
- ⚠️ Limited MCP connector availability (some work, some don't)
- ❌ Can only read files in selected workspace folder

### Working in Cowork Mode

**For check-ins:**
- Use natural language triggers instead of slash commands
- "I want to make a journal entry" instead of `/journal`
- "Let's do a morning check-in" instead of `/morning`

**For knowledge updates:**
- Say "run the save workflow" or "create a log entry" and I'll execute it
- User can upload command files directly if needed
- Natural language requests work: "save my progress" or "create a session log"

**For git operations:**
- ✅ Git works normally (commit, push, etc.)
- ✅ File operations work (read, write, edit)
- ✅ Bash commands work within workspace

**Design principle:** Workflows should work in both environments. Use natural language triggers as primary interface, slash commands as CLI convenience.

### Known Issue: Cowork May Set Local Git Config

Cowork mode (and possibly Claude Code on web) may set a **local git config** in the repo that overrides global settings. This can cause GitHub push failures with "GH007: Your push would publish a private email address."

**To check:** `git config --local user.email`

**To fix:** `git config --local --unset user.email`

If push fails after using Cowork, check for local git config overrides first.

## Calendar Preferences

When checking calendar or asking "what's on my calendar":
- Always check BOTH calendars: `primary` (jtntolson@gmail.com) and `nicholas@razzohq.com`
- Combine and show events from both calendars

## Current Projects

- **Context Profile Framework** (Active): Framework + service for AI context libraries. Source tracked in `project-sources.md`.
- **Razzo** (Active): AI training for sales/marketing teams. Sprint-first go-to-market strategy.
- **Caregiver App** (Paused): Web app for caregiver communication. Early stage, not actively being worked on.
