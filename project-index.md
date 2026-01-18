# Project Index

**Last Updated:** 2026-01-17 10:35 AM EST

This file contains summaries of all tracked projects. For information about Chief of Staff itself, see `project-knowledge.md`.

---

## Active Projects

### Razzo
**Status:** Active - Primary Focus
**What it is:** AI training for sales and marketing teams
**Website:** razzohq.com
**Source:** `/Users/jtnt/Documents/Projects/Razzo`
**Last synced:** 2026-01-15 (Context Profile Framework landing page)

**Current Strategic Direction:**
The AI Workflow Sprint has become the primary go-to-market focus, shifting Razzo from "training company" to "workflow enablement company." The Sprint is a 2-week engagement where teams build real, working AI workflows (not just learn skills). This creates natural pathways to other offerings (bootcamp, momentum program).

**Key Insight:** Professionals adopt tools by solving real problems, not through passive learning. The Sprint's action-learning approach addresses the "knowing-doing gap" that traditional training creates.

**Current Offerings:**
- AI Workflow Sprint: 2 weeks, $3,500 (individual) or $7,500 (team) - LEAD OFFERING
- Sales Teams Bootcamp: 4 sessions, $5,000
- Marketing Teams Bootcamp: 4 sessions, $5,000
- Sales Managers Workshop: 90 min, $1,500
- Office Hours: $250/hr
- Context Profile Framework: landing page + waitlist for app (NEW)

**Recent Work:**
- 2026-01-15: **Context Profile Framework landing page** COMPLETED
  - New page at `/context-profile-framework/` to introduce CPF and capture app waitlist signups
  - Headline: "Capture What AI Needs to Know About Your Business"
  - Sidebar layout with sticky waitlist CTA + framework graphic
  - Added "Context Profile Framework" as top-level nav item with vertical separators
  - Visual assets: chaos-to-order illustration, framework diagram (lightbox), Ethan Mollick quote
  - Images compressed from 13MB to ~350KB
  - Audience: wide net (anyone using AI), not narrowly targeted at B2B ICP
- 2026-01-11: StoryBrand messaging exploration (IN PROGRESS)
  - Applied PEACE framework to find compelling "problem soundbite"
  - Clarified the core problem: scattered usage, no shared systems, nothing compounds
  - **Unresolved:** Still searching for the right soundbite
- 2026-01-09: Sprint positioning work COMPLETED
  - Website fully reflects Sprint-first positioning
  - Repository reorganized with website/, Planning/, Assets/ folders

**Open Items:**
- **PRIORITY:** Find the right problem soundbite (StoryBrand "own the hole")
- Integrate waitlist form with email tool
- Consider hosting CPF articles on razzohq.com (currently on Substack)
- Clarify relationship between CPF offering and core Razzo training services
- Monitor Sprint positioning effectiveness with market

---

### Context Profile Framework
**Status:** Active - R&D / Early Exploration
**What it is:** Framework + done-for-you service for creating AI context libraries
**Source:** `/Users/jtnt/Documents/Projects/Context Profile Framework`
**Last synced:** 2026-01-15 ("Context is Everything" article finalized)

**The Problem:** Organizations underutilize AI because they start every conversation from scratch. The framework teaches *what* to build (four layers: Company, Department, Project, Individual). The service actually builds it for them.

**Current Strategic Direction:**
- Manual MVP phase - validate with 3-5 companies before building software
- Creation friction is the primary barrier (not maintenance, not access)
- Transformation over templates: converting raw content to structured knowledge is the value
- Google Drive delivery with Claude Projects sync
- Context as competitive advantage positioning - when everyone has same AI models, context quality becomes differentiation
- Opinionated structure compounds intelligently - random accumulation doesn't compound, structured accumulation does

**Architecture Evolution:**
The Context Infrastructure now has four distinct layers in the middle network:
1. **Knowledge Layer** - Raw facts, atomic concepts
2. **Ontological Layer** - Relationships, what connects to what
3. **Reasoning Layer** - Purpose, the why behind connections
4. **Precedent Layer** - Decision traces (the "what vs. why" gap)

