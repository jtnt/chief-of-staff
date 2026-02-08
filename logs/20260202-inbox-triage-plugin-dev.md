---
date: 2026-02-02 05:30 PM EST
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/4ed80d24-a8c4-41a1-b31e-a88b7725e63d.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: Inbox Triage Plugin Development
---

# Chief of Staff: Inbox Triage Plugin Development

## What Was Done

Built a complete Claude Code plugin for email triage using the `plugin-dev:create-plugin` workflow. The plugin automates Gmail scanning, email categorization, and action suggestions while maintaining user control over all actions.

**Plugin location:** `/Users/jtnt/Documents/Projects/Code/inbox-triage/`

**Core functionality:**
- Scans Gmail inbox with timeframe filters (today/3days/week)
- Parallel search strategy: primary inbox, calendar invites, starred emails
- Categorizes into 6 buckets: Calendar Events, Needs Reply, Action Required, FYI, Newsletters, Noise
- Selective reading (max 15 emails) to preserve speed
- Extracts calendar event details with duration estimates
- Presents structured summary with numbered references
- Suggests actions: add events to calendar, draft replies, archive noise, create filters
- Never executes actions without explicit user confirmation

**Built components:**
- Plugin manifest (plugin.json)
- Two skills: core inbox-triage workflow and setup/onboarding
- Three reference documents: categorization rules, calendar extraction, output format
- Complete README with usage examples and safety rules

## Key Decisions

**Progressive disclosure approach** - Core SKILL.md files contain essential workflow, detailed rules moved to references/ folder. This keeps skills readable while preserving comprehensive guidance.

**Conservative categorization** - When uncertain, emails go to FYI bucket rather than Noise. Better to surface potentially important content than miss it.

**Parallel search strategy** - Three simultaneous Gmail queries (inbox, calendar invites, starred) to pre-segment results before categorization, improving efficiency.

**Setup skill redesign** - After testing revealed issues with ToolSearch behavior, completely rewrote setup skill to use file discovery pattern: finds existing MCP configs in user's other projects and offers to copy them rather than asking technical questions.

## Reasoning

**Why plugin vs standalone skill:** Plugins are more shareable and provide better component organization. Since this is potentially useful to others, plugin format makes it distributable.

**Why selective reading:** Full email content only retrieved for ~15 emails that show calendar/action indicators. Snippets sufficient for most categorization. Keeps triage under 2 minutes.

**Why duration estimation:** Calendar events often lack end times. Skill estimates based on event types (games ~2hr, practices ~1.5hr, meetings ~30min) and flags estimates for user adjustment.

**Pattern to remember:** When building skills that use MCP servers, test both happy path (servers available) and unhappy path (servers missing). The setup experience for missing dependencies is critical for adoption.

## Changes Made

**Files created:**
- `/Users/jtnt/Documents/Projects/Code/inbox-triage/` - Complete plugin directory structure
- `./Working/inbox-triage-dev-status.md` - Development status tracking (active)
- `./Working/inbox-triage-design.md` - Original design spec (status: absorbed)

**Files modified:**
- `./CLAUDE.md` - Minor updates during development process

## Open Items

**Testing needed:**
1. **Setup unhappy path** - Run `/inbox-triage:setup` from project without MCP servers. Should discover CoS config and offer to copy it.
2. **Setup happy path** - Run setup from CoS project where Gmail/Calendar MCP servers are configured. Should skip to preferences configuration.
3. **Core triage workflow** - End-to-end test: scan emails, categorize, present summary, confirm actions.

**Known issue: ToolSearch behavior** - During testing, Sonnet consistently used ToolSearch despite instructions not to when MCP tools weren't available. Latest redesign may resolve by avoiding tool discovery patterns entirely, but needs verification.

**Context window optimization** - Testing consumed ~61% context due to Cursor IDE system reminders. Consider terminal-based testing for final validation.