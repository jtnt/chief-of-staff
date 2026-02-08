---
date: 2026-02-03 11:55 AM EST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/768a8352-d712-4651-934a-d797487b0b4b.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: Morning Briefing Workflow and Inbox Prioritization
---

# Chief of Staff: Morning Briefing Workflow and Inbox Prioritization

## What Was Done

**Fixed Google Calendar authentication issue:**
- Re-authenticated Google Calendar MCP server with nicholas@razzohq.com account
- Verified access to both calendars (primary jtntolson@gmail.com and nicholas@razzohq.com)
- Calendar now shows events properly in briefings

**Restructured inbox to separate priorities from meta-work:**
- Created "Backlog (Meta-Work)" section in `cos-inbox.md` between Pending and Archive
- Moved 2 automation review items to backlog (Boris Cherny tips, CoS automation recommendations)
- Archived 2 completed/invalid items (terminology update, Meeting Review v7 testing)
- Cleared Pending section with note: "(Inbox clear - focus on project deliverables)"

**Updated briefing template to handle backlog:**
- Modified `~/.claude/hooks/briefing-template.md` Step 4 to read both Pending and Backlog sections
- Added briefing format to show "Priority: [N items]" and "Backlog (meta-work): [N items] - when there's time"
- Added key principle: "Bias toward project deliverables" to emphasize Razzo, CPF, Writing, Job Search
- Added instruction to show updated pending list after user removes/archives items

**Morning check-in completed:**
- Created `/Users/jtnt/Documents/Projects/Chief of Staff/Check-Ins/daily/20260203-morning.md`
- Intentions: Beekeeper Group meeting (3 PM), AirOps cohort homework, LinkedIn video, I-Corps mentor prep
- Surfaced priority alignment question about LinkedIn video (strategic vs. "more content")

**Completed task:**
- Marked `Tasks/20260203-inbox-triage-label-naming.md` as completed (status: active → completed)

## Key Decisions

**Inbox structure change:**
- **Decision:** Create three-tier system (Pending → Backlog → Archive) instead of just Pending → Archive
- **Why:** The inbox kept accumulating meta-work optimization tasks that felt urgent but weren't. By separating "do now" (Pending) from "revisit when there's time" (Backlog), the daily briefing can focus on project deliverables (Razzo, CPF, Writing, Job Search) while preserving system improvement ideas for later.
- **What was rejected:** Fully archiving meta-work items or deleting them. User wanted to preserve them for future reference, just not have them drive daily priorities.

**Briefing presentation:**
- **Decision:** Show backlog item count in briefing but frame it as "when there's time" not as a priority
- **Why:** Complete visibility (user can see what's there) but clear prioritization signal (not actionable today)
- **What was rejected:** Hiding backlog entirely from briefings. User wanted awareness, just not pressure.

**Calendar account:**
- **Decision:** Use nicholas@razzohq.com as primary Google Calendar account (has access to both calendars)
- **Why:** This account has proper permissions to read both the personal (jtntolson@gmail.com) and work (nicholas@razzohq.com) calendars
- **What was rejected:** Continuing with broken "normal" account that had authorization errors

## Reasoning

**Why separate Pending from Backlog:**
- The pattern was clear: meta-work optimization tasks (inbox triage plugins, automation recommendations, skill naming fixes) were accumulating in the inbox and showing up prominently in briefings
- This created a false sense of urgency around system improvements when the real priority was project deliverables
- The user's statement "All of these inbox items are sort of meta work and not high priority. We need to focus both the inbox and the morning briefing on real work" was the trigger
- The backlog structure preserves the ideas without making them compete with revenue-generating work
- This is a pattern worth remembering: **Meta-work optimization is seductive but rarely urgent. Real work = Razzo, CPF, Writing, Job Search.**

**Why add "show updated list after removal" to briefing template:**
- User feedback loop: "after I remove something from the inbox show it to me again"
- Without showing the updated list, there's no confirmation of what remains
- This small interaction detail improves confidence in the system

**Why emphasize "bias toward project deliverables" in briefing principles:**
- The briefing's job is to nudge toward what matters (deliverables, revenue work)
- Meta-work should be visible but not central
- The language matters: "Priority" vs. "Backlog (when there's time)" sends a clear signal

## Changes Made

**Verified against git:**

```bash
# Uncommitted changes
 M Tasks/20260203-inbox-triage-label-naming.md  # status: active → completed
 M cos-inbox.md                                  # Added Backlog section, reorganized items
?? Check-Ins/daily/20260203-morning.md          # New morning check-in

# Changes in ~/.claude (outside this repo)
~/.claude/hooks/briefing-template.md            # Updated Step 4, format template, key principles
```

**File changes:**

1. **`cos-inbox.md`**:
   - Added "## Backlog (Meta-Work)" section between Pending and Archive
   - Moved 2 automation items to Backlog (Boris Cherny tips, CoS automation recommendations)
   - Archived 2 items (terminology update, Meeting Review v7)
   - Set Pending to "(Inbox clear - focus on project deliverables)"

2. **`~/.claude/hooks/briefing-template.md`**:
   - Step 4: Read both Pending and Backlog sections, show counts
   - Format template: Added "Priority: [N]" and "Backlog (meta-work): [N items - when there's time]"
   - Key principles: Added "Bias toward project deliverables" and "Backlog items are optional"
   - Step 4: Added instruction to show updated pending list after removals

3. **`Tasks/20260203-inbox-triage-label-naming.md`**:
   - Changed status from `active` to `completed`

4. **`Check-Ins/daily/20260203-morning.md`**:
   - New morning check-in with intentions, calendar, and priority alignment notes

5. **Google Calendar MCP (external to repo)**:
   - Re-authenticated with nicholas@razzohq.com account
   - Removed broken "normal" account

## Open Items

**Ready for next session:**
- Inbox is clear of urgent items
- Backlog has 2 meta-work items preserved for future reference
- Briefing template now handles three-tier inbox structure
- Google Calendar authentication fixed

**Future consideration:**
- Monitor whether backlog items accumulate again or if the three-tier structure keeps focus on deliverables
- User raised question about LinkedIn video strategy: "General content creation vs. targeted Razzo/CPF content?" - may need strategic clarity on content approach
