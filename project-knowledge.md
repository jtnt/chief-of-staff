# Chief of Staff Index

**Last Updated:** 2026-01-12 (Cowork mode limitations discovery)

---

## Current Priorities

**The Stakes:** Unemployed for nearly a year. Need consistent revenue or will have to pursue full-time employment. Everything else is secondary.

### P0: Revenue Generation (Razzo + CPF)

**Razzo - Get Clients for AI Workflow Sprint**
- Primary revenue path right now
- Sprint offering ($3,500-$5,000) is the lead product
- Actions needed:
  1. **Outreach to existing network** - warm contacts, not cold calling
  2. **Events/networking** - like AI Walks meetup today (Dammon Burden @ ID.me is a potential lead)
  3. **Content creation** - but more targeted/focused (currently over-indexing on content vs. outreach, and content isn't targeted enough)

**Context Profile Framework - Validate with Pilots**
- Need 3-5 pilot customers to test the service
- Purpose: learn real customer needs, find gotchas, test process
- Context engineering is having a moment (context graphs driving attention)
- Timing is good - need to push on this now
- Actions needed:
  1. Define the pilot offering clearly
  2. Find 3-5 companies willing to pilot
  3. Content about context engineering (ride the wave)

### Everything Else: Deprioritized

Chief of Staff system, LinkedIn tools, Caregiver App - these are either infrastructure (CoS) or paused. They don't generate revenue and shouldn't get focus time.

**My job as Chief of Staff:** Keep you focused on Razzo and CPF revenue activities. Flag when you're drifting into non-priority work. Be proactive about this.

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
**Last synced:** 2026-01-10 (ContextOS analysis complete)

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

### Chief of Staff
**Status:** Active - Meta
**What it is:** The knowledge management system itself
**Last synced:** 2026-01-11 (Folder structure cleanup)

This system tracks work across all projects, synthesizes information, identifies patterns, and supports strategic decision-making.

**Current State:**
- Initial structure operational (project-knowledge.md, project-sources.md, CLAUDE.md)
- Two-way sync workflows built: pull from Chief of Staff ("update [project]") and push from projects (`/update-cos`)
- Tracking 6 projects: Razzo, CPF, LinkedIn My Posts Extractor, LinkedIn Scraper Extension, Caregiver App, and Chief of Staff itself
- **Three-layer documentation model established** across all projects
- **Smart project status detection** - only checks/reports projects with actual changes
- **Check-in system operational** - Four types for daily planning, reflection, and thought capture
- **Bidirectional flow implemented** - CoS can now push items to project inboxes

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

- 2026-01-09 (late night): Established three-layer documentation model and automation
  - Added LinkedIn My Posts Extractor and LinkedIn Scraper Extension to tracking
  - Cleaned up session-progress files from LinkedIn projects (consolidated into CLAUDE.md)
  - **Created documentation convention:**
    - `session.md` - temporary working notes (deleted after extraction)
    - `project-knowledge.md` - strategic context, decisions, outcomes (persistent)
    - `CLAUDE.md` - technical instructions for Claude (known issues, patterns, preferences)
  - Updated `~/.claude/CLAUDE.md` to document the three-layer model for all projects
  - Updated Chief of Staff CLAUDE.md with session file guidance
  - Enhanced `/update-knowledge` command to handle both project-knowledge.md AND CLAUDE.md
  - Updated project-sources.md to remove session file references
  - **Added smart project status detection:**
    - Git repos: check `git status` + `git log --since` for changes
    - Non-git folders: check file modification dates
    - Only report projects with actual changes (reduces noise from inactive projects)
  - **Created `/save-progress` command:**
    - All-in-one: updates knowledge files, commits to git, pushes to GitHub, syncs to CoS
    - Auto-generates commit messages
    - Callable multiple times per session (checkpointing)
    - Exits early if nothing to save
    - Handles edge cases (no git, no remote, non-tracked projects)

- 2026-01-09 (night): Enhanced conversation intelligence capture
  - **Key insight:** Most projects are non-technical (Razzo strategy, Chief of Staff). The valuable insights live in conversations - decisions, strategic thinking, patterns observed - not in file diffs or session.md files.
  - **Updated `/update-knowledge` workflow** to make conversation review the PRIMARY context source:
    - Explicitly extract: decisions + rationale, strategic shifts, things learned, patterns, open questions
    - Git log and session.md become supplementary, not primary
  - **Strategic decision:** Capture "latent intelligence" from conversations automatically (no user prompting needed)
  - This solves the gap where `/save-progress` could miss conversation insights if there were no file changes
  - **Follow-up fix:** Made conversation analysis instruction more explicit
    - Changed from vague "Review the conversation" bullet to standalone step: "Analyze this conversation session - Before doing anything else..."
    - Added emphasis: "This is the PRIMARY source of insights"
    - Tested in another project - initial version was being skipped, new version forces explicit analysis
  - **Removed automatic session.md deletion**
    - Previously `/update-knowledge` would delete session.md after extracting notes
    - User pointed out: session.md might still be in use, not ready to delete
    - Now leaves session.md alone - user decides when to delete it
  - **Fixed directory switching bug in `/update-cos`**
    - User ran `/update-cos` from CPF, Claude used `cd` to switch to CoS for git operations
    - `cd` persisted - subsequent commands ran in wrong directory
    - Added "Directory Safety" section: Never use `cd`, always use `git -C <path>` and absolute paths
    - Made git commit/push step explicit (was happening implicitly)
    - Now stays in original project directory throughout
  - **Fixed `/save-progress` to match all recent improvements**
    - Removed session.md deletion reference (now leaves it alone)
    - Fixed git staging order: Stage → Generate message → Commit (was generating message before staging)
    - Updated CoS sync to use `git -C` instead of `cd` (directory safety fix)
    - Now properly implements all the fixes made to `/update-knowledge` and `/update-cos`
  - **Refactored `/save-progress` to call commands instead of duplicating logic**
    - Was maintaining separate copies of `/update-knowledge` and `/update-cos` logic
    - Now just calls those commands - fixes propagate automatically
    - Simpler, more maintainable, single source of truth
  - **Added "Command Dependencies" section to CLAUDE.md**
    - Documents the relationship between `/update-knowledge`, `/update-cos`, and `/save-progress`
    - Notes that changes to the first two automatically flow to `/save-progress`
    - Reminder to test all three when modifying any one
    - Prevents future duplication of logic
  - **Added Git Commit Policy to global CLAUDE.md**
    - Explicit guidance: only commit when user asks
    - Exceptions documented for `/save-progress` and `/update-cos`
    - Added after realizing I was auto-committing throughout session
  - **Fixed critical `/save-progress` logic bug**
    - Was checking git status BEFORE running `/update-knowledge`
    - Would exit with "Nothing to save" without analyzing conversation
    - Reordered: Run `/update-knowledge` first, THEN check git status
    - This ensures conversation insights are captured even if no files manually edited
    - **This was the fundamental flaw** - the command couldn't work as designed with the original order

- 2026-01-10: **Implemented check-in system for daily planning and reflection**
  - Created `Check-Ins/` folder structure with three subfolders: `daily/`, `thoughts/`, `journal/`
  - Built four check-in types:
    - `/morning` - Capture day intentions and priorities (optional prompts)
    - `/evening` - What got done, spillover items, tomorrow plans (optional prompts)
    - `/thought` - Quick captures: quotes, links, articles, random ideas (timestamped files)
    - `/journal` - Personal reflection, completely freeform (never routed to projects)
  - Added `/review-checkins` command for pattern analysis across check-ins
  - **Natural language detection** - All four types can be triggered naturally:
    - "Good morning" → morning check-in
    - "End of day" → evening check-in
    - Sharing a link/quote → thought capture
    - Personal reflection → journal entry
  - **Project routing** - Check-ins can link to project folders when relevant (except journal entries)
  - Updated CLAUDE.md with natural language detection guidance
  - **Design philosophy:** Low-friction capture with flexible structure
    - Morning/evening can use prompts or go freeform
    - Multiple thoughts per day (separate timestamped files)
    - Multiple journal entries per day (appended with timestamps)
    - Pattern analysis identifies themes, energy trends, completion patterns, ideas worth developing

- 2026-01-10 (evening): **Implemented bidirectional information flow (CoS → Projects)**
  - **Problem identified:** Check-ins could route to CoS internal log, but items didn't surface when opening projects
  - **Solution:** Created `cos-inbox.md` mechanism
  - **How it works:**
    1. During CoS check-ins, when project mentioned: "Want to add to [Project]'s inbox?"
    2. If yes, writes to `/Users/jtnt/Documents/Projects/[ProjectName]/cos-inbox.md`
    3. Also logs to CoS internal folder (keeps record in Chief of Staff)
    4. When user opens that project, Claude auto-notifies: "You have X items from Chief of Staff"
  - **Inbox structure:** Pending / Archive sections
    - Items include: date, source (morning/evening/thought), context, content
    - Manual archive workflow: user says "archive that" to move items
  - **Files modified:**
    - `/Users/jtnt/.claude/commands/morning.md` - Updated project routing to push to cos-inbox.md
    - `/Users/jtnt/.claude/commands/evening.md` - Same
    - `/Users/jtnt/.claude/commands/thought.md` - Same
    - `/Users/jtnt/.claude/CLAUDE.md` - Added "Chief of Staff Inbox Check" section for auto-notification
    - Chief of Staff `CLAUDE.md` - Documented bidirectional flow mechanism
  - **Key design decision:** Dual write (project inbox + CoS log) ensures visibility in both places
  - **UX improvement:** Items now persist where they're actionable (in the project), not just logged in CoS

- 2026-01-10 (evening - late): **Check-in system being actively used**
  - User created two journal entries in single session
  - First entry: AI Walks meetup experience (networking, connections)
  - Second entry: Personal reflection on Bob Weir
  - Journal entries demonstrate system is functional and low-friction
  - Natural multiple-entries-per-day pattern working as designed

- 2026-01-10 (night): **Added priority tracking and session transcript analysis**
  - **Priority context established:** User shared stakes clearly - unemployed nearly a year, need revenue or need a job
  - **Added "Current Priorities" section** to top of project-knowledge.md
    - P0: Revenue generation (Razzo clients via Sprint, CPF pilots)
    - Everything else deprioritized
    - Chief of Staff role: keep user focused, flag drift
  - **Updated check-ins for priority alignment:**
    - `/morning` now reads priorities and checks if planned work aligns
    - `/evening` compares actual work vs. stated priorities, tracks patterns
  - **Discovered session transcripts** at `~/.claude/projects/[encoded-path]/[uuid].jsonl`
    - JSONL format with user/assistant messages, timestamps, summaries
    - Can be used for pattern detection, missed insight recovery
  - **Created `/analyze-sessions` command:**
    - Analyzes all projects by default (last 7 days)
    - Surfaces missed insights not captured in project-knowledge.md
    - Tracks priority signals (which projects get attention)
    - Compares against knowledge files, offers to update
  - **Created `/export-session` command:**
    - Exports any session to readable markdown (ALL projects, not just tracked)
    - Interactive session picker grouped by project path
    - Asks where to save each time
    - `--verbose` flag includes tool calls

- 2026-01-10 (late night): **Established factual accuracy policy**
  - **Incident:** User called out that I gave completely wrong information about Claude Code CLI flags in previous session
    - Made up `claude -d` and `--dangerouslyDisableSandbox` flags that don't exist
    - Particularly problematic because I AM Claude Code - should know my own CLI or admit I don't
  - **Core issue:** Fabricated information instead of researching or saying "I don't know"
  - **Action taken:** Added "Critical: Never Make Things Up" section to `~/.claude/CLAUDE.md`
    - Explicit instruction: Never fabricate ANY information (technical, factual, historical)
    - If uncertain → Use WebSearch/WebFetch OR explicitly say "I don't know"
    - Core principle: "Uncertainty is acceptable. Fabrication is not."
  - **Strategic insight:** User prioritizes factual accuracy over appearing knowledgeable
    - Would rather hear "I don't know" than receive confident but wrong information
    - This establishes a fundamental quality standard for all interactions

- 2026-01-10 11:21 PM EST: **ContextOS integration planning**
  - **Context:** User downloaded gtm-context-os-quickstart system and tested it
    - Impressed by automatic decision capture and attribution system (VERIFIED/INFERRED tags)
    - Asked to explore integrating its best features into Chief of Staff
  - **Research completed:** Full exploration of ContextOS architecture
    - Three agents analyzed: ontological layer, knowledge structure, root architecture
    - Key insight: Automatic capture happens via CLAUDE.md instructions, not folder structure
  - **Features identified for integration:**
    - Attribution system - tag every claim as VERIFIED/INFERRED to prevent fabrication
    - Automatic decision capture - strategic questions auto-create decision documents
    - Pattern validation lifecycle - Hypothesis (N=1) → Validated (N=2+) → Canonical
    - Light ontological layer - YAML files for quality standards and routing rules
  - **Plan saved:** Full integration plan at `~/.claude/plans/spicy-popping-puzzle.md`
    - Marked as "SAVED FOR LATER REVIEW"
    - Added reminder to TODO.md
    - Key unresolved question: How to handle `/update-knowledge` (other projects use it)
  - **Decision:** Review with fresh eyes before implementation
  - **Strategic insight:** The goal should be eliminating manual knowledge capture commands entirely by making capture continuous during conversation

- 2026-01-11 11:32 AM EST: **Memory MCP server exploration**
  - **Context:** User added three MCP servers to Claude Code global config (`~/.claude.json`):
    - `notion` - Notion API integration
    - `sequential-thinking` - Structured problem-solving tool
    - `memory` - Knowledge graph memory system (testing phase)
  - **Focus:** Understanding how Memory MCP works and potential integration with CoS
  - **Memory MCP architecture:**
    - Uses knowledge graph with three components: entities (people/things), relations (connections), observations (atomic facts)
    - Stored in JSONL format at `/Users/jtnt/.claude/memory.jsonl`
    - Nine tools: create/delete entities, relations, observations; read/search graph
  - **Potential CoS integration identified:**
    - Memory graph as **fast-access index** for factual lookups (current priorities, key people, project relationships)
    - CoS markdown files remain **strategic narrative** (session summaries, decisions with context)
    - Complementary systems: graph for speed, markdown for richness
  - **Status:** Exploratory - user testing the memory server, may add/remove MCP servers as needed
  - **Note:** This is Claude Code infrastructure experimentation, not core CoS feature work

- 2026-01-11 (afternoon): **Added Donald Miller StoryBrand reference to Resources**
  - **Context:** User provided podcast transcript (Donald Miller at Guru Conference, Episode 470)
  - **Work done:**
    - Extracted comprehensive insights from podcast
    - Created `Resources/Donald Miller StoryBrand Framework.md` with pure reference capture
    - Included all principles, examples (aquarium company, Oura Ring, YNAB, etc.), and quotes
    - Updated CLAUDE.md with complete folder structure and Resources folder guidance
  - **Key decision:** Resources folder is for project-agnostic reference materials
    - Extract and synthesize insights, don't dump raw content
    - Keep application/analysis separate from reference capture
    - This reference will inform future Razzo marketing work (done separately)
  - **Resources folder purpose clarified:**
    - Marketing frameworks and methodologies
    - Claude Code documentation
    - Industry insights with extracted key points
    - Repeatable approaches

- 2026-01-11 (evening): **Fixed structural inconsistencies in project tracking**
  - **Problem discovered:** Project folders had inconsistent structure
    - Razzo had subfolders (reference/, session-logs/, strategy/) with content in one
    - CPF had duplicate outdated `project-knowledge.md` file
    - Violated principle that CoS only tracks projects, doesn't store content
  - **Root cause:** Initial setup wasn't clear about standard; created structure that seemed helpful but broke the model
  - **Actions taken:**
    - Converted Razzo session-logs content to proper sync file (20260109-sprint-positioning-sync.md)
    - Deleted outdated CPF project-knowledge.md copy (real one is current)
    - Removed empty Razzo subfolders (reference/, strategy/)
    - Added "Projects Folder Standard" section to CLAUDE.md with explicit rules
    - Updated folder tree in CLAUDE.md to show standard
  - **The standard (now documented):**
    - Each project folder: ONLY dated sync files (YYYYMMDD-*.md)
    - Flat structure, no subfolders
    - No duplicated knowledge files
    - No stored project content
  - **Why this matters:** Consistency is essential for a knowledge management system - Chief of Staff tracks projects, doesn't become a second home for their files

- 2026-01-12 (evening): **Discovered Cowork mode vs CLI differences**
  - **Context:** First time using Cowork mode (Claude desktop app) instead of Claude Code CLI
  - **Key discoveries:**
    - **Slash commands don't work in Cowork mode** - Commands like `/journal`, `/morning`, `/update-knowledge` return "Unknown skill" errors
    - Slash commands are CLI-only feature, not available in desktop app's Cowork mode
    - All custom commands in `~/.claude/commands/` are functional but only accessible via CLI
  - **Other limitations found:**
    - **MCP connector availability** - Gmail connector configured globally but not available in Cowork session
    - **File access restrictions** - Can't read files outside selected workspace folder (e.g., can't access `~/.claude/commands/`)
    - Some MCP servers work (Notion, Apple Notes, Chrome), others don't appear
  - **Workaround implemented:**
    - User uploaded `/update-knowledge` command file directly
    - Can execute command logic manually by reading uploaded file
    - Natural language triggers still work (can ask "run update-knowledge workflow")
  - **Accidental learning:**
    - Created `.claude/commands/journal.md` in Chief of Staff folder thinking commands were missing
    - Actually, commands exist in global `~/.claude/commands/` but aren't accessible from Cowork mode
  - **Implications:**
    - Check-in system (`/morning`, `/evening`, `/journal`, `/thought`) needs natural language triggers in Cowork mode
    - Knowledge update workflows need manual execution or natural language requests
    - Some automation features designed for CLI won't work in desktop app
  - **Strategic insight:** Cowork mode and CLI are different environments with different capabilities - need to design workflows that work in both, or document which features require which environment

**Technical Setup:**
- `~/.claude/CLAUDE.md` contains documentation model and "Session Workflow" instruction
- CLAUDE.md contains instructions for Chief of Staff workflows, project sync, and session file handling
- `/update-knowledge` command updates both project-knowledge.md and CLAUDE.md (removed unnecessary user questions)
- `/save-progress` command automates full save workflow (knowledge + git + CoS sync)
- GitHub repo established for version control

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
