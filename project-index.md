# Project Index

**Last Updated:** 2026-02-05

This file contains summaries of all tracked projects. For information about Chief of Staff itself, see `project-knowledge.md`.

---

## Active Projects

### Razzo
**Status:** Active - Primary Focus
**What it is:** AI training for sales and marketing teams
**Website:** razzohq.com
**Source:** `/Users/jtnt/Documents/Projects/Razzo`
**Last synced:** 2026-02-06 (git repository structure discussion)

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
- 2026-02-06: **Git repository structure discussion** - Analyzed current repository structure (132 tracked files across website/, Planning/, Assets/, z_context/) and explored reorganization options. Current setup mixes deployable website code with private business documents in single repo. Discussed three approaches: keep monorepo, move git to website/ only, or selective .gitignore. Recommended separating deployment code (website/) from business docs (strategy, planning) for cleaner separation and better security boundaries. No changes implemented - session was planning/exploration only.
- 2026-02-04: **AI adoption research and enablement framework** - Analyzed three Every.to articles on AI adoption (Claudie automation case study, Brooker Belcourt's enterprise patterns, Every's consulting model). Created comprehensive research synthesis (22.9KB) with core success factors, four maturity levels, concrete company examples (PE firm memo reduction: 3 weeks → 30 min, recruiting calendar automation: 10 champions → 30+ adopters). Built actionable enablement plan framework organized around plan design phases (Assess → Design → Deliver → Sustain) with Razzo offerings mapped to maturity levels. Key gap identified: Current bootcamps handle Level 1→2 progression, but no formal offering for Level 2→3 (basic AI use → systematic workflows) where organizational transformation happens. Competitive intel: Every charges $10-50K+ for contextualization consulting vs. Razzo's $3,500-$5,000 bootcamps.
- 2026-02-01: **Session capture meta-work** - Processed a previous session about Claude Code debug mode troubleshooting using `/session-capture` skill. Key finding: User had used single dash (`-dangerously-skip-permissions`) instead of double dash, causing CLI to parse `-d` as `--debug`. Session capture ran interactively instead of background due to quick `--continue` after session exit.
- 2026-01-21: **LinkedIn article saved** - Added "Getting Started with AI: 3 Simple Steps for SMBs" article to Writing folder. Covers three foundational steps: picking a chatbot (ChatGPT/Claude/Gemini), training people, and building a Context Profile. Promotes Razzo's workflow sprints and CPF framework. Includes two social media image versions.
- 2026-01-20: **GTM-focused post update** - Updated LinkedIn post about AI productivity-to-innovation cycle to include sales and customer success elements. Added parallel GTM track showing how AI insights feed sales intelligence (objection handling, discovery questions) and customer success (expansion opportunities, training gaps). Created image generation prompt for updated graphic.
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
**Last synced:** 2026-02-05 (CPF articulation call capture)

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
3. **Reasoning Layer** - Purpose, the why behind connections (the rationale)
4. **Precedent Layer** - Decision traces showing HOW decisions were made (trigger → context → options → evaluation → choice)

**Key Distinction (clarified 2026-01-24):** Reasoning Layer is the "why" behind a decision; Precedent Layer is the full decision trace showing the path of reasoning.

**Key Insight:** Agents don't just consume context—they CREATE decision traces by doing work.

**Connection to Razzo:** Same ICP, complementary offerings. Training teaches AI usage; CPF solves the creation friction that prevents applying what's learned.

