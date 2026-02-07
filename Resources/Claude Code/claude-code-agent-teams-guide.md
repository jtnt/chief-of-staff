# How to Use Agent Teams in Claude Code

Anthropic just shipped Agent Teams as a research preview alongside Opus 4.6. The feature was an open secret for weeks. Developers had already found the TeammateTool buried in Claude Code's binary, feature-flagged off. The OpenClaw community was building their own multi-agent orchestration with custom skills and workarounds. Anthropic noticed, productized it, and made it native.

No plugins. No setup hacks. It's built into Claude Code now.

This guide covers everything you need to know to start using it.

---

## What Agent Teams Are (and Why They Matter)

Until now, Claude Code worked as a single agent. You gave it a task, it worked through it step by step, and it reported back. If the task was complex, it might spawn sub-agents to handle pieces, but those sub-agents were isolated. They could only report results back to the main agent. They couldn't talk to each other, share discoveries mid-task, or coordinate without the main agent acting as intermediary.

Agent Teams removes that bottleneck.

Instead of one agent doing everything in sequence, a lead agent breaks your task into pieces, spins up multiple teammates, and they all work on different parts of your project simultaneously. One researches. One debugs. One builds. They communicate directly with each other through a messaging system, share findings, and coordinate through a shared task list.

The architecture has four components:

- **Team Lead**: Your main Claude Code session. Creates the team, spawns teammates, assigns tasks, synthesizes results.
- **Teammates**: Separate Claude Code instances, each with its own context window, working on assigned tasks.
- **Shared Task List**: A central work queue all agents can see. Tasks have states (pending, in progress, completed) and support dependencies.
- **Mailbox**: A messaging system for direct communication between agents.

Each teammate loads the same project context as a regular Claude Code session, including your CLAUDE.md, MCP servers, and skills. The lead's conversation history does not carry over, so teammates start fresh with the spawn prompt and project context.

---

## Agent Teams vs. Sub-Agents: When to Use Which

Both let you parallelize work, but they solve different problems.

**Sub-agents** are contractors you send on errands. They run within a single session, do their job, and report results back to the main agent. That's it. They can't message each other, share discoveries, or coordinate without the main agent relaying everything.

**Agent Teams** are a project team sitting in the same room. Each person works on their piece while staying in sync through conversation. Teammates message each other directly, claim tasks from a shared list, and challenge each other's findings.

| | Sub-Agents | Agent Teams |
|---|---|---|
| **Context** | Own window, results summarized back | Own window, fully independent |
| **Communication** | Report to main agent only | Teammates message each other directly |
| **Coordination** | Main agent manages everything | Shared task list, self-coordination |
| **Best for** | Focused tasks where only the result matters | Complex work requiring discussion |
| **Token cost** | Lower | Significantly higher (each teammate is a full Claude instance) |

**Use sub-agents when**: you need quick, focused workers that report back. Think single-purpose tasks where the result is all that matters.

**Use Agent Teams when**: teammates need to share findings, challenge each other's assumptions, and coordinate autonomously. Think code reviews from multiple angles, debugging with competing hypotheses, or building separate modules that need to stay aligned.

---

## How to Enable Agent Teams (30 Seconds)

Agent Teams is disabled by default. One setting to flip.

**Option 1: Environment variable**

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

**Option 2: settings.json (persists across sessions)**

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

That's it. Once enabled, you tell Claude to create a team in natural language and it handles the rest.

---

## Starting Your First Team

Describe the task and team structure in plain English. Claude creates the team, spawns teammates, and coordinates work based on your prompt.

**Example prompt:**

```
I'm designing a CLI tool that helps developers track TODO comments
across their codebase. Create an agent team to explore this from
different angles: one teammate on UX, one on technical architecture,
one playing devil's advocate.
```

Claude creates a team with a shared task list, spawns teammates for each perspective, has them explore the problem, synthesizes findings, and cleans up when finished.

You can also specify the number of teammates and which model to use:

```
Create a team with 4 teammates to refactor these modules in parallel.
Use Sonnet for each teammate.
```

Claude can also propose a team on its own if it determines your task would benefit from one. But it won't create a team without your approval.

### What to say vs. what not to say

The more specific your brief, the better the output. Give teammates enough context in the spawn prompt so they don't start blind.

**Good prompt:**

