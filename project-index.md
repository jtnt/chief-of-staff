# Project Index

**Last Updated:** 2026-02-10 11:48 PST

This file contains summaries of all tracked projects. For information about Chief of Staff itself, see `project-knowledge.md`.

---

## Active Projects

### Razzo
**Status:** Active - Primary Focus
**What it is:** AI training for sales and marketing teams
**Website:** razzohq.com
**Source:** `/Users/jtnt/Documents/Projects/Razzo`
**Last synced:** 2026-02-06

**Current Strategic Direction:**
The AI Workflow Sprint is the primary go-to-market focus, shifting Razzo from "training company" to "workflow enablement company." The Sprint is a 2-week engagement where teams build real, working AI workflows. Key insight: professionals adopt tools by solving real problems, not through passive learning.

**Current Offerings:**
- AI Workflow Sprint: 2 weeks, $3,500 (individual) or $7,500 (team) - LEAD OFFERING
- Sales Teams Bootcamp: 4 sessions, $5,000
- Marketing Teams Bootcamp: 4 sessions, $5,000
- Sales Managers Workshop: 90 min, $1,500
- Office Hours: $250/hr
- Context Profile Framework: landing page + waitlist for app

**Recent Highlights:**
- AI adoption research synthesis with Every.to articles; enablement plan framework built (2026-02-04)
- CPF landing page completed at `/context-profile-framework/` (2026-01-15)
- StoryBrand messaging exploration in progress — still searching for the right problem soundbite

**Open Questions:**
- What's the right problem soundbite? (StoryBrand "own the hole")
- Should CPF articles live on razzohq.com instead of Substack?
- What's the relationship between CPF offering and core Razzo training services?

---

### Context Profile Framework
**Status:** Active - R&D / Product Direction
**What it is:** Framework + product for creating context infrastructure that makes general AI chatbots more effective
**Source:** `/Users/jtnt/Documents/Projects/Context Profile Framework`
**Last synced:** 2026-02-09 (OneContext competitive analysis)

**The Problem:** Organizations underutilize AI because they start every conversation from scratch. The framework teaches *what* to build (four layers). The product will help them build it.

**Strategic Direction:**
- Product direction (not service) — building toward a product for smaller businesses
- General-purpose targeting smaller B2B ($5-25M) using standard AI chatbots
- Creation friction is the primary barrier
- CPF is **context infrastructure for general chatbots** — adjacent to, not competitive with, point solutions like Octave

**Architecture — Four Layers:**
1. **Knowledge Layer** - Raw facts, atomic concepts
2. **Ontological Layer** - Relationships, what connects to what
3. **Reasoning Layer** - Purpose, the why behind connections
4. **Precedent Layer** - Decision traces showing HOW decisions were made

**Key Insight:** Agents don't just consume context — they CREATE decision traces by doing work.

**Connection to Razzo:** Same ICP, complementary offerings. Training teaches AI usage; CPF solves the creation friction.

**Recent Highlights:**
- OneContext competitive analysis: identified third source of context creation (observation - agent trajectories as byproduct) and synthesis timing as design dimension (2026-02-09)
- Knowledge system built: thread-based manifest + `/learn` skill + active engagement protocol (2026-02-07)
- Competitive landscape expanded: Qontext ($2.7M pre-seed, automated ingestion), Atlan ($750M, "context layer" from data governance), Octave ($7.9M, GTM system) (2026-02-05/06)
- User research plan created with branching survey design (2026-01-31)

**Open Questions:**
- Is general-purpose the right bet, or should we pick a domain?
- What's the right price point for smaller businesses?
- What's our equivalent of Octave's "holy shit moment"?

---

### Context Profile Builder
**Status:** Active - Potential Rebuild
**What it is:** Web app for creating Context Profile Framework documents
**Source:** `/Users/jtnt/Documents/Projects/Code/context-profile-builder`
**GitHub:** https://github.com/jtnt/context-profile-builder.git
**Last synced:** 2026-01-16

**Current State:** User considering rebuilding from scratch. Comprehensive PRD created at `prd-export.md`. V1 MVP is functional with two working document types (Company Background, Industry Profile). Tech stack: Next.js 16, TypeScript, Supabase, shadcn/ui, Claude API, Jina Reader.

**Open Questions:**
- Rebuild from scratch vs. continue current implementation?
- If rebuilding: which AI coding tool / tech stack?

---

