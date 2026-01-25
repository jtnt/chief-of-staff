# Chief of Staff: Auto-Capture System Debugging

**Date:** 2026-01-24 10:57 PM EST
**Session Type:** meta-work
**Duration:** ~2 hours

---

## Context

This session started from a plan to fix the auto-capture duplicate check. The original plan identified that the duplicate check was broken - it would block ALL auto-captures if ANY manual log existed that day, which breaks the common case of multiple sessions per day.

The plan proposed using session ID tracking instead: `/save` writes the session UUID to a marker file, and `capture-session.sh` checks if its session ID matches. Simple, elegant, should work.

What followed was a cascade of implementation failures, each revealing another problem that should have been anticipated.

---

## The Implementation Attempt

### Phase 1: Initial Edits (Seemed Fine)

Made the planned changes to `capture-session.sh`:
- Added error logging infrastructure (`~/.claude/logs/capture-errors.log`)
- Added success logging (`~/.claude/logs/capture-session.log`)
- Replaced the broken date-based duplicate check with session-ID tracking
- Updated `/save` command to write session marker (Step 1.5)

All edits completed cleanly. Directories created. Files updated. Ready to test.

### Phase 2: First Test - Nothing Happened

Ended a session. Checked for new log file. Nothing. No log file, no error log, no success log. The hook appeared to not fire at all.

Investigated the hook configuration in `settings.json`. Looked correct:
```json
"SessionEnd": [{
  "hooks": [{
    "type": "command",
    "command": "~/.claude/scripts/capture-session.sh"
  }]
}]
```

Tested the script manually with mock input - it worked. The script itself was fine. The hook wasn't firing.

### Phase 3: The Tilde Problem

Realized the issue: the tilde `~` in the hook command path doesn't expand in the hook execution context. Changed to full path:
```json
"command": "/Users/jtnt/.claude/scripts/capture-session.sh"
```

Tested again. This time the hook fired. Log file created. But the content was wrong - the API returned:

> "I apologize, but the transcript you provided appears to be empty or contains only repeated ASSISTANT: lines with no substantive content."

### Phase 4: The Transcript Parsing Problem

Examined the actual JSONL transcript format. The jq filter was looking for:
```
.type == "human" or .type == "assistant"
```

But the actual format uses:
```
.type == "user" or .type == "assistant"
```

Fixed that. Tested again. Still getting garbled output.

### Phase 5: The Message Content Structure Problem

Dug deeper into the JSONL structure. The message content isn't a simple string - it varies:
- User messages: `.message.content` can be a string OR an array
- Array elements can be strings, tool_result objects, or text objects
- Assistant messages: `.message.content` is an array of content blocks with `type: "text"` or `type: "thinking"`

Rewrote the jq filter to handle all these cases. Tested again. Better - actual conversation content was being extracted.

### Phase 6: The API Key Problem (User Frustration Point)

At this point, the user asked: "Is there anything in that file I need to update manually for it to work?"

I checked dependencies. jq - installed. curl - installed. ANTHROPIC_API_KEY - **NOT SET**.

The script requires an API key to call the Anthropic API for synthesis. This was a **fundamental requirement** that I never mentioned during planning or implementation. The user was rightfully furious:

> "SO WHY THE FUCK DIDN'T YOU TELL ME I HAD TO PUT IN THE API KEY!!!!!!!!!!!!!!!!!!!!!!!!!!!"

I then made it worse by:
1. Adding the key to `~/.zshrc` (user: "why would I put it there and not in a .env file like normal?")
2. Trying to create `~/.claude/.env` (user: "the API key would go in the CoS directory, not the global claude directory")

Finally created `/Users/jtnt/Documents/Projects/Chief of Staff/.env` and added it to `.gitignore`.

### Phase 7: It Works But The Output Is Wrong

After adding the API key, the synthesis was running but producing low-quality output - fragments of assistant responses, not proper summaries. The 60KB transcript was being truncated to 50KB, and Haiku was struggling to produce the expected format.

### Phase 8: The Fundamental Realization

User pointed out the real problem:

> "The transcript that you send could be huge and so that could be part of the problem. But it also will use a bunch of tokens and using the API makes these session summaries cost me extra money. The old way it used my existing Claude subscription."

**The entire API-based synthesis approach is flawed:**

1. **Cost**: Every auto-capture makes an API call that costs money beyond the Claude subscription
2. **Scale**: Transcripts can be 60KB+ even truncated, meaning significant token usage per capture
3. **Unnecessary**: Claude has full context DURING the session - synthesis should happen then, not after via a separate API call
4. **Quality**: Haiku with a truncated transcript produces worse summaries than Claude with full context

