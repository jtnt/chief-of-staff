---
status: active
created: 2026-02-03
---

# Build Client-Facing Envoy Skills from Razzo Worksheets

## Context

On 2026-02-03, we created a new skill called `/envoy` (`~/.claude/skills/envoy/SKILL.md`) based on the article "Prompts Are Conversations You're Not Present For" by Limited Edition Jonathan. The envoy skill designs AI-mediated conversations that someone else runs independently — like an interactive form that talks back.

Now: apply the envoy framework to build **client-facing skills** from existing Razzo training materials. These would be skills you send to clients that walk them through structured thinking exercises using AI.

Article saved at: `Links/AI-Tools/20260203-prompts-conversations-youre-not-present-for.md`

---

## What to Build

### Skill 1: AI Workflow Opportunity Worksheet (BUILD FIRST)

Turn the static worksheet into an envoy-style guided conversation. Instead of handing someone a form with blank fields, the skill walks them through discovering their best AI workflow opportunities via sequential Q&A.

**Source material:** `/Users/jtnt/Documents/Projects/Clients/Mythos-More Vang/2025 Q4 Training/AI Workflow Opportunity Worksheet.md`

**The worksheet has three discovery sections:**

1. **What takes too much time?** — Repetitive tasks that eat hours but don't require deep thinking
   - Examples: summarizing meeting notes, writing similar emails, pulling data into reports, reviewing formatting

2. **What do you avoid because it's tedious?** — Backlog tasks that feel exhausting to start
   - Examples: analyzing competitors, creating training docs, researching trends, formatting presentations

3. **What do you do the same way every time?** — Predictable patterns where content changes but structure doesn't
   - Examples: client status updates, proposal creation, data analysis reports

**Then four evaluation criteria (yes/no for each identified task):**
- Do you do this at least weekly?
- Could someone else do it with clear instructions?
- Is the output more valuable than the process?
- Does it require confidential information that shouldn't be in Claude?

**Final step:** Pick ONE workflow that passed all criteria and will actually make their week easier.

**Unstick prompts (for people who get stuck):**
- Review last week's calendar for repeated meetings/tasks
- Check sent emails for common types
- Look at to-do list for recurring items
- Start smaller — even 15 min/week adds up
- Think about tasks you delegate — could you delegate to Claude?
- Consider tasks you'd do more often if they were easier

### Skill 2: AI Workflow Planning Template (BUILD SECOND)

Turn the planning template into a guided conversation that produces a complete workflow plan — either for a Claude Skill or ChatGPT Custom GPT.

**Source material:** `/Users/jtnt/Documents/Projects/Clients/Mythos-More Vang/2025 Q4 Training/AI Workflow Planning Template.md`

**The template captures:**
- Workflow purpose (specific problem/transformation, not just task description)
- When to use it (trigger situations)
- Required inputs (what user must provide, with format)
- Required context/assets (knowledge, examples, templates — with platform-specific notes for Claude vs ChatGPT)
- Output format (exact structure, sections, format — with platform-specific notes)
- Success criteria (quality measures, completeness checks, technical requirements)
- Example usage (realistic input → expected output)
- Build notes (filled after building — what worked, what needed iteration, testing results, usage tips)

### Future: Orchestrating Agent

Eventually, these two skills may be called by a single agent that:
1. Runs the Opportunity Worksheet to identify the best workflow
2. Feeds the chosen workflow into the Planning Template to produce a build-ready spec
3. Potentially continues into actually building the skill/GPT

Don't build the agent yet. Just the two skills, starting with the Opportunity Worksheet.

---

## How to Apply the Envoy Framework

The `/envoy` skill (`~/.claude/skills/envoy/SKILL.md`) defines three principles and seven construction rules. Here's how they map to this specific case:

### Three Principles Applied

**1. Minimize Cognitive Load**
- The worksheet currently asks people to fill in `[TASK 1]` and `[TASK 2]` blanks — that's a form fill. Instead, the skill should ask one question at a time, with examples and follow-ups.
- Don't ask "list your time-consuming tasks" upfront. Ask about their last week specifically: "Think about last week. What task did you spend the most time on that felt repetitive?" Then follow up.

