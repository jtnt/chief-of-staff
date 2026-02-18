---
date: 2026-02-18 10:11 EST
title: Claude.md Engineering Post + Handoff Hook
type: mixed
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief-of-staff/bd5a62ec-6a5e-423e-ba32-8f7ef706a5e9.jsonl
working_directory: /Users/jtnt/Documents/Projects/chief_of_staff
---

# Chief of Staff: Claude.md Engineering Post + Handoff Hook

## What Was Done

Session started in CoS but work was primarily writing project-work. The idea: mine the user's CLAUDE.md files (global + project-level) for universally useful patterns, turn them into a blog post draft for writing/.

**Workflow:**
1. Read writing standards (`writing-style-preferences.md`, `dont-sound-like-ai.md`) and two published posts for voice calibration
2. Read CLAUDE.md files from: global `~/.claude/CLAUDE.md`, razzo, writing, context_profile_framework
3. Wrote v1 (`post.md`) — user flagged immediately as AI-slop listicle with clickbait opener ("Prompt engineering is dead. I killed it."), anti-patterns like "the real unlock", bold headers-with-colons
4. Wrote v2 (`post-v2.md`) — narrative/essay format, no listicle; user said structure was fine in listicle, v2 overcorrected into personal essay, and "I stopped writing prompts, I started writing rules" is factually wrong + AI cliché
5. Wrote v3 (`post-v3.md`) — listicle back, tighter, honest framing, no false claims about quitting prompts

**9 patterns mined from CLAUDE.md files:**
1. Stop it from making things up — the "never fabricate" rule
2. When to act vs. ask — autonomy defaults
3. Protect yourself — no deletions, no unsolicited edits, no auto-commits
4. Conversation modes — fluid exploration vs. structured work
5. Shorthand conventions — bare URLs as commands
6. Memory limitations — no empty promises
7. Ideas vs. decisions — Discovery ≠ Direction
8. Question quality filter — three tests
9. Meta-work awareness — the shoulder tap

**Session routing note:** User asked about moving the session to writing/ for proper log placement. Answer: can't move mid-session. Did a handoff instead — saved `writing/.claude/handoff.md` with resume prompt for v3 editorial pass.

**Gap identified and fixed:** Handoff file was write-only — nothing told the next session to look for it. After the initial capture, the session continued and implemented the fix:

1. **`~/.claude/hooks/cos-session-start.sh`** updated — now checks for `.claude/handoff.md` alongside pattern suggestions. Emits `HANDOFF_PENDING` context if found. Bug fixed: original edit had a literal newline in the JSON string from `printf '\n'` that broke JSON parsing; caught and fixed via hook testing.
2. **`~/.claude/CLAUDE.md`** updated — added handler under "Chief of Staff Integration > Hooks": read the handoff, summarize it, offer to resume, delete the file after.
3. **`~/.claude/skills/handoff/SKILL.md`** updated — noted that handoff.md is auto-detected at next session start.

Flow: user opens session in writing/, types anything, Claude sees `HANDOFF_PENDING` context, reads handoff.md, offers to pick up v3 editorial pass.

## Key Decisions

- **Listicle won over narrative** — user confirmed listicle is right structure for this audience; v2's shift to personal essay was wrong. The issue was voice and word choice, not format.
- **"I stopped writing prompts, started writing rules" rejected** — factually incorrect (still write prompts; rules are additive, not replacement) and sounds like AI-generated self-help. User was firm on this.
- **Handoff over manual log move** — used `/handoff` to transfer context to writing/ for proper session provenance; log intentionally stays in CoS since session started here
- **Handoff gap fixed** — implemented SessionStart hook detection + CLAUDE.md handler. Chose hook + CLAUDE.md together (hook surfaces it, CLAUDE.md tells Claude what to do). Hook fires before any user input so context is available from first turn.

## Reasoning

- **Why v1 failed:** Read standards but wrote to a different internal template. The opening hook "Prompt engineering is dead. I killed it." and "The real unlock" are explicitly on the never-use list. Pattern to remember: reading standards ≠ following them — verify against the list before writing.
- **Why v2 failed:** Overcorrected from "listicle with bad voice" to "essay with right voice." The user's feedback on format ("listicle was fine") was clear but I swapped the format anyway.
- **Pattern:** Voice calibration from published posts works better than format calibration. The format should match the genre, not the voice example.

## Changes Made

Files written to writing/ (not git-tracked here):
- [[../writing/drafts/20260217_claude-md-engineering/post.md]] — v1 (listicle, AI-slop voice, rejected)
- [[../writing/drafts/20260217_claude-md-engineering/post-v2.md]] — v2 (narrative, overcorrected, rejected)
- [[../writing/drafts/20260217_claude-md-engineering/post-v3.md]] — v3 (listicle back, tighter, current working draft)
- [[../writing/.claude/handoff.md]] — handoff context for continuing v3 in writing/ session

System files edited (committed in prior auto-capture at 08:52):
- [[~/.claude/hooks/cos-session-start.sh]] — added handoff detection; fixed JSON bug from literal newline
- [[~/.claude/CLAUDE.md]] — added HANDOFF_PENDING handler under Chief of Staff Integration > Hooks
- [[~/.claude/skills/handoff/SKILL.md]] — noted auto-detection behavior

## Open Items

- [ ] Continue v3 editorial pass — start fresh session from `/Users/jtnt/Documents/Projects/writing/`, read `drafts/20260217_claude-md-engineering/post-v3.md`, do full editorial pass with nt-editor. Handoff file is ready at `writing/.claude/handoff.md` and will be auto-surfaced.
- [ ] Handoff hook behavior: user noted that "nothing shows automatically" at launch — user must type something first before SessionStart context is acted on. This is expected (hook injects context into system prompt, Claude responds on first user turn). Could add stderr output to show visual heads-up in terminal before first prompt.
