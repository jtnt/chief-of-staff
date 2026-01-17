# Chief of Staff: Sync from Source

**Date:** January 11, 2026
**Session Type:** mixed
**Source:** /Users/jtnt/Documents/Projects/Chief of Staff

---

## Recent Git Activity

No new commits since last sync (f9229d6 - MCP server exploration from this morning).

Work completed in this session:
- Added StoryBrand reference to Resources/
- Fixed folder structure inconsistencies
- Updated CLAUDE.md with project tracking standards

---

## Session Work Summary

### 1. StoryBrand Reference Addition

**Context:** User provided podcast transcript (Donald Miller at Guru Conference, Episode 470)

**Process:**
- Initially created document with Razzo-specific analysis (incorrect)
- User corrected: wanted pure reference extraction, no application
- Rewrote as comprehensive reference capturing all Miller's insights

**Result:** Created `Resources/Donald Miller StoryBrand Framework.md`
- Complete framework documentation (PEACE soundbites)
- All examples (aquarium company, Oura Ring, YNAB, Geico, real estate agent, dog trainer)
- Quotes and key principles
- AI usage techniques for copywriting

**Key learning:** Resources folder is for project-agnostic reference materials. Keep extraction separate from application.

### 2. Folder Structure Cleanup (Critical Fix)

**Problem Discovered:**
User noticed inconsistencies in `Projects/` folder structure:
- Razzo had subfolders (reference/, session-logs/, strategy/)
- CPF had duplicate, outdated `project-knowledge.md` file
- Violated principle: Chief of Staff only tracks projects, doesn't store their content

**Root Cause Analysis:**
- Initial CoS setup (Jan 9) created Razzo subfolders thinking it would help organize
- Later `/update-knowledge` in CPF created knowledge file in CoS tracking folder
- Standard was unclear and not enforced

**Actions Taken:**
1. Converted Razzo session-logs content to proper sync file (20260109-sprint-positioning-sync.md)
2. Deleted outdated CPF project-knowledge.md (real one in actual project is current)
3. Removed empty Razzo subfolders (reference/, strategy/)
4. Added "Projects Folder Standard" section to CLAUDE.md
5. Updated folder tree in CLAUDE.md to show standard clearly

**The Standard (Now Documented):**
- Each project folder: ONLY dated sync files (YYYYMMDD-*.md)
- Flat structure, no subfolders
- No duplicated knowledge files
- No stored project content
- Chief of Staff tracks projects, doesn't become second home for files

**Impact:** All 6 project folders now follow consistent standard.

### 3. Documentation Updates

**CLAUDE.md:**
- Added complete folder structure tree
- Added "Projects Folder Standard" section with explicit rules
- Added "Resources Folder" section explaining purpose and usage
- Updated document types guidance

**project-knowledge.md:**
- Added StoryBrand reference session entry
- Added folder structure cleanup session entry
- Updated timestamp

---

## Current State

Chief of Staff system is now structurally sound with clear, documented standards:

**Folder Structure:**
- `Check-Ins/` - Personal reflections (daily, thoughts, journal)
- `Projects/` - Project tracking (dated sync files ONLY)
- `Resources/` - Reference materials (frameworks, guides)
- `Weekly Reviews/` - Periodic synthesis
- Root files: project-knowledge.md, project-sources.md, CLAUDE.md

**Standards Established:**
- Projects folder: flat structure, dated sync files only
- Resources folder: extracted insights, project-agnostic
- Three-layer documentation model across all projects

**System Health:**
- 6 projects tracked (Razzo, CPF, CoS, 2 LinkedIn tools, Caregiver App)
- All project folders follow standard
- Resources folder operational with first reference document
- Check-in system operational (4 types)
- Bidirectional flow working (CoS → project inboxes)

---

## Key Insights from This Session

**On Reference Materials:**
- Pure extraction beats premature application
- Keep frameworks project-agnostic
- Let users apply insights in context, not in advance

**On System Design:**
- Inconsistency kills knowledge management systems
- Standards must be explicit and enforced
- "Helpful" structure that violates principles creates debt

**On Chief of Staff Role:**
- Track projects, don't store their content
- Single source of truth for each type of information
- Simplicity enables sustainability

---

## Open Items

None - cleanup complete, standards documented, system operational.