**Recent Work:**
- 2026-02-05: **CPF articulation call capture** - Processed and archived materials from January 23rd call with Chris McConnell (Razzo) where framework was articulated in detail. Created structured archive in `Research/20260123_CPF-Articulation-Call-Chris-McConnell/` with separated transcript, original notes, and comprehensive CPF-focused analysis. Key content captured: basic implementation (document corpus in Claude Projects), three main challenges (creation, maintenance, access), four-layer architecture (knowledge, ontological, reasoning, precedent layers), and data-first insight (collect structured data, then apply framework filters). Call predates major competitive analysis and shows native framework thinking before external validation.
- 2026-02-05: **Qontext competitive analysis and strategic repositioning** - Major competitive intelligence gathering on Qontext.ai, a Berlin startup that raised $2.7M pre-seed to build "independent context layer for AI." Comprehensive analysis of their product architecture (Context Vaults with automated ingestion and graph structuring), team backgrounds (ex-VC CEO, technical CTO), funding sources (HV Capital + notable angels including n8n and neo4j founders), and market positioning. Key strategic insight: automated ingestion approach (connect existing tools, auto-structure into graph) has lower activation energy than framework-first approach (understand structure, then implement). Product-first vs. framework-first tension identified as critical positioning decision. Created comprehensive research assets in `Research/Qontext/` including full competitive analysis, complete API documentation, product UI screenshots, and PRD development materials (`Working/prd-session-prompt-v2.md`) for competitive response.
- 2026-02-01: **Nico Druelle GTM infrastructure research** - Captured "Infrastructure for Agentic GTM" article from The Signal newsletter with full text, 8 diagrams (saved as source images), and video transcript. Added The Revenue Architects (TRA) service model analysis to business-knowledge.md. Key validation: TRA's Phase 1 ("Decision Audit") is pure context creation work — ICP definition, persona mapping, documenting decision logic — exactly CPF's Company and Department Layers. They won't touch orchestration until context is documented. Their 90-day engagement structure, $50M+ influenced revenue, and 100% reference rate proves companies pay premium rates for context infrastructure work. Target market (Series B+ PLG companies) aligns with CPF ICP. GTM Engineers emerging as natural buyer persona. Also reorganized all Research files with YYYYMMDD_ prefixes for chronological sorting.
- 2026-02-01: **Vercel AGENTS.md research analysis and CPF implications** - Analyzed Vercel's empirical findings showing passive context documents achieved 100% pass rate vs 53% baseline, providing strong validation for CPF's foundational bet on structured context over ad-hoc prompting. Extracted index-plus-retrieval pattern (8KB compressed index + on-demand file reads) as potential solution to CPF's insertion challenge. Created comprehensive test plan with fictional B2B SaaS company "Relay" for validation. Enhanced `/working` skill description for better natural language recognition. Added all active Working docs to cos-inbox.md for improved visibility.
- 2026-01-31: **Context graphs follow-up analysis and research reorganization** - Added Gupta & Jaya's "Context Graphs One Month In" follow-up article with comprehensive analysis. Key insights: capture the "how" to infer the "why" without annotation, "glue functions" hold institutional context, enterprise graphs define legal moves vs optimal ones. Renamed research files for clarity (e.g., "Industry Thinking.md" → "AIs Trillion-Dollar Opportunity Context Graphs - Jaya Gupta and Ashu Garg.md") and updated all cross-references. Research collection now organized as: Core Foundation Capital thesis thread + deep dive transcripts + practitioner perspectives.
- 2026-01-31: **User research planning for CPF validation**
  - Extracted comprehensive user research plan from screenshots, saved to `Business/user-research-plan.md`
  - Developed survey strategy targeting the three core CPF challenges: creation, maintenance, and relevance
  - Created branching survey design with logic jumps to sort respondents into actionable segments
  - Identified "tried and stopped" users as highest-value segment (had motivation but hit barriers)
  - Built implementation plan in `Business/context-survey-plan.md` with complete question set and distribution strategy
  - **Key insight:** Form design needs to sort people into actionable buckets without insider jargon - "Have you customized your AI?" vs "Do you use context systems?"
- 2026-01-29 (late evening): **CPF agent research pipeline overhaul**
  - Built complete research orchestrator with specialized agents (company, ICP, competitor, brand researchers)
  - Implemented atomization principle: one source of truth per information type prevents overlap
  - Created verifier agent that runs after each research agent (not just at end) for faster feedback loops
  - Established strict agent boundaries with explicit exclusion lists to prevent scope creep
  - Built cross-agent communication protocols for sharing incidental findings
  - **Pattern extraction:** Agent boundary definition prevents scope creep; per-agent verification enables faster iteration
  - Ready for testing - next step is full pipeline validation on Mythos case study
- 2026-01-29 (evening): **Strategic monetization planning session**
  - User requested fresh perspective on business opportunity without prior anchoring
  - Comprehensive repository analysis synthesized all framework docs, business materials, research, and strategic learnings
  - Evaluated three potential paths: done-for-you service ($3,500), CPF Template System SaaS, Context Intelligence Platform
  - Validated current approach: done-for-you service has real customer traction, proven price point, creates case studies
  - Confirmed service-first approach de-risks product development (6+ months to SaaS revenue vs immediate service revenue)
  - Planning session only - no decisions made, explored tradeoffs and strategic options
  - **Key pattern:** "Forget everything, examine fresh" approach surfaces blind spots and validates/challenges assumptions
