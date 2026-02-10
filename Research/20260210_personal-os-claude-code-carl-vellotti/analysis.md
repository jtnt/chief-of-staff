---
type: research-analysis
source: https://amankhan1.substack.com/p/how-carl-set-up-his-personal-os-in
source_file: article.md
analyzed: 2026-02-10 05:40 PM EST
threads: [cos-architecture, workflow-automation]
---

# Analysis: How Carl Set Up His Personal OS in Claude Code

**Source:** https://amankhan1.substack.com/p/how-carl-set-up-his-personal-os-in

## Key Thesis

A Claude Code personal OS should prioritize consolidation (fewer files = clearer LLM context), reusability (convert repeated processes into workflows), and incremental growth (start with CLAUDE.md + goals, add structure as patterns emerge). The system compounds — every maintained file makes future interactions smarter.

## What's New or Notable

Carl's system is structurally similar to CoS but makes several different design choices worth examining:

1. **GOALS.md as a standalone file** — Identity, ownership areas, and objectives consolidated in one place, updated quarterly. CoS distributes goals across project-knowledge.md files and the "Current Priorities" section. A dedicated goals file might give Claude better signal on what matters at a higher level than per-project tasks.

2. **Workflow folders as mini-workspaces** — Each repeatable process gets its own folder with a scoped CLAUDE.md, step files, and reference materials. CoS uses skills for repeatable processes but doesn't give each workflow its own CLAUDE.md context. Carl's approach provides richer per-workflow instructions without bloating the global CLAUDE.md.

3. **Projects vs. Workflows distinction** — "If you execute the same process twice, convert it to a workflow." CoS doesn't formalize this distinction — some skills are workflow-like (session-capture, meeting-review) but others are one-shot utilities. Making the distinction explicit could improve organization.

4. **_temp/ capture folder** — Quick unstructured capture during a session, processed later. CoS doesn't have an equivalent — items either go to Tasks Inbox or get lost. Low friction capture could help.

5. **Knowledge/People/** — Stakeholder notes and working preferences in a persistent folder. CoS doesn't track people/stakeholder context systematically — it lives in meeting notes and project context but isn't aggregated.

6. **Templates/ folder** — Reusable document structures (PRD, weekly update, etc.). CoS uses skills and sample files for this but doesn't have a central templates directory.

7. **"Pointers over content" in CLAUDE.md** — Link to other files rather than duplicating information. CoS's CLAUDE.md is ~200 lines and growing. Worth evaluating whether some sections should become linked files.

## Connections to Existing Research

This is the first research item in CoS's research/ folder, but connects to several existing system decisions:

- **Boris Cherny's Claude Code tips** (backlog task) — Both emphasize CLAUDE.md discipline and incremental system building
- **CoS automation recommendations** (backlog task) — Carl's workflow folders align with the idea of more structured automation
- **ContextOS integration plan** (`~/.claude/plans/spicy-popping-puzzle.md`) — Carl's system is essentially a ContextOS implementation; comparing approaches could inform that plan

## Relevance to Project

Directly relevant — this is a mature, publicly shared implementation of the same kind of system CoS is. Several ideas worth evaluating for CoS:

**High potential:**
- **GOALS.md** — A consolidated goals/priorities file that Claude reads every session could sharpen prioritization signals. CoS has "Current Priorities" in project-knowledge.md but it's buried below Tasks and system state.
- **Workflow folders with scoped CLAUDE.md** — Could improve complex skills like meeting-review and session-capture by giving them richer context without bloating global instructions.
- **Knowledge/People/** — Systematic stakeholder tracking would improve meeting prep and relationship management.

**Medium potential:**
- **_temp/ capture** — Could reduce friction for quick captures that don't fit Tasks format.
- **Templates/** — Central templates directory could help with recurring document types (proposals, meeting notes).

**Already implemented differently:**
- **Tasks/** (CoS uses ## Tasks in project-knowledge.md — tighter integration)
- **Meetings/** (CoS uses project-level logs/ and Granola integration)
- **Skills** (CoS already has extensive skill system)

## Key Concepts

- **Consolidation principle** — Fewer files mean clearer context for the LLM. Single-file goals, three-file task system. Reduce decision overhead.
- **Pointers over content** — CLAUDE.md should link, not duplicate. Keep it under 100 lines.
- **Projects are one-off, workflows are repeatable** — If you do it twice, formalize it as a workflow with its own scoped instructions.
- **Workflow folders as mini-workspaces** — Each workflow gets: scoped CLAUDE.md, spec, step files, reference materials, drafts/published output folders.
- **Tools vs. Skills layering** — Build the utility first (tool), then wrap it with a user-facing interface (skill).
- **Compounding returns** — Every maintained file makes future interactions smarter. Past notes inform prep, goals shape recommendations, workflows reduce explanation overhead.
- **Create folders for actual work, not work categories** — Planning doesn't need its own folder; distribute it to where the work lives.
