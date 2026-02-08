---
date: 2026-02-07 07:19 PM EST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/6e53e834-973c-4bb7-bf89-08212143f4d6.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: Inbox Checkbox Restructure
---

# Chief of Staff: Inbox Checkbox Restructure

## What Was Done

Completed a major restructure of the Chief of Staff task management system, converting from heading-based prose blocks to Obsidian-native checkbox format. The goal was to create a single scannable task list that works natively in Obsidian while maintaining Claude Code integration for automatic routing from sessions, meetings, and check-ins.

**Core changes:**

1. **cos-inbox.md format** — Replaced heading-based sections with four-section checkbox structure:
   - `## Inbox` — Untriaged items from routing (was top of Pending)
   - `## Active` — This week's work, 3-7 items (was rest of Pending)
   - `## Backlog` — Worth keeping, not doing now (renamed from Backlog Meta-Work)
   - `## Done` — Completed items with `done:YYYY-MM-DD` tags (was Archive)

2. **Task line format** — Standardized on: `- [ ] **Title** — context `#source` `YYYY-MM-DD` [[optional-link]]`
   - Interactive checkboxes (`- [ ]` / `- [x]`)
   - Bold titles for scannability
   - Source tags: `#meeting`, `#session`, `#thought`, `#link`, `#manual`
   - Date = when added (provenance)
   - Wikilinks to Tasks/ detail files when needed
   - Sub-tasks indent under parent (max 3; use Tasks/ file for more)

3. **Hook script updates** — Modified 2 hooks to parse checkbox format:
   - `cos-session-start.sh` — Now counts `- [ ]` checkboxes in Inbox section
   - `cos-inbox-check.sh` — Same pattern for external project inboxes
   - **Bug fix discovered:** `grep -c` returns exit code 1 when count is 0, which triggered `|| echo 0` fallback and produced `0\n0` output. Fixed by using `${var:-0}` default instead.

4. **Briefing template update** — Rewrote Step 4 for checkbox format:
   - Merged former Step 4b (Tasks/ scan) into Step 4 — tasks now referenced inline via wikilinks
   - New output shows Active items by name, Inbox count with titles, Backlog count only
   - Updated edge cases section for four-section structure

5. **Producer updates** — Modified 4 producers to write checkbox lines instead of heading blocks:
   - `meeting-processor.md` (Step 7)
   - `thought/SKILL.md` (routing template)
   - `evening/SKILL.md` (Step 8 routing)
   - `link/SKILL.md` (Step 9 routing)

6. **External project inboxes** — Migrated 3 external project cos-inbox.md files to checkbox format:
   - Razzo, Context Profile Framework, Beekeeper Group
   - These keep Pending/Archive sections (notification queues, not planning surfaces)

7. **Documentation** — Updated CoS CLAUDE.md:
   - "Inbox & Tasks" section rewritten for checkbox format
   - Folder structure comments updated
   - Project routing instructions clarified

8. **Git ignore changes** — Added `Tasks/` and `cos-inbox.md` to `.gitignore`:
   - Task management is working state, not code
   - Files remain on disk, just untracked

**Verification testing:**
- `cos-session-start.sh` → Inbox: 0 pending (correct — Inbox section empty, items in Active/Backlog)
- External project parsing → Razzo: 3 items, Beekeeper: 2 items (correct counts with extracted titles)
- Obsidian checkbox interaction confirmed working
- Wikilinks to Tasks/ files clickable

**Additional task:** Added Monday (2026-02-09) due dates to three I-Corps mentor prep sub-tasks at user request.

## Key Decisions

**Inbox/Tasks merge** — The new design naturally merged the separate Tasks/ folder concept into cos-inbox.md as the single central task list. Tasks/ folder remains for detailed specs (linked via wikilinks) but the inbox is now the primary planning surface.

**Four sections vs. three** — Split the old Pending into Inbox (untriaged) and Active (committed work) to create a clearer triage workflow. Inbox is where new items land; Active is what you're actually doing.

**Checkbox format** — Chose Obsidian-native `- [ ]` checkboxes over custom syntax because they're interactive in Obsidian, widely supported, and require no plugins.

**External project sections** — Kept Pending/Archive for external projects (not Inbox/Active/Backlog/Done) because those are notification queues, not planning surfaces.

**Git tracking** — Decided to stop tracking `Tasks/` and `cos-inbox.md` because task management is working state (like `.obsidian/` config), not code artifacts.

## Reasoning

**Why checkbox format over heading-based prose:**
- Obsidian renders checkboxes interactively — can check/uncheck in reading mode
- Scannable — one line per task with bold titles stands out
- Standardized — `- [ ]` is universal markdown task syntax
- Portable — works in any markdown editor, not just Obsidian

**Why discovered the `grep -c` bug:**
- Testing revealed `Inbox: 0\n0 pending` output when Inbox was empty
- Root cause: `grep -c '^- \[ \]'` returns exit code 1 when count is 0
- This triggered `|| echo 0` fallback, appending second `0`
- Fix: Use `${inbox_count:-0}` instead of `|| echo 0` pattern
- This was a latent bug in original code (masked by always having items)

**Pattern to remember:**
When changing data format, update both producers (writers) AND consumers (readers). Testing revealed the hook bug that would have broken inbox counts. The six-step implementation order (migrate content → update hooks → update briefing → update producers → migrate external → update docs) ensured each layer worked before the next depended on it.

## Changes Made

Git shows 3 commits from this session:

**Commit 1:** `4815b917 Restructure cos-inbox.md for Obsidian task management`
- CLAUDE.md
- cos-inbox.md

**Commit 2:** `e979c70e Add Monday due dates to I-Corps mentor prep sub-tasks`
- cos-inbox.md

**Commit 3:** `12d3dd44 Stop tracking Tasks/ and cos-inbox.md in git`
- .gitignore
- [[Tasks/20260203-envoy-client-skills-plan.md]] (untracked)
- [[Tasks/20260203-icorps-mentor-prep.md]] (untracked)
- [[Tasks/20260203-inbox-triage-label-naming.md]] (untracked)
- [[Tasks/20260204-insights-suggestions-followup.md]] (untracked)
- cos-inbox.md (untracked)

**Files modified outside this repo** (not in commits):
- `~/.claude/hooks/cos-session-start.sh`
- `~/.claude/hooks/cos-inbox-check.sh`
- `~/.claude/hooks/briefing-template.md`
- `~/.claude/agents/meeting-processor.md`
- `~/.claude/skills/thought/SKILL.md`
- `~/.claude/skills/evening/SKILL.md`
- `~/.claude/skills/link/SKILL.md`
- `/Users/jtnt/Documents/Projects/Razzo/cos-inbox.md`
- `/Users/jtnt/Documents/Projects/Context Profile Framework/cos-inbox.md`
- `/Users/jtnt/Documents/Projects/Clients/Beekeeper Group/cos-inbox.md`

**Files read during implementation:**
- All of the above files
- `project-sources.md` (to find external project paths)
- 4 Tasks/ files (to identify active items for migration)

Remaining uncommitted changes are unrelated (.obsidian/ UI state, project-index.md trailing whitespace, CLAUDE.md.bak deletion).

## Open Items

None identified. The restructure is complete and verified working. Next session start will use the new checkbox format for briefings and inbox notifications.
