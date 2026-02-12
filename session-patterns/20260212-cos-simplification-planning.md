---
date: 2026-02-12 18:31 EST
session-log: ../logs/20260212-cos-simplification-planning.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/77282756-563f-44b8-93f2-05b2927509a6.jsonl
---

# Session Patterns

## Observations

**System design following capability vs. usage:** The CoS system had grown to document "what's possible" rather than "what's used." Skills were kept because they seemed useful, not because they were being used. This created a maintenance burden, documentation bloat, and points of failure.

**Cosmetic vs. structural simplification:** Initial attempts to simplify focused on removing a few skills and trimming documentation. User pushed back: "You kept all the machinery." The real simplification required removing entire subsystems (briefing, check-in routing, task states) rather than just reducing their documentation.

**Friction from good intentions:** The 4-subsection task system (Inbox/Active/Backlog/Done) was designed to help with prioritization and triage. In practice, it created overhead without value because the user didn't naturally think in those states. The simpler system (plain checkboxes) matches actual workflow better.

**Documentation as debt:** Every unused feature requires documentation in CLAUDE.md, cross-references in multiple files, and mental overhead when reading instructions. The ~60 lines of documentation being removed represent accumulated debt from features that stopped providing value.

## CLAUDE.md Suggestions

### For Project CLAUDE.md

```suggestion:project
## System Design Principles

**Document usage, not capabilities.** CLAUDE.md should describe what you DO with the system, not what's theoretically possible. When features go unused for months, delete them rather than maintain documentation for "just in case."

**Measure feature value by actual usage.** The complexity cost of maintaining, documenting, and working around unused features exceeds any theoretical future value. Delete ruthlessly.

**Match system to workflow, not vice versa.** Don't design systems that require specific behaviors (like triaging tasks into Inbox/Active/Backlog). Design systems that support how work actually happens.
```

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## System Simplification

When a system feels "too complicated":
1. Audit actual usage — what gets used, what sits dormant
2. Delete unused features entirely, don't just reduce documentation
3. Look for structural complexity (subsystems, states, routing logic), not just surface complexity
4. Update documentation to describe actual usage, not theoretical capabilities

Remember: It's easier to rebuild a feature you need than to maintain features you don't use.
```
