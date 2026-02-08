---
date: 2026-02-07 11:39 PM EST
title: Dashboard Health, Inbox Archive, Format Changes
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/37ca0c32-a6d6-499f-8bef-58fd3c59303e.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Dashboard Health, Inbox Archive, Format Changes

## What Was Done

Implemented a comprehensive health monitoring system for the CoS dashboard and redesigned the inbox task format for better readability.

**Health Dashboard Features:**
- Created `health.html` with project health cards showing: project-knowledge.md freshness (days since modified, color-coded green/amber/red), cos-inbox.md open item counts (flagged if >10), z_context/ presence and INDEX.md integrity, CLAUDE.md presence, log count and latest log date, and letter grades (A/B/C/D) computed from health metrics
- Added friction snapshot section showing: friction type breakdown (wrong_approach 41%, misunderstood 31%, excessive 10%, etc.), friction-vs-outcome chart (zero friction → 95% success, 2+ friction → 31%), and top friction examples with lessons learned
- Created `data/friction-summary.json` with aggregated friction data from insights facets (52 sessions analyzed, 68 total friction events, breakdown by type, outcomes, and key patterns)

**Sidebar Enhancements:**
- Added inbox count badges on all project links (color-coded: 1-5 muted, 6-9 amber, 10+ red)
- Added Health navigation link between Patterns and CoS with colored dot reflecting system state (green = all healthy, amber = warnings exist, red = critical issues)
- Badges show on both discovered projects and the pinned CoS item

**Home Page Alerts:**
- Added alert strip above stats when projects have issues (stale project-knowledge.md, inbox overload)
- Shows top 1-2 issues inline with quick-link to health page
- Dismissable per-session (doesn't persist)

**Inbox Format Redesign:**
- Changed from single-line format (`- [ ] **Title** — description #source date`) to two-line format with title on first line and tab-indented description sub-bullet
- Updated parser in `app.js` to handle both old and new formats (backwards-compatible)
- Updated `addNewTask()` to save in new format
- Updated all three format examples in CLAUDE.md (main inbox, project routing, check-in routing)
- Converted all existing items in cos-inbox.md to new format

**Archive System:**
- Added auto-move to Done section when tasks are checked off in Active/Backlog
- Added "Archive N" button on Done section that moves completed items to `cos-inbox-archive.md`
- Archive stamps items without `done:` dates (checked in Obsidian) with today as fallback
- Archive groups items by completion date
- System works automatically for per-project inboxes (each creates own archive file)
- Dashboard reloads after checkbox toggle so changes are immediately visible

**Fixed Checkbox Toggle:**
- Fixed bug where `done:YYYY-MM-DD` was being appended to title line instead of description sub-bullet in new format
- Top-level tasks now correctly put metadata on description line where other tags live
- Subtasks and old-format items still get inline metadata

## Key Decisions

**Health page over separate dashboard:** Integrated health monitoring into the existing CoS dashboard instead of keeping the standalone `claude-code-dashboard.html`. This makes health signals actionable where work happens.

**Two-line inbox format:** Moved from em-dash inline descriptions to tab-indented sub-bullets for better readability in Obsidian preview mode. The old format was hard to scan when items had long contexts.

**Archive instead of delete:** Created persistent archive files (`cos-inbox-archive.md`) instead of deleting completed items. Keeps inbox lean while preserving history for a "data pack rat."

**Auto-move to Done:** When a task is checked in Active/Backlog, it automatically relocates to the Done section instead of staying in place. Reduces manual file editing.

**Fallback done dates:** When archiving items checked in Obsidian (which don't get stamped), use today's date as fallback. Better to have an approximate date than none.

**Friction summary as static JSON:** Instead of trying to read from `~/.claude/usage-data/facets/` (which the dashboard can't access via File System Access API), created `data/friction-summary.json` in the dashboard folder. Keeps dashboard self-contained and fast.

## Reasoning

**Why health monitoring:** The insights analysis revealed patterns worth tracking systematically — stale project-knowledge.md files, overloaded inboxes, missing infrastructure. These are early warning signals. Surfacing them in the dashboard where they're actionable makes them useful instead of just informational.

**Why sidebar badges:** Inbox count is a key health signal. Putting it directly on project links (instead of buried on a separate page) makes it immediately visible when navigating. The color-coding (amber at 6, red at 10) provides at-a-glance status.

**Why two-line format:** The user specifically said single-line format was "hard to read in preview mode." Moving the description to a sub-bullet matches how Obsidian naturally displays nested content. The visual hierarchy is clearer: title stands alone, context indented below.

**Why backwards-compatible parser:** Existing items in logs and other files use the old format. Making the parser handle both prevents breaking existing content while enabling the new format going forward.

**Why archive over accumulation:** Completed items accumulating in the Done section forever creates visual noise even when collapsed. The archive provides a clean break: Done is recent completions, archive is long-term history. Both are preserved and searchable.

**Pattern to remember:** When building data-driven features, consider where the data lives and how to access it. The dashboard runs in browser with File System Access API limited to the project folder. Trying to reach `~/.claude/` would fail. Bringing the data into the dashboard's tree (`data/friction-summary.json`) keeps it self-contained and fast to load.

## Changes Made

```bash
# Check for uncommitted changes
git status --short 2>/dev/null
# M .obsidian/workspace.json

# Check recent commits from this session (within last 2 hours)
git log --oneline --since="2 hours ago" --name-only 2>/dev/null
```

**Files created:**
- [[Tools/dashboard/health.html]] — Health page with project cards and friction snapshot
- [[Tools/dashboard/data/friction-summary.json]] — Aggregated friction data (types, outcomes, examples)

**Files modified:**
- [[Tools/dashboard/css/style.css]] — Added ~320 lines for sidebar badges, health dot, alert strip, health cards, grade badges, friction breakdown bar, outcome cards, example cards, insight box
- [[Tools/dashboard/js/app.js]] — Added inbox counting in discovery, sidebar badge rendering, Health nav link with colored dot, `scanProjectHealth()`, `scanAllProjectHealth()`, `scanHealthAlerts()`, `moveTaskToSection()`, `archiveCompletedTasks()`, updated `handleCheckboxToggle` to accept callback for reload
- [[Tools/dashboard/index.html]] — Added alert strip div and render function, override `handleCheckboxToggle` to reload after toggle, added archive button to Done section
- [[Tools/dashboard/project.html]] — Updated open items rendering to show checkboxes (read-only/disabled since source is project-index.md)
- `CLAUDE.md` — Updated all three inbox format templates to use two-line format (main inbox section, project routing section, check-in routing section)
- `cos-inbox.md` — Converted all items to new two-line format, fixed misplaced `done:` date

**Git commits during session:**
- `247e7eb0` — Dashboard: auto-move to Done, archive completed items
- `efc2f30b` — Auto-capture: Dashboard implementation
- `9fc71023` — Auto-capture: Backfill log titles
- `c396ee7a` — Dashboard: add health page, sidebar badges, inbox format update
- `dde4a531` — Backfill log titles: add descriptive title fields to 189 session logs
- (earlier commits from previous sessions also shown in log)

## Open Items

None identified. The health monitoring system is complete and functional, the inbox format migration is done, and the archive system is operational.