# Chief of Staff: Project Knowledge

**Last Updated:** 2026-02-09 21:20 EST

## Tasks

### Inbox

- [ ] **Implement PreCompact handover hook**
	- Auto-generate handover summary before context auto-compaction. Complements SessionEnd auto-capture. Plan drafted in `~/.claude/plans/gentle-foraging-tiger.md` `#session` `2026-02-09`

### Active

- [ ] **I-Corps mentor prep**
	- NSF program application via Glenn Hellman `#meeting` `2026-02-02` [[Tasks/20260203-icorps-mentor-prep.md]]
  - [ ] Complete mentor interest form `due:2026-02-10`
  - [ ] Take I-Corps prep course `due:2026-02-10`
  - [ ] Schedule video interview with Glen `due:2026-02-10`

### Backlog

- [ ] **Build client-facing envoy skills from Razzo worksheets**
	- Apply envoy framework to AI Workflow Opportunity Worksheet and Planning Template `#session` `2026-02-03` [[Tasks/20260203-envoy-client-skills-plan.md]]
- [ ] **Review Boris Cherny's Claude Code tips**
	- 10 tips from Claude Code creator `#link` `2026-01-31`
  - [x] Try voice dictation (fn fn) for longer prompts
  - [ ] Add "scrap this and implement the elegant solution" to prompting vocabulary
  - [ ] Build habit: "Update your CLAUDE.md" after corrections
  - [x] Explore `/statusline` customization
  - [ ] Consider building a `/learn` spaced-repetition skill
- [ ] **Review and implement CoS automation recommendations**
	- 5 targeted improvements from analysis sessions `#session` `2026-01-30`
  - [x] Session start visibility improvements
  - [x] Notification hook for background work completion
  - [ ] Block external edits hook
  - [x] Build `/project-health`, `/weekly-review`, `/cross-project-synthesis` skills
- [ ] **Explore insights report suggestions**
	- Workflow automation ideas from Claude Code Insights report `#session` `2026-02-04` [[Tasks/20260204-insights-suggestions-followup.md]]

### Done

- [x] **Fix inconsistent timestamp display on dashboard**
	- Dates shown in various formats across activity feed, log entries, and slide-over meta `#manual` `2026-02-08` done:2026-02-09
- [x] **Improve session-capture log titles**
	- Many logs have generic names like "Beekeeper Group: Session Log" instead of describing what was done; update session-capture skill to generate descriptive titles and filenames `#session` `2026-02-07` done:2026-02-08
- [x] **Test Meeting Review v7**
	- Implemented Sonnet model change for quality extraction `#session` `2026-01-22` done:2026-02-03
- [x] **Update terminology: commands → skills**
	- Not applicable yet; both systems coexist `#manual` `2026-01-26` done:2026-02-03
- [x] **Investigate SessionEnd script delay**
	- Performance issue in auto-capture system `#session` `2026-01-28` done:2026-02-03
- [x] **Check out Sallam from DC Founders Panel**
	- Searched but couldn't find online `#meeting` `2026-01-22` done:2026-01-26

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

### Core Infrastructure
- project-knowledge.md, project-index.md, project-sources.md, CLAUDE.md operational
- Tracking 11 projects (6 active, 5 tools/utilities/paused)
- Three-layer documentation model across all projects (session.md temporary, project-knowledge.md strategic, CLAUDE.md technical)
- Logs live WITH projects in `logs/` folders, not in Chief of Staff
- Bidirectional flow: CoS pushes items to project `## Tasks` sections in `project-knowledge.md`

### Auto-Capture System (replaced /log and /save)
- **SessionEnd hook** spawns background Claude to capture sessions automatically
- `/session-capture` skill: reads transcript → creates log → extracts patterns → updates project-knowledge.md → commits/pushes → syncs to CoS
- `/review-patterns` skill for reviewing CLAUDE.md suggestions from patterns
- `PATTERNS_PENDING` flag surfaced at session start when suggestions exist
- Plan files from `~/.claude/plans/` preserved verbatim in session logs
- Trivial sessions (< 3 user messages or < 2KB) skipped automatically
- `/log` and `/save` commands deprecated

