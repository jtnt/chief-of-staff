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

## Session Files in Technical Projects

Some technical/coding projects may have a `session.md` file during active development. This is Claude's working memory for complex sessions.

**Key points:**
- Session files are temporary - used during active work, then deleted
- They capture technical details needed for continuity (CSS selectors, error messages, debugging notes)
- When work completes, lasting technical notes get extracted to that project's CLAUDE.md
- Outcomes and strategic decisions get summarized to that project's project-knowledge.md
- **Do NOT sync session file contents to Chief of Staff** - only sync outcomes from project-knowledge.md

**Lifecycle**: Create during significant work → Update throughout session → Extract notes to CLAUDE.md → Delete session.md

Git commits already capture granular history, so session files don't need to persist long-term.

## Checking Project Status

When asked "what's the status" or "does anything need syncing":

1. Read `project-sources.md` to get all projects and last sync dates
2. For each project, check for changes:
   - **Git repos:** Run `git status --short` (uncommitted changes) + `git log --since="[last sync date]" --oneline` (new commits)
   - **Non-git folders:** Run `find /path -type f -newermt "[last sync date]" -not -path "*/.*" | head -5` (modified files)
3. Report only projects with changes (uncommitted or new commits)
4. Summarize quiet projects briefly (e.g., "3 projects quiet, no changes")

This keeps noise down while ensuring no work is missed.

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
