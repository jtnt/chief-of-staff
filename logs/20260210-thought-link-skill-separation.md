---
date: 2026-02-10 18:43 EST
title: Thought/Link Skill Separation
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/f20768dc-c731-490b-a0f8-c1f779fa6b3d.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Thought/Link Skill Separation

## What Was Done

Fixed skill routing ambiguity between `/thought` and `/link` skills. The user shared a URL (David Ondrej tweet about "living files" theory, CPF-related) and I incorrectly routed it to `/thought` instead of `/link`.

Root cause: `/thought` skill description included "link, article" and contained a full "Link Capture Workflow" that saved URLs to `Links/[Category]/` — creating overlap with `/link`, which saves research-grade content to project `research/` folders with deeper analysis.

**Changes made:**
- Stripped all URL-handling logic from [[~/.claude/skills/thought/SKILL.md]]
- Added explicit redirect at top: "If the input contains a URL, stop and use `/link` instead"
- Updated description from "quote, link, article, or random idea" to "quote, idea, or random observation"
- Removed Link Capture Workflow section (categories, file templates, index rebuild logic)
- Cleaned up confirmation messages and notes to remove link references

Clean separation now:
- `/thought` = non-URL content only (quotes, ideas, observations)
- `/link` = anything with a URL (saves to project research folders with analysis)

## Key Decisions

**Why strip link handling from `/thought` entirely (vs. keeping both)?**
- `/link` does proper research capture with project integration and manifest updates
- `/thought` link workflow saved to generic `Links/` folder without project context
- When content relates to a tracked project, `/link` is always the better choice
- Simpler mental model: URL → `/link`, no URL → `/thought`

## Reasoning

**Pattern to remember:** Skill overlap creates routing ambiguity. When two skills can handle the same input, Claude has to guess which one to use based on subtle context clues. Better to enforce clean boundaries:
- One skill per input type
- Explicit redirects when input type doesn't match
- Descriptive skill names that map directly to input types

This is the second time skill routing has caused friction (first was the defunct `/log` and `/save` commands). The pattern: when automation changes, old interfaces linger and create confusion.

## Changes Made

**Files modified:**
- [[~/.claude/skills/thought/SKILL.md]] - Stripped link capture workflow, added redirect to `/link`

**Files created (then corrected):**
- [[Check-Ins/thoughts/20260210-living-files-theory-david-ondrej-cpf-validation.md]] (misrouted, moved to `.bak`)
- [[/Users/jtnt/Documents/Projects/Context Profile Framework/research/20260210_living-files-theory-david-ondrej.md]] (correct location)
- [[~/.claude/skills/thought/SKILL.md.bak]] (backup before editing)

**External project changes (Context Profile Framework):**
- Added task to [[/Users/jtnt/Documents/Projects/Context Profile Framework/project-knowledge.md]] inbox linking to research file
- Already committed in previous session (not part of this capture)

## Open Items

None identified. The skill boundary is now clear and documented.