### Strategic Briefing
- Runs 1-3x daily via `BRIEFING_REQUIRED` flag from SessionStart hook
- Format: Calendar → Projects → Content → Inbox → Meetings
- Four-section inbox: Inbox (untriaged) → Active (this week) → Backlog → Done
- Obsidian-native checkbox format (`- [ ]` / `- [x]`) for interactive task management
- Bias toward project deliverables principle embedded in briefing template

### Session Context Loading
- Global CLAUDE.md directive ensures `project-knowledge.md` is read at start of every project session
- Provides automatic continuity without manual "catch me up" requests
- Proactive loading before first response (not reactive/on-demand)
- On-demand log search remains available via session workflow for deeper dives

### Check-In System
- Four skills: `/morning`, `/evening`, `/thought`, `/journal` (converted from commands)
- Model-optimized: morning/evening/journal use Sonnet, thought uses Haiku
- Interactive prompts via `AskUserQuestion` with structured options
- Natural language detection via hooks still operational
- Project routing: check-in content mentioning tracked projects can push to project inboxes

### MCP & External Services
- Google Calendar + Gmail MCP (project-scoped, OAuth via Cloud project `claude-code-484521`)
- Brave Search MCP (user-level, global)
- Notion MCP (project-scoped via `.mcp.json`)

### Tools & Utilities
- Claude.ai conversation extraction tool + `/claude-web-extract` command
- `/humanize` command for AI pattern cleanup
- `/export-session` for readable transcript exports
- Inbox triage plugin built (`/Users/jtnt/Documents/Projects/Code/inbox-triage/`)

---

## Key Decisions

### Architecture Decisions

- **WikiLink standard for file references** (2026-02-08): All session logs and documentation use Obsidian-style WikiLinks (`[[path/to/file]]`) instead of backtick quotes or plain text. Enables backlink navigation and "what references this file?" queries. Session-capture skill enforces this. Retroactively converted 105 logs (436 links). Standard documented in both CLAUDE.md files. See [[logs/20260208-wikilink-documentation.md]].

- **Dashboard write validation** (2026-02-08): All dashboard write operations validate line content before modifying. Prevents wrong-task modifications when external editors (Obsidian, Claude Code) shift line numbers. Falls back to content search when validation fails. See [[session-patterns/20260208-stale-line-number-fix.md]].

- **Auto-capture replaces manual save** (2026-01-28): SessionEnd hook spawns background Claude to capture sessions. Replaced `/log` and `/save` commands. Accepts cross-project limitation (sessions log to cwd only). Trivial sessions auto-skipped.

- **Logs live with projects** (2026-01-14): Each project has its own `logs/` folder. Chief of Staff is an index/dashboard, not a repository. Portable history.

- **Tasks merged into project-knowledge.md** (2026-02-08): Eliminated standalone cos-inbox.md files. Tasks now live as `## Tasks` section at the top of each project's project-knowledge.md. CoS uses four subsections (Inbox/Active/Backlog/Done); external projects use flat list + Done. Same checkbox format, same source tags. One file per project instead of two.

- **Checkbox-based task management** (2026-02-07): Obsidian-native checkbox format. Interactive checkboxes (`- [ ]`/`- [x]`), bold titles, source tags, wikilinks to Tasks/ detail files.

- **Three-tier inbox** (2026-02-03, superseded 2026-02-07): Pending (priority work) → Backlog (meta-work) → Archive. Evolved into four-section checkbox format, then merged into project-knowledge.md.

- **Commands → Skills migration** (2026-01-31): Check-in commands converted to skills with explicit model selection. Skills support modern Claude Code features; commands are legacy.

- **File split** (2026-01-14): `project-knowledge.md` is about Chief of Staff itself. `project-index.md` contains summaries of tracked projects.

- **Three-layer documentation model** (2026-01-09): session.md (temporary), project-knowledge.md (strategic context), CLAUDE.md (technical instructions).

- **Conversation analysis is primary** (2026-01-09): Most valuable insights live in conversations, not file diffs.

### Technical Setup

