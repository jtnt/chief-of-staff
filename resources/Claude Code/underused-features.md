# Claude Code Features to Explore

*Created: 2026-01-21*

Based on analysis of current setup vs available capabilities.

## High Priority

### Extended Thinking
Toggle with `Option+T` (Mac) for deeper analysis on strategic work. Useful for cross-project pattern analysis, complex decisions.

### Plan Mode
Safe exploration without modifications:
```bash
claude --permission-mode plan
# Or toggle mid-session: Shift+Tab
```
Use for: `/review-checkins`, cross-project analysis, strategic planning.

### Session Naming
```bash
/rename cos-morning-checkin-0121
claude --resume cos-morning-checkin-0121
/resume  # Interactive picker with P=preview, B=branch filter
```

## Hooks to Implement

### SessionStart (auto-sync)
Already described in CLAUDE.md but not implemented:
```json
"SessionStart": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "if [ \"$PWD\" = \"/Users/jtnt/Documents/Projects/Chief of Staff\" ]; then echo '{\"additionalContext\": \"AUTORUN_SYNC_ALL\"}'; fi"
      }
    ]
  }
]
```

### PreCompact (session recovery)
Save state before context compression:
```json
"PreCompact": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "echo '{\"additionalContext\": \"Context compacting soon. Check session-context.md for recovery.\"}'"
      }
    ]
  }
]
```

### Notification (long operations)
```json
"Notification": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "osascript -e 'display notification \"Claude needs input\" with title \"Claude Code\"'"
      }
    ]
  }
]
```

## Custom Agents to Create

### research-agent.md
```markdown
---
name: research-agent
description: Deep research on topics. Use for analysis that needs context isolation.
model: sonnet
permissionMode: plan
tools: Read, Grep, Glob, WebSearch, WebFetch
---

Research specialist. When given a topic:
1. Search across available sources
2. Extract key insights with citations
3. Identify patterns and contradictions
4. Return structured findings
```

### checkin-analyzer.md
```markdown
---
name: checkin-analyzer
description: Analyze check-in patterns. Use with /review-checkins.
model: haiku
permissionMode: plan
tools: Read, Grep, Glob
---

Analyze check-ins in Check-Ins/ folder for:
- Recurring themes and blockers
- Energy patterns (morning vs evening sentiment)
- Project focus distribution
- Emerging priorities
```

## Path-Specific Rules

Create `~/.claude/rules/` directory with:

### check-ins.md
```markdown
---
paths:
  - "Check-Ins/**/*"
---
Always capture timestamp, use descriptive filenames, detect project mentions.
```

### writing.md
```markdown
---
paths:
  - "**/*.md"
  - "Writing/**/*"
---
Consult ~/Documents/Projects/Writing/Standards/ before content creation.
```

## Other Useful Commands

- `/context` - See what's consuming context space
- `Ctrl+B` - Background a running task
- `/tasks` - List background tasks
