---
title: Briefing Template Fix
---

# Chief of Staff: Briefing Template Fix

**Date:** 2026-01-23 07:34 AM EST
**Session Type:** meta-work

## What Was Done

Fixed the morning briefing template (`~/.claude/hooks/briefing-template.md`) to properly detect published content across multiple project locations. Previously, Step 3 only checked `Writing/Published/**/*.md`, missing content in project-specific folders like `Razzo/Writing/`. This caused incorrect "last content X days ago" reporting.

## Key Decisions

- Expanded content detection to check: central Writing/Published, Razzo/Writing, and any other project Writing/ folders found in project-sources.md
- Added multiple methods for determining publish date: frontmatter `published:` field, URLs to published posts, or git log fallback
- Simplified the output format to show: last published (with project), one draft to consider, one random thought seed

## Changes Made

- `~/.claude/hooks/briefing-template.md`: Rewrote Step 3 (content/writing assessment) and updated the Content & Writing section in the output template

## Open Items

None identified.