- 2026-01-29 (morning): **North star principle embedded in agents**
  - Analyzed verified vs unverified test output on Mythos - verification improved sources and data richness, but both missed the real goal
  - **Core insight:** CPF research should capture what's useful for business AI (strategy, sales, marketing, customer comms, decisions), not aim for exhaustive completeness
  - Embedded "north star test" into `cpf-system` skill, researcher agent, and verifier agent: "Would this help someone using AI for business purposes?"
  - Applied filter to: section inclusion, depth decisions, gap identification, confidence effort, people to include, customer data patterns
  - Created test analysis doc (`Working/cpf-verifier-test-analysis.md`)
  - **Example:** Skip Junior Software Engineer (not useful for business AI), include VP of Customer Success (decision-maker, domain expert)
- 2026-01-28: **Source mapping + verification protocol**
  - Created `Business/source-mapping.md` - Maps every document input field to source (R/I/V/P categorization)
  - Created `Business/intake-verification.md` - Verification protocol with checklists, templates, anti-patterns
  - Updated `Business/business-knowledge.md` with verification learning and source mapping summary
  - **Key insight:** Only Industry Profile (~90%) can be mostly completed through research alone; all others need substantial client input
  - **Mythos case study learning codified:** Verification is cheap, rebuilding is expensive - 30 seconds of checking prevents hours of wasted work
  - Awaiting Mythos URL to proceed with case study application
- 2026-01-26: **LinkedIn research + extraction skill**
  - Extracted Joe Rhew's LinkedIn posts (16 posts) for CPF research - analyzed context repo approach, 4-stage automation maturity
  - Extracted user's own posts (18 posts) for writing style analysis
  - Created `/extract-linkedin-posts` skill (proper skills format at `~/.claude/skills/`)
  - Key learning: LinkedIn feed shows snippets not full text; own profile has different DOM due to analytics UI
- 2026-01-24: **Four-layer implementation guide + Chris McConnell meeting**
  - Created `Framework/Four Layer Implementation.md` with concrete examples for implementing all four layers in document-based systems
  - Clarified distinction between Reasoning Layer (rationale) and Precedent Layer (decision trace)
  - Updated `project-knowledge.md` with detailed layer descriptions and implementation examples
  - Processed Chris McConnell call - discussed CPF architecture, three challenges, and Chris's insight about structured data + flexible framework filters
- 2026-01-20: **Octave competitive intel + strategic positioning**
  - Researched Octave (octavehq.com) as closest existing product to CPF vision
  - Company: Zach & Julian (founders), $7.9M raised, 2,500+ GTM teams, $399-999/mo pricing
  - Key insight: Octave is adjacent (direct-use GTM system), not competitive (CPF layers onto chatbots)
  - Validates broader context infrastructure thesis without saturating our segment
  - Full analysis: `project-knowledge.md` "Market Validation: Octave" section
- 2026-01-31: **Working docs convention + /working skill**
  - Established cross-project frontmatter convention for working documents (status: active/paused/absorbed/dead + created date)
  - Built `/working` skill for consistent saves — user invokes mid-conversation, skill synthesizes thinking into standalone doc with proper frontmatter
  - Retrofitted 12 existing Working/ docs with frontmatter (4 active, 4 paused, 4 absorbed)
  - Convention added to global `~/.claude/CLAUDE.md` (cross-project)
  - Key insight: Skills (explicit user action) are more reliable than CLAUDE.md instructions for proactive behaviors
- 2026-01-30: **Agent SDK exploration + Google Docs sync architecture**
  - Explored Anthropic Agent SDK potential for building better CPF UX (better interface than current CLI approach)
  - Analyzed ContextOS frontmatter approach - YAML metadata with WikiLinks creates document relationship navigation for AI
  - Documented the "frontmatter problem" - tension between AI navigation needs and human editing experience
  - Created architectural options for Google Docs delivery model (markdown files vs. docs with frontmatter vs. sidecar metadata)
  - Key insight: Context infrastructure must balance AI optimization with human usability
- 2026-01-29: **CPF Researcher Overhaul COMPLETED** - Built complete research pipeline
  - Created orchestrator skill (`cpf-research`) for deterministic agent chaining via Task tool
  - Built shared system context (`cpf-system`) with north star filtering principles
  - Redesigned company researcher with strict YAML output and research planning
  - Added verification agent for quality control and gap detection
  - Established isolation patterns to prevent context contamination in client work
- 2026-01-17: **Writing folder migrated** - All CPF writing moved to central Writing project
- 2026-01-15: **"Context is Everything" article finalized**
- 2026-01-10: **ContextOS Analysis** - Full analysis of gtm-context-os-quickstart
  - **Strategic insight:** "The value isn't just in structure—it's in opinionated structure that compounds intelligently"

