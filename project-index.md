# Project Index

**Last Updated:** 2026-01-20 05:07 PM EST

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
**Status:** Active - R&D / Product Direction
**What it is:** Framework + product for creating context infrastructure that makes general AI chatbots more effective
**Source:** `/Users/jtnt/Documents/Projects/Context Profile Framework`
**Last synced:** 2026-01-20 (Octave competitive intel + strategic positioning)

**The Problem:** Organizations underutilize AI because they start every conversation from scratch. The framework teaches *what* to build (four layers: Company, Department, Project, Individual). The product will help them build it.

**Current Strategic Direction:**
- **Product direction** (not service) - building toward a product for smaller businesses
- **General-purpose** targeting smaller B2B ($5-25M) using standard AI chatbots (Claude, ChatGPT)
- Creation friction is the primary barrier (not maintenance, not access)
- Context as competitive advantage positioning - when everyone has same AI models, context quality becomes differentiation
- Opinionated structure compounds intelligently - random accumulation doesn't compound, structured accumulation does

**Key Positioning (clarified 2026-01-20):**
CPF is **context infrastructure for general chatbots** - users work in Claude/ChatGPT, with context documents making those tools more effective. This is **adjacent to, not competitive with** point solutions like Octave (which is a direct-use GTM system where users work inside the tool).

**Architecture Evolution:**
The Context Infrastructure has four distinct layers:
1. **Knowledge Layer** - Raw facts, atomic concepts
2. **Ontological Layer** - Relationships, what connects to what
3. **Reasoning Layer** - Purpose, the why behind connections
4. **Precedent Layer** - Decision traces (the "what vs. why" gap)

**Key Insight:** Agents don't just consume context—they CREATE decision traces by doing work.

**Connection to Razzo:** Same ICP, complementary offerings. Training teaches AI usage; CPF solves the creation friction that prevents applying what's learned.

**Recent Work:**
- 2026-01-20: **Octave competitive intel + strategic positioning**
  - Researched Octave (octavehq.com) as closest existing product to CPF vision
  - Company: Zach & Julian (founders), $7.9M raised, 2,500+ GTM teams, $399-999/mo pricing
  - Key insight: Octave is adjacent (direct-use GTM system), not competitive (CPF layers onto chatbots)
  - Validates broader context infrastructure thesis without saturating our segment
  - Full analysis: `project-knowledge.md` "Market Validation: Octave" section
- 2026-01-17: **Writing folder migrated** - All CPF writing moved to central Writing project
- 2026-01-15: **"Context is Everything" article finalized**
- 2026-01-10: **ContextOS Analysis** - Full analysis of gtm-context-os-quickstart
  - **Strategic insight:** "The value isn't just in structure—it's in opinionated structure that compounds intelligently"

**Open Items:**
- Is general-purpose the right bet, or should we pick a domain?
- What's the right price point for smaller businesses? ($399/mo may be too high for our ICP)
- What's our equivalent of Octave's "holy shit moment"?
- How to implement atomic concepts in CPF without over-complicating?
- Should CPF structure be prescriptive or emergent?

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

### Job Search
**Status:** Active - Personal
**What it is:** Personal job search toolkit with workflow-optimized materials and processes
**Source:** `/Users/jtnt/Documents/Projects/Job Search`
**Last synced:** 2026-01-20 (PostHog TAM v2→v3 revision planning)

**Context:** Laid off March 2025; building Razzo AI consulting while also exploring job opportunities. 51 years old, 25+ years across B2B and DTC, agency and in-house. C-suite experience (CEO, CMO, CTO, CRO roles).

**Structure:**
- `Toolkit/Profile/` - Master profile, achievements (STAR-ready), career narrative, skills inventory
- `Toolkit/Active/` - Current job pursuits (one folder per application)
- `Toolkit/Templates/` - Resume base files, cover letter template
- `Toolkit/Interview Prep/` - Behavioral questions, Amazon LPs
- `Toolkit/Research/` - Target companies, industry research
- `Toolkit/Past Applications/` - 13 company folders for reference
- `Toolkit/Resume Archive/` - Historical versions by year (2017-2025)

