---
date: 2026-02-02 11:25 AM PST
type: project-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/10995c8b-5ce5-4c8f-b8a7-112af09ce674.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: Inbox Triage Plugin Design
---

# Chief of Staff: Inbox Triage Plugin Design

## What Was Done

Designed a comprehensive inbox triage plugin for Claude Code based on a real user need: a friend's LinkedIn post requesting AI to "sort my email, surface what matters, and handle obvious actions" after nearly missing his child's basketball game due to a buried school email.

**Key deliverables:**
- Complete plugin specification saved to [[Working/inbox-triage-design.md]]
- Detailed skill logic with Gmail and Google Calendar MCP integration
- User flow design with conservative "ask-first" approach
- Email categorization framework (6 buckets: Calendar Events, Needs Reply, Action Required, FYI, Newsletters, Noise)
- Structured output format with tables for high-priority items
- Action confirmation flows for calendar events, email drafts, batch archiving

**Technical research conducted:**
- Reviewed existing Claude Code skill patterns from `~/.claude/skills/`
- Confirmed Gmail MCP has full wildcard permissions (`mcp__gmail__*`)
- Identified Google Calendar MCP permission gap (needs `create-event` added to settings)
- Established performance constraints (max 50 emails scanned, 15 full reads per session)

**Architecture decisions:**
- Plugin format chosen over standalone skill for shareability
- Parallel Gmail searches for pre-segmentation (Primary, Calendar invites, Starred)
- Snippet-first categorization to minimize full email reads
- Conservative "FYI over Noise" rule to avoid missed important emails
- One-by-one calendar event confirmation (too variable for batch creation)

## Key Decisions

**Plugin vs Skill:** Chose plugin format for better shareability. The setup burden (MCP server configuration) is identical either way, but plugin provides cleaner installation experience.

**Conservative "Ask-First" Approach:** Never auto-execute actions. Always surface, categorize, and ask permission. This builds trust while proving the categorization logic works.

**Performance Limits:** Cap at 50 emails scanned, 15 full reads per session. Keeps triage fast (~2 minutes) while handling realistic inbox volumes.

**Email Reading Strategy:** Categorize from snippets first. Only read full content for calendar-related keywords, action-needed indicators, or substantive emails from real people. Skip obvious newsletters/promotions.

## Reasoning

**Why plugin over skill:** Initially considered a skill for speed, but realized the real setup cost is MCP server configuration (same for both). Plugin provides better user experience for sharing with the friend who inspired this.

**Why conservative categorization:** Better to surface an email unnecessarily than miss something important. The "FYI over Noise" rule ensures edge cases get human review rather than auto-archival.

**Why parallel Gmail searches:** Pre-segmenting emails (calendar invites, starred items) provides better context for categorization without requiring full content reading.

**Why structured output with numbering:** Tables make high-priority items scannable. Numbered references allow users to say "look at #3 from Needs Reply" in follow-up conversations.

## Execution Plan

**Next session implementation path:**

1. **Plugin Creation**
   - Run `/plugin-dev:create-plugin`
   - Point to [[Working/inbox-triage-design.md]] as complete spec
   - Core SKILL.md content is fully defined (lines 43-220 of design doc)

2. **Permission Setup**
   - Add `mcp__google-calendar__create-event` to settings.json
   - Verify Gmail wildcard permissions are active
   - Test MCP server connectivity

3. **Testing & Refinement**
   - Test on real inbox with various email types
   - Validate Gmail date filtering (`YYYY/MM/DD` format)
   - Confirm calendar event creation with proper timezone handling
   - Test batch email archiving

4. **Friend Setup Guide**
   - Document MCP server setup process
   - Create step-by-step installation guide
   - Include troubleshooting for common OAuth issues

The design doc contains complete technical specifications, required permissions, example queries, output formats, and error handling patterns. Everything needed for implementation is captured.

## Changes Made

**Files created:**
- [[Working/inbox-triage-design.md]] - Complete plugin specification with technical details, user flows, email categorization framework, Gmail/Calendar MCP integration patterns, and implementation notes

**Files examined:**
- Explored existing skill patterns in `~/.claude/skills/` for frontmatter and structure conventions
- Reviewed MCP server permissions in settings.json to understand current Gmail/Calendar access
- Referenced Claude Code skill documentation for argument parsing and user interaction patterns

No files were modified - this was purely a design and exploration session.

## Open Items

1. **Add calendar permissions** - `mcp__google-calendar__create-event` needs to be added to settings.json
2. **Test plugin-dev workflow** - This is the first use of the plugin-dev tools, need to validate they work as expected
3. **Real inbox testing** - Design is theoretical, needs validation against actual email patterns
4. **Friend setup documentation** - Need to create user-friendly setup guide for non-technical users
5. **Error handling refinement** - Add handling for MCP server connectivity issues, rate limits, OAuth token expiry