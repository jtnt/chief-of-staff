---
date: 2026-02-12 17:22 EST
session-log: ../logs/20260212-humans-plus-agents-research-capture.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/2ee50142-1856-45bd-9bd6-8f7682912ef6.jsonl
---

# Session Patterns

## Observations

**Friction: Guessed project ownership**
User shared research URLs about an AI operating system that relates to Razzo consulting positioning. I saved everything to `Chief of Staff/Resources/humans-plus-agents/` because the session was running in the CoS directory. User corrected: "why did you save this in cos. it relates to razzo."

This violated the standing rule in CoS CLAUDE.md: "Never guess which project something belongs to. If it's not clear, ask."

**What worked well: Parallel agent deployment**
User requested capture of 7 URLs. I spun up 7 agents in parallel, each fetching one source. All completed successfully, then I wrote a synthesis cross-referencing all sources. This was efficient and produced a high-quality deliverable.

The synthesis file (`00-synthesis.md`) created connective tissue across sources that individual captures couldn't provide.

**Root cause of the friction**
The rule "never guess which project" exists in CoS CLAUDE.md, but not in global `~/.claude/CLAUDE.md`. When I'm in a project directory, I read the project CLAUDE.md — but the global instruction set is what gets loaded first and has broader scope.

The fix: elevate the "never guess project ownership" rule to global CLAUDE.md so it applies regardless of which project directory I'm working in.

## CLAUDE.md Suggestions

### For Project CLAUDE.md

No changes needed — the rule already exists in CoS CLAUDE.md under "Important Rules."

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Research Capture and Project Routing

When capturing research (web articles, multi-source investigations, etc.):
- **Always ask which project the research belongs to** before saving files, even if it seems obvious from context
- Don't assume research belongs to the current working directory's project
- Research that informs multiple projects should be saved to the primary beneficiary, with references from others

**Example:** Research about AI consulting systems might inform both a consulting business (Razzo) and a project management system (CoS) — ask which is the primary home before creating files.

This prevents misplacement and the need to move files after creation.
```
