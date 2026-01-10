# Context Profile Framework: Project Intake

**Date:** January 9, 2026
**Source:** Initial review of project repository at `/Users/jtnt/Documents/Context Profile Framework`

---

## What This Project Is

The Context Profile Framework (CPF) is both a **framework** and a **service business** you're developing. It addresses a specific problem: organizations underutilize AI because they start every conversation from scratch, re-explaining who they are, what they do, and what matters.

**The Framework:** A four-layer system for organizing organizational knowledge so AI can use it effectively:
1. Company Layer - Business model, ICP, competitors, brand voice
2. Department Layer - Team-specific playbooks (sales, marketing, CS)
3. Project Layer - Initiative/client-specific context
4. Individual Layer - Role-specific knowledge

**The Service:** "Context Library Service" - a done-for-you offering that creates complete context libraries for B2B companies. $3,500-$5,000, delivered in ~1 week, 12-17 hours of work.

---

## Current State

- **Phase:** Early exploration / Manual MVP
- **Validation:** A CEO and Head of Product saw immediate value and planned "one document per week" - validates both the appeal and the creation friction problem
- **Research prompts:** Company Context (v4) and Industry Context (v2) working well; still need Competitor Intelligence, Brand Voice, ICP Definition
- **Testing:** Using SalesIntel as testbed for prompt development
- **No direct competitors** identified for the done-for-you service

---

## Key Strategic Insights

1. **Creation friction is the primary barrier.** You can't have maintenance problems if documents never get created. The framework teaches *what* to build; the service actually builds it.

2. **Transformation over templates.** Templates are commodity. The value is converting raw content (transcripts, calls, docs) into structured knowledge nodes. Empty templates stay empty.

3. **Relationship mapping failed.** A meta-document explaining which documents inform which tasks added a processing step without adding information density. Better approach: inline cross-references + well-titled self-contained documents.

4. **Structure predictability > content depth.** Claude Opus produces best substantive content, but structure discipline (explicit constraints, section budgets) matters more than optimizing for depth.

5. **Google Drive is the delivery mechanism.** Two-way sync with Claude Projects is a major architectural advantage ChatGPT doesn't have.

---

## Connection to Razzo

Same ICP (VP Sales, Marketing Directors, CEOs at B2B companies 25-250 employees, $5M-$25M revenue). The Context Library Service complements Razzo training:
- Training teaches how to use AI systematically
- Context Library solves the creation friction that prevents teams from applying what they learn
- Natural bundling opportunity

---

## Bigger Picture: Context Infrastructure

CPF is the organizing structure for a broader concept called "Context Infrastructure" - the layer that sits between scattered organizational data and AI tools.

Four layers in the full vision:
1. Knowledge Layer - Raw facts, information
2. Ontological Layer - Relationships, connections (WikiLinks, graph)
3. Reasoning Layer - The "why" behind connections
4. Precedent Layer - Decision traces, what happened

Current implementation (Google Drive + Claude Projects) is simple/manual. Same framework could evolve to MCP servers, APIs, knowledge graphs.

---

## Open Questions

**Framework:**
- How does CPF fit as implementation sophistication increases?
- Is it Knowledge Layer structure, or does it transcend layers?

**Business:**
- Does service lead to productization, or parallel tracks?
- Right balance between done-for-you and self-serve?
- How does this complement vs. compete with Razzo training?

**Tactical (before launch):**
- Final service naming
- Interview structure for content extraction
- Questionnaire design for async input

---

## Reference

- Full project: `/Users/jtnt/Documents/Context Profile Framework`
- Strategic knowledge: `project-knowledge.md` in that repo
- Business details: `Business/business-knowledge.md`
