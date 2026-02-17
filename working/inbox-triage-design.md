---
status: absorbed
created: 2026-02-02
---

# Inbox Triage — Plugin Design Spec

**Goal:** Build a Claude Code plugin that scans Gmail, categorizes emails into actionable buckets, surfaces what matters, and suggests actions (asking before doing anything).

**Origin:** Friend's LinkedIn post — "I want AI to sort my email, surface what matters, and handle the obvious actions. If there's a school email about a game, just put it on the calendar."

**Build as:** Plugin (via `plugin-dev:create-plugin`), not a standalone skill. Plugin is more shareable.

---

## What It Does

1. Scans recent/unread emails from Gmail
2. Categorizes into actionable buckets (calendar events, needs reply, action required, FYI, noise)
3. Presents a structured triage summary
4. Suggests actions and asks before executing any of them
5. Can create calendar events, draft replies, archive noise, create filters

## Dependencies

- **Gmail MCP server** — search and read emails, modify labels, create drafts/filters
- **Google Calendar MCP server** — create events, get current time

## Required Permissions

```json
"mcp__gmail__*",
"mcp__google-calendar__get-current-time",
"mcp__google-calendar__list-calendars",
"mcp__google-calendar__list-events",
"mcp__google-calendar__create-event"
```

Note: `create-event` is not currently in settings.json — needs to be added (or the plugin should declare it).

---

## Skill Spec (Core Logic)

### Frontmatter

```yaml
---
name: inbox-triage
description: "Scan, categorize, and triage email inbox - surface what matters, suggest actions"
user_invocable: true
model: sonnet
argument-hint: "[today | 3days | week] [--from:sender] [--label:name]"
---
```

### Step 1: Parse Arguments + Get Time

- Accept optional timeframe: `today` (default), `3days`, `week`
- Optional filters: `--from:address`, `--label:name`
- Use `mcp__google-calendar__get-current-time` with `timeZone: "America/New_York"`
- Calculate Gmail date filter (`after:YYYY/MM/DD`)

### Step 2: Search Emails (Parallel Batch Strategy)

Run parallel Gmail searches to get pre-segmented results:

| Search | Query | Max |
|--------|-------|-----|
| Primary | `in:inbox is:unread after:{date}` | 50 |
| Calendar invites | `in:inbox filename:ics after:{date}` | 20 |
| Starred | `in:inbox is:starred after:{date}` | 20 |

If user specified `--from:` or `--label:`, append to primary query.

Gmail date format: `YYYY/MM/DD` (slashes, not dashes).

### Step 3: Selective Reading

Categorize from snippets first. Only use `read_email` for:
- Emails with calendar-related keywords (game, practice, event, meeting, appointment, recital, concert, tournament, schedule)
- Emails suggesting action needed (RSVP, reply needed, deadline, due, confirm, sign up)
- Substantive emails from real people (not marketing/noreply addresses)

Skip reading: obvious newsletters, promotions, automated notifications, social media.

**Max 15 full reads per triage session** to keep it fast.

### Step 4: Categorize Into Buckets

| Bucket | Criteria | Examples |
|--------|----------|----------|
| **Calendar Events** | Contains date/time for something to attend or block | Games, practices, concerts, appointments, meetings, deadlines |
| **Needs Reply** | A real person expects a response | Direct questions, RSVP invitations, conversations |
| **Action Required** | Something to do (not a reply) | Sign forms, pay bills, complete registrations |
| **FYI / Read** | Worth knowing, no action needed | School announcements, project updates |
| **Newsletters** | Subscribed content | Marketing, digests, publications |
| **Noise** | Safe to archive | Promotions, social notifications, automated receipts |

Sort within buckets by urgency: time-sensitive > important > standard.

**Conservative rule:** When unsure, categorize as FYI over Noise. Better to surface than miss.

### Step 5: Extract Calendar Event Details

For each Calendar Events item, extract:

| Field | Required | Notes |
|-------|----------|-------|
| Event title | Yes | From subject or body context |
| Date | Yes | Look for "Saturday, Feb 8" or "2/8" patterns |
| Start time | Yes | Estimate if missing |
| End time | Estimate | Games ~2hr, practices ~1.5hr, meetings ~30min, school events ~1hr |
| Location | If available | Addresses, field names, school names |
| Description | Yes | Brief note + source email reference |

