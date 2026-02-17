---
type: research-analysis
source: https://www.skillsmith.app/blog/agent-skill-framework
source_file: article.md
analyzed: 2026-02-06 06:18 PM EST
---

# Analysis: Composing Agents, Sub-Agents, Skills, and Sub-Skills

**Source:** https://www.skillsmith.app/blog/agent-skill-framework

## Key Thesis

Effective AI agent systems scale through strict separation of concerns: agents define behavior (personality, constraints, decision rules), skills define procedural knowledge (tools, scripts, templates). Context window economics — not compute — is the binding constraint that drives architectural decisions about delegation, parallelism, and information loading.

## What's New or Notable

The framing of **context window management as an economics problem** is the strongest contribution. The "progressive disclosure" pattern (registry ~50 tokens → header ~500 → execution 5-15K) provides a concrete model for how skills should load information — and this maps directly to how Claude Code's skill system already works (description field → SKILL.md loading on invocation). The article makes the implicit explicit.

The **anti-patterns list** is practical and immediately applicable — especially "God Agent" (single massive instruction file), "Leaky Skill" (mixing behavioral and procedural instructions), and "Premature Decomposition" (splitting things before complexity warrants it).

The **daisy-chain pattern** (skill spawns sub-agent for isolated work) is a useful mental model for understanding the SessionEnd auto-capture pipeline: hook triggers → skill loads → background agent executes → terminates.

## Connections to Existing Research

This is the first research item in CoS's Research folder, so no direct connections to prior captured research. However, it connects strongly to the system architecture documented in project-knowledge.md:

- The **commands → skills migration** (2026-01-31) was driven by the same "skills are procedural, agents are behavioral" instinct this article formalizes
- The **auto-capture system** is a textbook daisy-chain pattern
- The **three-tier inbox** (pending → backlog → archive) reflects the progressive disclosure principle applied to task management rather than context loading

## Relevance to Project

High relevance to CoS system architecture. Specific applications:

1. **Global CLAUDE.md as potential "God Agent"** — the article's anti-pattern #1 directly flags the risk of a growing CLAUDE.md that tries to do everything. Worth evaluating whether behavioral instructions (how to communicate, what tone to use) should be separated from procedural knowledge (how to capture sessions, how to route check-ins).

2. **Skill decomposition guidance** — the >500 line threshold for considering sub-skills is a useful benchmark. The `/link` skill is already well over 200 lines; `/session-capture` is substantial too. Not urgent, but worth monitoring.

3. **Context Hoarder anti-pattern** — relevant to how Task agents receive context. Currently some agents get "access to current context" (full conversation history) when they may only need a focused subset.

4. **Skill lifecycle management** — the suggestion to version skills with changelogs is worth considering as the skill library grows. Currently skills are iterated in-place without version tracking.

## Key Concepts

- **"Agents define behavior; skills define tools"** — the fundamental separation principle
- **Context window economics** — attention degrades as context grows; minimize tokens, maximize relevance
- **Progressive disclosure** — three tiers of skill information loading (50 → 500 → 5-15K tokens)
- **Daisy-chain pattern** — skill spawns sub-agent for isolated execution, preventing context pollution
- **Five anti-patterns** — God Agent, Leaky Skill, Context Hoarder, Undocumented Completion, Premature Decomposition
- **Skill lifecycle** — treat skills as versioned software artifacts with changelogs and distribution
- **Git worktrees** — parallel agent execution requires isolated working directories
- **"Start with one agent and one skill"** — resist premature complexity; decompose when context overflows
