# Chief of Staff TODO

## Revisit ContextOS Integration Plan

**Added:** 2026-01-10 (late night)
**Plan file:** `~/.claude/plans/spicy-popping-puzzle.md`

Explored ContextOS system and designed integration to bring its best features to CoS:
- Attribution system (VERIFIED/INFERRED tags)
- Automatic decision capture
- Pattern validation lifecycle (Hypothesis → Validated → Canonical)
- Light ontological layer

Key question to resolve: How to handle `/update-knowledge` - other projects use it, but for CoS the continuous capture approach would make it redundant.

**Next step:** Review plan with fresh eyes, decide on implementation approach.

---

## Fix Timestamp Logic in Knowledge Updates

**Issue:** Updates to project-knowledge.md and sync entries are using descriptive labels like "(evening)" instead of actual timestamps. This causes incorrect labeling - e.g., marking a 9:51 AM EST update as "evening" just because it was the second update of the day.

**Current behavior:**
- `**Last synced:** 2026-01-10 (evening - bidirectional flow implementation)`
- Guessing/inferring time of day based on context rather than using actual time

**Desired behavior:**
- Use actual timestamp: `**Last synced:** 2026-01-10 09:51 EST`
- Or datetime format: `**Last synced:** 2026-01-10 at 9:51 AM EST`

**User timezone:** Washington, DC (EST/EDT)

**Files that need updating:**
1. `/update-cos` command - When creating sync entries and updating Last synced dates
2. `/update-knowledge` command - When updating "Last Updated" in project-knowledge.md
3. Any other commands that write timestamps

**Implementation:**
- Get current time in EST/EDT
- Use consistent timestamp format across all knowledge updates
- Remove descriptive labels like "evening", "late night", etc.
- Keep the descriptive context (e.g., "bidirectional flow implementation") but use real time for the timestamp portion

**Priority:** Medium - Not breaking functionality but causes confusion about when work actually happened
