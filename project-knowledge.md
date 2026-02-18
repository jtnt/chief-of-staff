# Chief of Staff: Project Knowledge

**Last Updated:** 2026-02-18 14:02 EST

## Tasks

- [ ] I-Corps mentor prep [[Tasks/20260203-icorps-mentor-prep.md]]
- [ ] Implement PreCompact handover hook
- [ ] Evaluate Carl Vellotti's Personal OS patterns for CoS
- [ ] Evaluate Murchison's AI Chief of Staff patterns for CoS — [[research/20260213_ai-chief-of-staff-claude-code-mike-murchison/]] `#link` `2026-02-13`
- [ ] Build client-facing envoy skills from Razzo worksheets
- [ ] Review Boris Cherny's Claude Code tips
- [ ] Review and implement CoS automation recommendations
- [ ] Explore insights report suggestions
- [ ] Build skill auditor as repeatable skill (audit → regenerate HTML report; quarterly cadence)

### Done


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
- `/review-patterns` skill: generates HTML playground with pre-analyzed suggestions (5 criteria, theme-grouped table, bulk actions) — reduces review from 37 individual judgments to confirm/override
- `PATTERNS_PENDING` flag surfaced at session start when suggestions exist
- Plan files from `~/.claude/plans/` preserved verbatim in session logs
- Trivial sessions (< 3 user messages or < 2KB) skipped automatically
- `/log` and `/save` commands deprecated

### Three-Layer Session Context Model (complete as of 2026-02-18)
- **Layer 1 — Handoff** (SessionStart hook, mechanical): specific in-flight task when `.claude/handoff.md` exists
- **Layer 2 — PK loading** (global CLAUDE.md instruction, every session): reads `./project-knowledge.md` at session start; ambient project awareness
- **Layer 3 — `/resume-project`** (manual, on demand): `nt-resume-project` skill; reads full logs + referenced files; deep context for complex multi-session work

### Quick Capture
- `/link` for URLs → project `research/` folders (saves article + analysis)
- `/note` for ideas/quotes/observations → `Notes/` (renamed from `/thought`)
- `/todo` for task items → project `project-knowledge.md` `## Tasks` (new)

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

- **Projects folder restructure** (2026-02-17): Standardized all project folders to lowercase_with_underscores. Absorbed `Clients/` into `razzo/clients/` (gitignored in Razzo). Created `Projects/CLAUDE.md` as shared context layer. 17 files updated. APFS CWD hazard: renaming the session's working directory breaks bash — use Task agents if it happens. Post-restructure: `~/.claude.json` was missed (separate from `~/.claude/settings.json`) — contained old MCP paths for Gmail/Calendar. Both must be updated during folder renames. See [[logs/20260217-projects-folder-restructure.md]], [[logs/20260217-mcp-path-fix-session-end.md]].

- **System simplification approach** (2026-02-12): Simplification should be structural, not cosmetic. Audit actual usage, delete unused features entirely (not just their docs), match system to workflow (not vice versa). Document what you DO, not what's possible. Implemented: deleted 4 skills, 1 command, 2 hooks; created `/todo` skill; renamed `/thought` to `/note`; flattened tasks to plain checkboxes; archived check-in folders; updated dashboard. Pattern: comprehensive inventory prevents orphaned references across multiple repos. See [[logs/20260212-cos-simplification-planning.md]], [[logs/20260212-cos-simplification.md]].

- **CLAUDE.md content discipline** (2026-02-10): Established "mistake prevention" filter for CLAUDE.md files. Each line should answer: "Would removing this cause Claude to make mistakes?" Only document non-obvious gotchas, required contracts, and things not discoverable by reading code. Cut architectural descriptions, file structure maps, and anything Claude can figure out in 30 seconds. Goal: smallest file that prevents most mistakes. See [[logs/20260210-dashboard-resume-button-cd-claudemd.md]], [[session-patterns/20260210-dashboard-resume-button-cd-claudemd.md]].

- **Thought/Link skill separation** (2026-02-10): `/thought` stripped of all URL-handling logic. Explicit redirect added: "If input contains URL, use `/link` instead." Clean boundary: `/thought` = non-URL content (quotes, ideas, observations), `/link` = any URL (saves to project research folders). Previous overlap caused routing ambiguity. See [[logs/20260210-thought-link-skill-separation.md]].

- **WikiLink standard for file references** (2026-02-08): All session logs and documentation use Obsidian-style WikiLinks (`[[path/to/file]]`) instead of backtick quotes or plain text. Enables backlink navigation and "what references this file?" queries. Session-capture skill enforces this. Retroactively converted 105 logs (436 links). Standard documented in both CLAUDE.md files. See [[logs/20260208-wikilink-documentation.md]].

- **Dashboard write validation** (2026-02-08): All dashboard write operations validate line content before modifying. Prevents wrong-task modifications when external editors (Obsidian, Claude Code) shift line numbers. Falls back to content search when validation fails. See [[session-patterns/20260208-stale-line-number-fix.md]].

- **Auto-capture replaces manual save** (2026-01-28): SessionEnd hook spawns background Claude to capture sessions. Replaced `/log` and `/save` commands. Accepts cross-project limitation (sessions log to cwd only). Trivial sessions auto-skipped.

- **Logs live with projects** (2026-01-14): Each project has its own `logs/` folder. Chief of Staff is an index/dashboard, not a repository. Portable history.