**Open Items:**
- Explore Chris's suggestion: structured data collection layer + flexible framework filters on output
- Is general-purpose the right bet, or should we pick a domain?
- What's the right price point for smaller businesses? ($399/mo may be too high for our ICP)
- What's our equivalent of Octave's "holy shit moment"?
- How to implement atomic concepts in CPF without over-complicating?
- Should CPF structure be prescriptive or emergent?

---

### Context Profile Builder
**Status:** Active - Potential Rebuild
**What it is:** Web app for creating Context Profile Framework documents
**Source:** `/Users/jtnt/Documents/Projects/Code/context-profile-builder`
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
**Source:** `/Users/jtnt/Documents/Projects/Code/linkedin-my-posts-extractor`
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
**Source:** `/Users/jtnt/Documents/Projects/Code/linkedin-scraper-extension`
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
**Last synced:** 2026-01-30 (DNS troubleshooting session)

**Goal:** Convert existing WordPress site into a simple static website.

**Recent Work:**
- 2026-01-30: **DNS troubleshooting session** - Diagnosed www subdomain resolution issue. The user discovered www.joerussosalmostdead.com was returning DNS_PROBE_FINISHED_NXDOMAIN errors. Used dig commands to identify that the root domain resolves correctly to two IPs (67.205.25.36 is correct), but www subdomain lacks DNS records. User needs to add CNAME record for www subdomain to DNS provider.

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
**Last synced:** 2026-01-20 (PostHog TAM v10 planning - failed)

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
- 2026-01-20: **PostHog TAM v10 planning - FAILED**
  - v9 feedback: still no story, still uses em dashes, not holistic
  - Read all context (job description, career narrative, master profile, writing standards)
  - Proposed bridge sentence + new close, but user correctly identified it as word shuffling
  - "This is just the same bullshit as before" - incremental changes don't equal genuine rethinking
  - **Needs fundamentally different approach, not more iterations**
- 2026-01-20: **PostHog TAM v9 holistic fixes**
  - Four changes made but failed to create actual story structure
  - Em dashes still present (violates writing standards)
- 2026-01-19 (evening): **PostHog TAM application planning**
  - Analyzed job fit, created initial materials
- 2026-01-19: **Toolkit reorganization COMPLETE**

**Open Items:**
- [ ] **BLOCKED: PostHog TAM summary** - needs complete rethink, not more word shuffling
- [ ] Cover letter ending: Need to determine best approach
- [ ] Delete Filing Cabinet/ once confirmed all materials are accessible

---

### Chatbot Linebreaker
**Status:** Active - Personal Tool
**What it is:** Chrome extension that swaps Enter/Shift+Enter behavior in AI chatbot interfaces to prevent accidental message submission
**Source:** `/Users/jtnt/Documents/Projects/Code/chatbot-linebreaker`
**GitHub:** https://github.com/jtnt/chatbot-linebreaker
**Last synced:** 2026-01-21 (initial build - Phases 1-3 complete)

**Purpose:** Solve the "half-finished message submission" problem on Claude.ai, ChatGPT, and Gemini. Enter inserts newline (instead of submitting), Shift+Enter submits (instead of adding newline). Built with GSD workflow from scratch.

**Current State:**
- Manifest V3 Chrome extension working on all three platforms (claude.ai, chatgpt.com, gemini.google.com)
- Keyboard swap functionality complete using universal shiftKey flip strategy
- User controls: popup toggle UI with persistent state (chrome.storage.local)
- Real-time toggle response without page refresh (storage.onChanged events)
- Complete git history (42 commits) pushed to GitHub

**Technical Implementation:**
- **Keyboard interception:** Capture phase event handling with stopImmediatePropagation (required for ProseMirror)
- **Platform detection:** Works identically across all three sites with zero platform-specific code
- **Toggle architecture:** Storage-based synchronization (not message passing) with service worker initialization
- **Key finding:** shiftKey flip strategy proved universal across contenteditable and textarea elements

**Phases Completed (GSD workflow):**
1. **Phase 1: Foundation** - Single-site proof of concept (skipped execution but functionality exists)
2. **Phase 2: Multi-Site Core** - Extended to ChatGPT and Gemini (user verified all platforms)
3. **Phase 3: State & Toggle** - User controls and persistence (user verified complete toggle flow)

**Phase 4 Remaining:**
- Badge indicator on extension icon showing ON/OFF status
- Will use chrome.action.setBadgeText API
- Simple visual feedback for user awareness

**Recent Work:**
- 2026-01-21: **Initial build session** - Completed project initialization through Phase 3 execution. Built complete extension with keyboard swap, multi-site support, and toggle controls. All work committed (42 commits) and pushed to GitHub. Session log documents full build process with decisions, technical findings, and performance metrics.

