# Chief of Staff Index

**Last Updated:** January 9, 2026 (late evening)

---

## Active Projects

### Razzo
**Status:** Active - Primary Focus
**What it is:** AI training for sales and marketing teams
**Website:** razzohq.com

**Current Strategic Direction:**
The AI Workflow Sprint is becoming the primary go-to-market focus, shifting Razzo from "training company" to "workflow enablement company." The Sprint is a 2-week engagement where teams build real, working AI workflows (not just learn skills). This creates natural pathways to other offerings (bootcamp, momentum program).

**Key Insight:** Professionals adopt tools by solving real problems, not through passive learning. The Sprint's action-learning approach addresses the "knowing-doing gap" that traditional training creates.

**Pricing:**
- Individual format (up to 10 people): $3,500
- Team format (25-30 people): $5,000

**Recent Work:**
- 2026-01-09: Updated website to reflect Sprint-first positioning. Created Sprint offering page, repositioned in navigation, added to homepage.

**Open Items:**
- Move Example Workflows section to bottom of Sprint page
- Add "Beyond the Workflows" benefits section (champion identification, etc.)
- Fix bullet font sizing (CSS)
- Soften 4-week methodology language on homepage/about
- Add featured Sprint section above course grid on homepage
- Reframe "training adoption" language

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
- **Stop hook active:** Reminds about `/update-knowledge` when significant session work is complete and user is wrapping up

**Recent Work:**
- 2026-01-09: Initial setup ([session log](Projects/Chief of Staff/20260109-initial-setup.md))
- 2026-01-09 (late evening): Implemented `/update-knowledge` reminder system
  - Removed failed SessionStart auto-sync hook attempts (additionalContext wasn't reliably visible)
  - Created prompt-based Stop hook to remind about `/update-knowledge` at session end
  - Hook uses LLM to evaluate if: (1) significant work was done AND (2) user is wrapping up
  - Only reminds when both conditions are met to avoid noise
  - Added Claude Code hooks reference documentation to Resources folder for future reference

**Technical Setup:**
- Stop hook in `~/.claude/settings.json` uses LLM to intelligently detect when to remind about `/update-knowledge`
- CLAUDE.md contains instructions for Chief of Staff workflows and project sync
- SessionStart auto-sync postponed - focusing on Problem 1 first

**Philosophy:** Keep it simple. Markdown files in folders. User provides information, Claude organizes and synthesizes.

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
