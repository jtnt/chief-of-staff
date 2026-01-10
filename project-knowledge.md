# Chief of Staff Index

**Last Updated:** January 9, 2026 (late night - added LinkedIn extensions tracking)

---

## Active Projects

### Razzo
**Status:** Active - Primary Focus
**What it is:** AI training for sales and marketing teams
**Website:** razzohq.com
**Source:** `/Users/jtnt/Documents/Projects/Razzo`
**Last synced:** 2026-01-09 (evening - Sprint positioning complete)

**Current Strategic Direction:**
The AI Workflow Sprint has become the primary go-to-market focus, shifting Razzo from "training company" to "workflow enablement company." The Sprint is a 2-week engagement where teams build real, working AI workflows (not just learn skills). This creates natural pathways to other offerings (bootcamp, momentum program).

**Key Insight:** Professionals adopt tools by solving real problems, not through passive learning. The Sprint's action-learning approach addresses the "knowing-doing gap" that traditional training creates.

**Current Offerings:**
- AI Workflow Sprint: 2 weeks, $3,500 (individual) or $5,000 (team) - LEAD OFFERING
- Sales Teams Bootcamp: 4 sessions, $5,000
- Marketing Teams Bootcamp: 4 sessions, $5,000
- Sales Managers Workshop: 90 min, $1,500
- Office Hours: $250/hr

**Recent Work:**
- 2026-01-09: Sprint positioning work COMPLETED
  - All pending TODO items finished (Sprint section on homepage, softened 4-week emphasis, added "Beyond the Workflows" benefits, moved examples to bottom)
  - Website now fully reflects Sprint-first positioning
  - Repository reorganized with website/, Planning/, Assets/ folders
  - CLAUDE.md split into root (project-wide), website-specific, and strategic context (project-knowledge.md)

**Open Items:**
- Monitor Sprint positioning effectiveness with market
- Evaluate Sprint → Bootcamp conversion pathway
- Consider quarterly sprint model for ongoing client engagement

---

### Context Profile Framework
**Status:** Active - R&D / Early Exploration
**What it is:** Framework + done-for-you service for creating AI context libraries
**Source:** `/Users/jtnt/Documents/Projects/Context Profile Framework`
**Last synced:** 2026-01-09 (evening - major architecture updates)

**The Problem:** Organizations underutilize AI because they start every conversation from scratch. The framework teaches *what* to build (four layers: Company, Department, Project, Individual). The service actually builds it for them.

**Current Strategic Direction:**
- Manual MVP phase - validate with 3-5 companies before building software
- Creation friction is the primary barrier (not maintenance, not access)
- Transformation over templates: converting raw content to structured knowledge is the value
- Google Drive delivery with Claude Projects sync
- **NEW:** Context as competitive advantage positioning - when everyone has same AI models, context quality becomes differentiation

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
- 2026-01-09 (evening): Major conceptual update to architecture based on context graphs research
  - Added detailed framework for decision traces (exception logic, precedents, cross-system synthesis, approval chains)
  - Documented agents as context graph builders
  - Added human role evolution: from doers to context managers
  - New strategic questions about prescriptive vs. emergent structure
- 2026-01-09 (earlier): Project intake and synthesis into Chief of Staff system
- Research prompts developed: Company Context (v4), Industry Context (v2)
- Testing with SalesIntel as testbed

**Open Items:**
- Should CPF structure be prescriptive or emergent? (agents discover vs. pre-defined)
- How do we design for agent-created context? (bootstrap question)
- Context as competitive advantage—positioning as feature vs. core message?
- Develop remaining research prompts (Competitor Intelligence, Brand Voice, ICP Definition)
- Final service naming decision
- Interview/questionnaire structure for content extraction

---

### Chief of Staff
**Status:** Active - Meta
**What it is:** The knowledge management system itself

This system tracks work across all projects, synthesizes information, identifies patterns, and supports strategic decision-making.

**Current State:**
- Initial structure operational (project-knowledge.md, project-sources.md, CLAUDE.md)
- Two-way sync workflows built: pull from Chief of Staff ("update [project]") and push from projects (`/update-cos`)
- Tracking 4 projects: Razzo, CPF, Caregiver App, and Chief of Staff itself
- **CLAUDE.md instruction active:** Claude reminds about `/update-knowledge` naturally at session end

**Recent Work:**
- 2026-01-09: Initial setup ([session log](Projects/Chief of Staff/20260109-initial-setup.md))
- 2026-01-09 (night): Refined `/update-knowledge` workflow
  - Tested prompt-based Stop hook - worked but showed confusing "error" messages
  - Analysis: Stop hooks that block inherently show error-like output (can't be suppressed)
  - Token cost negligible (~$0.10-0.20/month) but UX was poor
  - **Solution:** Removed Stop hook, added instruction to `~/.claude/CLAUDE.md` instead
  - Claude now sees reminder at session start and naturally reminds at appropriate moments
  - Zero noise, zero token cost, simpler implementation
  - Added Claude Code hooks & slash commands reference docs to Resources
  - Set up GitHub repo: https://github.com/jtnt/chief-of-staff.git
  - Fixed `/update-cos` command to use correct Chief of Staff path
  - **Improved `/update-knowledge`:** Now prompts user to sync to Chief of Staff after updating

**Technical Setup:**
- `~/.claude/CLAUDE.md` contains "Session Workflow" instruction for `/update-knowledge` reminders
- CLAUDE.md contains instructions for Chief of Staff workflows and project sync
- `/update-knowledge` command now includes optional CoS sync step
- GitHub repo established for version control
- SessionStart auto-sync postponed for now

**Philosophy:** Keep it simple. Markdown files in folders. User provides information, Claude organizes and synthesizes.

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

**Status:** Working tool, last commit December 24, 2025 (v1.3 - date parsing fixes)

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

**Status:** Working tool, last commit December 24, 2025 (session progress documentation)

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
