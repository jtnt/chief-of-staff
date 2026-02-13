---
type: research-analysis
source: https://x.com/mimurchison/status/2022368529417224480
source_file: transcript.md
analyzed: 2026-02-13 02:14 PM EST
threads: [chief-of-staff-architecture, relationship-management, background-workflows]
repo: https://github.com/mimurchison/claude-chief-of-staff
---

# Analysis: How I Use Claude Code as My AI Chief of Staff (Mike Murchison, CEO of Ada)

**Source:** https://x.com/mimurchison/status/2022368529417224480

## Key Thesis

A CEO has built a comprehensive "AI Chief of Staff" on Claude Code that integrates 15+ systems via MCP (143 tools), runs ~500 background jobs per day, and has "conservatively doubled" his productivity. The core design principle: give the AI full context on your life and work, connect it to every system you use, and let it operate 24/7 autonomously on tasks.

## What's New or Notable

**This is the most mature, publicly-documented Claude Code personal OS we've seen.** Several elements go beyond what Carl Vellotti's personal OS or the Agent-Skill Framework covered:

1. **Scale of MCP integration** — 15+ servers, 143 tools, bidirectional where appropriate (sends emails, schedules appointments). Most personal OS examples we've captured have 2-5 integrations.

2. **Acceptance rate tracking on triage** — He measures the system's draft acceptance rate (>50% on first shot) and it self-improves from edits. This is a quantified feedback loop, not anecdotal "it works."

3. **Multiplayer to-do list** — Tasks are shared between human and AI. When he adds a task, Claude works on it in the background, getting it ~50% done before he picks it up. Board pre-reads, decks, and letters are drafted autonomously.

4. **500 background jobs/day** — Inbox pre-processing every 30 min, contact enrichment hourly, continuous task execution. This goes far beyond "run /gm every morning."

5. **Open-source repo** — Published at github.com/mimurchison/claude-chief-of-staff with full CLAUDE.md template, four commands (/gm, /triage, /my-tasks, /enrich), goals.yaml, schedules.yaml, and contact templates.

6. **MC Porter** — He mentions a tool for managing many MCP servers without blowing the context window. Worth investigating separately.

7. **Mobile access** — Terminal app on phone + Telegram bot as interface to the Chief of Staff. Always-available, not just desktop.

## Connections to Existing Research

**Carl Vellotti's Personal OS (captured 2026-02-10):** Significant overlap in philosophy but Murchison's implementation is more mature. Carl documented the architecture; Murchison demonstrates production usage at CEO scale. Key differences:
- Murchison emphasizes relationship management as a core pillar (tiered contacts, staleness alerts, auto-enrichment)
- Carl focused more on personal knowledge management
- Both use CLAUDE.md as the operating instructions center of gravity

**Our own Chief of Staff system:** Direct comparison point. Notable parallels and gaps:

| Feature | Murchison's System | Our CoS |
|---------|-------------------|---------|
| CLAUDE.md as core | Yes (extensive, ~500 lines, sub-files) | Yes (CLAUDE.md + global CLAUDE.md) |
| Morning briefing | `/gm` skill — calendar, tasks, news, sports | Not implemented |
| Inbox triage | `/triage` — 5 channels, draft+send, acceptance tracking | Not implemented (inbox-triage plugin exists but not integrated) |
| Contact management | `/enrich` — markdown files, 3 tiers, staleness alerts, 160+ contacts | Not implemented |
| Task system | `/my-tasks` — YAML, goal-aligned, multiplayer (AI works on tasks) | Plain checkboxes in project-knowledge.md |
| Goals | `goals.yaml` — quarterly OKRs, progress tracking, all decisions filtered | Priorities section in project-knowledge.md (less structured) |
| Background jobs | ~500/day — inbox, enrichment, tasks, news | SessionEnd auto-capture only |
| MCP integrations | 15+ servers, 143 tools | Gmail, Calendar, Brave Search |
| Research capture | Not mentioned | `/link` skill with analysis |
| Session capture | Not mentioned | Auto-capture pipeline |
| Multi-project tracking | Not mentioned (single-user focus) | project-index.md across 11 projects |
| Mobile access | Terminal app + Telegram bot | Not implemented |

**Key pattern:** Murchison's system is optimized for a single person (CEO) across all life domains. Our CoS is optimized for tracking multiple projects and capturing knowledge. These are complementary philosophies — his system is "executive assistant" while ours is "strategic analyst."

## Relevance to Project

**Highly relevant.** This is both competitive intelligence and a feature roadmap.

**Immediately actionable ideas:**
1. **Morning briefing skill** — `/gm` equivalent. Calendar + tasks + urgent items. We have all the MCP connections needed.
2. **Triage skill** — We have Gmail MCP. A `/triage` that scans email, drafts responses in voice, and tracks acceptance rate would be valuable.
3. **Goals structure** — His `goals.yaml` with progress tracking and goal-alignment filtering is more rigorous than our priorities section. Worth adopting.
4. **Contact/relationship management** — Markdown files per contact, tiered cadence, staleness alerts. Major capability gap.
5. **Background task execution** — His multiplayer to-do list where the AI works on tasks autonomously is the most compelling feature. Our task system is passive checkboxes.

**Philosophical alignment:** His "Chief of Staff should push you, not just serve you" maps directly to our CLAUDE.md instruction: "My job as Chief of Staff: Keep you focused on Razzo and CPF revenue activities. Flag when you're drifting."

**Repo as template:** The open-source repo provides a clean, templatized version of his CLAUDE.md, commands, goals, and contact system. This is a ready-made reference implementation we can selectively adopt.

## Key Concepts

- **Three pillars of an AI Chief of Staff:** Full context, access to every system, 24/7 availability
- **Four functions:** Communicate, Learn, Deepen Relationships, Achieve Goals
- **Multiplayer to-do list:** Human adds task → AI works on it in background → ~50% done when human picks it up
- **Acceptance rate as metric:** Tracking what % of AI-drafted responses are sent without editing. >50% on first shot, climbing.
- **Tiered contacts:** Tier 1 (inner circle, 14-day alert), Tier 2 (active network, 30-day), Tier 3 (extended, 60-day)
- **MC Porter:** Tool for managing many MCP servers without context window bloat (may become native to Claude Code)
- **Goal-aligned everything:** Goals.yaml filters all decisions — triage priority, meeting acceptance, task prioritization, scheduling
- **Flywheel effect:** Better communication → deeper relationships → better context → better work → compounds
- **Background preprocessing:** 500 jobs/day including inbox pre-drafting (every 30 min), contact enrichment (hourly), task execution (hourly)
- **Voice/tone accuracy:** System ingests enough context across channels to draft accurate emails — "no substitute for doing it yourself, until now"
- **CLAUDE.md sub-files:** Breaking operating instructions into multiple files for better organization at scale
