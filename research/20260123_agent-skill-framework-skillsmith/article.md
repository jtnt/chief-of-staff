---
source: https://www.skillsmith.app/blog/agent-skill-framework
type: article
author: Ryan Smith
publication: Skillsmith Blog
date: 2026-01-23
captured: 2026-02-06
tags: [agent-architecture, skills, claude-code, context-engineering, AI-product-development]
---

# Composing Agents, Sub-Agents, Skills, and Sub-Skills: A Decision Framework for Product Builders

**Source:** https://www.skillsmith.app/blog/agent-skill-framework

**Ryan Smith, Skillsmith Blog — January 23, 2026**

---

## Core Framework

The article establishes a fundamental distinction: **"agents define behavior; skills define tools."** This separation enables composability and scalability in AI-assisted workflows.

### Key Definitions

| Component | Function | Contains |
|-----------|----------|----------|
| **Agent** | Behavioral definition | Decision rules, tone, constraints |
| **Skill** | Procedural knowledge | Tools, scripts, templates |
| **Sub-Agent** | Scoped execution | Isolated context, specific permissions |
| **Sub-Skill** | Modular capability | Variant behaviors within parent skill |

The analogy provided: hiring a React Developer (agent) equipped with Linear integration tools (skill).

---

## Central Problem: Context Window Economics

As Claude processes longer contexts, "attention degrades as context grows." The article cites research on the "lost in the middle" phenomenon — distributing attention across increasing tokens dilutes focus on relevant information.

**Key principle:** "Minimizing tokens while maximizing relevance produces the highest quality outputs."

This constraint drives architectural decisions around delegation, parallel execution, and progressive disclosure of skill information.

---

## Decision Framework

**Create an Agent when:**
- Defining personality or decision-making patterns
- Specifying constraints and domain expertise
- Establishing communication protocols

**Create a Skill when:**
- Packaging procedural workflows
- Bundling reusable scripts or templates
- Enabling automatic tool discovery

**Use Sub-Agents for:**
- Isolated context (parallel execution)
- Different permission scopes
- Cheaper/faster model delegation

**Use Sub-Skills for:**
- Decomposing large skill files (>500 lines recommended)
- Variant behaviors in specific contexts
- Modular composition

---

## Notable Patterns

### Daisy-Chain Pattern
Skill-initiated sub-agents maintain isolation by having parent skills spawn dedicated agents for specific operations (e.g., Linear updates). This prevents context pollution while enabling composition.

### Delegation Architecture
An orchestrator agent delegates to specialist sub-agents with only relevant context, avoiding massive context accumulation. Each specialist spawns supporting agents for specific tasks, then terminates.

### Git Worktrees
Parallel agents require isolated repository states. Worktrees provide each agent its own working directory while sharing repository history, preventing Git collisions.

### Progressive Disclosure
Skills implement tiered information loading:
1. Registry level (~50 tokens)
2. Header level (~500 tokens)
3. Execution level (5-15K tokens)

---

## Skill Lifecycle Management

The article emphasizes treating skills like long-term software artifacts with versioning, changelogs, and distribution strategies. A recommended structure includes:

- Core skill documentation (SKILL.md)
- Sub-files for specialized knowledge (API patterns, SDK usage)
- Deterministic scripts in separate directories
- Automation hooks for common tasks
- CHANGELOG tracking modifications with rationale

---

## Anti-Patterns to Avoid

1. **God Agent:** Massive single file with all behaviors
2. **Leaky Skill:** Skill including behavioral instructions
3. **Context Hoarder:** Sub-agents inheriting full parent context
4. **Undocumented Completion:** Sub-agents without clear done criteria
5. **Premature Decomposition:** Breaking things apart prematurely

---

## Practical Implementation Sequence

1. Start with one agent and one skill
2. Add Linear skill early for feedback loops
3. Introduce sub-agents when context overflows
4. Implement worktrees for parallel execution
5. Document everything in changelogs
6. Publish skills under MIT license

---

## Key Takeaway

Effective AI workflows scale through careful separation of concerns — behavior lives in agents, procedural knowledge lives in skills, and context management determines success. The framework treats skill accumulation as value-generating over time, similar to how experienced engineers maintain evolving script libraries.

---

**People/companies mentioned:**
- Anthropic (Claude, Claude Code)
- Linear (project management)
- Supabase
- Maven (educational platform)
- Git/GitHub
- npm
- Nelson F. Liu et al. (academic researchers — "lost in the middle" phenomenon)
- Nick Mitchinson (technical writer)

**Diagrams in article (not captured):**
- Agent vs Skill Matrix
- Context Window Economics chart
- Delegation Architecture diagram
- Decision Framework tree
- Progressive Disclosure levels
- Daisy Chain Sequence
- Git Worktrees diagram
- Claude-Flow Orchestration config
- Patterns vs Anti-Patterns comparison
- Skill Lifecycle evolution
