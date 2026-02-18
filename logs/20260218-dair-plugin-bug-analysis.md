---
date: 2026-02-18 08:17 EST
title: DAIR.AI Plugin Bug Analysis
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief-of-staff/3ae61bb5-ffa3-4959-ac89-8d4cf294a49e.jsonl
working_directory: /Users/jtnt/Documents/Projects/chief_of_staff
---

# Chief of Staff: DAIR.AI Plugin Bug Analysis

## What Was Done

Investigated two DAIR.AI Claude Code marketplace plugins — `image-generator` (v1.1.1) and `llm-council` (v1.0.0) — after both failed to invoke correctly. Generated a detailed bug report covering both plugins.

**Key findings:**

**image-generator:**
- Fabricated model ID: `gemini-3-pro-image-preview` ("Nano Banana Pro") does not exist in Google's API. All API calls will return 404. As of early 2026, real options are Imagen 3 or Gemini 2.0 Flash image output.
- JSON injection vulnerability: edit prompt interpolated directly into heredoc JSON without escaping — breaks on any prompt with quotes, backslashes, or newlines.
- Fabricated capability claims (Search grounding for images, 4K output, "thinking" composition, 14 reference images) — none documented in Gemini API.

**llm-council:**
- Shell variables set but never `export`ed to Python subprocess — Phase 1 runs against empty query and empty model list, making the entire skill non-functional.
- `SESSION_DIR` variable uses a placeholder string `TIMESTAMP_HERE` that requires manual substitution between phases.
- Several Fireworks AI model IDs (e.g. `deepseek-v3p1`, `minimax-m2p1`, `kimi-k2p5`, `glm-5`) use unverified naming conventions — silent API failures produce error strings that get synthesized as if they were real responses.

**Shared bug (the "naming bug" focus of the session):**
Both plugins have spaces in their YAML `name` field:
- `image-generator/SKILL.md`: `name: Image Generator`
- `llm-council/SKILL.md`: `name: LLM Council`

Claude Code uses the `name` field for slash command registration. Spaces create invalid command names, causing "Unknown skill: Image" and similar errors on invocation. Fix: change to `name: image-generator` and `name: llm-council`.

**Session arc:** Initially generated a broad bug report (4 bugs for image-generator), then a combined report covering both plugins (5 bugs total), then reverted attempted edits to the SKILL.md files, then narrowed the scope to just Bug 1 (the naming bug) per user request, then provided the final MD output.

## Key Decisions

- Scope narrowed to just the YAML naming bug after user said "just do the naming bug"
- Edits to plugin SKILL.md files were made then reverted — user confirmed the bug report was the deliverable, not a fix
- Both files were edited then reverted: `image-generator/SKILL.md` and `llm-council/SKILL.md`

## Reasoning

- **Why the naming bug is the focus:** The other bugs (fabricated model ID, injection) require upstream fixes by DAIR.AI. The naming bug is the one that explains why the user couldn't invoke the skills at all and is the most actionable report to file.
- **Pattern to remember:** DAIR.AI marketplace plugins appear low-quality — one has a completely fabricated model, another has broken Python interop. Worth evaluating any future DAIR.AI plugin carefully before installing.

## Changes Made

Files were written then reverted back to original state during the session:
- [[/Users/jtnt/.claude/plugins/cache/dair-academy-plugins/image-generator/1.1.1/skills/image-generator/SKILL.md]] — edited then reverted
- [[/Users/jtnt/.claude/plugins/marketplaces/dair-academy-plugins/plugins/llm-council/skills/llm-council/SKILL.md]] — edited then reverted

Net result: no files changed. Git shows only the prior trivial session log staged.

## Open Items

- Consider filing bug report with DAIR.AI marketplace for both plugins
- The `llm-council` plugin is structurally broken (exported env vars) — not worth using until fixed upstream
- The `image-generator` plugin is unusable until DAIR.AI provides a real model ID