Common patterns: "vs [opponent]", "at [location]", "scheduled for", "your appointment", "meeting on", "due by", "deadline".

For deadlines: suggest a reminder event the day before, not a blocking event.

### Step 6: Present Triage Summary

```
## Inbox Triage — [Date] ([count] emails scanned)

### Calendar Events ([count])

| # | Subject | Date/Time | Location | Source |
|---|---------|-----------|----------|--------|
| 1 | [Event title] | [Day, Date @ Time] | [Location] | [From] |

### Needs Reply ([count])

| # | From | Subject | Received | Why |
|---|------|---------|----------|-----|
| 1 | [Name] | [Subject] | [When] | [Brief reason] |

### Action Required ([count])

| # | Subject | Action | Deadline | From |
|---|---------|--------|----------|------|
| 1 | [Subject] | [What to do] | [If any] | [From] |

### FYI / Worth Reading ([count])

- **[Subject]** from [sender] — [one-line summary]

### Newsletters ([count])
[List if 5 or fewer, otherwise just count]

### Noise ([count] emails)
[Just the count]

---
**Summary:** [count] triaged. [count] calendar events, [count] need replies, [count] actions pending.
```

Tables for high-priority buckets. Bullet lists for lower. Count-only for noise. Numbered items so user can reference ("look at #3 from Needs Reply").

### Step 7: Suggest + Confirm Actions

Use `AskUserQuestion` (multi-select):

- **Add calendar events** — one-by-one confirmation with extracted details
- **Draft replies** — help draft (never send), create in Gmail drafts
- **Archive noise** — batch `removeLabelIds: ["INBOX"]`
- **Create filters** — for recurring noise senders
- **Deep dive** — read and discuss specific emails
- **Nothing** — just wanted the overview

**Calendar event creation flow:**
```
Event 1 of N:
  Title: JV Basketball vs Lincoln High
  Date: Saturday, Feb 8, 2026
  Time: 2:00 PM - 4:00 PM (estimated)
  Location: Lincoln High School Gym
  Calendar: primary
  Source: "Game Schedule Update" from coach@school.edu

  [Add to calendar] [Skip] [Edit details first]
```

Use `mcp__google-calendar__create-event` with calendarId, summary, start/end (ISO 8601), location, description, timeZone.

**Reply drafting:** Use `mcp__gmail__draft_email`. Never `send_email`. User reviews and sends from Gmail.

**Noise archiving:** Use `mcp__gmail__batch_modify_emails` with `removeLabelIds: ["INBOX"]`.

**Filter creation:** Use `mcp__gmail__create_filter_from_template` with `fromSender` template.

---

## Key Design Decisions

- **Snippets first** — Most emails categorizable from snippet alone. Only read full content when ambiguous.
- **Never send** — Only draft. Only archive. Only create events. Always ask first.
- **One-by-one event confirmation** — Events have too much variability for batch creation.
- **Duration estimation** — Flag estimated times so user can adjust.
- **Max 50 emails, 15 full reads** — Keeps triage fast (~2 min).
- **Timezone: America/New_York** — Default, adjustable.

## Demo Scenario

1. User runs `/inbox-triage` (or `/inbox-triage 3days`)
2. Skill scans ~30 unread emails
3. Output: 3 calendar events (two basketball games, one parent-teacher conference), 2 needing replies, 1 action item, 5 FYI, 8 newsletters, 11 noise
4. User picks "Add calendar events" + "Archive noise"
5. Three events confirmed and added to calendar
6. 11 noise emails archived in batch
7. Done in ~2 minutes

## Plugin Packaging Notes

When converting to plugin with `plugin-dev:create-plugin`:
- The SKILL.md content above is the core logic
- Plugin should declare MCP server dependencies (Gmail, Google Calendar)
- Plugin should declare required permissions
- Include a README explaining what it does and the setup requirements
- Consider including a setup skill that helps configure MCP servers
