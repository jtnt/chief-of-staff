---
date: 2026-02-10 22:16 EST
session-log: ../logs/20260210-cross-project-log-search-fix.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/d79f08e8-13bc-4462-9b97-264d885732ab.jsonl
---

# Session Patterns

## Observations

**What went wrong:**
User asked "what did you work on today?" and Claude initially searched only Chief of Staff logs, missing 6 proposal logs in the Clients folder. Required explicit correction and re-search to find the actual work.

**Root cause:**
Global CLAUDE.md instruction said "check project logs" when user references past work, but didn't specify that "project logs" means ALL projects across the entire Projects/ directory, not just the current working directory.

**Why it matters:**
This is a fundamental Chief of Staff capability - synthesizing work across all projects. Missing work from entire project folders defeats the purpose of the system.

**What worked well:**
Once corrected, the glob pattern `**/logs/YYYYMMDD-*.md` found all logs in a single search operation. This is more resilient than iterating through project-sources.md because it catches untracked folders.

## CLAUDE.md Suggestions

### For Global ~/.claude/CLAUDE.md

```suggestion:global
Update the "Cross-Session Memory" section to be more explicit about cross-project search scope:

**Cross-Project Work Discovery:** When asked about work done on a specific date ("what did you work on today?", "look at today's logs"), search for session logs across ALL tracked projects from `project-sources.md`, not just the current project. Use glob pattern: `**/logs/YYYYMMDD-*.md` to search all projects simultaneously. Do not assume work is documented only in the current project folder.
```

### For Project CLAUDE.md

No project-specific changes needed - this is a global Chief of Staff behavior.
