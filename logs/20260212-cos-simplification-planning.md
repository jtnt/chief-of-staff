---
date: 2026-02-12 18:29 EST
title: CoS Simplification Planning
type: planning
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/77282756-563f-44b8-93f2-05b2927509a6.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
plan_file: /Users/jtnt/.claude/plans/greedy-dreaming-jellyfish.md
---

# Chief of Staff: CoS Simplification Planning

## What Was Done

User requested major simplification of the Chief of Staff system after recognizing it had grown too complex. The session revealed stark usage patterns: `/link` gets used regularly, `/thought` occasionally, but check-ins (morning/evening/journal/weekly), `/capture`, the strategic briefing, and the elaborate task management system (Inbox/Active/Backlog/Done) never get used.

Created a comprehensive plan to strip the system down to what's actually used:
- **Keep:** auto-capture (SessionEnd hook), `/link`, `/thought`, plain checkbox tasks, `/review-patterns`, PATTERNS_PENDING
- **Delete:** 4 skills (morning/evening/journal/capture), 6 commands (all Links/ system commands, review-checkins), 2 hooks (morning-greeting, briefing-template), UserPromptSubmit settings entry
- **Archive:** Check-Ins/daily/, Check-Ins/weekly/, Check-Ins/journal/ → moved to _archive/
- **Simplify:** Session-start hook (from ~100 lines to ~15, just PATTERNS_PENDING), task format (from 4 subsections to flat checkboxes), CLAUDE.md files (~60 lines of documentation removed across both files)

The plan includes full deletion inventory, files to modify, files to leave untouched, and verification steps.

## Key Decisions

**Simplify vs. delete:** Chose to delete unused features entirely rather than leave them dormant. The complexity cost of maintaining documentation and hooks for unused features outweighs any future "maybe we'll use it" benefit.

**Strategic briefing removal:** Despite being complex and carefully designed, the briefing never gets used. User doesn't run it, and the system shouldn't force workflows that don't fit actual usage patterns.

**Task format flattening:** The 4-subsection structure (Inbox/Active/Backlog/Done) with format specs, archival rules, and source tags adds overhead without value. Plain checkboxes are sufficient.

**Keep PATTERNS_PENDING:** This hook still provides value by surfacing CLAUDE.md suggestions from `/review-patterns`. Lightweight enough to keep.

## Reasoning

**Why the system grew complex:** Designed for capabilities rather than actual usage. Added features because they seemed useful, not because they were being used. The documentation described "what's possible" rather than "what we do."

**Why this matters:** Unused complexity creates maintenance burden, makes the system harder to understand, and introduces points of failure (like the recent link misrouting incident). Every feature has a documentation cost, a maintenance cost, and a cognitive cost.

**Pattern to remember:** System design should follow actual usage, not theoretical capabilities. When features go unused for months, delete them. Don't keep infrastructure "just in case" — it's easier to rebuild a feature you need than to maintain features you don't.

**Thinking evolution:** Initially tried to trim around the edges (remove a few skills, simplify docs). User pushed back: "You kept all the machinery." Realized the simplification needed to be structural, not cosmetic. The briefing, the task states, the check-in routing — all dead weight.

## Plan (Claude Code)

**Plan file:** `/Users/jtnt/.claude/plans/greedy-dreaming-jellyfish.md`

# Plan: Strip CoS to What's Actually Used

## Context

CoS has 12 commands, 21 skills, 10 hooks, and hundreds of lines of CLAUDE.md documentation. Actual usage: auto-capture, `/link`, `/thought`, and task checkboxes. The briefing never gets used. `/capture` never gets used. Morning/evening/journal never get used. The Links/ categorized system is dead. The task management has 4 states nobody triages. Time to match the system to reality.

**What stays:** auto-capture, `/link`, `/thought`, task checkboxes, `/review-patterns`, PATTERNS_PENDING
**Everything else goes or gets stripped down.**

---

## Phase 1: Delete dead skills (4 folders)

- `~/.claude/skills/morning/`
- `~/.claude/skills/evening/`
- `~/.claude/skills/journal/`
- `~/.claude/skills/capture/`

## Phase 2: Delete dead commands (6 files)

