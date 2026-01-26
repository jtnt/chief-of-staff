# Chief of Staff System Guide

## The Big Picture

Chief of Staff is your **cross-project memory and synthesis layer**. It tracks work across all your projects, captures insights, and helps you see patterns you'd otherwise miss.

**Philosophy:** Markdown files in folders. No databases, no complex tooling. Everything is readable, portable, and grep-able.

---

## Core Workflows

### From Any Project: `/log` and `/save`

These are your main capture commands, available everywhere.

**`/log`** - Quick checkpoint
- Creates `./logs/YYYYMMDD-description.md` in the current project
- Captures: what was done, decisions, changes, open items, **reasoning**
- No git, no sync - just local capture
- Use when: mid-session checkpoint, before context compaction, quick save

**`/save`** - Full workflow
- Runs `/log` first (same capture)
- Then: git add, commit, push
- Then: syncs summary to Chief of Staff's `project-index.md`
- Use when: done with a work session, want everything committed and tracked

**Example from Context Profile Framework:**
```
You: [do some work]
You: /save
Claude: Creates CPF/logs/20260126-layer-implementation.md
        Commits and pushes to CPF repo
        Updates CoS project-index.md with summary
```

---

### From Any Project: Check-Ins

Check-ins work from anywhere - they're stored in CoS but triggered from any project.

**`/morning`** - Start your day
- Asks what's on your mind FIRST
- Then pulls relevant calendar, project context
- Creates responsive briefing based on YOUR priorities
- On Mondays: auto-generates weekly synthesis

**`/evening`** - End your day
- PULLS from you: reads all today's logs across projects, checks calendar
- Presents what it found
- You fill in gaps, note what carries over
- Low effort - Claude does the remembering

**`/thought`** - Quick capture
- Quote, link, random idea, article
- Saved to `Check-Ins/thoughts/`
- Can route to specific project if relevant

**`/journal`** - Personal reflection
- Private, never routed to projects
- Saved to `Check-Ins/journal/`

**Natural language also works:**
- "Good morning" → offers morning check-in
- "Wrapping up for the day" → offers evening check-in
- Share a URL → asks where to file it

---

### From Chief of Staff Directly

When you open CoS (`cd ~/Documents/Projects/Chief\ of\ Staff && claude`), you get:

**Strategic Briefing** (automatic on session start)
- Calendar for the day
- Project status summaries
- Pending inbox items
- Meta-work awareness (are you spending too much time on systems?)

**`/review-checkins`** - Pattern analysis
- Analyzes check-ins over a time period
- Optionally includes logs from ALL projects (cross-project patterns)
- Can save patterns to `Patterns/` folder
- Can save review to `Weekly Reviews/`

**Project Updates**
- "Update Razzo" → reads Razzo's latest logs, updates project-index.md
- "What's happening with CPF?" → summarizes recent activity

---

## Key Files and What They Do

### In Chief of Staff

| File | Purpose | When It Changes |
|------|---------|-----------------|
| `project-index.md` | Summaries of ALL tracked projects | On `/save` from any project |
| `project-sources.md` | List of tracked projects with paths | When new project added |
| `project-knowledge.md` | About CoS itself (system state, decisions) | When CoS system changes |
| `Patterns/` | Cross-project reusable insights | Manual or via `/review-checkins` |
| `Check-Ins/daily/` | Morning/evening check-ins | On `/morning`, `/evening` |
| `Check-Ins/thoughts/` | Quick captures | On `/thought` |
| `Check-Ins/weekly/` | Monday auto-synthesis | On Monday `/morning` |
| `Weekly Reviews/` | Manual pattern reviews | On `/review-checkins` |

### In Each Project

| File | Purpose |
|------|---------|
| `logs/YYYYMMDD-*.md` | Session logs (from `/log` and `/save`) |
| `project-knowledge.md` | Strategic context for THIS project |
| `CLAUDE.md` | Instructions for Claude when working in this project |
| `cos-inbox.md` | Items pushed from CoS (if any) |

---

## The "Reasoning" Section

Every log now has space for **why**, not just **what**:

```markdown
## Reasoning

- **Why X over Y:** We chose glob patterns over specific permissions
  because maintenance burden was too high
- **Thinking evolution:** Initially thought we needed separate files,
  realized referencing /log from /save was cleaner
- **Pattern to remember:** When DRYing, prefer references over extraction
  to a third file - simpler dependency chain
```

This is what makes intelligence **compound** instead of just **archive**. Next time you face a similar decision, the reasoning is there.

---

## Bidirectional Flow (CoS ↔ Projects)

**CoS → Project:**
- Check-in mentions a project → offer to push to that project's `cos-inbox.md`
- When you open that project, you'll see "You have X pending items from CoS"

**Project → CoS:**
- `/save` pushes summary to `project-index.md`
- Logs stay with the project (portable)
- CoS sees the summary, can read full logs if needed

---

## Hooks (Automatic Behaviors)

These run without you doing anything:

| Trigger | What Happens |
|---------|--------------|
| Open CoS | Briefing context injected (meta-work %, inbox count) |
| Morning greeting before noon | Offers morning check-in |
| Write to `logs/YYYYMMDD-*.md` | Auto-allowed (no permission prompt) |
| Edit CoS core files | Auto-allowed |
| Any `mkdir` command | Auto-allowed |

See `~/.claude/hooks/README.md` for full documentation.

---

## Quick Reference

**Daily rhythm:**
```
Morning: /morning (or just "good morning")
During work: /log when you want checkpoints
End of session: /save
Evening: /evening (or just "wrapping up")
```

**Weekly rhythm:**
```
Monday /morning: Auto-generates weekly synthesis
Anytime: /review-checkins for deeper pattern analysis
```

**When sharing ideas/links:**
```
Share URL → Claude proposes destination (thought vs resource)
"Random thought about X" → Captured to thoughts/
```

**Cross-project insights:**
```
/review-checkins → "Include session logs from all projects?" → Yes
→ Extracts patterns across projects
→ Can save to Patterns/ folder
```

---

## What Makes This Different

1. **Logs live with projects** - When you archive a project, its history goes with it
2. **CoS is an index, not a repository** - Summaries in CoS, details in projects
3. **Reasoning is captured** - Not just what you did, but why
4. **Patterns compound** - Cross-project insights extracted and reused
5. **Pull model for check-ins** - Claude does the remembering, you fill gaps