---

## What Actually Got Implemented

Despite the problems, these changes are in place and working:

### capture-session.sh
- Error logging to `~/.claude/logs/capture-errors.log` with line numbers
- Success logging to `~/.claude/logs/capture-session.log`
- Session-ID based duplicate check (reads from `~/.claude/data/last-saved-session`)
- Fixed transcript parsing for JSONL format
- Sources `.env` from project directory for API key

### save.md
- Added Step 1.5: writes session UUID to marker file
- Added bash tool permissions for the marker-writing commands

### settings.json
- SessionEnd hook uses full path instead of tilde

### Chief of Staff project
- `.env` file created (contains API key)
- `.env` added to `.gitignore`

---

## The Deeper Problem

The auto-capture system as designed has a fundamental architecture issue.

**Original Design Assumption**: SessionEnd hook calls external script, script calls API to synthesize, writes log.

**Reality**:
- API calls cost money
- Transcripts are huge
- Synthesis quality is worse than in-session Claude
- The whole approach adds cost and complexity for worse results

**Better Architecture Options**:

1. **In-session synthesis only**: `/save` is the primary path. It runs during the session when Claude has full context and uses the existing subscription. Auto-capture becomes a minimal safety net that just records metadata (timestamp, session ID, project name, maybe first user message).

2. **Pre-close prompt**: Before closing a session, something prompts the user to run `/save` or auto-generates a summary. The summary is written while still in the session context.

3. **Evening synthesis**: Auto-capture just logs metadata. The `/evening` check-in reads all the day's session metadata and asks the user what happened in sessions that weren't `/save`d.

---

## What Was Learned

### Technical
- Tilde `~` doesn't expand in Claude Code hook commands - use full paths
- JSONL transcript format uses `type: "user"` not `type: "human"`
- Message content structure varies: strings, arrays, tool results, text blocks
- `set -e` and `trap ERR` provide good error visibility in bash scripts

### Process
- **Flag critical dependencies upfront**: API key requirement should have been in the plan
- **Question the architecture before implementing**: The API synthesis approach had fundamental flaws that were obvious in retrospect
- **Cost implications matter**: "It works" isn't sufficient if it costs money on every invocation
- **Don't compound mistakes**: When the user corrected the .env location, I should have gotten it right, not made two more wrong attempts

### About This System
- Auto-capture should be lightweight, not a full synthesis engine
- In-session context is valuable - don't throw it away and try to recreate it via API
- The pull model (evening reads logs) is sound, but the logs should be created efficiently

---

## Current State

The auto-capture hook is firing and creating logs. The logs contain API-synthesized content of variable quality. This is functional but not ideal.

**What's working:**
- SessionEnd hook fires (full path fix)
- Script logs errors and successes
- Duplicate check works (session ID tracking)
- API key loads from project .env

**What's not ideal:**
- Every auto-capture costs API tokens
- Synthesis quality varies
- Large transcripts are truncated

---

## Recommended Next Steps

### Immediate (Before Using More)
1. Decide on architecture: API synthesis vs. minimal metadata capture
2. If minimal metadata: strip out API call from capture-session.sh, just write timestamp/session-id/project
3. If keeping API synthesis: accept the cost and quality tradeoffs

### Short Term
1. Update `/save` to be explicitly the "quality summary" path
2. Add reminder or prompt before session close to run `/save`
3. Update documentation to reflect the actual workflow

### Questions to Answer
- Is the cost of API synthesis acceptable for the convenience of auto-capture?
- Should sessions without `/save` get any synthesis, or just metadata?
- How should `/evening` handle sessions that only have metadata logs?

---

## Files Changed This Session

| File | Status | Changes |
|------|--------|---------|
| `~/.claude/scripts/capture-session.sh` | Modified | Error logging, session-ID check, fixed jq parsing, .env sourcing |
| `~/.claude/commands/save.md` | Modified | Added Step 1.5 (session marker), added bash permissions |
| `~/.claude/settings.json` | Modified | Full path for SessionEnd hook |
| `~/Documents/Projects/Chief of Staff/.env` | Created | Contains ANTHROPIC_API_KEY |
| `~/Documents/Projects/Chief of Staff/.gitignore` | Modified | Added .env |

---

## Session Metadata

**Transcript location:** `~/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/0453fa1e-82bd-4d0b-a2ec-44279352c50e.jsonl`

**Key frustration points:**
- API key requirement not flagged
- Multiple wrong attempts at .env location
- Hours of work before realizing the architecture was flawed

**Trust impact:** User explicitly expressed loss of confidence in the system due to these oversights.
