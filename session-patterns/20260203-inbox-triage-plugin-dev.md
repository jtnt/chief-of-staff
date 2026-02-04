---
date: 2026-02-03 12:25 PM PST
session-log: ../logs/20260203-inbox-triage-plugin-dev.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/35778f32-ab85-440f-be78-db5251cf4015.jsonl
---

# Session Patterns

## Observations

**Plugin skill description waste:** Multiple plugins had skill descriptions starting with "This skill should be used when the user asks to..." which wastes context tokens on routing metadata that belongs in YAML frontmatter description fields, not skill content. This pattern appeared across plugin-dev (7 skills), hookify (2 copies), and compound-engineering plugins.

**Analyst vs Sorter paradigm:** The user's feedback revealed a key insight about automation tools - they should be analysts that act first and report after, not sorters that categorize and ask permission. "Here's what you need to know and I've handled the rest" is more valuable than "here are your emails in buckets, what would you like me to do?"

**Memory enables intelligence:** Stateless tools that re-surface already-handled items become annoying rather than helpful. The state file pattern (`.claude/plugin-name-state.json`) is crucial for creating tools that get smarter over time.

**Background tasks misconception:** The request for "background tasks" was actually about parallel tool calls, which Claude Code already supports. The issue was lack of explicit parallelism instructions in skill content, not technical limitations.