**Key Recent Insight:** Agents don't just consume context—they CREATE decision traces by doing work. Each agent action adds to the precedent layer, building institutional memory that turns exceptions into searchable precedent.

**Pricing:** $3,500-$5,000 for complete context library, delivered in ~1 week

**Connection to Razzo:** Same ICP, complementary offerings. Training teaches AI usage; Context Library solves the creation friction that prevents applying what's learned.

**Recent Work:**
- 2026-01-17: **Writing folder migrated** - All CPF writing moved to central Writing project
  - See `writing-refs.md` in CPF for index of related writing
  - Writing now at `/Users/jtnt/Documents/Projects/Writing/Published/`
- 2026-01-15: **"Context is Everything" article finalized** - Introduces CPF by showing gap between what people tell AI vs. what AI needs
- 2026-01-14: **Context Profile benefits article (WIP)** - Four key value props
- 2026-01-12: **Cowork hot takes post** - LinkedIn post tying file system access to CPF
- 2026-01-10: **ContextOS Analysis** - Full analysis of gtm-context-os-quickstart (Jacob Dietle, taste.systems)
  - **Strategic insight:** "The value isn't just in structure—it's in opinionated structure that compounds intelligently"
  - Full analysis: `Working/contextos-analysis.md`
- 2026-01-09: Major conceptual update to architecture based on context graphs research
- Research prompts developed: Company Context (v4), Industry Context (v2)
- Testing with SalesIntel as testbed

**Open Items:**
- How to implement atomic concepts in CPF without over-complicating?
- Design constitutional documents for CPF service
- Define clearer node type criteria or simplify
- Should CPF structure be prescriptive or emergent? (agents discover vs. pre-defined)
- How do we design for agent-created context? (bootstrap question)
- Context as competitive advantage—positioning as feature vs. core message?
- Develop remaining research prompts (Competitor Intelligence, Brand Voice, ICP Definition)

---

### Context Profile Builder
**Status:** Active - Potential Rebuild
**What it is:** Web app for creating Context Profile Framework documents
**Source:** `/Users/jtnt/Documents/Projects/context-profile-builder`
**GitHub:** https://github.com/jtnt/context-profile-builder.git
**Last synced:** 2026-01-16 (PRD export for rebuild)

**Relationship to CPF:** This is the productized web app version of the Context Profile Framework. The parent project contains framework docs and research; this repo is the implementation.

