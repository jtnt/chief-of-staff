---
date: 2026-02-03 12:47 PM PST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/d1d478ee-4f82-4a9e-824d-0d9f46b437d6.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: I-Corps Mentor Setup
---

# Chief of Staff: I-Corps Mentor Setup

## What Was Done

**Created new Tasks system for Chief of Staff** to handle standalone actionable items not tied to specific projects. This emerged from the need to track I-Corps mentor preparation tasks that weren't part of an existing project.

**Researched I-Corps program** based on links from Glenn's meeting:
- I-Corps (NSF Innovation Corps) focuses on "derisking commercialization through customer discovery training"
- Mentors provide industry experience, business guidance, and network connections
- Role can evolve into advisory positions or board roles
- Program uses structured approach to help teams develop viable commercial ventures

**Set up I-Corps mentor preparation workflow:**
- Created [[Tasks/20260203-icorps-mentor-prep.md]] with complete checklist
- 6 specific action items including forms, courses, and interview preparation
- Interview questions identified: Name/Education, Why doing this, Best job ever, Something surprising

**Enhanced morning briefing system** to include Tasks folder in daily strategic briefing template. Now Tasks will appear alongside Calendar, Projects, Content, and Inbox.

**System improvements:**
- Documented Tasks folder structure and usage guidelines in CLAUDE.md
- Added YAML frontmatter requirements for task tracking
- Established when tasks should migrate to full projects

## Key Decisions

**Created Tasks folder structure** rather than adding I-Corps items to existing project folders. This provides a dedicated space for standalone professional tasks that don't belong to larger projects.

**Integrated Tasks into morning briefing** so one-off actionable items get daily visibility alongside project work. This ensures important tasks don't get forgotten.

**Used descriptive filename convention** (`20260203-icorps-mentor-prep.md`) to make tasks easily identifiable and searchable.

## Reasoning

- **Why Tasks folder:** User explicitly wanted persistent tracking without "mucking up the root" of Chief of Staff with individual items. A dedicated folder keeps things organized while providing necessary persistence across sessions.

- **Why integrate with morning briefing:** One-off tasks can easily be overlooked when they're not part of regular project workflows. Including in daily briefings ensures visibility.

- **Pattern to remember:** When users ask for reminders about future work, they need persistent capture, not just conversational promises. Always create documented artifacts.

## Changes Made

**Files Created:**
- [[Tasks/20260203-icorps-mentor-prep.md]] - Complete I-Corps mentor preparation checklist with 6 action items and interview questions
- Updated `CLAUDE.md` - Added Tasks folder documentation to project structure and usage guidelines

**Files Modified:**
- `~/.claude/hooks/briefing-template.md` - Added Tasks section to morning briefing template
- `~/.claude/settings.json` - Plugin configuration updates (auto-updated from previous session)

**Git commits:**
- Chief of Staff changes auto-committed via session-capture system (commit 012ebed84)
- Claude config changes manually committed to `~/.claude` repo

## Open Items

**I-Corps mentor preparation** (ready for tomorrow):
- Complete Mentor Interest Form online
- Take self-paced I-Corps Prep Course
- Review Mentor Guide materials
- Schedule video interview with Glenn
- Prepare answers for 4 interview questions
- Submit mentor profile information

**Google Calendar re-authentication needed** - MCP server tokens expired, requires Claude Code restart to re-authenticate for calendar access.

**Tasks folder validation** - Monitor usage over next few weeks to see if this structure works well or needs refinement.