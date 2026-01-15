# Project Index

**Last Updated:** 2026-01-14

This file contains summaries of all tracked projects. For information about Chief of Staff itself, see `project-knowledge.md`.

---

## Active Projects

### Razzo
**Status:** Active - Primary Focus
**What it is:** AI training for sales and marketing teams
**Website:** razzohq.com
**Source:** `/Users/jtnt/Documents/Projects/Razzo`
**Last synced:** 2026-01-11 (StoryBrand messaging exploration)

**Current Strategic Direction:**
The AI Workflow Sprint has become the primary go-to-market focus, shifting Razzo from "training company" to "workflow enablement company." The Sprint is a 2-week engagement where teams build real, working AI workflows (not just learn skills). This creates natural pathways to other offerings (bootcamp, momentum program).

**Key Insight:** Professionals adopt tools by solving real problems, not through passive learning. The Sprint's action-learning approach addresses the "knowing-doing gap" that traditional training creates.

**Current Offerings:**
- AI Workflow Sprint: 2 weeks, $3,500 (individual) or $7,500 (team) - LEAD OFFERING
- Sales Teams Bootcamp: 4 sessions, $5,000
- Marketing Teams Bootcamp: 4 sessions, $5,000
- Sales Managers Workshop: 90 min, $1,500
- Office Hours: $250/hr

**Recent Work:**
- 2026-01-11: StoryBrand messaging exploration (IN PROGRESS)
  - Applied PEACE framework to find compelling "problem soundbite"
  - Clarified the core problem: scattered usage, no shared systems, nothing compounds
  - Rejected multiple framings that sounded like jargon or deliverables
  - Key insight: "AI training that drives revenue" works because it connects to what teams actually do
  - **Unresolved:** Still searching for the right soundbite
  - Also: Team Format pricing updated to $7,500
- 2026-01-09: Sprint positioning work COMPLETED
  - All pending TODO items finished (Sprint section on homepage, softened 4-week emphasis, added "Beyond the Workflows" benefits, moved examples to bottom)
  - Website now fully reflects Sprint-first positioning
  - Repository reorganized with website/, Planning/, Assets/ folders
  - CLAUDE.md split into root (project-wide), website-specific, and strategic context (project-knowledge.md)

**Open Items:**
- **PRIORITY:** Find the right problem soundbite (StoryBrand "own the hole")
- Monitor Sprint positioning effectiveness with market
- Evaluate Sprint → Bootcamp conversion pathway
- Consider quarterly sprint model for ongoing client engagement

---

### Context Profile Framework
**Status:** Active - R&D / Early Exploration
**What it is:** Framework + done-for-you service for creating AI context libraries
**Source:** `/Users/jtnt/Documents/Projects/Context Profile Framework`
**Last synced:** 2026-01-14 (Context Profile benefits article draft)

**The Problem:** Organizations underutilize AI because they start every conversation from scratch. The framework teaches *what* to build (four layers: Company, Department, Project, Individual). The service actually builds it for them.

**Current Strategic Direction:**
- Manual MVP phase - validate with 3-5 companies before building software
- Creation friction is the primary barrier (not maintenance, not access)
- Transformation over templates: converting raw content to structured knowledge is the value
- Google Drive delivery with Claude Projects sync
- Context as competitive advantage positioning - when everyone has same AI models, context quality becomes differentiation
- **NEW:** Opinionated structure compounds intelligently - random accumulation doesn't compound, structured accumulation does

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
- 2026-01-14: **Context Profile benefits article (WIP)** - Drafted article on four key value props
  - Better AI results, efficiency, consistency, easier maintenance
  - Copyedited and reviewed for style
  - Article at `Writing/20260114_context-profile-benefits/article.md`
  - Remaining: complete truncated "Hello," sentence, expand maintenance section
- 2026-01-12: **Cowork hot takes post** - LinkedIn post about Claude Cowork, tying file system access to CPF
  - Key insight: Cowork + Context Profile = always-on structured context access without manual loading into Claude Projects
  - AI can also update context documents on the fly (not just read)
  - Documented writing style preferences in CLAUDE.md (trust reader, brevity, no dumbed-down explanations)
  - Post at `Writing/20260112_cowork-hot-takes/post.md`
