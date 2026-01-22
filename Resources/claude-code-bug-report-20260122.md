# Claude Code Bug Report - Activity Indicator Hang

**Submit to:** https://github.com/anthropics/claude-code/issues/new

---

**Title:** Session hangs after completing response - activity indicator keeps running, 0 tokens, messages queue

## Description

After Claude completes a response (including asking a question or showing a summary), the session doesn't properly return to ready state. The activity indicator line (the one that normally shows a rotating funny word, elapsed time, and tokens used while Claude is working) remains visible but stuck:
- Random word frozen (not rotating)
- Timer continuing to count up
- Token counter stuck at 0
- Any user input gets queued instead of processed

Pressing Escape clears the hung state, then pressing Enter processes the queued messages.

## Environment
- Claude Code version: 2.1.15
- macOS: 26.2 (Build 25C56)
- Model: claude-opus-4-5-20251101

## Steps to reproduce
- Occurs after completing tool-heavy operations (multiple Read/Write/Edit/Bash/TodoWrite calls)
- Claude's text response appears complete in the chat
- But the activity indicator remains as if Claude is still working
- Happened 3+ times in a single session

## Expected behavior
After Claude's response is complete, activity indicator should disappear and session should accept new input immediately.

## Actual behavior
1. Claude completes response (text visible, may include question)
2. Activity indicator still showing: frozen word + timer counting + "0 tokens"
3. User types message → message is queued, not sent
4. User presses Escape → clears hung state
5. User presses Enter → queued message finally sends

## Hypothesis
Something isn't properly signaling completion after tool use, leaving the client in a "waiting for more output" state.
