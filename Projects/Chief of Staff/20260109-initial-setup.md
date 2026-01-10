# Chief of Staff: Initial Setup

**Date:** January 9, 2026

---

## What Was Built

Created the Chief of Staff knowledge management system - a structured way to track work across multiple projects, synthesize information, analyze patterns, and support strategic decision-making.

### Core Structure

**Files created:**
- `project-knowledge.md` - Master context document tracking all projects, current state, recent work, open items, and emerging patterns
- `project-sources.md` - Registry of external project folders for syncing
- `CLAUDE.md` - Instructions for how Claude should operate within this system

**Folder structure:**
```
Chief of Staff/
├── Projects/
│   ├── Context Profile Framework/
│   ├── Razzo/
│   ├── Caregiver App/
│   └── Chief of Staff/          # This project (meta)
├── Weekly Reviews/
├── project-knowledge.md
├── project-sources.md
└── CLAUDE.md
```

### Sync Workflows

Built two complementary workflows for keeping Chief of Staff updated with external projects:

#### 1. Pull Workflow (from Chief of Staff)
When working in Chief of Staff, say "update [project]" or "sync all":
- Reads from external project folders listed in `project-sources.md`
- Checks git history for changes since last sync
- Reads key files (`project-knowledge.md`, `CLAUDE.md`, etc.)
- Creates dated sync entry documenting changes
- Updates `project-knowledge.md` with current state

#### 2. Push Workflow (from any project)
Created global `/update-cos` slash command at `~/.claude/commands/update-cos.md`:
- Run from any Claude Code project
- Gathers context (git history, project state, recent work)
- Pushes to Chief of Staff automatically
- Creates project folder if it doesn't exist
- Updates all relevant Chief of Staff files

### Initial Projects Tracked

1. **Context Profile Framework** - Framework + service for creating AI context libraries (external source folder tracked)
2. **Razzo** - AI training for sales/marketing teams
3. **Caregiver App** - Paused project for caregiver communication
4. **Chief of Staff** - This system itself (meta)

---

## Key Design Decisions

**Simplicity over sophistication:** Keep the system lightweight. Just markdown files organized in folders. No complex tooling required.

**You give, I organize:** User provides files, transcripts, summaries, or just talks. Claude figures out where things go and updates the knowledge base.

**Never guess project assignment:** If it's unclear which project something belongs to, ask. Never assume.

**Read-only for external projects:** Never edit files in external project folders. Only read from them.

**Automatic project creation:** When `/update-cos` is run from a new project, create the folder and entry automatically without asking.

**Two-way sync:** Support both pull (from Chief of Staff) and push (from projects) workflows for flexibility.

---

## Patterns Observed

Both Razzo and Context Profile Framework share a core philosophy: professionals adopt tools by solving real problems, not through passive learning. Razzo's Sprint has teams *build* workflows; CPF *builds* context libraries rather than handing over templates. Same insight, different applications.

---

## What's Next

The system is operational. Next steps will emerge based on usage:
- Test the sync workflows with real project updates
- Develop Weekly Reviews structure as patterns emerge
- Add more projects as they become active
- Refine organization based on what actually works