Links/ system commands (all dead — Links/index.md says 0 links):
- `~/.claude/commands/rebuild-links-index.md`
- `~/.claude/commands/find-link.md`
- `~/.claude/commands/import-bookmark-file.md`
- `~/.claude/commands/import-google-news.md`
- `~/.claude/commands/sync-bookmarks.md`

Check-in analysis (nothing left to analyze):
- `~/.claude/commands/review-checkins.md`

## Phase 3: Delete/simplify hooks

**Delete:**
- `~/.claude/hooks/morning-greeting.sh`
- `~/.claude/hooks/briefing-template.md`

**Remove from `~/.claude/settings.json`:**
- Entire `UserPromptSubmit` hook entry (was morning-greeting.sh)

**Rewrite `~/.claude/hooks/cos-session-start.sh`:**
Strip from ~100 lines to just PATTERNS_PENDING detection. Remove:
- Meta-work ratio calculation
- BRIEFING_REQUIRED flag
- COS_INBOX task counting
- Recent log listing
- Inbox item extraction for external projects

Keep only:
- Check for `session-patterns/*.md` files → output PATTERNS_PENDING count

## Phase 4: Archive dead folders

```
mv Check-Ins/daily Check-Ins/_archive/daily
mv Check-Ins/weekly Check-Ins/_archive/weekly
mv Check-Ins/journal Check-Ins/_archive/journal
```

Add to `Links/index.md`: "Deprecated. Use `/link` — saves to project `research/` folders."

## Phase 5: Flatten tasks in `project-knowledge.md`

Replace the 4-subsection structure with plain checkboxes:

```markdown
## Tasks

- [ ] I-Corps mentor prep [[Tasks/20260203-icorps-mentor-prep.md]]
- [ ] Implement PreCompact handover hook
- [ ] Evaluate Carl Vellotti's Personal OS patterns for CoS
- [ ] Build client-facing envoy skills from Razzo worksheets
- [ ] Review Boris Cherny's Claude Code tips
- [ ] Review and implement CoS automation recommendations
- [ ] Explore insights report suggestions
```

Just items. Check off or delete when done.

## Phase 6: Update `/thought` skill

`~/.claude/skills/thought/SKILL.md` — remove the "Project Routing" section (lines 50-63) that references inbox format with bold titles, source tags, and `#thought` tags. Replace with:

```markdown
## Project Routing

If the thought relates to a tracked project, ask: "Add this to [Project]'s tasks?"
If yes, add a checkbox to that project's `project-knowledge.md` under `## Tasks`:
```
- [ ] [Brief description]
```
```

## Phase 7: Rewrite global `~/.claude/CLAUDE.md`

**Task Tracking section** (lines 77-83) — replace with:

```markdown
### Task Tracking

Projects track tasks as checkboxes in `## Tasks` at the top of `project-knowledge.md`.
```

That's the entire section. No format spec, no archival rules, no completed-tasks.md.

**Chief of Staff Integration section** (lines 154-185) — replace entirely:

```markdown
## Chief of Staff Integration

### Hooks
- **PATTERNS_PENDING:** CLAUDE.md suggestions from previous sessions. Mention count, suggest `/review-patterns`.

### Quick Capture
- `/link` — URL → project `research/` folder
- `/thought` — idea, quote, observation → `Check-Ins/thoughts/`

URL = `/link`. Non-URL = `/thought`.
```

Removes: COS_INBOX, MORNING_GREETING_DETECTED, entire check-in system section, natural language detection table, slash commands list, project routing paragraph.

## Phase 8: Rewrite CoS CLAUDE.md

**Delete "Session Start: Strategic Briefing" section** (lines 30-35).

**Folder Structure** — update Check-Ins entry:
```
├── Check-Ins/
│   ├── thoughts/        # Quick captures via /thought
│   └── _archive/        # Old check-in files
```

**Tasks section** (lines 139-175) — replace with:
```markdown
## Tasks

Tasks are checkboxes in `## Tasks` at the top of `project-knowledge.md`. Same everywhere. `Tasks/` folder holds detailed specs linked via `[[wikilinks]]` when needed.
```

**Check-In System section** (lines 177-210) — replace with:
```markdown
## Quick Capture

