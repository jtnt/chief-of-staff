---
date: 2026-02-03 04:58 PM EST
type: project-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/ae349c8e-7bac-48bf-8b06-b55d835ef3af.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
title: Substack Import Organization
---

# Chief of Staff: Substack Import Organization

## What Was Done

**Organized complete Substack writing archive into Writing project structure:**

**Archive Stats:**
- **13 published posts** (April 2025 - January 2026)
- **3 draft posts** (2 substantive, 1 Substack tutorial)
- **Email list CSV** with subscriber data
- **Analytics CSVs** for post performance metrics
- **10 embedded images** across posts (6 HEIC, 4 PNG, 19KB-7.7MB)

**Content Processing:**
- Converted all HTML posts to clean markdown with proper frontmatter (title, date, platform, tags)
- Removed Substack boilerplate (subscribe CTAs, share buttons)
- Applied project tags: Context Profile Framework posts tagged appropriately, Claude system prompt post tagged with Razzo
- Downloaded and localized all embedded images, updated markdown references from remote URLs to `./filename`
- Merged duplicate "Context is Everything" post (existed as LinkedIn post Jan 15) with Substack version (Jan 18), stored analytics from both platforms

**Folder Structure Created:**
```
Writing/
├── Published/
│   ├── 20250417_ai-smart-not-psychic/        # + 11 other posts
│   │   ├── post.md
│   │   ├── analytics.csv (where available)
│   │   └── [images] (where present)
│   └── 20260118_context-is-everything/       # Merged folder
│       ├── post.md (both platforms noted)
│       ├── linkedin-analytics.png
│       ├── substack-analytics.csv
│       └── [3 total images]
├── Drafts/
│   ├── context-profile-benefits.md
│   └── ai-content-strategy-notes.md
└── Substack/
    ├── email_list.aiinstinct.csv
    └── posts-metadata.csv
```

**Updated writing-index.md:**
- Added Platform column to track cross-posting
- Catalogued all 22 published pieces (12 new Substack + existing)
- Added 2 substantive drafts
- Maintained chronological sorting

## Key Decisions

**Content deduplication:** Merged "Context is Everything" rather than creating separate entries - same content cross-posted to LinkedIn (Jan 15) and Substack (Jan 18). Combined analytics from both platforms.

**Image handling:** Downloaded all 10 images locally rather than keeping remote references, ensuring content portability and avoiding broken links.

**Folder naming:** Used YYYYMMDD_slug format consistent with existing Published/ structure.

**Project tagging:** Applied Context Profile Framework tags to relevant posts, Razzo tag to Claude system prompt analysis.

## Reasoning

- **Why local images:** Substack images are hosted remotely and could break over time. Local storage ensures permanence and portability of the writing archive.
- **Why merge duplicates:** Single piece of content shouldn't have multiple entries in the index. Platform diversity is noted in metadata.
- **Why preserve analytics:** Performance data across platforms provides insights for future content strategy.

## Changes Made

**Writing Project (external - read-only access):**
- 12 new Published/ folders created with posts and assets
- 1 existing folder updated (Context is Everything merger)
- 2 Drafts/ files created
- Substack/ metadata folder created
- writing-index.md updated with 14 new entries

**No changes to Chief of Staff git repo** - this session worked entirely in the external Writing project folder structure.

**Image assets:** 10 images totaling ~25MB downloaded across post folders.

## Open Items

None identified. Archive import and organization complete. Original zip file preserved at [[Writing/ai-instinct-writing-export-20260203.zip]] for reference.