### Job Search
**Status:** Active - Personal
**What it is:** Personal job search toolkit with workflow-optimized materials and processes
**Source:** `/Users/jtnt/Documents/Projects/Job Search`
**Last synced:** 2026-01-20

**Context:** Laid off March 2025; building Razzo while exploring job opportunities. 25+ years across B2B and DTC, agency and in-house. Target industries: Audio/Music/Consumer Electronics, AI Enablement, Premium Consumer Brands, SaaS/Tech.

**Key Files:** Master profile, achievements (STAR-ready), career narrative, skills inventory, cover letter template, behavioral questions — all in `Toolkit/`.

**Current Status:** PostHog TAM application stalled after v10 planning failed. Needs fundamentally different approach, not more iterations.

---

### qontext-clone
**Status:** Active - Exploration Phase
**What it is:** Building a Qontext.ai clone (context layer for AI with knowledge graph architecture)
**Source:** `/Users/jtnt/Documents/Projects/Code/qontext-clone`
**Last synced:** 2026-02-06

3-stage pipeline (Ingest → Structure → Retrieve) for building context vaults. Proposed stack: TypeScript monorepo, Fastify + Next.js, PostgreSQL (pgvector) + Neo4j. Planning session only — no implementation yet.

**Open Questions:**
- Should this project proceed?
- SaaS vs single-user? Deployment target?

---

## Client Projects

### Clients
**Status:** Active - Infrastructure
**What it is:** Root folder for all client engagements with shared cross-client context
**Source:** `/Users/jtnt/Documents/Projects/Clients`
**Last synced:** 2026-02-10

Central repository for client engagement folders. Contains `z_context/` with cross-client reference materials including engagement models, pricing frameworks, and strategic patterns. Key resource: Fractional CAIO engagement model ($6K/month structure).

Individual client projects (JRAD, SalesIntel, Mythos, Beekeeper Group, Party Rental) are tracked separately below.

**Recent:** Finalized Mythos-More Vang proposal (v7→v8) with professional dating (Feb 2026), streamlined project descriptions, and client-ready email draft. Fixed Razzo skill Lexend font issue and generated final branded Word document (v5). Proposal ready for delivery.

**Open Items:**
- None identified

---

### Mythos-More Vang
**Status:** Active - Client Project
**What it is:** Fractional AI officer engagement (3-month retainer proposal in progress)
**Source:** `/Users/jtnt/Documents/Projects/Clients/Mythos-More Vang`
**Last synced:** 2026-02-09

Mythos is a donor communications and stewardship platform for advancement professionals (higher ed and healthcare). More Vang is a print services and marketing firm. Both companies owned by Jon Budington. 4-session AI training series completed Q4 2025-early 2026. Jon agreed Feb 9 to 3-month fractional CAIO retainer.

**Recent work:**
- 2026-02-09: Refined proposal through four versions, shifting from tactical session details to professional proposal format. Added "Two Returns on Every Project" section articulating compounding value: projects deliver operational efficiency AND build team skills that transfer across their roles. Final version (v4) ready for review. $7,500/month, three active projects at a time.

**Open Items:**
- Nicholas to review and send proposal v4 to Jon
- Confirm start date and team member availability

---

### SalesIntel
**Status:** Active - Client Project (Engagement Stalled)
**What it is:** AI training and consulting engagement with SalesIntel (B2B sales intelligence platform)
**Source:** `/Users/jtnt/Documents/Projects/Clients/SalesIntel`
**Last synced:** 2026-02-08

**Recent:** Documentation cleanup - corrected engagement history (removed proposed work, kept only delivered work), migrated to minimal CLAUDE.md + detailed project-knowledge.md pattern, implemented WikiLinks across all file references for Obsidian backlinks.

**Engagement Arc:** Lunch & learn → expanded proposal → pivot to use-case sprint → SKO build sprint delivered (3 teams built AI workflows in 10 days) → "everyone's minds racing" → post-SKO continuation stalled.

**Current Status:** Mike Levy (CRO) engaged on platform evaluation work. Manoj (CEO) silent since SKO. Value-first outreach works; general continuation asks don't.

**Key Insights:** Workflow build sprint is productizable. "75% useful = success" design principle validated. Use-case driven learning beats traditional training.

---

### Beekeeper Group
**Status:** Active - Client Project (Proposal Delivered)
**What it is:** Government affairs and public policy firm exploring fractional AI Officer engagement
**Source:** `/Users/jtnt/Documents/Projects/Clients/Beekeeper Group`
**Last synced:** 2026-02-10

