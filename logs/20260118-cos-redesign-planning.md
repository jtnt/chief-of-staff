---
title: System Redesign Planning
---

# Chief of Staff: System Redesign Planning

**Date:** 2026-01-18
**Session Type:** Meta-work / Planning

## What Happened

Deep-dive analysis of the Chief of Staff system's fundamental problems. User expressed frustration that the system is **passive** - it stores what you tell it but never proactively helps, even when proactive behaviors are programmed in (like meta-work reminders).

### Research Conducted

Read and analyzed several reference systems:
- **Rachel Wolan's Chief of Staff** (2 transcripts): Agent-based architecture where Claude Code IS the system, dashboard just renders markdown outputs
- **Teresa Torres' setup** (1 transcript): Task management via markdown files, "today" command that generates daily to-do
- **McKay Wrigley's Obsidian note-taker** (transcript + summary): Custom commands, MCP servers, sub-agents for parallel processing
- **Anthropic Claude Code best practices**: Added to resources

### Key Insight

The fundamental problem isn't the dashboard bugs (though those exist). It's that the system is **passive**. Rachel's system has agents that DO things:
- Calendar Analyzer: finds delegation opportunities
- Email Triage: archives junk, drafts responses
- Meeting Prep: generates prep docs automatically

Our system has 17 commands but they all just create logs. Nothing is proactive.

## Decisions Made

1. **Preserve before rebuilding**: Create `pre-redesign` backup branch before any changes
2. **Claude Code is the system**: Dashboard is secondary - just a markdown viewer for agent outputs
3. **Don't copy Rachel exactly**: Need agents tailored to user's actual workflow (e.g., probably don't need dinner research agent)

## Files Changed

- Added Rachel Wolan transcripts (2 files) to Resources
- Added Teresa Torres transcript to Resources
- Added Obsidian note-taker transcript + summary to Resources
- Added Anthropic Claude Code best practices to Resources
- Screenshots of Rachel's dashboard added

## Plan File

Complete redesign plan written to: `~/.claude/plans/bright-bubbling-rain.md`

Key phases:
1. Backup current system (git branch)
2. Design proactive agents for user's workflow
3. Build first proactive agent (calendar or daily briefing)
4. Add session hooks for automatic behavior
5. Simplify commands from 17 to essentials
6. Dashboard rebuild as markdown viewer (optional, later)

## Open Items

- [ ] What agents would be most valuable for user's workflow?
- [ ] What should happen proactively at session start?
- [ ] How should the task system work (not just files that sit there)?

## Next Session

1. Commit and push this session's changes (preserving resources)
2. Create backup branch
3. Define what "proactive" means for THIS user's workflow
4. Build one agent that actually does something useful