**Open Items:**
- Execute Phase 4 (badge indicator) to complete v1 roadmap
- Run milestone audit to verify cross-phase integration
- Optional: Verify Phase 1 requirements or mark complete based on working implementation
- Consider: Chrome Web Store listing (currently out of scope)

---

### Feed Digest
**Status:** Active - Utility Tool
**What it is:** Daily email digest with AI-generated summaries of articles from subscribed RSS feeds
**Source:** `/Users/jtnt/Documents/Projects/Code/feed-digest`
**GitHub:** https://github.com/jtnt/feed-digest.git
**Last synced:** 2026-02-01 (initial build)

**Purpose:** Automated morning email that fetches RSS feeds, summarizes articles via Claude Haiku, and sends consolidated HTML digest via Gmail SMTP. Runs daily on GitHub Actions.

**Architecture:**
- Python script with modular components (feeds, summarizer, email builder, mailer)
- Claude Haiku 4.5 for article summarization (~$0.005/article)
- Gmail SMTP with App Password authentication
- GitHub Actions cron (1pm UTC = 8am EST)
- Stateless: filters by publication date (25h window), no state file needed

**Current Feeds:**
- One Useful Thing (Ethan Mollick)
- Cannonball GTM
- The Signal
- Ben's Bites

**Recent Work:**
- 2026-02-01: **Initial build COMPLETED** - Built complete system from plan in single session. All 12 files created (src modules, templates, config, GitHub workflow). Fixed Claude model ID (Haiku 4.5), tightened summarization prompt to prevent markdown output. Successfully tested end-to-end (RSS fetch → summarize → HTML email). Committed and pushed to GitHub. Ready for daily automation once GitHub Actions secrets are configured.

**Open Items:**
- Add GitHub Actions secrets (ANTHROPIC_API_KEY, GMAIL_ADDRESS, GMAIL_APP_PASSWORD, DIGEST_RECIPIENT)
- Test workflow with manual trigger
- Monitor first automated run

---

### Mythos-More Vang
**Status:** Active - Client Project (New)
**What it is:** CPF research engagement for Mythos (donor communications platform) / More Vang
**Source:** `/Users/jtnt/Documents/Projects/Clients/Mythos-More Vang`
**Last synced:** 2026-02-05 (context cleanup)

**Company Background:**
Mythos is a donor communications and stewardship platform for advancement professionals in higher education and healthcare institutions. CEO/Chief Storyteller is More Vang. 4 product modules: Dynamic Sites, Library, Publisher, Teams. Primary customers are higher education (13 institutions including MIT, Northwestern, Carnegie Mellon, Brown) with secondary healthcare market. Founded to help advancement teams transition from manual 70+ hour work weeks to sustainable operations.

**Recent Work:**
- 2026-01-29 (10:34 PM): **Plugin setup and learning session** - Extensive Claude Code meta-work session focused on plugin installation and understanding usage. Installed multiple plugins (playground, agent-sdk-dev, superpowers, context7, Notion, plugin-dev, claude-md-management, claude-code-setup, plus additional unnamed plugins). Added compound-engineering marketplace. Learned about output styles, plugin discovery methods, and invocation patterns. Session documented plugin restart requirements and how plugins expose functionality through skills, agents, MCP servers, and hooks.
- 2026-01-29 (8:46 PM): **Additional context profile research** - Built comprehensive context profile for mythosplatform.com using CPF company researcher agent. Created structured company data (`./context-profile-20260129_2052/research/mythos-company.yaml`) and research methodology notes (`./context-profile-20260129_2052/mythos-cross-agent-notes.yaml`). Focused on website content analysis covering company identity, founding story (Jon Budington 2010), product breakdown (Dynamic Sites, PDF Publisher, four-stage workflow), customer success metrics from universities and nonprofits, and leadership structure.
- 2026-01-28 (9pm): **Comprehensive context profile build** - Created complete company intelligence using cpf-company-researcher agent. Generated `mythos-company.yaml` (23.6KB) with detailed identity, products, customer analysis, and competitive landscape. Also created `mythos-cross-agent-notes.yaml` with structured insights for ICP analysis, competitive positioning, and brand messaging patterns. Primary ICP identified as higher education advancement teams.
- 2026-01-28 (8pm): **CPF Company Research session 2** - Second run of cpf-company-researcher agent. Created additional output files in `context-profile/` directory alongside existing testrun directories.
- 2026-02-05 (2am): **Context cleanup** - Reorganized `z_context/` folder to eliminate version confusion. Moved 7 older draft versions (CAIO v1-v3, 100-Day Plan v1-v2, Pitch Email v1-v2) to `_archive/` subfolder. Retained 9 current documents for clean context consultation. Updated CLAUDE.md with archive convention.
- 2026-01-28 (7pm): **CPF Company Research completed** - Ran cpf-company-researcher agent to create comprehensive company profile. Created `context-profile/research/company.yaml` (413 lines) with structured research including company identity, products/services, customers with case studies, leadership bios, origin story, business model, competitive landscape, and gaps requiring client verification.

