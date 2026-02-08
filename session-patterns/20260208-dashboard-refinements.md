---
date: 2026-02-08 11:07 AM EST
session-log: ../logs/20260208-dashboard-refinements.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/4ee17251-71e3-43f2-a39f-dfee9c564095.jsonl
---

# Session Patterns

## Observations

### UI Scaling: Flat Lists with Inline Metadata Don't Scale

The initial dashboard implementation used a flat task list grouped by priority tiers (Active, Inbox, Backlog) with individual project pills on each task. User feedback: "overwhelming" and "hard to scan."

The refinement replaced the flat list with per-project collapsible sections. Each project gets a header with chevron, name, and task count. Users expand the projects they care about and collapse the rest.

**Result:** Much more scannable. The grouping naturally organizes related items, and collapsibility gives users control over information density.

### Stats as Informational Noise

The dashboard initially showed stats (pending tasks, active projects, recent sessions) in a row at the top. User feedback: "informational noise... doesn't really do anything."

The stats were removed entirely. The task list and activity feed are actionable; counts are not.

**Pattern:** If information doesn't drive action, it's noise. Stats that duplicate visible information (e.g., "5 pending tasks" when the task list shows those 5 tasks) should be removed unless they provide distinct value (trends, comparisons, etc.).

## CLAUDE.md Suggestions

### For Global ~/.claude/CLAUDE.md

```suggestion:global
### UI Design: Grouping and Collapsibility Over Flat Lists

When displaying lists with multiple categories or sources (projects, priorities, tags, etc.):
- **Prefer hierarchical grouping with collapse/expand** over flat lists with inline metadata (pills, labels)
- Flat lists with inline metadata don't scale — they force users to scan every item to find what they want
- Collapsible sections let users control information density and focus on what matters
- Example: Instead of a flat task list with project pills on each item, use collapsible per-project sections

### UI Design: Stats Should Drive Action

When adding stats or metrics to dashboards:
- Ask: "What action does this stat drive?" If the answer is "none," it's informational noise
- Stats that duplicate visible information (e.g., count badges when items are listed below) should be removed
- Keep stats that provide distinct value: trends, comparisons, thresholds, alerts
- Example: Removed "5 pending tasks" stat when task list was visible — the list itself is actionable
```
