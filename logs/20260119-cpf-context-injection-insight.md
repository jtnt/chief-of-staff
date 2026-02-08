---
title: Session Log: CPF Context Injection Insight
---

# Chief of Staff: Session Log: CPF Context Injection Insight

**Date:** 2026-01-19
**Session Type:** Mixed (research input + meta-work)
**Project:** Chief of Staff + Context Profile Framework

---

## What Happened

User shared a LinkedIn post about CARL (Context Augmentation Reinforcement Layer) - a system for dynamically injecting context rules based on keywords/intent rather than dumping everything into every conversation.

### Initial Misread

I initially interpreted this as adjacent/competitive to CPF. User corrected: this **augments** CPF, not competes with it.

### The Insight

CPF has focused on **creation friction** as the primary barrier. But there's a second friction that matters at scale: **retrieval friction**.

Once you have a rich four-layer context library, how does anyone (human or AI) know what to pull for a given task? Dynamic context injection solves this automatically - users describe what they're doing, the system surfaces what they need.

**The three frictions (corrected):**
1. Creation friction - building the initial knowledge base
2. Maintenance burden - keeping knowledge current
3. Access/retrieval - getting the right context to the AI for a given task

Key correction from user: "access" is about getting context to the **AI**, not to people.

### Meta-Work

Also reorganized global `~/.claude/CLAUDE.md`:
- Added "Discovery ≠ Direction" principle (ideas are inputs, not decisions)
- Grouped sections logically with separators
- Added git `-C` flag guidance (don't cd into other repos)

The "Discovery ≠ Direction" addition came from user calling out that I keep saying "noted" without actually persisting things.

---

## Decisions Made

1. **Discovery ≠ Direction** added to global CLAUDE.md - when user shares ideas, treat as input to explore, not direction to execute
2. Created working note in CPF: [[Working/dynamic-context-injection.md]]

---

## Files Changed

**Chief of Staff:**
- [[logs/20260119-cpf-context-injection-insight.md]] (this file)

**Global (~/.claude/):**
- `CLAUDE.md` - reorganized, added Discovery ≠ Direction, added git -C guidance

**Context Profile Framework:**
- [[Working/dynamic-context-injection.md]] - new working note on dynamic context injection as access layer

---

## Open Items

- The three frictions (creation, maintenance, access/retrieval) are now clearer - but solutions for each aren't decided
- Dynamic context injection is one possible approach to retrieval friction, not THE approach
- CPF project has uncommitted changes that should be committed separately
