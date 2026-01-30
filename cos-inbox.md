# Chief of Staff Inbox

Items pushed from Chief of Staff conversations and meeting reviews.

## Pending

### 2026-01-30 - Review and implement automation recommendations
**Source:** Automation analysis session
**Context:** Full analysis of CoS automation stack identified 5 targeted improvements

- [ ] Review recommendations: `Resources/Claude Code/20260130-automation-recommendations.md`
- [ ] Implement #1: Notification hook (idle_prompt) - low effort
- [ ] Implement #2: Block external edits hook - low effort
- [ ] Implement #3: `/project-health` skill - medium effort
- [ ] Implement #4: `/weekly-review` skill - medium effort
- [ ] Implement #5: Cross-project synthesizer agent - medium effort

---

### 2026-01-28 - Investigate SessionEnd script delay
**Source:** Session observation
**Context:** Performance issue in auto-capture system

- [ ] SessionEnd script runs correctly but takes ~20 secs to exit after log file is created
- [ ] Investigate what's causing the delay (likely sync to CoS or git operations)
- [ ] Consider if blocking operations can be moved to background

---

### 2026-01-26 - Update terminology: commands → skills
**Source:** Quick reminder
**Context:** Claude Code terminology update needed

- [ ] Update CLAUDE.md files to use "skills" instead of "commands" where appropriate

---

### 2026-01-22 - Test Meeting Review v7
**Source:** Meta-work session
**Context:** Implemented Sonnet model change for quality extraction

- [ ] Run `/meeting-review` with 2-3 meetings to verify changes work
- [ ] Confirm Sonnet model produces quality summaries
- [ ] Check follow-up extraction works correctly

---

## Archive

### 2026-01-22 - Check out Sallam from "DC Founders Panel"
**Source:** Meeting review
**Meeting date:** 2026-01-22
**Context:** Met founder at DC AI panel - educational game teaching empathy, inspired by his mother
**Archived:** 2026-01-26 - Searched but couldn't find online; name may be spelled differently
