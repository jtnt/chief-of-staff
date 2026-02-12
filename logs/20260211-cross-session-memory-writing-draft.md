---
date: 2026-02-11 19:25 EST
title: Cross-Session Memory Writing Draft
type: project-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/6caaf372-d867-4275-bfe0-067a12bc553c.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Cross-Session Memory Writing Draft

## What Was Done

Captured and developed a writing draft about cross-session memory and AI tools, sparked by observations about Claude Code/Cowork feature convergence.

**Core insight:** Even with solid upfront context (like CPF provides), apps still need cross-session memory. The observation emerged from noticing Claude Cowork inheriting Claude Code features (CLAUDE.md) while Claude Code still lacks what Claude.ai has (conversation history).

**Key frameworks developed:**
- **Three layers of context:** Context profile (the resume) → Cross-session memory (raw conversations) → Context graph (structured decision traces)
- **The unnamed quality:** What exists between raw memory and structured graphs — "the difference between knowing what someone decided and knowing how they think." The lived context from being in the room.
- **Resume metaphor:** Context profiles are resumes; cross-session memory is having worked alongside someone for six months

**Supporting evidence added:**
- Screenshots of Felix announcing Cowork getting CLAUDE.md, with immediate replies asking about memory/persistence
- Stripe interview example (via LinkedIn) showing even engineers need the *why* behind decisions, not just the code

**File created:** [[writing/Drafts/20260211-thought-cross-session-memory-ai-apps.md]]

Initially captured to Check-Ins/thoughts/, then moved to Writing/Drafts/ per user direction.

## Key Decisions

**Route to Writing, not CPF.** While the insight has CPF positioning implications ("context profiles solve cold start, memory solves everything after"), user wanted it as writing material first.

**Retain the nuance on coding.** The Stripe example complicated the initial claim that "coding doesn't need long-range context" — engineers *do* value decision traces — but kept the tension rather than removing it. The degree of difference is real even if not binary.

## Reasoning

**Why the resume metaphor landed:** It captures the gap between static context (what's written down) and dynamic understanding (having been there). This is the quality that makes a chief of staff invaluable — not their notes, but their presence through everything.

**Pattern to remember:** When an insight starts as a ramble, look for the clean observation underneath. The core thought here was sharper than "everyone wants memory" — it was about the gap inversion (Claude Code gets Cowork features but still lacks cross-session context).

**URL fabrication caught:** I made up a Twitter URL (`https://x.com/felixrieseberg/status/2021631360440635443`) when I should have just referenced the screenshots. User caught it, I fixed it. This violates core principle: never make things up.

## Changes Made

**Verified against git:**

```bash
git status --short
git log --oneline --since="2 hours ago" --name-only
```

Files modified:
- **[[writing/Drafts/20260211-thought-cross-session-memory-ai-apps.md]]** — Created draft with three-layer framework, resume metaphor, and Stripe example
- **[[writing/project-knowledge.md]]** — Added task to inbox: "Cross-session memory piece - context profiles vs lived context"

Files examined (screenshots):
- Screenshot 2026-02-11 at 5.08.35 PM.png — Felix tweet about Cowork getting CLAUDE.md
- Screenshot 2026-02-11 at 4.54.12 PM.png — Reply asking about memory
- Screenshot 2026-02-11 at 4.53.55 PM.png — Reply asking about persistence

## Open Items

None identified. Draft is in Writing/Drafts/ and task is in Writing inbox for next steps.