```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

This works because the three roles are independent. They can explore the problem without waiting on each other.

**Bad use case:**

```
Refactor this single file by having three agents each edit different functions.
```

This will cause conflicts. Multiple teammates editing the same file leads to overwrites. Each teammate should own different files.

---

## Display Modes: Watching Your Team Work

Two options for viewing what's happening.

### In-Process Mode (Default)

All teammates run inside your main terminal. You see the lead's output by default and switch between teammates using keyboard shortcuts:

- **Shift+Up/Down**: Select a teammate to view or message
- **Enter**: View a teammate's full session
- **Escape**: Interrupt a teammate's current turn
- **Ctrl+T**: Toggle the task list

Works in any terminal. No extra setup.

### Split Pane Mode

Each teammate gets its own terminal pane. You see everyone's output simultaneously and click into any pane to interact directly. Requires tmux or iTerm2.

Configure in settings.json:

```json
{
  "teammateMode": "in-process"
}
```

Options: `"auto"` (default, uses split panes if inside tmux), `"tmux"` (enables split panes), or `"in-process"` (forces all teammates into main terminal).

Or override per session:

```bash
claude --teammate-mode in-process
```

Start with in-process mode. It works everywhere. Move to split panes once you're comfortable with the workflow.

---

## Key Features Worth Knowing

### Delegate Mode

Without it, the lead sometimes starts implementing tasks itself instead of waiting for teammates. Press **Shift+Tab** to cycle into delegate mode. This restricts the lead to coordination-only tools: spawning, messaging, shutting down teammates, and managing tasks. The lead can't touch code directly.

Use this when you want the lead to stay in its orchestration role.

### Plan Approval

For risky tasks, require teammates to plan before they implement:

```
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

The teammate works in read-only mode, creates a plan, sends it to the lead for approval, and only begins implementation after approval. If rejected, they revise and resubmit.

You can influence the lead's judgment through your prompt: "only approve plans that include test coverage" or "reject plans that modify the database schema."

### Direct Teammate Interaction

Each teammate is a full, independent Claude Code session. You can message any teammate directly without going through the lead. In in-process mode, use Shift+Up/Down to select a teammate, then type your message.

---

## Best Practices (So You Don't Burn Through Tokens)

Agent Teams use significantly more tokens than a single session. Each teammate has its own context window, and every message between teammates consumes tokens in both the sender's and receiver's context. Broadcasting multiplies cost by the number of teammates.

Here's how to keep costs reasonable:

1. **Start with research and review before implementation.** Tasks with clear boundaries that don't require writing code, like reviewing a PR from three angles or investigating a bug with competing theories. These show the value of parallel exploration without the coordination complexity of parallel code changes.

2. **Size tasks appropriately.** Not too small, not too large. Aim for self-contained units with clear deliverables, roughly 5-6 tasks per teammate.

3. **Avoid file conflicts.** Each teammate should own different files. Two teammates editing the same file leads to overwrites.

4. **Use delegate mode.** Prevents the lead from doing implementation work when it should be coordinating.

5. **Wait for teammates to finish.** Don't let the lead race ahead while teammates are still working. If the lead gets impatient, tell it: "Wait for your teammates to complete their tasks before proceeding."

6. **Monitor and steer.** Check progress regularly and redirect approaches that are going off track. Use Ctrl+T to toggle the task list.

7. **Don't use teams for routine tasks.** For sequential work, same-file edits, or tasks with heavy dependencies, a single session or sub-agents are more cost-effective.

---

## Limitations You Need to Know

This is experimental. These constraints matter:

- **No session resumption.** In-process teammates are not restored when using `/resume` or `/rewind`. After resuming, the lead may try to message teammates that no longer exist. Tell it to spawn replacements.

- **Task status can lag.** Teammates sometimes forget to mark tasks as completed, which blocks dependent work. Check manually if something looks stuck.

- **Slow shutdown.** Teammates finish their current request or tool call before shutting down. This can take time.

- **One team per session.** A lead manages one team at a time. Clean up the current team before starting another.

- **No nested teams.** Teammates cannot spawn their own teams. Only the lead manages the hierarchy.

- **Fixed lead.** The session that creates the team stays the lead for its lifetime. You cannot promote a teammate or transfer leadership.

- **Permissions set at spawn.** All teammates start with the lead's permission settings. You can change individual modes after spawning, but not at spawn time.

- **Split panes require tmux or iTerm2.** Not supported in other terminals.

---

## Getting Started: Your First Low-Risk Team

Pick a PR that needs review. Enable Agent Teams. Then try this:

```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

Three reviewers, three lenses, one comprehensive review. You'll see how teammates work through the task list, communicate findings, and deliver results without you managing any of it.

From there, move to debugging tasks where competing hypotheses benefit from parallel investigation. Then try implementation tasks where teammates own separate files and coordinate through messaging.

The strongest pattern I've seen so far: spawn 3-5 investigators for a bug, have them test different theories in parallel, and actively try to disprove each other's conclusions. The surviving theory is more likely correct than whatever you'd land on testing hypotheses one at a time.

---

## The Bigger Picture

Agent Teams sounds like a small feature on paper. It's not. It fundamentally changes how you work with Claude Code by shifting from "one agent doing everything in sequence" to "a coordinated team working in parallel."

The community was already doing this with hacks and workarounds. Anthropic noticed, cleaned it up, and made it native. That pattern, community innovation becoming official features, is worth paying attention to. It's how Claude Code's Task system emerged too (productizing Steve Yegge's "Beads" concept).

If you're using Claude Code for anything beyond simple one-file tasks, Agent Teams is worth experimenting with. Start small, watch the token usage, and scale up as you build intuition for which tasks benefit from parallel exploration.
