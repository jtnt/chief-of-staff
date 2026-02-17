---
source: https://amankhan1.substack.com/p/how-carl-set-up-his-personal-os-in
type: article
author: Carl Vellotti
publication: AI Product Playbook
date: 2026-02-10
captured: 2026-02-10
tags: [claude-code, personal-os, knowledge-management, productivity, workflows]
---

# How Carl Set Up His Personal OS in Claude Code

**Source:** https://amankhan1.substack.com/p/how-carl-set-up-his-personal-os-in

**Carl Vellotti (Guest Post), AI Product Playbook — 2026-02-10**

---

Carl Vellotti shares his approach to organizing Claude Code, addressing the common question: "How should I set up my space?" He emphasizes that Claude Code's flexibility means there's no single correct method. His system has been tested through content creation, product work, and running a small business. He notes that personal operating systems should vary based on individual needs, and encourages experimentation.

The complete example is available at: https://github.com/carlvellotti/carls-product-os

## System Structure Overview

Carl's PersonalOS includes these key components:

- **CLAUDE.md** — Entry point automatically read by Claude at conversation start
- **GOALS.md** — Identity, ownership areas, and objectives consolidated in one file
- **Tasks/** — Three-file system: backlog.md, active.md, and archive/
- **Projects/** — Larger work items with dedicated context and outputs
- **Workflows/** — Repeatable processes organized as mini-workspaces
- **Meetings/** — Notes categorized by type
- **Knowledge/** — Persistent reference material across projects
- **Templates/** — Reusable document structures
- **.claude/skills/** — Slash commands for repetitive tasks
- **Tools/** — Scripts and utilities
- **_temp/** — Temporary storage for unsorted items

## Detailed Component Explanations

### CLAUDE.md

This file serves as the system's instruction manual. Key principles:

1. **Pointers over content** — Link to GOALS.md rather than duplicating information
2. **Structural updates only** — Modify when folder organization changes, not for project-level work
3. **Keep it brief** — Maintain under 100 lines to avoid overwhelming Claude with unnecessary detail

Carl uses this exclusively with Claude Code for multi-file work like planning and research synthesis, reserving Cursor for focused codebase development.

### GOALS.md

This consolidated file contains:
- Personal identity and role
- Areas of ownership
- Current objectives with measurable targets
- Relevant context

He updates quarterly for goals and whenever responsibilities shift. Single-file consolidation reduces decision-making overhead for the language model.

### Tasks/

Three-file simplicity:
- **backlog.md** — Unprocessed captures
- **active.md** — Current work
- **archive/** — Completed items for reference

### Projects/

When work exceeds task scope, create a project folder containing:
- **brief.md** — Context dump (what, why, who, timeline)
- **research/** — Interviews and project-specific data
- Output files at root level (PRDs, specs, drafts)
- **assets/** — Images, slides, diagrams

Examples include dashboard features, presentations, and user research studies.

### Workflows/

For repeatable patterns, create mini-workspaces with:
- **CLAUDE.md** — Scoped instructions for that workflow
- **workflow-spec.md** — Process overview
- **[step-N].md** — Prompts and guides for each phase
- Reference materials (style guides, examples)
- **Drafts/** and **Published/** folders

Examples: weekly newsletters, quarterly planning, research synthesis.

**Key distinction:** Projects are one-off; workflows are for repeated processes. If you execute the same process twice, convert it to a workflow.

### Meetings/

Organization includes:
- **1on1s/** — Organized by person
- **standups/** — Organized by date
- One-off meetings stored at root level

Carl syncs from Granola MCP but supports manual entry. Reference past meetings for decision context and prep for upcoming sessions.

### Knowledge/

Persistent, reusable information across projects:
- **Reference/** — Stable facts (company.md, product.md, team.md)
- **Research/** — Learnings, trends, explorations
- **People/** — Stakeholder notes and working preferences

Distinction from Projects/research/: Project research is temporary and scoped; Knowledge/ items are permanent.

### Templates/

Document structures refined over time:
- **prd.md** — PRD structure
- **weekly-update.md** — Stakeholder update format
- **1on1-notes.md** — Meeting notes structure
- **research-summary.md** — Research synthesis format

Evolve templates as workflows improve.

### .claude/skills/

Reusable commands for frequent tasks:
- **/standup** — Daily standup generation from recent work
- **/weekly-update** — Stakeholder update drafting
- **/synthesize-research** — Research summary across files

