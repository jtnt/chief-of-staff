---
title: Compact Prompt Research
---

# Chief of Staff: Compact Prompt Research

**Date:** 2026-01-25 07:13 AM EST
**Session Type:** meta-work
**Coverage:** Current session only

## What Was Done

Researched best practices for `/compact` prompts in Claude Code. The goal was to develop a general-purpose prompt that preserves the right information during context compaction.

### Research Sources
- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [Claude Code System Prompts (Piebald-AI)](https://github.com/Piebald-AI/claude-code-system-prompts)
- [YK's 32 Claude Code Tips](https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to)
- [Steve Kinney's Compaction Guide](https://stevekinney.com/courses/ai-development/claude-code-compaction)
- [Context Loss Prevention (Rajiv Pant)](https://rajiv.com/blog/2025/12/18/context-loss-and-how-to-prevent-it/)
- [Context Compaction Research (badlogic)](https://gist.github.com/badlogic/cd2ef65b0697c4dbe2d13fbecb0a0a5f)

### Key Findings

1. **Default Claude Code summarization uses 8-part structure** including all user messages verbatim, errors/fixes, files changed, and current work with direct quotes.

2. **Two distinct use cases get conflated:**
   - Forward-looking (continuation): What does Claude need to keep working?
   - Backward-looking (preservation): What happened that we don't want to lose?

3. **Community best practices:**
   - Trigger at 85-90% capacity (95% is too late)
   - Multiple compactions cause cumulative information loss
   - Create "handoff documents" before compacting
   - Treat context as renewable, not infinite

4. **What survives vs. gets lost:**
   - Survives: File content, recent messages, repeated info, CLAUDE.md
   - Vulnerable: Early instructions, nuanced rules, single mentions

### Final Prompt

```
Summarize for continuation: (1) what we're doing and why, (2) current state - done, in progress, blocked, (3) key decisions (quote user if they gave direction), (4) what was tried that didn't work, (5) files changed, (6) next steps and where to resume.
```

## Key Decisions

- User decided: Just keep the prompt as text to paste, don't create a new command
- Identified: auto-capture script using API is flawed (costs money). Need to either use `claude -p` CLI or simplify to metadata-only capture.

## Changes Made

- Created: `~/.claude/plans/compact-prompt-design.md` (research document)

```
 M .gitignore
?? Resources/Claude Code/Chief of Staff Systems/cpo-cos-01.jpg
?? Resources/Claude Code/Chief of Staff Systems/cpo-cos-02.jpg
?? dashboard-v2/
?? dashboard-views/
?? logs/20260124-2252-session.md
?? logs/20260124-2253-session.md
?? logs/20260124-2254-session.md
?? logs/20260124-auto-capture-fixes-session.md
?? logs/20260124-cos-system-design-and-implementation.md
?? logs/20260124-save-skill-fix.md
```

Note: Most untracked files were committed in the previous save. The remaining ones are from this session.

## Open Items

1. **Fix auto-capture architecture** - Either:
   - Use `claude -p` CLI (uses subscription, not API credits)
   - Simplify to metadata-only (timestamp, session ID, first message)
   - Disable auto-capture entirely, rely on /save

2. **Compact prompt** ready to use: paste after `/compact` when needed
