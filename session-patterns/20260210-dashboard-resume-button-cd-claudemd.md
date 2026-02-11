---
date: 2026-02-10 17:59 PST
session-log: ../logs/20260210-dashboard-resume-button-cd-claudemd.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/bd24ab3f-1520-4cd3-aa32-aba11e6c360d.jsonl
---

# Session Patterns

## Observations

**CLAUDE.md bloat is real.** User asked to create a CLAUDE.md for the dashboard, Claude wrote a comprehensive architectural overview, user pushed back hard with "only put information in that file that is useful for future sessions to make work faster, easier, to reduce having to look up things or to put additional things in context."

After Claude looked up Anthropic's guidance, user clarified the filter: **"For each line, ask: Would removing this cause Claude to make mistakes? If not, cut it."**

Most of what was documented (file structure, section banners, I/O patterns, relPath conventions) is visible by just reading the code. The final CLAUDE.md kept only:
- Non-obvious lifecycle hooks (`onConnected`, `onCheckboxToggled`) required for new pages
- The `alert()` gotcha that would break Claude-in-Chrome interaction

Everything else was cut as noise.

**What worked well:** User's insistence on the "would this cause mistakes?" filter prevented documentation bloat. The aggressive trimming keeps CLAUDE.md files focused on gotchas, not architecture descriptions.

## CLAUDE.md Suggestions

### For Global ~/.claude/CLAUDE.md

```suggestion:global
### CLAUDE.md Content Guidelines

**Apply the "mistake prevention" filter:** For each line in a CLAUDE.md file, ask "Would removing this cause Claude to make mistakes in future sessions?" If not, cut it.

**What belongs in CLAUDE.md:**
- Non-obvious gotchas that would waste debugging time (e.g., "don't use alert() - breaks Claude-in-Chrome")
- Required but hidden contracts (e.g., lifecycle hooks, non-standard callbacks)
- Project-specific conventions that violate common defaults
- Things you can't figure out by reading the code

**What doesn't belong:**
- Architectural descriptions (read the code)
- File structure overviews (use ls/grep)
- Section location maps with line numbers (they drift immediately)
- Patterns and conventions visible in the code
- Anything Claude can discover in 30 seconds of reading

**Goal:** CLAUDE.md should be the smallest file that prevents the most mistakes. If it's getting long, it's probably documenting too much.
```
