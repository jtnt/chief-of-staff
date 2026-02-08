# Chief of Staff: Project Knowledge

**Last Updated:** 2026-02-07 11:20 PM EST

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

### Core Infrastructure
- project-knowledge.md, project-index.md, project-sources.md, CLAUDE.md operational
- Tracking 11 projects (6 active, 5 tools/utilities/paused)
- Three-layer documentation model across all projects (session.md temporary, project-knowledge.md strategic, CLAUDE.md technical)
- Logs live WITH projects in `logs/` folders, not in Chief of Staff
- Bidirectional flow: CoS pushes items to project inboxes (`cos-inbox.md`)

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

- **Auto-capture replaces manual save** (2026-01-28): SessionEnd hook spawns background Claude to capture sessions. Replaced `/log` and `/save` commands. Accepts cross-project limitation (sessions log to cwd only). Trivial sessions auto-skipped.

- **Logs live with projects** (2026-01-14): Each project has its own `logs/` folder. Chief of Staff is an index/dashboard, not a repository. Portable history.

- **Checkbox-based task management** (2026-02-07): Migrated cos-inbox.md from heading-based prose to Obsidian-native checkbox format. Four sections: Inbox (untriaged) → Active (this week) → Backlog → Done. Interactive checkboxes (`- [ ]`/`- [x]`), bold titles, source tags, wikilinks to Tasks/ detail files. Git-ignores `Tasks/` and `cos-inbox.md` (working state, not code).

- **Three-tier inbox** (2026-02-03, superseded 2026-02-07): Pending (priority work) → Backlog (meta-work) → Archive. Evolved into four-section checkbox format.

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

### 2026-02-07: Session Log Titles Backfill

Added descriptive `title:` field to session-capture skill template. Updated all 286 existing session logs across 11 projects with descriptive titles in both YAML frontmatter and H1 headers. Replaced generic "Session Log" headers with 2-6 word descriptive titles derived from filename identifiers and content. Used 5 parallel agents to process projects concurrently (6-minute wall-clock time vs. 30+ minutes serial). All future session logs will auto-generate descriptive titles.

### 2026-02-07: Inbox Checkbox Restructure

Completed major restructure of task management system. Migrated cos-inbox.md from heading-based prose to Obsidian-native checkbox format with four sections (Inbox → Active → Backlog → Done). Updated 2 hook scripts, briefing template, and 4 producer skills to write/parse new format. Discovered and fixed latent `grep -c` bug (exit code 1 when count is 0). Migrated 3 external project inboxes. Added `Tasks/` and `cos-inbox.md` to `.gitignore`. Pattern file created documenting format migration workflow.

### 2026-02-06: Session Capture Transcript Parsing Fix

Fixed critical bug in `/session-capture` skill where jq commands failed to extract file changes and plan file references from transcripts. Root cause: jq paths looked for `.input.file_path` at top level, but tool calls are nested inside `.message.content[]`. Affected all sessions since auto-capture was implemented. Fixed three extraction points (Files Written/Edited, Files Read, Plan Files). Created pattern file documenting correct transcript parsing structure for future reference.

### 2026-02-06: Session Context Loading

Added directive to global CLAUDE.md to automatically read `project-knowledge.md` at session start for all projects. Closes gap where strategic context went unused unless explicitly requested. Considered reading recent logs but chose project-knowledge.md only to avoid context window bloat — strategic insights should already be synthesized there.

### 2026-02-04: Project Knowledge Backfill & Auto-Capture Fix

Identified that project-knowledge.md files hadn't been updated in over a month across all projects. Root cause: when `/log` and `/save` were replaced by auto-capture, the project-knowledge.md update step was never added to the skill. Added Step 4 (Update Project Knowledge) to `/session-capture` skill. Backfilled all stale project-knowledge.md files.

### 2026-02-04: Insights Report Applied

Applied three priority suggestions from `/insights` usage report (2,142 sessions analyzed): global git workflow standards, file reorganization rules (auto-fix broken references), and autonomy defaults (act on clear tasks, save questions for ambiguous intent).

### 2026-02-04: Project Knowledge Backfill & Auto-Capture Fix

Identified that project-knowledge.md files hadn't been updated in over a month across all projects. Root cause: when `/log` and `/save` were replaced by auto-capture, the project-knowledge.md update step was never added to the skill. Added Step 4 (Update Project Knowledge) to `/session-capture` skill. Backfilled all stale project-knowledge.md files.


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