`/thought` → `Check-Ins/thoughts/`. `/link` → project `research/` folders.
```

## Phase 9: Update MEMORY.md

Replace Task System section:
```markdown
## Task System
- Tasks are plain checkboxes in `## Tasks` at top of project-knowledge.md. No states, no format spec, no archival rules.
- 2026-02-11: Simplified from 4-subsection system (Inbox/Active/Backlog/Done) to flat checkboxes.
```

Remove check-in routing references. Add note about what was removed.

## Phase 10: Update `project-knowledge.md` state sections

Update Current State / system description sections to reflect simplified system.

---

## Full deletion inventory

| Type | Item | Reason |
|------|------|--------|
| Skill | `morning/` | Never used, briefing covers it |
| Skill | `evening/` | Never used, auto-capture covers it |
| Skill | `journal/` | 1 entry ever |
| Skill | `capture/` | Never used |
| Command | `rebuild-links-index.md` | Links/ system dead |
| Command | `find-link.md` | Links/ system dead |
| Command | `import-bookmark-file.md` | Links/ system dead |
| Command | `import-google-news.md` | Links/ system dead |
| Command | `sync-bookmarks.md` | Links/ system dead |
| Command | `review-checkins.md` | No check-in types to review |
| Hook | `morning-greeting.sh` | Morning check-in removed |
| Hook | `briefing-template.md` | Briefing removed |
| Config | `UserPromptSubmit` in settings.json | Morning hook removed |
| Folder | `Check-Ins/daily/` | Archived to `_archive/` |
| Folder | `Check-Ins/weekly/` | Archived to `_archive/` |
| Folder | `Check-Ins/journal/` | Archived to `_archive/` |

## Files modified

| File | Change |
|------|--------|
| `~/.claude/CLAUDE.md` | Remove check-in system, simplify task tracking to 1 line, simplify CoS integration |
| `Chief of Staff/CLAUDE.md` | Remove briefing, check-ins, task format. Keep essentials. |
| `Chief of Staff/project-knowledge.md` | Flatten tasks. Update state sections. |
| `~/.claude/hooks/cos-session-start.sh` | Strip to just PATTERNS_PENDING |
| `~/.claude/settings.json` | Remove UserPromptSubmit entry |
| `~/.claude/skills/thought/SKILL.md` | Simplify project routing |
| `MEMORY.md` | Update task system notes |

## Files untouched

| File | Why |
|------|-----|
| `session-capture/SKILL.md` | References knowledge manifest, not task format |
| `link/SKILL.md` | Works correctly, no dead references |
| `session-end.sh` | Auto-capture pipeline, working |
| `allow-logs-write.sh` | Permission hook, still needed |
| `allow-cos-edit.sh` | Permission hook, still needed |
| `allow-mkdir.sh` | Permission hook, still needed |
| `review-patterns/SKILL.md` | Still used with PATTERNS_PENDING |
| General commands (export-session, humanize, resume-project, etc.) | Not CoS-specific |

## Verify

1. New CoS session → no briefing, just PATTERNS_PENDING if applicable
2. `/thought` with idea → saves to `Check-Ins/thoughts/`, routing uses simple checkbox
3. `/link` with URL → routes to project `research/`
4. "Good morning" before noon → no hook fires
5. `/morning`, `/evening`, `/journal`, `/capture` → skills not found
6. `/find-link`, `/sync-bookmarks` etc. → commands not found
7. Tasks in project-knowledge.md are plain checkboxes

## Changes Made

No files were modified during this session. The session was purely planning — creating a comprehensive implementation plan for simplifying the Chief of Staff system.

**Files examined:**
- [[~/.claude/CLAUDE.md]] — analyzed check-in system and task tracking documentation
- [[~/.claude/hooks/briefing-template.md]] — reviewed briefing template structure
- [[~/.claude/skills/session-capture/SKILL.md]] — verified it doesn't reference task format
- [[~/.claude/skills/thought/SKILL.md]] — found project routing references needing update
- [[CLAUDE.md]] — analyzed CoS-specific documentation
- [[project-knowledge.md]] — reviewed task structure for flattening

**Plan created:**
- [[~/.claude/plans/greedy-dreaming-jellyfish.md]] — complete implementation plan with 10 phases

## Open Items

- Execute the plan (user approval pending)
- After execution, verify all 7 test cases pass
- Update any external documentation that references removed features
