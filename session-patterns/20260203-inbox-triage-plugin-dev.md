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

## CLAUDE.md Suggestions

### For Project CLAUDE.md

```suggestion:project
## Plugin Development Patterns

### Skill Descriptions
- Keep skill descriptions focused on what the skill DOES, not when to use it
- Routing phrases belong naturally in the description, not wrapped in "This skill should be used when..."
- Avoid "This skill should be used when the user asks to..." patterns that waste context tokens

### Tool Design Philosophy
- **Analyst over Sorter:** Tools should analyze and act, then report what they did, rather than categorize and ask permission
- **Act First for Obvious Actions:** Auto-handle low-risk reversible actions (labeling, archiving) rather than asking permission
- **Memory Enables Intelligence:** Use state files (`.claude/plugin-name-state.json`) to prevent re-surfacing handled items
- **Parallel by Default:** Explicitly instruct skills to use parallel tool calls where possible

### State Persistence Pattern
For plugins that need memory across sessions:
- Use `.claude/plugin-name-state.json` to track processed items
- Load state at start, filter out already-handled items
- Save state after processing
- Make all auto-actions reversible
```

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Plugin Development Best Practices

### Efficient Skill Descriptions
**Pattern to avoid:** "This skill should be used when the user asks to [trigger phrases]..."
**Better pattern:** "Analyzes inbox and provides narrative briefing. Responds to 'triage my inbox', 'check my email'..."

Keep routing metadata in YAML frontmatter `description` field, not skill content. Skill content should focus on what the tool does and how it works.

### Tool Intelligence Patterns
- **Analyst vs Sorter:** Design tools that analyze and act autonomously, then report results, rather than categorize and request decisions
- **Memory via State Files:** Use `.claude/plugin-name-state.json` pattern for tools that need to remember previous actions
- **Parallel Tool Calls:** Explicitly instruct skills to batch tool calls: "Make all read_email calls in a single response"

### Auto-Action Guidelines
Auto-handle actions that are:
- Low risk (labeling, archiving - not deleting)
- Reversible (can be undone if wrong)
- Obvious (newsletters clearly need labeling)

Then report what was done rather than asking permission first.
```