- `~/.claude/CLAUDE.md` contains documentation model and session workflow instructions
- CLAUDE.md contains instructions for Chief of Staff workflows, project sync, session handling
- Auto-capture via SessionEnd hook → `/session-capture` skill → log + patterns + project-knowledge + git + CoS sync
- GitHub repo established for version control

---

## Recent Work

### 2026-02-09: Dashboard Timestamp and Preview Fixes

Fixed multiple display inconsistencies in CoS dashboard. Timestamps were showing in three different formats (12h/24h with mixed timezones) because formatting function only handled 12-hour format. Preview text was including YAML frontmatter and cutting off at 120 chars due to CSS constraints. Enhanced `formatDisplayDate()` to handle both time formats with timezone conversion, stripped frontmatter from preview extraction, expanded to 2-line previews with sentence boundaries. Also documented dashboard in CLAUDE.md for discoverability. See [[logs/20260209-dashboard-timestamp-preview-fixes.md]].

### 2026-02-09: PreCompact Handover System Planning

Designed PreCompact hook system to auto-generate handover summaries before context auto-compaction. Complements SessionEnd auto-capture: SessionEnd handles normal session endings, PreCompact handles edge case of long sessions hitting memory limits. Complete implementation plan at `~/.claude/plans/gentle-foraging-tiger.md`. Key decisions: `auto` matcher only (manual compact is intentional), save to working directory (not auto-commit), non-blocking background execution. Task added to Inbox.

### 2026-02-08: WikiLink Documentation Standard

Established WikiLink format (`[[path/to/file]]`) for all file references in session logs and documentation. Updated session-capture skill to enforce this, added documentation to both CLAUDE.md files. Retroactively converted 105 existing logs across all tracked projects (436 WikiLinks created). Cleaned up redundant directives — standard lives in CLAUDE.md, skill references those locations.

### 2026-02-08: Dashboard Data Integrity Fix

Fixed critical stale line number bug in dashboard task writes. When external editors (Obsidian, Claude Code) add/remove lines, dashboard's cached line numbers become stale. Previously could modify wrong task. All write paths now validate line content before modifying, fall back to content search when lines shift, fail safely if task deleted externally. See [[logs/20260208-stale-line-number-fix.md]].

### 2026-02-08: CoS System Cleanup & Task Architecture

Comprehensive system reorganization establishing task management conventions. Trimmed project-index.md (720→275 lines), archived AirOps, moved JRAD to Clients/. Established core principle: tasks are ALWAYS per-project. Moved ## Tasks to top of all project-knowledge.md files. Created completed-tasks.md archival system (last 5 in Done, overflow to archive). System audit fixed Writing PK bug, created 8 minimal PKs for missing projects, deleted deprecated files. Updated global CLAUDE.md with task conventions and .bak policy (git-tracked projects skip .bak). All changes committed/pushed.

### 2026-02-08: Dashboard Cross-Project Tasks & UI Refinements

Restructured dashboard to make home page a true cross-project command center. Added `loadAllTasks()` function that reads all project-knowledge.md files in parallel, aggregates tasks with metadata (project, priority, file path). Replaced CoS-only inbox with per-project collapsible sections — users expand/collapse projects to control info density. Removed stats row (pending tasks, active projects, recent sessions) as informational noise. Project pages now have two-column grid (tasks left, activity right) with logs as activity cards. Findings: flat lists with inline metadata don't scale; hierarchical grouping with collapse/expand works much better. Stats should drive action or be removed.

---

## Open Items

- **SessionEnd exit delay** — Auto-capture adds ~20 second delay on session exit. Not blocking but worth investigating if it gets worse.
- **Cross-project session limitation** — Sessions log to cwd only. If a session touches multiple projects, secondary projects don't get logs. User can manually point at transcript for relevant extraction.
- Review saved ContextOS integration plan at `~/.claude/plans/spicy-popping-puzzle.md`

---

## Technical Notes

### Known Issue: Cowork May Set Local Git Config

Cowork mode may set a **local git config** that overrides global settings. This can cause GitHub push failures.

**To check:** `git config --local user.email`
**To fix:** `git config --local --unset user.email`

If push fails after using Cowork, check for local git config overrides first.
