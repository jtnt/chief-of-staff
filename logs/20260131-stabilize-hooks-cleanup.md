---
date: 2026-01-31 06:29 PM EST
type: meta-work
title: Stabilize Hooks Cleanup
---

# Chief of Staff: Stabilize Hooks Cleanup

## What Was Done

1. **Investigated full state of SessionEnd debugging aftermath** — Mapped out what happened over the last 24 hours. The auto-capture failures were caused by a Claude Code bug, not the hook/script/settings. During debugging, SessionStart, SessionEnd, UserPromptSubmit hooks and all plugins were disabled as red herrings.

2. **Restored hooks to stable state:**
   - SessionStart (`cos-session-start.sh`) — restored. Provides COS_INBOX, BRIEFING_REQUIRED, PATTERNS_PENDING flags.
   - Morning greeting UserPromptSubmit — restored. Works correctly.
   - Removed broken git-haiku UserPromptSubmit hook — was using `$ARGUMENTS` (doesn't exist for hooks; they receive stdin). Model redirect via hooks isn't possible anyway.
   - SessionEnd — re-enabled at end of session for testing.

3. **Examined session-end script in detail** — The `.disabled` version had improved diagnostic logging (timestamps, claude path, cd results, exit codes) compared to the committed version. Confirmed the destructive `find -delete` was already removed.

4. **Committed and cleaned up `~/.claude` repo:**
   - Commit 1: Stabilize hooks, restore SessionStart/UserPromptSubmit, rename learnings→patterns throughout, add new skills (cpf-research, review-patterns, working), remove deprecated agents and commands.
   - Commit 2: Remove GSD framework (65 files, 17K lines — project-specific to chatbot-linebreaker), stale statuslines, archived scripts, Python bytecode. Added gitignore entries.
   - Repo went from 97 tracked files → 54.

5. **Gitignore hardened** — Added entries for `.credentials.json`, capture diagnostic logs, untracked sessions, backup files, `__pycache__/`.

## Key Decisions

- **Morning greeting only for UserPromptSubmit** — the git-haiku hook was fundamentally broken (wrong input method + impossible output). Dropped it rather than trying to fix something that can't work as designed.
- **Don't restore frontend-design plugin** — plugins will be added back individually as needed.
- **GSD stays on disk but untracked** — still available for chatbot-linebreaker project, just not cluttering the global repo.
- **Commands→skills migration is future meta-work** — 20 commands, 7 skills. Will tackle a few at a time.

## Reasoning

- **Why restore SessionStart but not SessionEnd initially:** SessionStart was disabled as a red herring and had nothing to do with the bug. It provides critical functionality (inbox detection, briefing flag, pattern detection). SessionEnd needed examination before re-enabling since it was the thing being investigated.
- **Why the session-end `.disabled` version is the right one:** It has diagnostic logging that the committed version lacked. When re-enabled, failures will leave evidence instead of disappearing silently.
- **Pattern to remember:** When debugging hooks, check `$ARGUMENTS` vs stdin. Claude Code hooks always receive data on stdin as JSON. Environment variables are not the input mechanism.

## Changes Made

**`~/.claude` repo (2 commits):**
- `settings.json` — SessionStart restored, morning greeting restored, git-haiku removed, SessionEnd empty→re-enabled, plugins all disabled
- `CLAUDE.md` — "Never Delete" principle added, working docs convention, learnings→patterns
- `hooks/session-end.sh` — renamed from .disabled back to active, has improved logging
- `hooks/cos-session-start.sh` — learnings→patterns rename
- `.gitignore` — credentials, capture logs, pycache, backup files
- Removed: 4 deprecated agents, 1 command, GSD framework (65 files), stale statuslines, archived script, bytecode
- Added: 3 new skills (cpf-research, review-patterns, working), discuss output style

## Open Items

- **SessionEnd hook testing** — re-enabled at end of this session. Need to verify the background `claude --print` actually completes successfully. Check `~/.claude/session-capture-*.log` after session ends.
- **Root cause of Jan 30 capture failures** — still unknown. The Claude Code bug may have been interfering with `claude --print` invocations too. With diagnostic logging now preserved, next failure should leave evidence.
- **Commands→skills migration** — future meta-work, a few at a time.