- **Tasks merged into project-knowledge.md** (2026-02-08, updated 2026-02-12): Eliminated standalone cos-inbox.md files. Tasks now live as `## Tasks` section at the top of each project's project-knowledge.md. Originally used four subsections (Inbox/Active/Backlog/Done); simplified 2026-02-12 to flat checkboxes + Done across all projects. Completed items move to `### Done` (last 5 kept, older roll to `completed-tasks.md`).

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

### 2026-02-18: PK Loading + Resume-Project Skill Migration

Added `### Session Start` instruction to global `~/.claude/CLAUDE.md`: read `./project-knowledge.md` at session start, skip if absent. Completes the three-layer context model (handoff hook → PK loading → `/resume-project` on demand). Migrated `/resume-project` from `~/.claude/commands/resume-project.md` to `~/.claude/skills/nt-resume-project/SKILL.md` — two-phase workflow (orientation menu → full context loading). Old command deleted. See [[logs/20260218-pk-loading-resume-skill-migration.md]].

### 2026-02-18: Claude.md Engineering Post + Handoff Hook

Mined 9 patterns from CLAUDE.md files for a blog post draft. Three versions written in writing/drafts/: v1 rejected (AI-slop voice, listicle anti-patterns), v2 rejected (overcorrected to personal essay), v3 current (listicle back, tighter). Also fixed handoff gap: updated SessionStart hook to emit `HANDOFF_PENDING`, added handler to global CLAUDE.md, updated handoff skill. Fixed JSON bug (literal newline in hook output). See [[logs/20260218-claude-md-engineering-draft.md]].

### 2026-02-18: Review Patterns Skill Overhauled

Rewrote `/review-patterns` to reduce cognitive load of reviewing CLAUDE.md suggestions. New flow: extract suggestions from pattern files → subagent pre-analyzes each against 8 official CLAUDE.md criteria → inject into HTML playground → user reviews in browser, copies prompt, pastes back. Table-based layout grouped into 10 themes with per-theme bulk actions; dismissed suggestions hidden by default. Key insight: the bottleneck is evaluation, not navigation — pre-analysis offloads the "is this worth adding?" judgment. 37 suggestions analyzed: 5 approve, 26 dismiss, 6 skip. Playground untested end-to-end (paste-back step). See [[logs/20260218-review-patterns-analysis-overhaul.md]].

### 2026-02-17: Skill Audit Report Built

Built interactive HTML skill audit tool (`tools/skill-audit-report.html`). Scored current CoS skill inventory: 5/9 workflows fully optimized (56%). Optimized: Session Capture, Meeting Intelligence, Knowledge Capture, CPF Research, Editorial Pipeline. Identified gaps: Weekly Strategic Review skill, Client Engagement Pipeline. Untapped: Pre-Meeting Briefing, Email Triage. Stop hook error investigated: stale binary path after Claude Code auto-update — fix is restart. User asked about turning auditor into a repeatable skill; answer was yes. See [[logs/20260217-skill-audit-report.md]].

### 2026-02-17: Projects Folder Restructure + MCP Path Fix

Full restructure of `~/Documents/Projects/`: Clients absorbed into `razzo/clients/` (gitignored); all top-level and second-level folders renamed to lowercase_with_underscores; new `Projects/CLAUDE.md` shared context layer created; Session Routing section added to CoS CLAUDE.md. 17 files updated across skills, settings, CLAUDE.md files, and dashboard. Post-restructure: Gmail/Calendar MCP reconnection failures — root cause was `~/.claude.json` (separate from settings.json) still pointing to old `Chief of Staff` path. Fixed. APFS CWD hazard: renaming the running session's directory breaks bash — use Task agents as workaround. See [[logs/20260217-projects-folder-restructure.md]], [[logs/20260217-mcp-path-fix-session-end.md]].

### 2026-02-13: Murchison Chief of Staff Research

Captured and analyzed Mike Murchison's (CEO, Ada) AI Chief of Staff implementation. His open-source system processes ~500 background jobs/day with 15+ MCP integrations but uses only ~10 core files (markdown + YAML + cron). Architectural simplicity (no code, no database, CLAUDE.md as sole abstraction) reveals our system optimizes for different outcomes: his breadth-first daily integration vs our depth-first knowledge management. User noted transferability potential — setting up similar systems for executives maps to Razzo Sprint + CPF engagement model. See [[research/20260213_ai-chief-of-staff-claude-code-mike-murchison/]].

### 2026-02-10: Dashboard Resume Button CD + CLAUDE.md Discipline

Enhanced dashboard resume session buttons to prepend `cd "~/Documents/Projects/{project}" && ` before `claude --resume` command. Created [[Tools/dashboard/CLAUDE.md]], then aggressively trimmed based on "mistake prevention" filter. Final version keeps only non-obvious lifecycle hooks and alert() gotcha. Pattern documented: CLAUDE.md files should be minimal, not comprehensive. See [[logs/20260210-dashboard-resume-button-cd-claudemd.md]], [[session-patterns/20260210-dashboard-resume-button-cd-claudemd.md]].

---

## Open Items

- **Gmail/Google Calendar MCP reconnection** — Root cause found and fixed: `~/.claude.json` still had old `Chief of Staff` paths after the restructure. Updated to `chief_of_staff`. Confirm both integrations reconnect on next Claude Code restart. Note: `~/.claude.json` is a SEPARATE config from `~/.claude/settings.json` — both need path updates during folder renames.
- **Handoff visual indicator** — Handoff hook implemented (2026-02-18), but user must type something before Claude acts on `HANDOFF_PENDING` context. Could add stderr output to hook for immediate visual heads-up in terminal before first prompt.
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