**2. Q&A Context Extraction**
- People don't know their best AI opportunity until guided through it. The sequential questions should help them *discover* which tasks are best suited for AI, not just *report* tasks they already identified.
- The evaluation criteria (weekly? delegatable? output > process? no confidential data?) should be woven into the conversation naturally, not presented as a checklist.

**3. Output Usable Artifacts**
- The static worksheet produces a list of tasks with checkboxes. The envoy version should produce a **ranked list of AI workflow opportunities** with reasoning — something the client (or you) can immediately act on.
- Final artifact: a structured document with their top 1-3 workflow opportunities, each with: description, frequency, current time spent, why it's a good AI fit, and a suggested next step.

### Seven Construction Rules Applied

1. **Open with context, not instructions** — Explain what this exercise is for (finding the right AI workflow to build) and why it matters (avoid wasting time on the wrong thing). Frame it as discovery, not homework.

2. **Sequence easy to complex** — Start with factual (what did you do this week?), build to judgment (which of these is the best fit for AI?).

3. **One question at a time** — Critical. The static worksheet dumps all three discovery questions at once. The envoy asks one, gets answers, then asks the next with awareness of what they already said.

4. **Include sender's thinking** — Bake in the examples from the worksheet as context. "Some common ones people find: summarizing meeting notes, writing similar emails, pulling data into reports. But yours might be totally different."

5. **Define output format** — The envoy should tell them upfront: "At the end, I'll give you a ranked list of your top opportunities with a recommendation for which one to start with."

6. **Summary/confirmation step** — Before producing the final artifact, play back: "Here's what I heard. You identified X, Y, Z. Based on the criteria, X looks like the strongest candidate because... Does that match your thinking?"

7. **Design for absence** — You won't be in the room. The skill needs to handle: confused clients who don't know what counts as a "task," people who say everything is confidential, people who can't think of anything, and people who list 20 things and need help narrowing down.

---

## Skill Location & Naming

These are client-facing skills, not personal productivity tools. Consider where they should live:

- **Option A:** `~/.claude/skills/` alongside other personal skills — simple, works now
- **Option B:** Under the Razzo project or client project folder — keeps them with the training materials
- **Option C:** As a plugin — if these grow into a suite of client tools

Decision: Make during build. For now, just know the envoy skill lives at `~/.claude/skills/envoy/SKILL.md` as the reference implementation.

Naming TBD. Possibilities: `/workflow-discovery`, `/ai-opportunity`, `/find-workflow`. Should feel like something you'd tell a client to run: "Hey, paste this into Claude and walk through it."

---

## Key Design Decision: Skill vs. Envoy Output

There are two ways to interpret "uses the envoy process":

**A. Build a Claude Code skill** that the client runs via `/skill-name` — requires Claude Code installed, runs in terminal. Good for power users.

**B. Use the envoy skill to *generate a prompt*** that you then send to the client to paste into any AI (Claude.ai, ChatGPT, etc.) — no Claude Code required. Good for any client.

Most Razzo clients won't have Claude Code. **Option B is probably right** — use `/envoy` to design the conversation, then the output is a standalone prompt the client can use anywhere. But you might also want a Claude Code skill version for yourself/internal use.

Decide during build. Both are viable.

---

## Files Referenced

| File | What It Is |
|------|-----------|
| `~/.claude/skills/envoy/SKILL.md` | The envoy framework skill (process reference) |
| `/Users/jtnt/Documents/Projects/Clients/Mythos-More Vang/2025 Q4 Training/AI Workflow Opportunity Worksheet.md` | Source worksheet to convert (Skill 1) |
| `/Users/jtnt/Documents/Projects/Clients/Mythos-More Vang/2025 Q4 Training/AI Workflow Planning Template.md` | Source template to convert (Skill 2) |
| `Links/AI-Tools/20260203-prompts-conversations-youre-not-present-for.md` | Saved article with framework theory |

---

## Execution Checklist

- [ ] Decide: Claude Code skill, standalone envoy prompt, or both?
- [ ] Decide: skill name
- [ ] Build Skill 1 (AI Workflow Opportunity) using envoy principles
- [ ] Test Skill 1 — run it yourself, check if output is usable
- [ ] Build Skill 2 (AI Workflow Planning Template) using envoy principles
- [ ] Test Skill 2 — run it yourself, check if output is usable
- [ ] Consider: orchestrating agent that chains Skill 1 → Skill 2
- [ ] Add both to Notion Skills Tracker
