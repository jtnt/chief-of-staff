---
date: 2026-02-09 21:20 EST
title: Dashboard Timestamp and Preview Fixes
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/de700869-77bd-41f3-ab5b-1bed3519d89f.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Dashboard Timestamp and Preview Fixes

## What Was Done

Fixed multiple display inconsistencies in the Chief of Staff dashboard that were making the activity feed hard to scan. The core issues:

1. **Timestamp format chaos**: Activity feed showed dates in three different formats (`2026-02-06 4:34 PM`, `2026-02-09 20:20 EST`, `2026-02-09 18:50 PST`) because the formatting function only handled 12-hour format, not 24-hour format with timezones.

2. **Duplicate metadata display**: Date and title appeared twice in activity items - once in the header and again in the preview text because the preview extraction was including YAML frontmatter lines as content.

3. **Preview truncation**: Previews were cutting off at 120 characters mid-sentence because of CSS `white-space: nowrap` constraint, making it hard to get context without opening the full item.

**Solutions implemented**:

- Enhanced `formatDisplayDate()` in [[Tools/dashboard/js/app.js]] to handle both 12-hour (`h:mm AM/PM`) and 24-hour (`HH:mm`) formats with timezone conversion
- Modified preview extraction to strip entire frontmatter block (`---...---`) before extracting text
- Added filter to skip `**Date:**` lines in preview content
- Changed CSS from single-line truncation to 2-line preview with `-webkit-line-clamp`
- Expanded preview length from 120 to 250 characters with sentence boundary detection

Also added dashboard documentation to [[CLAUDE.md]] so it's discoverable in future sessions (location, features, key files, how to open).

## Key Decisions

**Handle all timestamp formats in one place** - Rather than fixing each timestamp at the source, centralized normalization in the `formatDisplayDate()` function so all dates pass through the same logic and display consistently.

**Strip frontmatter rather than special-case fields** - Instead of filtering individual fields like `date:` and `title:`, removed the entire frontmatter block before preview extraction. More robust and handles future frontmatter fields without additional code.

**CSS fix over JavaScript** - The 120-char limit was actually CSS truncation (`white-space: nowrap`), not JavaScript substring. Fixed with `display: -webkit-box` and `line-clamp` for better multiline handling.

## Reasoning

**Why normalize to EST 12-hour format** - Session logs use mixed timezones (EST/PST) based on when they were created. Converting everything to EST creates consistency and matches the primary timezone. 12-hour format is more readable for quick scanning.

**Why 2-line previews** - Single line was too constraining (~120 chars), but unlimited height would make the feed too sparse. Two lines shows 1-2 complete sentences (~200-250 chars) which provides context without taking over the interface.

**Pattern to remember** - When dealing with timestamp inconsistencies in UI, check both the data source AND the display layer. This issue had problems at both levels: raw data in multiple formats + formatting function that only handled one case.

## Changes Made

**Modified**:
- [[Tools/dashboard/js/app.js]] - Enhanced `formatDisplayDate()` to handle 12h/24h formats with timezone conversion; improved preview extraction to strip frontmatter and skip date lines
- [[Tools/dashboard/css/style.css]] - Changed `.activity-preview` from single-line truncation to 2-line display with line-clamp
- [[CLAUDE.md]] - Added Dashboard section documenting location, features, key files, and usage

**Committed**: `2f46fa2a` - Fix dashboard timestamp and preview display inconsistencies

**Verification approach**: Checked git status and recent commits to confirm changes. The session also included running the export-session command which created [[20260210-dashboard-timestamp-fixes-session.md]] (full 301-message transcript export).

## Open Items

None identified. Dashboard timestamp and preview display are now consistent across all views.
