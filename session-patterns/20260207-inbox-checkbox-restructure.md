---
date: 2026-02-07 07:19 PM EST
session-log: ../logs/20260207-inbox-checkbox-restructure.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/6e53e834-973c-4bb7-bf89-08212143f4d6.jsonl
---

# Session Patterns

## Observations

**Format migration workflow worked well:**
The six-step implementation order (content → hooks → briefing → producers → external → docs) ensured each layer could be tested before dependent layers relied on it. Migrating the content first let me immediately test the hook parsing changes with real data.

**Bug discovered through testing:**
Running the updated `cos-session-start.sh` against the new format revealed a latent bug: `grep -c` returns exit code 1 when count is 0, which triggered the `|| echo 0` fallback and produced `0\n0` output. This bug existed in the original code but was masked by always having inbox items. The fix (`${var:-0}` instead of `|| echo 0`) is more robust.

**Backup-before-edit saved rollback path:**
Creating `.bak` files before editing system files (hooks, skills, CLAUDE.md) provided a clear rollback path if something broke. Since hooks run automatically, a broken hook could be disruptive.

## CLAUDE.md Suggestions

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Format Migration Pattern

When changing data formats that affect both producers (writers) and consumers (readers):

1. **Migrate content first** — Convert the data file to the new format
2. **Update consumers next** — Fix parsers/readers to handle new format, test with migrated content
3. **Update producers last** — Change writers to output new format
4. **Test each layer** — Don't proceed to next step until current layer works

This order ensures you can test each layer with real data before dependent layers rely on it.

**Common pitfall:** Updating producers before consumers means new items will be written in a format the system can't read yet.
```

### For Project CLAUDE.md

None — this pattern is general workflow guidance, not specific to Chief of Staff.
