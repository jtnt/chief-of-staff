# Chief of Staff Sync: Explicit Conversation Analysis Fix

**Date:** January 9, 2026 (late night)
**Type:** Workflow Fix

---

## Problem Found in the Wild

User tested the conversation intelligence enhancement in another project. Result: Claude skipped the conversation analysis entirely and just looked at git log.

**Root cause:** The instruction "Review the conversation for insights worth capturing" was too vague and buried as a sub-bullet. Claude interpreted it as optional context, not a primary action.

---

## The Fix

Rewrote Step 2b in `/update-knowledge` to make conversation analysis unmissable:

**Changed from:**
```markdown
2. **Gather context** about recent work:
   - **Review the conversation** for insights worth capturing:
     - Decisions made (and their rationale)
     ...
   - Run `git log --oneline -10` to see recent commits
```

**To:**
```markdown
2. **Analyze this conversation session** - Before doing anything else, review the messages exchanged in this session. Look for:
   - Decisions made (and their rationale)
   - Strategic shifts or new directions
   ...

   This is the PRIMARY source of insights. Most valuable context lives in the conversation, not in file diffs.

3. **Gather supplementary context:**
   - Run `git log --oneline -10` to see recent commits
```

**Key changes:**
- Standalone numbered step (not a sub-bullet)
- Action-oriented language: "Analyze this conversation session"
- Temporal priority: "Before doing anything else"
- Explicit emphasis: "This is the PRIMARY source"
- Reframed git log as "supplementary"

---

## Why This Matters

The difference between "review the conversation" buried in a list vs. "Analyze this conversation session - Before doing anything else" is the difference between Claude skipping it or doing it.

Instruction design matters. Vague → ignored. Explicit → executed.

---

## Files Modified

- `/Users/jtnt/.claude/commands/update-knowledge.md` - Rewrote Step 2b to make conversation analysis explicit
- `project-knowledge.md` - Added follow-up fix note to the previous session entry

---

## What We Learned

When building workflows for LLMs:
- Bury it in a list → it gets skipped
- Make it a numbered step → it gets done
- Add "Before doing anything else" → it gets done FIRST
- Add "This is the PRIMARY source" → it gets prioritized

Context: This is a meta-lesson about building the Chief of Staff system itself. The system's effectiveness depends on clear, unambiguous instructions.