**Open Items:**
- Reconcile multiple context-profile directories (testrun01, testrun02, context-profile/)
- Verify founding year (2010 vs 2012 vs 2016 discrepancy)
- Clarify More Vang relationship (subsidiary, division, or separate entity?)
- Continue with additional CPF documents (ICP, competitors, brand voice)

---

### SalesIntel
**Status:** Active - Client Project
**What it is:** AI training and consulting engagement with SalesIntel (B2B sales intelligence platform)
**Source:** `/Users/jtnt/Documents/Projects/Clients/SalesIntel`
**Last synced:** 2026-01-25 (engagement status documentation)

Structured conversation library extracted from Claude.ai conversations documenting complete 2.5-month engagement (Nov 2025 - Jan 2026). 15 conversations (470 messages) organized into searchable markdown format with thematic synthesis documents.

**Engagement Evolution:**
1. Initial lunch & learn presentation (Dec 2025)
2. Post-session proposal for expanded work ($18.4k Q1: training + governance + advisory)
3. Pivot to use-case driven sprint model at CEO's direction
4. SKO build sprint delivered (Jan 2026) - 3 teams built AI workflows in 10 days
5. Successful SKO session - "everyone's minds racing" on additional AI applications
6. Post-SKO continuation discussions (Jan 2026) - Mike engaged, Manoj silent

**Current Status (Jan 25):**
Mike Levy (CRO) engaged on platform evaluation work. Awaiting call confirmation (Tues/Wed week of Jan 27-29). Key pattern identified: value-first, single-recipient outreach (platform research included) worked; dual-recipient general continuation ask (to both Manoj & Mike) did not.

**Key Stakeholders:**
- **Manoj Ramnani (CEO):** Initial contact, contract negotiation, silent since SKO
- **Mike Levy (CRO):** Primary sponsor, platform evaluation lead, actively engaged
- **GTM Team:** ~30-40 people (BDRs, AEs, AMs, CS reps)

**Conversation Library Structure:**
- 15 individual conversation markdown files (date-first naming)
- 4 thematic synthesis documents (Planning & Discovery, Lunch & Learn Delivery, Engagement Expansion, Service Development)
- Master index with navigation and search capabilities
- Reusable Python extraction script for future projects

**Recent Work:**
- 2026-01-25: **Engagement status documentation** - Updated CLAUDE.md with current status section (recent activity, key insights, next steps). Created project-knowledge.md following proper documentation model (business context, engagement history by phase, patterns/observations, open items).
- 2026-01-20: **Email editing for Mike follow-up** - Tightened email checking in on AI work continuation and sharing platform research shortlist (Momentum.io, Sybill.ai, RevenueGrid)
- 2026-01-20: **v3 final deliverable** - Clean standalone recommendation for Mike
- 2026-01-20: **v2 validated recommendation** - Brave Search validation of all research
- 2026-01-20: **CRO platform recommendation finalized** with validated data
- 2026-01-20: **CLAUDE.md created** - Project initialization for Claude Code
- 2026-01-20: **Conversation library extraction** COMPLETED

**Key Insights from Engagement:**
- Workflow build sprint model emerged as productizable Razzo offering
- TaCO Framework evolved from content creation to GTM workflow prompts
- "75% useful = success" design principle validated through sprint
- Use-case driven learning (hands-on building) beats traditional training
- Fast iteration competitive advantage: 14 days negotiation → delivery → expansion
- Communication pattern: Single-recipient + value-add outreach > general continuation asks to multiple stakeholders

**Open Items:**
- Awaiting Mike's time selection for call (available Tues/Wed before 3pm)
- Call topics: AI work continuation + platform evaluation next steps
- Manoj engagement unclear (CEO has not responded to Jan 15 outreach)
- Platform evaluation most concrete opportunity; AI work scope needs Mike's direction

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
**Last synced:** 2026-01-31 (disabled auto-capture, --continue bug investigation)

**Purpose:** Track work across multiple projects, synthesize information, identify patterns, support strategic decision-making. Philosophy: keep it simple—markdown files in folders.