**Key Files:**
- `Profile/master-profile.md` - Quick reference + career timeline
- `Profile/achievements.md` - 15+ STAR-ready accomplishments by capability
- `Profile/career-narrative.md` - Positioning + objection responses + four career trajectories
- `Profile/skills-inventory.md` - Skills by category with proficiency levels
- `Templates/cover-letter-template.md` - Customization framework with samples
- `Interview Prep/behavioral-questions.md` - Common questions matched to achievements

**Target Industries:**
1. Audio/Music/Consumer Electronics
2. AI Enablement & Strategy
3. Premium Consumer Brands
4. SaaS/Tech

**Recent Work:**
- 2026-01-20: **PostHog TAM v2→v3 revision planning**
  - Created v2 files from initial plan, received detailed feedback
  - Researched latest resume and cover letter best practices (2025-2026)
  - Key corrections needed: "18 years" is wrong (career is 28+ years), em dashes, odd specifics
  - Created comprehensive v3 plan addressing all feedback
  - Plan at `~/.claude/plans/cosmic-wibbling-brook.md`
- 2026-01-19 (evening): **PostHog TAM application planning**
  - Analyzed job fit: Art school → programmer → managing dev/product teams matches their "technical enough" requirement
  - Key differentiator: Cor feature flags/A/B testing experience + currently a PostHog customer
  - Initial plan executed, created v2 materials
- 2026-01-19: **Toolkit reorganization COMPLETE**
  - Transformed Filing Cabinet from storage archive to workflow-optimized Toolkit
  - Migrated 148 files → 163 files (new synthesis docs created)
  - Created 7 new synthesis documents

**Open Items:**
- [ ] **NEXT:** Execute PostHog TAM v3 revisions (plan at `~/.claude/plans/cosmic-wibbling-brook.md`)
- [ ] Cover letter ending: Need to determine best approach from three options
- [ ] LTA technical translation bullet: Craft right phrasing
- [ ] Ultramarathon phrasing: Naturally incorporate balance/consistency phrase
- [ ] Delete Filing Cabinet/ once confirmed all materials are accessible

---

### SalesIntel
**Status:** Active - Client Project
**What it is:** AI training and consulting engagement with SalesIntel (B2B sales intelligence platform)
**Source:** `/Users/jtnt/Documents/Projects/Clients/SalesIntel`
**Last synced:** 2026-01-20 (v2 Brave Search validation)

Structured conversation library extracted from Claude.ai conversations documenting complete 2.5-month engagement (Nov 2025 - Jan 2026). 15 conversations (470 messages) organized into searchable markdown format with thematic synthesis documents.

**Engagement Evolution:**
1. Initial lunch & learn presentation (Dec 2025)
2. Post-session proposal for expanded work ($18.4k Q1: training + governance + advisory)
3. Pivot to use-case driven sprint model at CEO's direction
4. SKO build sprint delivered (Jan 2026) - 3 teams built AI workflows in 10 days
5. Successful SKO session - "everyone's minds racing" on additional AI applications

**Key Stakeholders:**
- **Manoj Ramnani (CEO):** Initial contact, relationship development, contract negotiation
- **Mike Levy (CRO):** Primary sponsor, discovery calls, SKO participation
- **GTM Team:** ~30-40 people (BDRs, AEs, AMs, CS reps)

**Conversation Library Structure:**
- 15 individual conversation markdown files (date-first naming)
- 4 thematic synthesis documents (Planning & Discovery, Lunch & Learn Delivery, Engagement Expansion, Service Development)
- Master index with navigation and search capabilities
- Reusable Python extraction script for future projects

**Recent Work:**
- 2026-01-20: **v2 validated recommendation** - Brave Search validation of all research
  - **Critical Oliv.ai pricing error found:** Deal Driver is $199/mo (not $49) - removes from budget consideration
  - Sybill corrected to $79/mo (not $90)
  - Momentum Outreach integration reconfirmed as native
  - Created v2 deliverables: `CRO-Recommendation-Summary-v2.md`, `Validation-Notes-v2.md`
  - Added validation notes to all 6 research files
- 2026-01-20: **CRO platform recommendation finalized** with validated data
  - Top 3 platforms: Momentum.io (recommended), Sybill.ai (best conversational AI), RevenueGrid (Salesforce-native)
  - Critical price correction: Momentum.io $7-17k (not $20-24k) - now well under budget
  - Sybill.ai Outreach integration downgraded to "not found" (significant gap)
  - Created Validation-Notes.md documenting all corrections and sources
  - Deliverable: `Sales Intelligence Platform/CRO-Recommendation-Summary.md`
