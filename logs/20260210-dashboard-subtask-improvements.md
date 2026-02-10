---
date: 2026-02-10 12:51 PST
title: Dashboard Subtask Improvements
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/09e4aa4c-b739-4ee2-8cab-4818be9184bb.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Dashboard Subtask Improvements

## What Was Done

Implemented four major improvements to how the CoS dashboard parses and renders subtasks from `project-knowledge.md`:

**1. Structured subtask parsing** — Updated `parseSubtaskLine()` to extract structured fields (title, links, context) like parent tasks do, instead of treating subtasks as plain text. Subtask titles now come from `**Bold Title**` format, wikilinks from `[[path]]`, and descriptions from indented lines below.

**2. Description line routing** — Fixed `parseInbox()` to track `lastSubtask` so description lines attach to subtasks when appropriate, not just parents. Previously all description lines went to the last parent task, even after a subtask was parsed.

**3. Subtask rendering** — Updated `createTaskItemEl()` to display clean titles (no `**` markers), show context/description divs, render wikilinks with `tag-wikilink` styling (not bold yellow `tag-link`), and add copy buttons to each subtask.

**4. Copy button context** — Main task copy now includes subtask descriptions formatted as `- **Title**: description`. Subtask copy produces actionable prompts: parent title (frames "what you're working on"), subtask title and context (what to do), and task spec link (full details).

## Key Decisions

**Subtask copy includes parent title, not parent description** — User clarified that parent title provides necessary framing ("Fix dashboard subtask parsing: Add description line") while parent description line is just metadata about sibling tasks. Only the task spec link from parent is included as actionable context.

**WikiLink styling over source tag styling** — Initially used `tag-link` class (big bold yellow) for subtask wikilinks, corrected to `tag-wikilink` (small subtle accent) to match parent task link rendering.

## Reasoning

**Why parent title in subtask copy:** A subtask like "Add description line parsing" is meaningless without context. Including the parent title ("Fix dashboard subtask parsing") frames what you're working on, making the copied prompt immediately actionable.

**Thinking evolution:** Initially included parent description, assuming all parent context was useful. User pointed out that parent description line is about the task structure (sources, sibling subtasks), not actionable context for the subtask itself. The parent's *title* provides framing, not its metadata.

**Pattern to remember:** Copy buttons should produce prompts ready to paste into AI — include enough context for AI to understand the scope (parent title, task spec) but skip metadata that doesn't help (parent description, sibling subtask details).

## Changes Made

Modified [[Tools/dashboard/js/app.js]]:
- `parseSubtaskLine()` (line 544): Extract title from `**markers**`, wikilinks from `[[path]]`, produce clean text
- `parseInbox()` (line 468): Track `lastSubtask`, route description lines to subtasks when appropriate
- `createTaskItemEl()` (line 1533): Render clean subtask titles, description divs, wikilinks, and copy buttons
- Task copy formatting: Main task includes subtask descriptions as `- **Title**: context`; subtask copy includes parent title + subtask details + task spec link

Also modified [[project-knowledge.md]]: Last updated timestamp

## Open Items

None identified.