- 2026-01-10: **ContextOS Analysis** - Full analysis of gtm-context-os-quickstart (Jacob Dietle, taste.systems)
  - Tested ingestion on sample data and real Razzo content
  - Real content produced significantly better results (coherent node network, resolved links)
  - Key concepts to adopt: atomic concepts (single source of truth), constitutional documents (taxonomy/ontology), knowledge lifecycle states, attribution discipline, ingestion workflows
  - **Strategic insight:** "The value isn't just in structure—it's in opinionated structure that compounds intelligently"
  - CPF should be more explicit about: domain presets, extraction guidance, relationship types, quality standards
  - Two organizational axes (reusability vs. scope) are orthogonal and can combine
  - Full analysis: `Working/contextos-analysis.md`
- 2026-01-09 (evening): Major conceptual update to architecture based on context graphs research
  - Added detailed framework for decision traces (exception logic, precedents, cross-system synthesis, approval chains)
  - Documented agents as context graph builders
  - Added human role evolution: from doers to context managers
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
**Status:** Active - MVP Built, Phase 6 UX Complete
**What it is:** Web app for creating Context Profile Framework documents
**Source:** `/Users/jtnt/Documents/Projects/context-profile-builder`
**GitHub:** https://github.com/jtnt/context-profile-builder.git
**Last synced:** 2026-01-14 (Phase 6 committed and pushed)

**Relationship to CPF:** This is the productized web app version of the Context Profile Framework. The parent project contains framework docs and research; this repo is the implementation.

**Core Philosophy: Opinionated Software**
All features, UX, and UI decisions are viewed through this lens. The app enforces a particular workflow because each step genuinely depends on the previous ones. This is the value proposition, not a constraint.
- Sequential by design (documents build on each other)
- Transparency over magic (show what's happening)
- Minimal decisions (auto-unlock, auto-save, one clear action)
- Cross-document intelligence (each doc informs the next)

**Current State:**
MVP functional with two working document types:
- Company Background: questionnaire-based generation
- Industry Profile: multi-step research flow (Input → URL Discovery → Verification → Generate)
- Sequential document locking (Company Background → Industry Profile → ICP → Competitor → Brand Voice)
- Cross-document intelligence (Company Background informs Industry Profile)
- Progress steps modal during generation
- Auto-save working correctly
- **Phase 6 UX refinements complete:** Smart pre-fill, source attribution, preview toggle, button consistency, enhanced styling

**Tech stack:** Next.js 16, TypeScript, Supabase, shadcn/ui, Claude API, Jina Reader

**Recent Work:**
- 2026-01-14 (late night): **Phase 6 UX Refinements - All 7 items complete**
  - Smart pre-fill: Industry Profile parses Company Background for industry/niche
  - Source attribution: API returns sources, UI has Sources tab, markdown includes Sources section
  - Preview toggle: Rendered vs raw markdown toggle in both editors
  - Button consistency: Download/Save in header, Edit in footer
  - Enhanced prose styling for markdown previews
  - Filename includes company name for Industry Profile
- 2026-01-14 (night): Industry Profile Implementation
  - Built new document type with multi-step research flow
  - URL suggestions from Claude's training knowledge (not external search)
  - User verification step for URL selection
  - Cross-document intelligence: Company Background passed to Industry Profile generation
- 2026-01-14 (evening): Progress Steps + UX Fixes
- 2026-01-14 (afternoon): Opinionated Software Implementation
- 2026-01-13: Built complete MVP in single session

**Open Items:**
- ICP, Competitor, Brand Voice questionnaires (with pre-fill from Industry Profile)
- Onboarding redesign
- Re-enable RLS, generate Supabase types, deploy

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

### Caregiver App (Unnamed)
**Status:** Paused
**What it is:** Web app to help caregivers communicate updates about the person they're caring for to family and friends. Post notes about doctor visits, medications, general updates. Use AI to summarize transcripts.

**Current State:** Still in "figuring out exactly what it should do" phase. Building MVP with Replit.

**Notes:** Not actively working on this currently.

---

## Patterns & Observations

**Shared philosophy across Razzo and CPF:** Both projects are built on the same insight - professionals adopt tools by solving real problems, not through passive learning. Razzo's Sprint has teams *build* workflows; CPF *builds* context libraries rather than handing over templates. "Action beats instruction" and "transformation over templates" are the same idea applied differently.

**Complementary pricing:** Both Razzo Sprint and Context Library Service are priced at $3,500-$5,000. Similar ICP, similar price point, different entry points to engagement.

---

## How This System Works

Give me files, transcripts, summaries, or just tell me things. I figure out where they go and update this document.

For projects with external source folders (like CPF), say "update [project]" and I'll sync the latest from that folder.