- 2026-01-20: **CLAUDE.md created** - Project initialization for Claude Code
- 2026-01-20: **Conversation library extraction** COMPLETED

**Key Insights from Engagement:**
- Workflow build sprint model emerged as productizable Razzo offering
- TaCO Framework evolved from content creation to GTM workflow prompts
- "75% useful = success" design principle validated through sprint
- Use-case driven learning (hands-on building) beats traditional training
- Fast iteration competitive advantage: 14 days negotiation → delivery → expansion

**Open Items:**
- Mike to demo Momentum.io (confirm Executive Briefs match CRO use case)
- If Sybill interests Mike, need explicit vendor confirmation of Outreach capabilities
- Continued engagement signals - follow-up scheduled for broader AI adoption roadmap

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
**Last synced:** 2026-01-20 (File versioning policy & /save permissions)

**Purpose:** Track work across multiple projects, synthesize information, identify patterns, support strategic decision-making. Philosophy: keep it simple—markdown files in folders.

**Current State:**
- Three-layer documentation model established (session.md, project-knowledge.md, CLAUDE.md)
- Two-way sync workflows: pull ("update [project]") and push (`/save`)
- Check-in system operational (morning, evening, thought, journal)
- Bidirectional flow: CoS can push items to project inboxes
- Logs live WITH projects in their `logs/` folders
- Proactive knowledge capture via session-context.md (testing in CoS only)
- **Transcription workflow optimized:** Using mlx-whisper with medium model for Mac Silicon
- **Claude.ai conversation extraction tool:** Complete toolset at `Tools/claude-web-extractor/`
- **`/claude-web-extract` command:** User-friendly guided workflow wrapping the extraction tool
- **Brave Search MCP:** User-level configuration for global web search capabilities

**Recent Work:**
- 2026-01-20: **File versioning policy & /save permissions** - Added File Editing Policy to global CLAUDE.md (version files instead of edit-in-place). Fixed /save permission prompts by adding Edit/Write permissions for CoS files to global settings.json.
- 2026-01-20: **MCP configuration & Brave Search** - Fixed fundamental misunderstanding of MCP structure in Claude Code. Learned ALL MCP config lives in `~/.claude.json` at three levels (user/local/project), not separate `.mcp.json` files. Added Brave Search MCP to user-level configuration. Fixed permission issues - added patterns for `git -C:*` and `mkdir -p:*` to prevent /save and /log prompts.
- 2026-01-20: **`/claude-web-extract` command** COMPLETED - Implemented user-friendly guided workflow that wraps the claude-web-extractor tool. Provides 6-step process: environment validation, search criteria gathering (with keyword guidance), search execution, manual review pause (human judgment required), review verification and extraction, results summary. Smart default output directory (`./Claude.ai Chats/`), extensive error handling, prominent "GOOD vs. BAD keywords" guidance. Follows patterns from `/export-session` and `/podcast-extract`. Created `~/.claude/commands/claude-web-extract.md`.
- 2026-01-20: **Claude.ai conversation extraction tool** COMPLETED - Built three CLI tools (find, review, extract) for organizing Claude.ai conversations from data exports. Memory-efficient streaming handles 100MB+ files, confidence scoring for keyword search, comprehensive documentation. Addresses fundamental export limitation (no project-conversation mapping) with 80-95% automated discovery + manual review. Validated on SalesIntel data (15 conversations, 470 messages, zero failures).
- 2026-01-20: **Status line + permission fixes** - Investigated context percentage discrepancy (status line vs compaction warnings), discovered they measure different things (Claude Code limitation). Added missing global permissions for /log and /save commands (mkdir, pwd, date, git diff/log, sync script).
- 2026-01-20: **Settings cleanup and writing standards** - Fixed malformed permission pattern in settings.local.json (125→68 entries). Updated global CLAUDE.md Writing Style section to reference new standards at `/Users/jtnt/Documents/Projects/Writing/Standards/`.
- 2026-01-19: **Fixed project tracking system** - Added auto-tracking for new projects in /save, made sync conversation-driven (log → project-index.md), added CoS self-tracking, simplified sync script, added Job Search to tracking
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
