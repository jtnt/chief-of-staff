# Chief of Staff: Project Knowledge

**Last Updated:** 2026-01-19 09:49 PM EST

This file contains information about the Chief of Staff system itself. For summaries of tracked projects, see `project-index.md`.

---

## What This Project Is

Chief of Staff is a personal knowledge management and strategic planning system. It tracks work across multiple projects, synthesizes information, identifies patterns, and supports strategic decision-making.

**Philosophy:** Keep it simple. Markdown files in folders. User provides information, Claude organizes and synthesizes.

---

## Current Priorities

**The Stakes:** Unemployed for nearly a year. Need consistent revenue or will have to pursue full-time employment. Everything else is secondary.

### P0: Revenue Generation (Razzo + CPF)

**Razzo - Get Clients for AI Workflow Sprint**
- Primary revenue path right now
- Sprint offering ($3,500-$5,000) is the lead product
- Actions needed:
  1. **Outreach to existing network** - warm contacts, not cold calling
  2. **Events/networking** - like AI Walks meetup today (Dammon Burden @ ID.me is a potential lead)
  3. **Content creation** - but more targeted/focused (currently over-indexing on content vs. outreach, and content isn't targeted enough)

**Context Profile Framework - Validate with Pilots**
- Need 3-5 pilot customers to test the service
- Purpose: learn real customer needs, find gotchas, test process
- Context engineering is having a moment (context graphs driving attention)
- Timing is good - need to push on this now
- Actions needed:
  1. Define the pilot offering clearly
  2. Find 3-5 companies willing to pilot
  3. Content about context engineering (ride the wave)

### Everything Else: Deprioritized

Chief of Staff system, LinkedIn tools, Caregiver App - these are either infrastructure (CoS) or paused. They don't generate revenue and shouldn't get focus time.

**My job as Chief of Staff:** Keep you focused on Razzo and CPF revenue activities. Flag when you're drifting into non-priority work. Be proactive about this.

---

## Current State

- Initial structure operational (project-knowledge.md, project-index.md, project-sources.md, CLAUDE.md)
- **Simplified workflow commands** - `/log` (quick capture) and `/save` (full workflow) replace the previous three-command system
- Two-way sync workflows built: pull from Chief of Staff ("update [project]") and push from projects (`/save`)
- Tracking 6 projects: Razzo, CPF, Context Profile Builder, LinkedIn My Posts Extractor, LinkedIn Scraper Extension, Caregiver App
- **Three-layer documentation model established** across all projects
- **Smart project status detection** - only checks/reports projects with actual changes
- **Check-in system operational** - Four types for daily planning, reflection, and thought capture
- **Bidirectional flow implemented** - CoS can now push items to project inboxes
- **Proactive knowledge capture** - session-context.md for recovery, immediate p-k.md updates for significant decisions (Chief of Staff only, testing before global rollout)
- **Log restructure complete** - Logs live WITH projects in `logs/` folders, not in Chief of Staff

---

## Key Decisions

### Architecture Decisions

- **Logs live with projects** (2026-01-14): Each project has its own `logs/` folder. Chief of Staff is an index/dashboard, not a repository. When you move/archive a project, its complete history travels with it.

- **Simplified workflow commands** (2026-01-17): Replaced three commands (`/update-knowledge`, `/update-cos`, `/save-progress`) with two simpler ones: `/log` (quick capture) and `/save` (full workflow). Claude writes logs (has conversation context), script handles cross-repo sync (file operations only).

- **Proactive knowledge capture** (2026-01-14): Hybrid approach - session-context.md for recovery after context compaction + immediate project-knowledge.md updates for significant decisions. Testing in Chief of Staff only before considering global rollout.

- **File split** (2026-01-14): `project-knowledge.md` is about Chief of Staff itself. `project-index.md` contains summaries of tracked projects. Clean separation of concerns.

- **Three-layer documentation model** (2026-01-09): session.md (temporary working notes), project-knowledge.md (strategic context), CLAUDE.md (technical instructions). Git commits capture granular history.

- **Conversation analysis is primary** (2026-01-09): Most valuable insights live in conversations, not file diffs. `/update-knowledge` explicitly extracts decisions, strategic shifts, patterns from conversation before checking other sources.

### Technical Setup

- `~/.claude/CLAUDE.md` contains documentation model and "Session Workflow" instruction
- CLAUDE.md contains instructions for Chief of Staff workflows, project sync, and session file handling
- `/log` command creates log entries in `./logs/` (Claude writes, no git/sync)
- `/save` command does full workflow: log + git commit/push + CoS sync via `sync-to-cos.sh` script
- `~/.claude/scripts/sync-to-cos.sh` handles cross-repo operations (updating project-sources.md, committing CoS changes)
- GitHub repo established for version control

---

## Recent Work

### 2026-01-19: Fixed Project Tracking System

**Problem:** The CoS tracking system was broken in three ways:
1. `/save` didn't auto-track new projects (only `/log` did)
2. Sync only updated timestamps, not actual project content
3. CoS work itself wasn't tracked because "CoS doesn't sync to itself"

**Solution:**
- Added Step 0 to `/save` for auto-tracking new projects
- Made sync conversation-driven: log entry → project-index.md content updates
- Added CoS self-tracking: `/save` in CoS now updates project-knowledge.md
- Simplified sync-to-cos.sh to just git operations (Claude handles content)
- Added Job Search project to tracking

**Key design insight:** The log entry IS the intelligence. Claude reads it to update tracking files with meaningful content rather than just timestamps.

### 2026-01-17: Simplified Project Workflow System

**Problem:** Three commands (`/update-knowledge`, `/update-cos`, `/save-progress`) tried to call each other, which didn't work because slash commands can't invoke other slash commands.

**Solution:** Simplified to two commands with clear responsibilities:
- `/log` - Quick capture: Claude analyzes conversation and writes log to `./logs/`. No git, no sync.
- `/save` - Full workflow: creates log + git commit/push + syncs to Chief of Staff via script.

**Key design decisions:**
- Claude writes logs (needs conversation context for decisions, rationale)
- Script (`sync-to-cos.sh`) handles cross-repo sync (just file operations)
- Commands are independent - no trying to call each other

**Files created:**
- `~/.claude/commands/log.md`
- `~/.claude/commands/save.md`
- `~/.claude/scripts/sync-to-cos.sh`

**Files deleted:**
- `~/.claude/commands/update-knowledge.md`
- `~/.claude/commands/update-cos.md`
- `~/.claude/commands/save-progress.md`

**Files updated:**
- `~/.claude/CLAUDE.md` - Updated Session Workflow section, Git Commit Policy
- `Chief of Staff/CLAUDE.md` - Updated workflow documentation throughout

### 2026-01-17: Status Line Display Fix

- Fixed status line breaking "Chief of Staff" across multiple lines
- **Issue:** Status line used `basename` which caused directory name with spaces to wrap
- **Solution:** Changed to display full path (`~/Documents/Projects/Chief of Staff`) instead of just basename
- Modified `~/.claude/settings.json` statusLine command - removed `| xargs basename` pipe
- Full paths render better in terminals than isolated words with spaces
- User preference: No quotes around directory name in display

### 2026-01-16 (evening): Command Automation Fix

- Fixed recurring issue where `/update-knowledge` and `/update-cos` asked for confirmation in Chief of Staff
- **Root cause:** Commands treated Chief of Staff like any other project, requiring manual confirmation
- **Solution:**
  - `/update-cos`: Added Step 0 to detect if we're IN Chief of Staff, skip sync logic, auto-commit/push
  - `/update-knowledge`: Changed to automatically call `/update-cos` when in Chief of Staff (no asking)
- **Result:** Both commands now fully automatic when run in Chief of Staff - no user confirmation needed
- Updated command files: `~/.claude/commands/update-knowledge.md` and `~/.claude/commands/update-cos.md`

### 2026-01-16 (late afternoon): Google Calendar & Gmail MCP Integration

- Set up MCP (Model Context Protocol) servers for Google Calendar and Gmail
- Project-scoped configuration (Chief of Staff only, not global)
- **Google Calendar:** Using `@cocal/google-calendar-mcp` with full calendar access
- **Gmail:** Using `@gongrzhe/server-gmail-autoauth-mcp` with modify + settings access
- OAuth setup process:
  - Created Google Cloud project (`claude-code-484521`)
  - Enabled Calendar API and Gmail API
  - Created web application OAuth client (Desktop app didn't support redirect URIs)
  - Added multiple redirect URIs for different ports (3000, 3500, 3501)
  - Configured OAuth consent screen (External, testing mode)
  - Added user as test user in Audience section
- Configuration stored in `.mcp.json` in project root
- Credentials: `/Users/jtnt/Documents/Projects/Chief of Staff/.claude/gcp-oauth.keys.json`
- Tokens stored globally: `~/.config/google-calendar-mcp/tokens.json` and `~/.gmail-mcp/credentials.json`
- **User preference:** Check BOTH calendars when querying (primary + nicholas@razzohq.com)
- **Known limitation:** Both services have broader permissions than initially desired (Calendar has edit, Gmail has send) but user accepted this trade-off

### 2026-01-16 (afternoon): Context Window Optimization

- Investigated why sessions start at 25% context usage
- Discovered MCP servers (Notion, Playwright, Memory) were consuming ~12% of context with unused tool schemas
- Disabled all three MCP servers → reduced starting context from 25% to 13%
- Initially attempted to optimize CLAUDE.md files (moved writing style to reference file)
- **Key insight:** MCP servers are the real context hogs, not documentation
- Established pattern: Use `/mcp enable [server]` temporarily when needed, disable after

### 2026-01-16 (morning): Transcription Workflow Optimization

- Tested mlx-whisper performance on Mac Silicon across 5 model sizes
- Compared accuracy on medical terminology and technical terms
- **Updated `~/.claude/scripts/transcribe.py`** to use mlx-whisper with medium model as default
- Key findings: Medium model = ~8min for 1hr podcasts, significantly better accuracy than base
- Documented full comparison in `logs/20260116-transcription-optimization-sync.md`

### 2026-01-15: Writing Style Preferences Expanded

- Expanded writing style section in `~/.claude/CLAUDE.md` with additional guidance
- Added: rhetorical questions, self-deprecating humor, thematic bookending
- Added new **Structure & Format** subsection: parallel structure in lists, framework mapping
- Added **Phrases to Avoid (AI-isms)** section with specific forbidden phrases
- Captured thought on AI context requirements → linked to CPF "Context is Everything" post
- Created `cos-inbox.md` for Context Profile Framework project (first use of inbox structure there)

### 2026-01-14 (late night): Proactive Knowledge Capture + Log Restructure

**Part 1: Proactive Knowledge Capture**
- Added "Proactive Knowledge Capture" section to Chief of Staff CLAUDE.md
- Created session-context.md mechanism for recovery after context compaction
- Enabled immediate project-knowledge.md updates for significant decisions
- Scope: Chief of Staff only (testing before global rollout)

**Part 2: Log Restructure**
- Moved all logs from `CoS/Projects/[Name]/` to each project's `logs/` folder
- Projects migrated: Razzo (3 files), CPF (6 files), Context Profile Builder (5 files), Chief of Staff (26 files)
- Deleted `CoS/Projects/` folder entirely
- Chief of Staff is now an index/dashboard, not a repository

**Part 3: Command Clarification**
- Updated `/update-knowledge` to create logs in Step 3 (has conversation context)
- Updated `/update-cos` to NOT create logs (only syncs summaries)
- Clarified that `/save-progress` calls both in order

**Part 4: File Split**
- Split project-knowledge.md into two files
- `project-knowledge.md` - About Chief of Staff itself
- `project-index.md` - Summaries of all tracked projects
- Updated `/update-cos` to write to `project-index.md`

### 2026-01-12 (evening): Cowork Mode Discovery

- Discovered Cowork mode vs CLI have different capabilities
- Slash commands don't work in Cowork mode (CLI-only feature)
- MCP connector availability varies between environments
- Created workarounds using natural language triggers
- Documented in CLAUDE.md with "Cowork Mode vs CLI Differences" section

### 2026-01-10-11: Check-in System + Priority Tracking

- Built four check-in types: /morning, /evening, /thought, /journal
- Natural language detection for all types
- Bidirectional flow: CoS can push items to project inboxes (cos-inbox.md)
- Priority context established with P0 focus on revenue generation
- Created /analyze-sessions and /export-session commands

### 2026-01-09: Initial Setup

- Created Chief of Staff structure
- Built sync workflows (/update-cos, /update-knowledge, /save-progress)
- Established three-layer documentation model
- Added smart project status detection
- Set up GitHub repo

---

## Open Items

- **Proactive capture not being followed** (2026-01-14): The proactive knowledge capture instructions exist in CLAUDE.md but weren't followed during the 2026-01-14 session - no session-context.md created, no proactive p-k.md updates during work. Need to be more disciplined about this in future CoS sessions.
- Consider global rollout of session-context.md pattern if successful (currently CoS-only)
- Review saved ContextOS integration plan at `~/.claude/plans/spicy-popping-puzzle.md`

### Design Note: No Separate Insights File

The original inspiration (screenshot pattern) had three files: context.md, todos.md, insights.md. Our implementation maps these differently:
- **context.md** → `session-context.md` (recovery file)
- **todos.md** → TodoWrite tool (in-memory, ephemeral)
- **insights.md** → Proactive updates to `project-knowledge.md` directly

We chose NOT to have a separate insights file - insights go straight to p-k.md. The "Notes for Later" section in session-context.md can serve as a staging area if needed. This decision can be revisited if the current approach proves insufficient.

---

## Technical Notes

### Known Issue: Cowork May Set Local Git Config

Cowork mode may set a **local git config** that overrides global settings. This can cause GitHub push failures.

**To check:** `git config --local user.email`
**To fix:** `git config --local --unset user.email`

If push fails after using Cowork, check for local git config overrides first.