**Core Philosophy: Opinionated Software**
All features, UX, and UI decisions are viewed through this lens. The app enforces a particular workflow because each step genuinely depends on the previous ones. This is the value proposition, not a constraint.
- Sequential by design (documents build on each other)
- Transparency over magic (show what's happening)
- Minimal decisions (auto-unlock, auto-save, one clear action)
- Cross-document intelligence (each doc informs the next)

**Current State:**
User considering rebuilding from scratch. Comprehensive PRD created at `prd-export.md` capturing:
- Full product vision (all 4 layers + custom documents)
- Document specifications and user flows
- Key learnings from V1 implementation
- Ontological layer / knowledge graph future vision (inspired by ContextOS)
- Cross-document intelligence patterns

V1 MVP is functional with two working document types:
- Company Background: questionnaire-based generation
- Industry Profile: multi-step research flow (Input → URL Discovery → Verification → Generate)
- Sequential document locking, progress modal, auto-save all working

**Tech stack (V1):** Next.js 16, TypeScript, Supabase, shadcn/ui, Claude API, Jina Reader

**Recent Work:**
- 2026-01-16: **PRD Export for Potential Rebuild**
  - Created comprehensive PRD (~540 lines) capturing full product vision
  - Documented all 4 layers (Company, Department, Project, Individual) + custom documents
  - Added ontological layer / knowledge graph future vision (atomic concepts, operational docs, metadata, taxonomy, status tracking)
  - Captured implementation learnings (Jina Reader, Claude URL suggestions, UX patterns)
  - Tech stack left open for rebuild flexibility
- 2026-01-14 (late night): Phase 6 UX Refinements complete
- 2026-01-14 (night): Industry Profile Implementation
- 2026-01-13: Built complete MVP in single session

**Open Items:**
- Decision: Rebuild from scratch vs. continue current implementation
- If rebuilding: choose AI coding tool / tech stack
- Future vision documented in PRD: ontological layer, knowledge graph, document maintenance

---

### LinkedIn My Posts Extractor
**Status:** Active - Utility Tool
**What it is:** Chrome extension that scrapes your own LinkedIn posts from your profile activity page and stores them locally
**Source:** `/Users/jtnt/Documents/Projects/linkedin-my-posts-extractor`
**Last synced:** Never (newly added)

**Purpose:** Extract and archive your own LinkedIn posts for analysis, backup, or content repurposing.

**Key Features:**
- Scrapes posts from LinkedIn profile activity page (`/in/[username]/recent-activity/all/`)
- Automatic scrolling to load all posts (max 50 scroll attempts)
- Stores posts in Chrome local storage
- Web-based dashboard for viewing, searching, and exporting posts
- Export to CSV for use in spreadsheets
- Post deduplication by ID

**Technical Stack:** Chrome Extension (Manifest V3), vanilla JavaScript

**Recent Work:**
- 2026-01-09 (late night): Cleaned up session files, consolidated technical notes into CLAUDE.md

**Status:** Working tool, stable

---

### LinkedIn Scraper Extension
**Status:** Active - Utility Tool
**What it is:** Chrome extension that scrapes LinkedIn saved posts and stores them locally
**Source:** `/Users/jtnt/Documents/Projects/linkedin-scraper-extension`
**Last synced:** Never (newly added)

**Purpose:** Extract and organize saved LinkedIn posts for reference, content inspiration, or research.

**Key Features:**
- Scrapes saved posts from LinkedIn saved posts page (`/my-items/saved-posts/`)
- Automatic scrolling and "Show more" button detection
- Stores posts in Chrome local storage
- Web-based dashboard with search, filter, export functionality
- Filters out unavailable/deleted posts ("Status is offline")
- Multiple CSS selector fallbacks for different post types

**Technical Stack:** Chrome Extension (Manifest V3), vanilla JavaScript

**Recent Work:**
- 2026-01-09 (late night): Cleaned up session files, consolidated technical notes into CLAUDE.md

**Status:** Working tool, stable

---

### Writing
**Status:** Active - Repository
**What it is:** Central repository for all writing - LinkedIn posts, blog articles, thought leadership content
**Source:** `/Users/jtnt/Documents/Projects/Writing`
**Last synced:** 2026-01-17 (initial setup)

**Purpose:** Store all writing in one place regardless of which project it relates to (or if it's standalone). Organized by status (Drafts, Published) rather than platform.

**Structure:**
- `Drafts/` - Work in progress
- `Published/` - Final, posted pieces (in `YYYYMMDD_topic-slug/` folders)

**Bidirectional Linking:**
- Each piece has front-matter with `projects: ["ProjectName"]` to link forward
- Each project has `writing-refs.md` to link back to related writing

**Recent Work:**
- 2026-01-17: **Initial setup** - Created structure, migrated all CPF writing
- Migrated 4 CPF posts + Ideas folder from `/Users/jtnt/Documents/Projects/Context Profile Framework/Writing/`

**Current Content:**
- 5 published pieces (4 CPF-related, 1 standalone)
- See `writing-index.md` for full list

---

### JRAD
**Status:** Active - Side Project
**What it is:** WordPress-to-static-site conversion for joerussosalmostdead.com (Joe Russo's Almost Dead band website)
**Source:** `/Users/jtnt/Documents/Projects/JRAD`
**Last synced:** 2026-01-18 (newly added)

**Goal:** Convert existing WordPress site into a simple static website.

**Current WordPress Site:**
- One-page music theme ("Speaker" by WPWolf)
- Full-window hero with band photo background
- Logo, social media icons, "Live Recordings" and "Tour Dates" links
- Tour dates section using Seated widget (external service)

**Conversion Approach:**
- Use rendered `jrad_home.html` as primary reference
- Keep minimal - single page with hero + tour dates
- Preserve parallax effect and responsive design

**Technical Stack:** Static HTML/CSS, Seated widget for tour dates

**Open Items:**
- Complete static site conversion
- Evaluate which jQuery dependencies are actually needed
- Update http:// URLs to https://

---

### Caregiver App (Unnamed)
**Status:** Paused
**What it is:** Web app to help caregivers communicate updates about the person they're caring for to family and friends. Post notes about doctor visits, medications, general updates. Use AI to summarize transcripts.

**Current State:** Still in "figuring out exactly what it should do" phase. Building MVP with Replit.

**Notes:** Not actively working on this currently.

---

### Chief of Staff
**Status:** Active - Infrastructure
**What it is:** Personal knowledge management and strategic planning system
**Source:** `/Users/jtnt/Documents/Projects/Chief of Staff`
**Last synced:** 2026-01-16 (Transcription workflow optimization)

**Purpose:** Track work across multiple projects, synthesize information, identify patterns, support strategic decision-making. Philosophy: keep it simple—markdown files in folders.

**Current State:**
- Three-layer documentation model established (session.md, project-knowledge.md, CLAUDE.md)
- Two-way sync workflows: pull ("update [project]") and push (`/save`)
- Check-in system operational (morning, evening, thought, journal)
- Bidirectional flow: CoS can push items to project inboxes
- Logs live WITH projects in their `logs/` folders
- Proactive knowledge capture via session-context.md (testing in CoS only)
- **Transcription workflow optimized:** Using mlx-whisper with medium model for Mac Silicon

**Recent Work:**
- 2026-01-16: **Transcription workflow optimization**
  - Tested mlx-whisper performance across 5 model sizes (tiny through large)
  - Compared accuracy on medical terminology and technical terms
  - **Updated `~/.claude/scripts/transcribe.py`** to use mlx-whisper with medium model as default
  - Key findings: Medium model = ~8min for 1hr podcasts, significantly better accuracy than base
  - Full comparison documented in `logs/20260116-transcription-optimization-sync.md`
- 2026-01-15: Expanded writing style preferences in `~/.claude/CLAUDE.md`
  - Added rhetorical questions, self-deprecating humor, thematic bookending
  - New Structure & Format subsection
  - Added Phrases to Avoid (AI-isms) section
  - Captured thought on AI context → linked to CPF post
- 2026-01-14: Proactive knowledge capture + log restructure
  - Moved all logs from CoS to project folders
  - Simplified workflow commands (`/log` and `/save` replace three-command system)
  - Split project-knowledge.md from project-index.md
- 2026-01-12: Cowork mode vs CLI differences documented
- 2026-01-10-11: Check-in system + priority tracking built

**Open Items:**
- Consider global rollout of session-context.md pattern
- Review saved ContextOS integration plan at `~/.claude/plans/spicy-popping-puzzle.md`

---

## Patterns & Observations

**Shared philosophy across Razzo and CPF:** Both projects are built on the same insight - professionals adopt tools by solving real problems, not through passive learning. Razzo's Sprint has teams *build* workflows; CPF *builds* context libraries rather than handing over templates. "Action beats instruction" and "transformation over templates" are the same idea applied differently.

**Complementary pricing:** Both Razzo Sprint and Context Library Service are priced at $3,500-$5,000. Similar ICP, similar price point, different entry points to engagement.

---

## How This System Works

Give me files, transcripts, summaries, or just tell me things. I figure out where they go and update this document.

For projects with external source folders (like CPF), say "update [project]" and I'll sync the latest from that folder.