**Current State:**
- Three-layer documentation model established (session.md, project-knowledge.md, CLAUDE.md)
- Two-way sync workflows: pull ("update [project]") and push (`/save`)
- Check-in system operational (morning, evening, thought, journal)
- Bidirectional flow: CoS can push items to project inboxes
- **cos-inbox notifications across all projects** - SessionStart hook checks for pending inbox items
- Logs live WITH projects in their `logs/` folders
- Proactive knowledge capture via session-context.md (testing in CoS only)
- **Transcription workflow optimized:** Using mlx-whisper with medium model for Mac Silicon
- **Claude.ai conversation extraction tool:** Complete toolset at `Tools/claude-web-extractor/`
- **`/claude-web-extract` command:** User-friendly guided workflow wrapping the extraction tool
- **Brave Search MCP:** User-level configuration for global web search capabilities
- **RivalSearchMCP:** Free alternative search (DuckDuckGo/Yahoo/Wikipedia + social scanning, GitHub search, academic papers)

**Recent Work:**
- 2026-01-31: **Auto-capture disabled, --continue bug investigated** — Auto-capture broken since Jan 30 night (captures spawn but `claude --print` fails silently). Diagnostic logs were being deleted by a `find -delete` line in session-end.sh (removed). SessionEnd hook disabled to stop orphaned processes. `--continue` hang is a known Claude Code bug with large sessions (#21067). Reviewed and dismissed all 7 pending CLAUDE.md pattern suggestions. Manual `/log` is capture method until root cause found.
- 2026-01-28: **Auto-capture session system implemented** - SessionEnd hook spawns background Claude to capture sessions automatically. Creates logs in `./logs/`, extracts patterns to `./session-patterns/` (with CLAUDE.md suggestions), commits/pushes, syncs to CoS. Handles tracked vs untracked locations. SessionStart shows PATTERNS_PENDING flag when suggestions await review. `/log` and `/save` deprecated but still functional for manual use.
- 2026-01-26: **cos-inbox notifications for all projects** - Modified `cos-session-start.sh` to handle both CoS (full briefing) and other projects (inbox check). Added CLAUDE.md principles: "Check Docs Before Claude Code Changes" and "Present Options, Don't Assume" (use AskUserQuestion with multi-select when appropriate).
- 2026-01-26: **Removed Patterns folder** - Deleted Patterns/ folder as premature infrastructure (no concrete use cases). Existing mechanisms (project-knowledge.md, log Reasoning sections) serve the purpose. Also improved CLAUDE.md log filename examples from generic (`sync.md`) to descriptive (`sprint-positioning-draft.md`).
- 2026-01-26: **USAGE-GUIDE.md created** - Comprehensive reference for using the entire CoS system. Covers workflows, file purposes, commands, and quick reference for daily/weekly rhythms.
- 2026-01-26: **System cleanup Phase 4 (COMPLETE)** - Documentation phase. Created ~/.claude/hooks/README.md with full hook documentation. Added READMEs for Check-Ins/weekly/ (automated Monday synthesis) and Weekly Reviews/ (manual /review-checkins output). All 4 phases of system cleanup now complete.
- 2026-01-26: **System cleanup Phase 3** - Added compounding intelligence. /log template now has Reasoning section (why X over Y, thinking evolution, extractable patterns). Enhanced /review-checkins with cross-project log analysis option.
- 2026-01-26: **System cleanup Phase 2** - DRY'd commands and consolidated docs. /save now references /log for Step 1 (123→90 lines). Check-In System moved to global CLAUDE.md so all projects can discover it. CoS CLAUDE.md keeps only CoS-specific details.
- 2026-01-25: **System cleanup Phase 1** - Implemented first phase of comprehensive system audit. Consolidated settings.json (176→58 permissions), updated Current Projects list (3→11), deleted orphaned backup files, archived IMPLEMENTATION-NOTES-V7.md. Key change: `Bash(git:*)` replaces 30+ hardcoded git commit permissions.
- 2026-01-25: **Removed auto-capture session logging** - Disabled SessionEnd hook and removed supporting files (archived script, deleted queue hook/marker file). Sessions now logged only via explicit `/save` command. Auto-capture was producing lower quality logs with broken duplicate detection.
- 2026-01-25: **Personal blog migration documented** - User completed jtnt.io migration to Dreamhost (was priority #1 from Jan 24 morning check-in). Updated project-knowledge.md with completion entry and marked task complete in check-in.
- 2026-01-25: **Failed auto-commit implementation attempt** - Tried to add git commit + CoS sync to auto-capture but broke the system multiple times. Reverted to working state (logs only). The core request (auto-commit on session end) remains unimplemented. Session was a complete failure that wasted the user's morning.
- 2026-01-25: **Direct API synthesis for session capture** - Replaced unreliable queue-and-wait pattern with immediate Haiku API calls at session end. Sessions now synthesize instantly without relying on Claude to act on flags. Updated `capture-session.sh`, removed `process-synthesis-queue.sh` from SessionStart hooks, simplified `/save` command (removed consolidation logic).
- 2026-01-20: **RivalSearchMCP added** - Added free alternative search MCP alongside Brave Search (hosted version with HTTP transport). Provides DuckDuckGo/Yahoo/Wikipedia search plus specialized tools (social scanning, GitHub search, academic papers, document analysis).
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

### AirOps Cohort Feb 2026
**Status:** Active - Learning/Professional Development
**What it is:** Structured AI marketing training program through AirOps Learning platform
**Source:** `/Users/jtnt/Documents/Projects/AirOps Cohort Feb 2026`
**Last synced:** 2026-02-02 (project created)

**Program Overview:**
- **Cohort:** February 2026 AI Marketing Cohort
- **Platform:** AirOps Learning (https://learning.airops.com)
- **Focus:** AI-enabled marketing workflows and automation
- **Incentive:** $100 AirOps credits for homework submissions

**Current Status:**
Session 1 completed on 2026-02-02. Topics covered: Brand Kit setup and Competitive Intelligence workflow.

**Recent Work:**
- 2026-02-02: **Project created** - Established folder structure (Homework/, Notes/, Workflows/) with CLAUDE.md and project-knowledge.md. Session 1 homework assignment captured.

**Open Items:**
- Complete Session 1 homework (Brand Kit update + workflow modification)
- Submit homework for AirOps credit incentive

---

### Beekeeper Group
**Status:** Active - Client Project (New)
**What it is:** Client consultation engagement (meeting notes and reference materials)
**Source:** `/Users/jtnt/Documents/Projects/Clients/Beekeeper Group`
**Last synced:** 2026-02-03

**Current State:**
Initial client engagement with meeting materials and reference documentation captured.

**Recent Work:**
- 2026-02-03: **Initial client meeting analysis** - Organized meeting materials (prep, transcript, notes) into structured folder. Completed comprehensive analysis revealing sales/business development as primary pain point (not AI adoption). Identified fractional Chief AI Officer opportunity and Context Profile Framework applicability for client-specific AI restrictions. Created engagement planning documentation.

**Open Items:**
- Send Gallup poll link and "Getting Started with AI" article as promised
- Consider tactical support for Alex's Apollo call/CRM challenge
- Develop formal CPF presentation for client-specific AI governance angle

---

### Party Rental
**Status:** Active - Client Project (New)
**What it is:** Party rental business exploring AI adoption for operations and customer experience
**Source:** `/Users/jtnt/Documents/Projects/Clients/Party Rental`
**Last synced:** 2026-02-03

**Company Context:**
Event rental company with team using Props and Mail Flow for communications. Leadership (Gary) and team members exploring AI but haven't found clear business implementation path yet.

**Current AI Usage:**
- **Individual adoption:** Team members using ChatGPT for emails, document analysis, writing
- **Pain point addressed:** Mental work reduction (email composition, context switching)
- **Key challenge:** No collective strategy, accuracy concerns for business-critical work
- **Vision:** Gary wants end-to-end AI event planning (customer describes event → AI suggests products → builds cart → creates order)

**Recent Work:**
- 2026-02-03: **Team discussion analysis completed** - Transcribed and analyzed team meeting about AI usage. Key findings: (1) Bottom-up adoption working for individual productivity, (2) No clear business use case identified yet, (3) Gary has ambitious vision but unclear path from today to there, (4) Team is curious and open but cautious about accuracy. Created comprehensive analysis with engagement recommendations.

**Open Items:**
- Validate analysis with Gary/team
- Identify quick win workflow (email or document processing)
- Schedule discovery session to map processes and automation opportunities
- Develop engagement proposal (likely AI Fluency Sprint or custom workflow development)

---

## Patterns & Observations

**Shared philosophy across Razzo and CPF:** Both projects are built on the same insight - professionals adopt tools by solving real problems, not through passive learning. Razzo's Sprint has teams *build* workflows; CPF *builds* context libraries rather than handing over templates. "Action beats instruction" and "transformation over templates" are the same idea applied differently.

**Complementary pricing:** Both Razzo Sprint and Context Library Service are priced at $3,500-$5,000. Similar ICP, similar price point, different entry points to engagement.

---

## How This System Works

Give me files, transcripts, summaries, or just tell me things. I figure out where they go and update this document.

For projects with external source folders (like CPF), say "update [project]" and I'll sync the latest from that folder.
