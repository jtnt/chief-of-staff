---
date: 2026-02-10 18:43 EST
session-log: ../logs/20260210-thought-link-skill-separation.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/f20768dc-c731-490b-a0f8-c1f779fa6b3d.jsonl
---

# Session Patterns

## Observations

**Skill routing ambiguity creates friction.** When two skills can handle the same input type (in this case, URLs), Claude has to guess which one to use based on context. This leads to wrong choices when the distinction is subtle.

The `/thought` skill included a full Link Capture Workflow that saved URLs to `Links/[Category]/`, while `/link` saved research-grade URLs to project `research/` folders with deeper analysis. The overlap wasn't obvious from skill descriptions alone.

**What worked:** Explicit redirects at the top of skill files. Adding "If the input contains a URL, stop and use `/link` instead" makes the boundary clear both for Claude routing and for future skill maintenance.

**Pattern emerging:** This is the second skill routing issue (first was `/log` and `/save` deprecation). When automation changes, old interfaces linger and create confusion. Skills need regular pruning to remove obsolete workflows.

## CLAUDE.md Suggestions

### For Project CLAUDE.md

```suggestion:project
## Skill Design Principles

When creating or modifying skills:
- **One skill per input type** - Avoid overlapping input handlers (e.g., don't have two skills that both process URLs)
- **Explicit redirects** - If a skill receives the wrong input type, add a redirect at the top: "If input is X, use [other-skill] instead"
- **Clear descriptions** - Skill descriptions should map directly to input types, not capabilities
- **Regular pruning** - When automation changes, remove deprecated workflows from skills rather than leaving them as fallback options
```

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Skills Hygiene

When you notice skill routing ambiguity (choosing wrong skill for user input):
1. Check if multiple skills handle the same input type
2. Identify which skill should own that input type
3. Strip the workflow from the other skill and add an explicit redirect
4. Update skill descriptions to match the new boundaries
5. Create a session pattern documenting the change

**Red flag:** If you're deciding between two skills based on "depth of analysis" or "project context" rather than input type, the boundary is too fuzzy.
```
