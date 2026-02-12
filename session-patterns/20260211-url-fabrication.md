---
date: 2026-02-11 19:25 EST
session-log: ../logs/20260211-cross-session-memory-writing-draft.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/6caaf372-d867-4275-bfe0-067a12bc553c.jsonl
---

# Session Patterns

## Observations

**URL Fabrication Caught:** I generated a fabricated Twitter URL (`https://x.com/felixrieseberg/status/2021631360440635443`) when adding a source reference to the thought file. User immediately caught it and asked for the actual source. This violates the core "Never Make Things Up" principle from global CLAUDE.md.

**What triggered it:** User mentioned a Felix tweet (with screenshots provided) and a LinkedIn post. When adding frontmatter source URLs, I guessed at a Twitter URL structure rather than:
1. Asking for the actual URL, or
2. Referencing the screenshots as the source

**What worked:** User caught it quickly and I fixed it, but the error shouldn't have happened in the first place.

## CLAUDE.md Suggestions

### For Global ~/.claude/CLAUDE.md

```suggestion:global
### Source URL Verification

When adding source URLs to documentation (frontmatter, citations, references):
- **Never construct or guess URLs.** If you have screenshots but no URL, reference the screenshots.
- **Ask for URLs when needed.** Don't fabricate based on username or assumed URL structure.
- **Use what you have.** Screenshot references are valid sources; you don't need to convert them to URLs.

Example:
- BAD: `source: https://x.com/username/status/123456` (fabricated)
- GOOD: `source: Screenshots from user (Felix tweet re: CLAUDE.md in Cowork)`
- GOOD: Ask "Do you have the URL for Felix's tweet, or should I reference the screenshots?"
```