## A Day in the Life: Concrete Examples

Carl walks through a typical Tuesday for a PM named Alex at GradeFlow:

**Morning Standup:** Type `/standup`. Claude scans recent changes, reads active tasks, and generates a briefing noting 80% progress on spec work, upcoming 1:1 prep needs, and a blocker awaiting engineering estimates.

**1:1 Preparation:** `/meeting-prep @Meetings/1on1s/david-chen.md` pulls recent notes, checks stakeholder preferences from Knowledge/People/, and generates talking points with due updates.

**Deep Project Work:** Reference project context with "@Projects/ta-workload-tracker/". Claude reads the brief and incorporates user research quotes directly into recommendations.

**Research Synthesis:** `/synthesize-research @Projects/ta-workload-tracker/research/` extracts patterns across interviews, quantifies findings (e.g., "0 out of 5 professors currently monitor workload"), and links patterns to direct quotes.

**PRD Drafting:** `/draft-prd-section "Success Metrics"` pulls from brief, research synthesis, and goals, creating metrics grounded in actual user data rather than assumptions.

**Mid-Day Capture:** Quick notes from an unplanned call go to _temp/ without structural overhead for later processing.

**Backlog Addition:** New tasks are appended to Tasks/backlog.md for eventual promotion.

**Stakeholder Update Workflow:** Run the weekly update workflow. Claude follows scoped instructions specific to that process, gathering metrics and drafting within defined audience parameters.

**Tomorrow Planning:** Ask Claude what to prioritize. It cross-references active tasks, goals, and meeting notes to flag critical-path items.

## Key Distinctions

### Templates vs. Workflows

**Templates** define document structure (the "what"):
- PRD template specifies sections
- You direct Claude to use the template
- Output: single document

**Workflows** guide multi-step processes (the "how"):
- PRD workflow coaches through research → drafting → review → finalization
- Includes its own instructions and reference docs
- Output: multiple iterated documents across sessions

Use both together when consistency and process guidance are both needed.

### Tools vs. Skills

Tools are scripts and utilities built first, then wrapped with skills that call them:
- **metrics-pull** — Pulls Amplitude data, formats weekly summaries with period-over-period comparisons and red/yellow/green alerts
- **meeting-prep** — Searches past meeting notes, extracts open action items

Skills provide the interface layer (`/weekly-update` runs the metrics tool behind the scenes).

## Getting Started

1. Clone the repository
2. Review EXAMPLE-OS/ to understand the structure
3. Copy BLANK-OS/ and personalize it
4. **Prioritize CLAUDE.md + GOALS.md** — These provide 80% of the system's value
5. Add workflows and skills incrementally as patterns emerge

## FAQ

**Where does planning go?**

Planning doesn't need its own folder. Distribute it:
- **GOALS.md** — Priorities and focus areas
- **Projects/** — Discrete planning work (quarterly planning, board prep)
- **Workflows/** — Repeatable planning processes (annual strategy patterns)

Create folders for actual work, not work categories.

**Templates vs. Workflows (Reiterated)?**

Templates = document structure. Workflows = multi-step process guidance.

A PRD template defines sections; a PRD workflow guides the full creation process. Use templates within workflows for consistency.

## Key Takeaways

Carl's system prioritizes:
- **Consolidation** — Fewer files mean clearer context for Claude
- **Reusability** — Workflows evolve into stable, repeatable processes
- **Flexibility** — Start with core elements (CLAUDE.md, GOALS.md, Tasks/) and expand as needs emerge
- **Intentionality** — Update structure when methodology changes, not when content shifts

The compounding effect emerges when every maintained file makes future interactions smarter. Past 1:1 notes inform prep; updated goals shape metric recommendations; consistent workflows reduce explanation overhead.

---

**References mentioned:**
- GitHub repo: https://github.com/carlvellotti/carls-product-os
- AI Product Playbook (Aman Khan's Substack)
- Granola MCP (meeting sync)
- Amplitude (metrics)
- Cursor (code editing)
