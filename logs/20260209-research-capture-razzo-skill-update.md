---
date: 2026-02-09 18:50 PST
title: Research Capture and Razzo Skill Update
type: mixed
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/5a3a3d27-5bca-4ee8-868f-0c5c62b46e2f.jsonl
working_directory: /Users/jtnt/Documents/Projects/Chief of Staff
---

# Chief of Staff: Research Capture and Razzo Skill Update

## What Was Done

**Project-work (Research Capture):**

Captured two AI adoption research articles that validate Razzo's positioning:

1. **HBR article** (Ranganathan & Ye, Feb 2026) → saved to [[../Writing/research/20260209_ai-intensifies-work-hbr-ranganathan-ye/]]: UC-Berkeley ethnographic study at 200-person tech company found AI doesn't reduce work — it intensifies it across three dimensions: task expansion (people absorb others' responsibilities), blurred boundaries ("quick last prompt" before lunch), and increased multitasking. Self-reinforcing cycle: speed → reliance → scope → density → more speed. Prescription: organizations need an "AI practice" — intentional pauses, sequencing, and human grounding.

2. **Gallup poll** (Q4 2025) → saved to [[../Razzo/research/20260125_gallup-workplace-ai-adoption-q4-2025/]]: 49% of US employees have never tried generative AI at work (up from 42% in Q4 2024). Top barrier: lack of utility (34%). Adoption clustered in higher-paid roles. Only 11% have used AI in the past week; 27% of those report it saves 3+ hours.

Both articles added to Razzo's Market & Competitive Landscape section in [[../Razzo/project-knowledge.md]]. They pair well together — Gallup shows the macro adoption gap (who's using, who isn't), HBR shows the micro consequences (what happens to those who do). Both validate the Sprint model: adoption without structure creates problems, and lack of utility is the #1 barrier.

**Meta-work (Skill Update):**

User downloaded the `razzo-docs` skill from Claude.ai. Reviewed it and found several issues for Claude Code use:
- Referenced non-existent skills (`docx` and `theme-factory`)
- No workflow for creating .docx files in Claude Code (needs python-docx)
- Outdated positioning ("AI training" vs current "workflow enablement")
- Stale metadata (Claude.ai thread link, version numbering)
- Missing `user_invocable` frontmatter

Updated the skill at [[~/.claude/skills/razzo-docx/SKILL.md]] (renamed from razzo-docs):
- Removed stale metadata
- Updated positioning to "AI workflow enablement for sales and marketing teams"
- Added python-docx creation instructions
- Added reference to sample proposal asset (SalesIntel proposal) as formatting model
- Added `user_invocable: true` to frontmatter
- Removed references to non-existent skills
- Added model recommendation (sonnet for formatting, opus for content)

**Project-work (LinkedIn Draft):**

Drafted LinkedIn post at [[../Writing/Drafts/20260209_ai-intensifies-work-linkedin/post.md]] based on the HBR research. Angle: companies fighting on two fronts — getting people to use AI (49% never do) AND managing the intensification problem for those who do. Ends with Razzo-adjacent point about needing practices and workflows, not just training.

## Key Decisions

- **Research routing**: HBR article went to Writing (general thought leadership research), Gallup poll went to Razzo (market validation). Both connect to Razzo positioning but serve different purposes.
- **Skill scope**: Renamed razzo-docs → razzo-docx. Decided to keep skills format-specific (one for Word, future ones for PowerPoint, etc.) rather than bundling all Razzo doc types together.
- **Journal vs task**: User confirmed the research captures are "validates our thinking" notes (go in project-knowledge.md Market section) rather than action items.

## Reasoning

**Why separate Writing and Razzo research:**
- HBR study is general AI adoption research usable across multiple contexts (LinkedIn, thought leadership, client conversations)
- Gallup is specifically market validation for Razzo's positioning
- Keeping them separate maintains Writing as the central repository for all writing research, while Razzo gets targeted competitive/market intel

**Why rename skill to razzo-docx:**
- Clearer purpose (Word-specific)
- Leaves room for future razzo-powerpoint, razzo-pdf skills
- Follows single-responsibility principle

**Why both articles matter together:**
- Gallup: macro view of adoption gap (49% never use it)
- HBR: micro view of what happens when people do (intensification)
- Together they frame the problem Razzo Sprint solves: adoption without enablement creates chaos; utility gap is the real barrier

## Changes Made

Git status shows `.mcp.json` modified (unrelated to this session).

**Files created/edited this session:**

**Writing project:**
- [[../Writing/research/20260209_ai-intensifies-work-hbr-ranganathan-ye/article.md]] — full HBR article text
- [[../Writing/research/20260209_ai-intensifies-work-hbr-ranganathan-ye/analysis.md]] — analysis connecting to Razzo positioning
- [[../Writing/research/INDEX.md]] — updated with HBR entry
- [[../Writing/Drafts/20260209_ai-intensifies-work-linkedin/post.md]] — LinkedIn draft based on HBR research

**Razzo project:**
- [[../Razzo/research/20260125_gallup-workplace-ai-adoption-q4-2025/article.md]] — full Gallup poll text
- [[../Razzo/research/20260125_gallup-workplace-ai-adoption-q4-2025/analysis.md]] — analysis connecting to Sprint model
- [[../Razzo/research/INDEX.md]] — updated with Gallup entry
- [[../Razzo/project-knowledge.md]] — added both research entries to Market & Competitive Landscape section

**Skill updates:**
- [[~/.claude/skills/razzo-docx/SKILL.md]] — updated and renamed from razzo-docs
- [[~/.claude/skills/razzo-docx/SKILL.md.bak]] — backup of original

**Files read:**
- Writing standards: [[../Writing/Standards/elements-of-style.md]], [[../Writing/Standards/write-like-you-talk.md]], [[../Writing/Standards/dont-sound-like-ai.md]]
- Writing style reference: [[~/.claude/resources/writing-style-preferences.md]]
- Published posts for voice matching: 5 recent LinkedIn/Substack posts from Writing/Published/
- Project manifests: [[../Writing/project-knowledge.md]], [[../Razzo/project-knowledge.md]]
- Skills: [[~/.claude/skills/convert-docx/SKILL.md]] (to check what exists), original razzo-docs skill

## Open Items

- **LinkedIn post needs review** — draft at [[../Writing/Drafts/20260209_ai-intensifies-work-linkedin/post.md]] ready for editing
- **Sample Word doc** — user mentioned adding a sample Word doc to razzo-docx assets folder for formatting reference (currently uses SalesIntel proposal via convert-docx)
- **Skill testing** — razzo-docx skill hasn't been tested in practice yet (just updated based on review)
