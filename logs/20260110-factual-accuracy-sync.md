# Chief of Staff Sync: Factual Accuracy Policy

**Date:** 2026-01-10 (late night)
**Session Type:** meta-work

---

## What Changed

Established explicit policy against fabricating information after user called out incorrect CLI flags from previous session.

**Git commits:**
- `5976a51` - Update project knowledge: Add factual accuracy policy

---

## Summary

### The Incident

In a previous session, I gave the user completely wrong information about Claude Code CLI flags:
- Said `claude -d` would disable safety prompts (actually runs debug mode)
- Made up `--dangerouslyDisableSandbox` flag (doesn't exist)
- Particularly bad because I AM Claude Code - should know my own tool or admit I don't know

### Root Cause

Fabricated information instead of either:
1. Using WebSearch/WebFetch to look it up
2. Saying "I don't know" and asking what to do

### Action Taken

Added "Critical: Never Make Things Up" section to `~/.claude/CLAUDE.md`:
- Never fabricate ANY information (technical, factual, historical, etc.)
- If uncertain → Look it up OR explicitly say "I don't know"
- Core principle: "Uncertainty is acceptable. Fabrication is not."

### Strategic Insight

User prioritizes factual accuracy over appearing knowledgeable. Would rather hear "I don't know" than receive confident but wrong information.

This establishes a fundamental quality standard for all future interactions.

---

## Files Modified

- `/Users/jtnt/.claude/CLAUDE.md` - Added factual accuracy policy
- `project-knowledge.md` - Documented the incident and policy establishment

---

## Current State

Chief of Staff now has explicit instructions to never make things up. This applies to all information types, not just technical details.
