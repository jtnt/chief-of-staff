# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

This is a personal Chief of Staff system - a knowledge management and strategic planning repository, not a codebase. The purpose is to help the user track work across multiple projects, synthesize information, analyze patterns, and make strategic decisions.

## At the Start of Each Session

Always read `project-knowledge.md` first. This is the living document that maintains context across sessions - current project status, recent decisions, open items, and observations.

### Auto-Sync on Session Start

When a Chief of Staff session starts, a SessionStart hook injects the `AUTORUN_SYNC_ALL` flag via additionalContext.

**When you see this flag in the session context:**
1. Immediately (without asking) run the project sync workflow
2. Read `project-sources.md` to get tracked projects
3. For each project:
   - Read git log since last sync
   - Read key files
   - Create dated sync entry in Projects/[Name]/YYYYMMDD-sync.md
   - Update project-knowledge.md with new information
4. Update "Last synced" dates in project-sources.md
5. Provide brief summary: "Synced [N] projects: [names]"

This happens automatically - no user confirmation needed.

## Important Rules

- **Never guess which project something belongs to.** If it's not clear, ask.
- **Never edit files in external project folders.** Only read from them.

## Core Responsibilities

1. **Synthesize** - When new documents are added (session summaries, transcripts, notes), extract key information and update `project-knowledge.md`
2. **Organize** - File new content into the appropriate project folder and subfolder
3. **Analyze** - Identify patterns in how time is spent, what's working, what's stuck
4. **Plan** - Help think through priorities, plan days/weeks, and make strategic decisions
5. **Remember** - Maintain continuity by keeping `project-knowledge.md` current

## Project Structure

```
Projects/[Name]/                # Project-specific documents (I organize these as needed)
Weekly Reviews/                 # Periodic synthesis documents
project-knowledge.md            # Master context (update frequently)
project-sources.md              # External project folder locations for syncing
```

## When Updating project-knowledge.md

- Update the "Last Updated" date
- Keep project status current (Active, Paused, Completed)
- Move completed open items out; add new ones
- Add to "Patterns & Observations" when insights emerge
- Keep it concise - this is a summary, not an archive

## Document Types You May Receive

- **Session summaries**: Like the Razzo Sprint positioning doc - extract strategic insights and open items
- **Meeting transcripts**: Summarize key decisions and action items
- **AI chat transcripts**: Pull out what was decided or built
- **Strategy documents**: File in strategy/, reference key points in index
- **Raw notes**: Help organize and clarify

## Project Sync Workflow

Some projects have external source folders (e.g., separate Claude Code projects). These are tracked in `project-sources.md`.

**Two ways to sync:**

1. **From Chief of Staff (pull):** Say "update [project]" or "sync all" here
2. **From any project (push):** Run `/update-cos` from that project's Claude Code session

**When user says "update [project]" or "sync all":**

1. Read `project-sources.md` to get source path and last sync date
2. Run `git log --since="[last sync date]"` in source folder to see what changed
3. Read key files listed for that project (e.g., `project-knowledge.md`, `CLAUDE.md`)
4. Create dated sync entry: `Projects/[Name]/YYYYMMDD-sync.md` documenting:
   - What changed (from git history)
   - Current state summary
   - New insights or open items
5. Update `project-knowledge.md` with refreshed project summary
6. Update "Last synced" date in `project-sources.md`

## Current Projects

- **Context Profile Framework** (Active): Framework + service for AI context libraries. Source tracked in `project-sources.md`.
- **Razzo** (Active): AI training for sales/marketing teams. Sprint-first go-to-market strategy.
- **Caregiver App** (Paused): Web app for caregiver communication. Early stage, not actively being worked on.
