---
status: active
created: 2026-01-31
source: https://x.com/bcherny/status/2017742741636321619
author: Boris Cherny (@bcherny) - Claude Code creator
---

# Boris Cherny's 10 Claude Code Tips (from the team)

Posted Jan 31, 2026. Tips sourced directly from the Claude Code team at Anthropic.

## 1. Do more in parallel

Run 3-5 git worktrees at once, each with its own Claude session. The team calls this the single biggest productivity unlock. Shell aliases (za, zb, zc) let you hop between worktrees in one keystroke. Some have a dedicated "analysis" worktree just for reading logs and running queries.

```bash
$ git worktree add .claude/worktrees/my-worktree origin/main
$ cd .claude/worktrees/my-worktree && claude
```

**Applicability:** Run parallel Claude sessions across different projects/tasks. Named terminal tabs per project. Even 2-3 simultaneous Claude sessions on different tasks is a step up.

## 2. Start every complex task in plan mode

Pour energy into the plan so Claude can one-shot the implementation. Team patterns:
- One Claude writes the plan, a second Claude reviews it as a staff engineer
- When things go sideways, switch back to plan mode and re-plan (don't keep pushing)
- Use plan mode for verification steps, not just the build

**Applicability:** Use a second Claude session as a reviewer of the first's plan. Internalize "re-plan when sideways" discipline.

## 3. Invest in your CLAUDE.md

After every correction, end with: "Update your CLAUDE.md so you don't make that mistake again." Claude is good at writing rules for itself. Ruthlessly edit over time. One engineer maintains a notes directory for every task/project, updated after every PR, pointing CLAUDE.md at it.

**Applicability:** Already strong here. Be more aggressive about telling Claude to update CLAUDE.md after mid-session corrections. The notes-per-project pattern parallels project-knowledge.md files.

## 4. Create your own skills and commit them to git

If you do something more than once a day, turn it into a skill. Team examples:
- `/techdebt` slash command to find and kill duplicated code
- Slash command that syncs 7 days of Slack, GDrive, Asana, and GitHub into one context dump
- Analytics-engineer-style agents that write dbt models, review code, and test changes

**Applicability:** Already have rich skills library. Ideas: a context dump skill pulling calendar + Notion + email + project status. A `/review-draft` that checks writing against style standards.

## 5. Claude fixes most bugs by itself

Enable the Slack MCP, paste a Slack bug thread into Claude and say "fix." Or say "Go fix the failing CI tests" without micromanaging how. Point Claude at docker logs for distributed systems.

**Applicability:** Trust and delegation. When hooks or session-capture break, paste the error and say "fix" rather than diagnosing first.

## 6. Level up your prompting

Three techniques:
- **a.** Challenge Claude: "Grill me on these changes and don't make a PR until I pass your test." Or "Prove to me this works" — have Claude diff behavior between branches.
- **b.** After a mediocre fix: "Knowing everything you know now, scrap this and implement the elegant solution"
- **c.** Write detailed specs and reduce ambiguity. The more specific, the better the output.

**Applicability:** "Scrap this and implement the elegant solution" — gold for clunky results. "Grill me" pattern works for writing: "critique this draft against my style standards and don't let me publish until it passes."

## 7. Terminal & Environment Setup

Team loves Ghostty terminal. Use `/statusline` to customize status bar showing context usage and git branch. Color-code and name terminal tabs (one per task/worktree, sometimes using tmux). **Use voice dictation** — you speak 3x faster than you type, prompts get way more detailed (hit fn fn on macOS).

**Applicability:** Voice dictation (fn fn) is an immediate zero-effort win, especially for narrative/strategic prompts. `/statusline` customization worth trying for context usage tracking.

## 8. Use subagents

- Append "use subagents" to any request to throw more compute at the problem
- Offload individual tasks to subagents to keep main agent's context clean and focused
- Route permission requests to Opus 4.5 via a hook — let it scan for attacks and auto-approve safe ones

**Applicability:** Already use subagent-based exploration. Permission routing hook is interesting — auto-approving routine requests to reduce friction.

## 9. Use Claude for data & analytics

Use `bq` CLI or any database CLI/MCP/API to pull and analyze metrics on the fly. Boris hasn't written SQL in 6+ months. Works for any database that has a CLI, MCP, or API.

**Applicability:** Point Claude at Google Analytics exports, LinkedIn analytics, or project metrics for pattern analysis.

## 10. Learning with Claude

- Enable "Explanatory" or "Learning" output style in `/config` for Claude to explain the *why* behind changes
- Have Claude generate a visual HTML presentation explaining unfamiliar code
- Ask Claude to draw ASCII diagrams of protocols and codebases
- Build a spaced-repetition learning skill: explain your understanding, Claude probes for gaps, stores the result

**Applicability:** Spaced-repetition learning skill is very buildable. A `/learn` skill where you explain a concept, Claude probes for gaps, stores understanding for future review. HTML presentations useful for learning new frameworks.

---

## Quick Wins

1. **Voice dictation (fn fn)** — Immediate productivity gain for longer prompts
2. **"Scrap this and implement the elegant solution"** — Prompting vocabulary for mediocre results
3. **"Update your CLAUDE.md so you don't make that mistake again"** — Habit after every correction
