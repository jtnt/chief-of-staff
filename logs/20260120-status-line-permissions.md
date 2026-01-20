# Chief of Staff: Session Log

**Date:** 2026-01-20 12:19 PM EST
**Session Type:** meta-work

## What Was Done

1. **Investigated status line context percentage discrepancy** - User reported status line showing 79% while warnings said only 8% remaining. Discovered that `used_percentage` measures cumulative/historical token usage while context warnings measure current context window fullness. These are fundamentally different metrics.

2. **Attempted fixes for status line accuracy:**
   - First tried using `current_usage.input_tokens` - showed 0% because it only tracks last API call tokens
   - Tried `total_input_tokens / context_window_size` - started counting but only partial picture
   - Reverted to original `used_percentage` - accepted that perfect alignment with compaction warnings isn't achievable with available fields

3. **Fixed missing global permissions in settings.json** - Added permissions that /log and /save commands need:
   - `Bash(mkdir:*)`
   - `Bash(pwd)`
   - `Bash(date:*)`
   - `Bash(git diff:*)`
   - `Bash(git log:*)`
   - `Bash(~/.claude/scripts/sync-to-cos.sh:*)`

4. **Reviewed sync-to-cos.sh for safety** - Confirmed it's safe: just git checkout/add/commit/push operations scoped to Chief of Staff repo.

## Key Decisions

- **Accepted status line limitation:** The `used_percentage` field doesn't perfectly align with compaction warnings because they measure different things. No available field provides exact "distance to compaction" data.
- **Added permissions globally:** Rather than relying on `allowedTools` in command frontmatter (which wasn't working reliably), added common permissions to global settings.json.

## Changes Made

- `~/.claude/settings.json`: Reverted status line to original `used_percentage`, added 6 new global bash permissions

## Open Items

- Status line context % will continue to differ from compaction warnings - this is a Claude Code limitation, not something we can fix
