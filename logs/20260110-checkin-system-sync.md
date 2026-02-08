---
title: Check-In System Implementation
---

# Chief of Staff: Check-In System Implementation

**Date:** January 10, 2026
**Source:** `/Users/jtnt/Documents/Projects/Chief of Staff`

## Recent Git Activity

```
3de615d Update project knowledge: Document check-in system implementation
0682990 Add check-in system with four types: morning, evening, thought, and journal
36780bf Sync Chief of Staff: Fix critical /save-progress logic bug
b515c61 Update project knowledge: Document Git Commit Policy and fix critical /save-progress logic bug
ea8da7c Document command dependencies in CLAUDE.md
78b7d4d Refactor /save-progress to call commands instead of duplicating logic
8aba428 Fix /save-progress to incorporate all recent improvements
e3847f7 Fix directory switching bug in /update-cos
b30f1c6 Sync Context Profile Framework: Precedent Layer implementation analysis
815a330 Remove automatic session.md deletion from /update-knowledge
```

## Current State

The Chief of Staff knowledge management system is operational with comprehensive workflows for:
- Project tracking and syncing across 6 projects
- Three-layer documentation model (session.md → CLAUDE.md + project-knowledge.md)
- Smart project status detection
- Command automation (`/update-knowledge`, `/update-cos`, `/save-progress`)
- **NEW: Check-in system for daily planning, reflection, and thought capture**

## Recent Work (2026-01-10)

### Check-In System Implementation

Built a comprehensive check-in system with four distinct types:

**1. Morning Check-in (`/morning`)**
- Capture day intentions and priorities
- Optional prompts: "What do you want to accomplish today?", "What's your top priority?", "Anything on your mind?"
- Creates: [[Check-Ins/daily/YYYYMMDD-morning.md]]
- Supports project routing if work items mentioned

**2. Evening Check-in (`/evening`)**
- Track what got done, spillover items, tomorrow plans
- Optional prompts: "What did you get done?", "What's carrying over?", "Anything noteworthy?"
- Creates: [[Check-Ins/daily/YYYYMMDD-evening.md]]
- Can cross-reference morning intentions
- Supports project routing

**3. Thought Capture (`/thought`)**
- Quick captures: quotes, links, articles, random ideas
- No prompts - just capture what's shared
- Creates: [[Check-Ins/thoughts/YYYYMMDD-thought-HHMM.md]] (timestamped)
- Each thought gets its own file
- Can fetch URL context automatically
- Offers project routing when relevant

**4. Journal Entry (`/journal`)**
- Personal reflection, completely freeform
- No prompts, no structure imposed
- Creates/appends to: [[Check-Ins/journal/YYYYMMDD-journal.md]]
- Multiple entries per day supported (timestamped headings)
- Never routed to projects (always private)

**5. Pattern Analysis (`/review-checkins`)**
- Analyzes check-ins over specified period (default: last 7 days)
- Identifies: recurring themes, energy/mood trends, spillover patterns, project focus, ideas worth developing
- Can update project-knowledge.md with observations
- Can save review to `Weekly Reviews/` folder

### Natural Language Detection

All four check-in types can be triggered naturally without slash commands:
- "Good morning" / "Starting my day" → Morning check-in
- "End of day" / "Wrapping up" → Evening check-in
- Sharing a link/quote / "Random thought" → Thought capture
- Extended personal reflection / "I've been thinking about..." → Journal entry

Claude recognizes intent and either proceeds directly or confirms the check-in type.

### Technical Implementation

**Files Created:**
- `/Users/jtnt/.claude/commands/morning.md` - Morning check-in command
- `/Users/jtnt/.claude/commands/evening.md` - Evening check-in command
- `/Users/jtnt/.claude/commands/thought.md` - Thought capture command
- `/Users/jtnt/.claude/commands/journal.md` - Journal entry command
- `/Users/jtnt/.claude/commands/review-checkins.md` - Pattern analysis command
- [[Check-Ins/daily/.gitkeep]], [[Check-Ins/thoughts/.gitkeep]], [[Check-Ins/journal/.gitkeep]]

**Updated:**
- `CLAUDE.md` - Added complete Check-In System section with natural language detection guidance
- `project-knowledge.md` - Documented check-in system implementation

### Design Philosophy

**Low-friction capture:**
- Morning/evening can use prompts or go freeform
- Thoughts are timestamped separately (not batched)
- Journal entries are private and unstructured
- Natural language triggers reduce command overhead

**Pattern analysis over prescription:**
- System captures data, identifies patterns
- Review process surfaces themes, energy trends, completion patterns
- Ideas from thoughts can be developed into projects
- Morning intentions vs. evening outcomes reveal completion dynamics

**Project integration:**
- Check-ins can link to project folders when relevant
- Creates `Projects/[Name]/YYYYMMDD-checkin-note.md` with relevant excerpts
- Original check-in stays in Check-Ins/ (single source of truth)
- Journal entries never routed (privacy preserved)

## Open Items

- Test check-in system in practice over next week
- Validate natural language detection accuracy
- Refine `/review-checkins` pattern analysis based on actual usage
- Consider integration with Weekly Reviews workflow
