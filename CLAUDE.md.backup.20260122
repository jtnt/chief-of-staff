# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

This is a personal Chief of Staff system - a knowledge management and strategic planning repository, not a codebase. The purpose is to help the user track work across multiple projects, synthesize information, analyze patterns, and make strategic decisions.

## Session Start

### CRITICAL: Strategic Morning Briefing

**When you see `BRIEFING_REQUIRED` in session context:**

Your FIRST response MUST be a strategic briefing. A good Chief of Staff surfaces what matters, connects dots, and biases toward high-impact work.

**Step 1: Fetch calendar**
- Call `mcp__google-calendar__list-events` for BOTH `primary` and `nicholas@razzohq.com`
- Time range: today 00:00 to 23:59, timezone America/New_York

**Step 2: Assess ALL project health**
- Read `project-sources.md` to get the list of tracked projects
- For EACH project: use Glob tool (not Bash) to find logs, e.g., `Glob("[project-path]/logs/*.md")` - Glob returns files sorted by modification time
- Read the most recent log file for each project to get status/blockers
- **IMPORTANT:** Use Glob and Read tools only - do NOT use Bash/ls commands (they require permission prompts)
- Categorize projects:
  - 🟢 **Active**: Activity in last 1-2 days, clear momentum
  - 🟡 **Needs Attention**: Blocked, waiting on external response, decision needed, or stale (3+ days no activity)
  - ⚪ **Stable**: Infrastructure/tools projects, no action needed

**Step 3: Assess content/writing**
- Use Glob to check `Writing/Published/**/*.md` for most recent P0-related content
- Use Glob to check `Writing/Drafts/*.md` for anything in progress
- Use Glob to check `Check-Ins/thoughts/*.md` for recent ideas
- **IMPORTANT:** Use Glob and Read tools only - do NOT use Bash commands
- If content gap >7 days or relevant ideas exist: suggest specific content opportunities

**Step 4: Read inbox**
- Read `cos-inbox.md`, extract items under "## Pending"

**Step 4b: Check recent meetings**

Run the meeting review script in status mode to check for unprocessed meetings:

```bash
echo '{"mode": "status", "processed_meetings_path": "/Users/jtnt/.claude/data/processed-meetings.json"}' | python3 ~/.claude/scripts/meeting-review.py
```

**Part A: Recently processed meetings (last 24h)**
- From the script output `recently_processed` array
- For each meeting, show:
  - Meeting title and date
  - `one_line_summary` field (the key takeaway)
  - Any open follow-ups from `follow_ups` array where `status == "open"`
- Group by date (Yesterday, Today, etc.)
- Skip this section if empty

**Part B: Unprocessed meetings (last 7 days)**
- From the script output `unprocessed` array (these have transcripts but no summaries)
- If any exist, note count and suggest running `/meeting-review`
- Skip this section if empty

**Note:** The script now filters out future events automatically - only past meetings appear.

**Step 5: Format strategic briefing**

```
Good morning/afternoon/evening!

## Today's Calendar
- [time] - [event summary]

## Project Health
🟢 ACTIVE
  • [Project] (yesterday): [1-line status from log]
  • [Project] (yesterday): [1-line status]

🟡 NEEDS ATTENTION
  • [Project] (N days): [Blocker or waiting-on context]
  • [Project] (N days): [Decision needed or stale reason]

⚪ STABLE ([list project names])

## Content & Writing
Last P0 content: N days ago - "[Title]" ([Project])
💡 Ready to develop:
  • Ideas: [Recent thought title] (date), [Another idea] (date)
📝 Suggest: [Specific content suggestion based on context]

## Inbox (N items)
1. [First pending item]
2. [Second pending item]

## Recent Meetings
**Yesterday:**
• "[Meeting title]" ([project]) - [one_line_summary from processed-meetings.json]
  ↳ Open: [action item from follow_ups where status="open"]
• "[Meeting title]" - [one_line_summary]

**Earlier this week:**
• "[Meeting title]" (Mon) - [one_line_summary]

📋 **Unprocessed:** N meetings need review
- [Date]: "[Title]" (has transcript)
💡 Run `/meeting-review` to process

---
📊 Meta-work at X% this week (target: 20%)
↳ [Specific suggestion based on what needs attention]

What would you like to focus on?
```

**Key principles:**
- Surface blockers prominently with context
- Connect dots: recent ideas → content opportunities, stale projects → nudges
- Be specific: "Razzo sprint content" not "revenue work"
- Suggest, don't just report: "Consider finishing that draft" vs "Last writing 7 days ago"

**Edge cases:**
- No calendar events: Show "No events scheduled"
- No recent logs for a project: Categorize as 🟡 Needs Attention with "(no recent logs)"
- Empty inbox: Show "Inbox clear"
- Meta-work ≤30%: Omit the meta-work footnote entirely
- All projects active and healthy: Keep it brief, focus on what's next
- No recent meetings processed AND no unprocessed: Omit "Recent Meetings" section entirely
- Only unprocessed meetings (no recent processed): Show only the "Unprocessed" part with count
- Only recently processed (no unprocessed): Show meetings with summaries, omit "Unprocessed" line
- Meetings with open follow-ups: Always show the follow-up items prominently

### Quick References
For deeper context when needed:
- **`project-knowledge.md`** - CoS system state, recent work, decisions
- **`project-index.md`** - All tracked projects (status, summaries)

### Hook-Triggered Behaviors

The SessionStart hook injects `BRIEFING_REQUIRED` along with:
- Pre-calculated meta-work ratio
- Inbox item count
- List of recent CoS log filenames (last 2 days)

You must fetch calendar via MCP and read project data yourself (more flexible, allows context).

**Consider Auto-Sync** - If projects may have changed since last sync, offer to sync or proceed based on user's initial request.

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