**Recent:** Created and delivered comprehensive AI Advisory proposal. Two-phase engagement: Month 1 foundation (assessment, AI enablement & governance, team training) + Months 2-3 advisory. $6,000/month pricing with multi-month commitment structure. Proposal includes ROI calculations showing 3:1 return on initial commitment. Razzo-branded Word document and email delivered.

**Open Items:**
- Follow up on proposal response
- Confirm March start date if accepted

---

### Party Rental
**Status:** Active - Client Project (New)
**What it is:** Party rental business exploring AI adoption for operations
**Source:** `/Users/jtnt/Documents/Projects/Clients/Party Rental`
**Last synced:** 2026-02-03

Team has bottom-up AI adoption (ChatGPT for emails, writing). Gary's vision: end-to-end AI event planning. No clear business use case identified yet. Team is curious but cautious about accuracy.

---

### JRAD
**Status:** Client - Inactive / On Request
**What it is:** WordPress-to-static-site conversion for joerussosalmostdead.com
**Source:** `/Users/jtnt/Documents/Projects/Clients/JRAD`
**Last synced:** 2026-01-30

Static HTML/CSS site with Seated widget for tour dates. Conversion mostly complete. Last activity was DNS troubleshooting for www subdomain (needs CNAME record).

---

## Utility Tools

### LinkedIn My Posts Extractor
**Status:** Stable
**What it is:** Chrome extension that scrapes your own LinkedIn posts for analysis/backup
**Source:** `/Users/jtnt/Documents/Projects/Code/linkedin-my-posts-extractor`

Chrome Extension (Manifest V3), vanilla JavaScript. Working and stable.

---

### LinkedIn Scraper Extension
**Status:** Stable
**What it is:** Chrome extension that scrapes LinkedIn saved posts
**Source:** `/Users/jtnt/Documents/Projects/Code/linkedin-scraper-extension`

Chrome Extension (Manifest V3), vanilla JavaScript. Working and stable.

---

### Chatbot Linebreaker
**Status:** Stable (Phase 4 remaining)
**What it is:** Chrome extension that swaps Enter/Shift+Enter in AI chatbot interfaces
**Source:** `/Users/jtnt/Documents/Projects/Code/chatbot-linebreaker`
**GitHub:** https://github.com/jtnt/chatbot-linebreaker

Works on Claude.ai, ChatGPT, Gemini. 42 commits pushed. Phase 4 (badge indicator) remaining.

---

### Feed Digest
**Status:** Stable
**What it is:** Daily email digest with AI-generated summaries from RSS feeds
**Source:** `/Users/jtnt/Documents/Projects/Code/feed-digest`
**GitHub:** https://github.com/jtnt/feed-digest.git

Python + Claude Haiku + Gmail SMTP + GitHub Actions. 4 feeds (Ethan Mollick, Cannonball GTM, The Signal, Ben's Bites). Built and deployed.

---

## Other Projects

### Writing
**Status:** Active - Repository
**What it is:** Central repository for all writing (LinkedIn posts, blog articles, thought leadership)
**Source:** `/Users/jtnt/Documents/Projects/Writing`
**Last synced:** 2026-01-17

Organized by status (Drafts/, Published/). Each piece has front-matter linking to related projects. 5 published pieces.

---

### Caregiver App (Unnamed)
**Status:** Paused
**What it is:** Web app for caregiver communication updates with AI transcript summarization

Still in "figuring out exactly what it should do" phase. Building MVP with Replit.

---

### Chief of Staff
**Status:** Active - Infrastructure
**What it is:** Personal knowledge management and strategic planning system
**Source:** `/Users/jtnt/Documents/Projects/Chief of Staff`

Three-layer documentation model, two-way project sync, check-in system, auto-capture pipeline, task notifications across projects. See `project-knowledge.md` for system details and `USAGE-GUIDE.md` for reference.

---

## Patterns & Observations

**Shared philosophy across Razzo and CPF:** Both built on the same insight — professionals adopt tools by solving real problems, not through passive learning. "Action beats instruction" and "transformation over templates" are the same idea applied differently.

**Complementary pricing:** Both Razzo Sprint and Context Library Service are priced at $3,500-$5,000. Similar ICP, similar price point, different entry points.

---

## How This System Works

Give me files, transcripts, summaries, or just tell me things. I figure out where they go and update this document.

For projects with external source folders (see `project-sources.md`), say "update [project]" and I'll sync the latest.
