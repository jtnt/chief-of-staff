# Chief of Staff: Sync from Source

**Date:** 2026-01-12 (night)
**Session Type:** meta-work
**Source:** `/Users/jtnt/Documents/Projects/Chief of Staff`

## Recent Git Activity

```
90abc50 Sync Context Profile Framework: Cowork post + writing style
8e9e649 Sync Chief of Staff: Cowork mode vs CLI differences discovery
a58fd72 Update project knowledge: Cowork mode vs CLI differences
```

## What Happened This Session

Discovered that Cowork mode (or Claude Code on web) sets a **local git config** that overrides global settings, causing GitHub push failures.

**The problem:**
- Git push failed with "GH007: Your push would publish a private email address"
- Initially thought it was the docx file or Co-Authored-By line
- Actual cause: local git config had `jtntolson@gmail.com` while global had `n@razzo-ai.com`

**The fix:**
1. `git config --local --unset user.email` - removed the local override
2. Rewrote recent commits with correct author email
3. Push succeeded

## Documentation Updated

- **CLAUDE.md**: Added "Known Issue: Cowork May Set Local Git Config" section with check/fix commands
- **project-knowledge.md**: Added session entry documenting the discovery and solution

## Lesson Learned

If git push fails after using Cowork or web-based Claude Code, check for local git config overrides first:
- Check: `git config --local user.email`
- Fix: `git config --local --unset user.email`
