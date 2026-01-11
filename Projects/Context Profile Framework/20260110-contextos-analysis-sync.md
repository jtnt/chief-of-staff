# Context Profile Framework: Sync from Source

**Date:** January 10, 2026
**Source:** `/Users/jtnt/Documents/Projects/Context Profile Framework`

## Recent Git Activity

```
e99719c Add ContextOS analysis and opinionated structure insights
2374d83 Add Precedent Layer implementation analysis and update project knowledge
bebb7fd Refine CLAUDE.md architecture explanation and update project knowledge
7fa8562 Add research transcripts and expand strategic thinking on context infrastructure
```

## Current State

R&D and thinking partner project for Context Infrastructure—the structured layer between organizational data and AI tools. Context Profile Framework (CPF) is the organizing structure. Currently in early exploration phase with some documentation, early client validation, and public sharing to learn.

## Recent Work

**ContextOS Analysis (Major)**

Analyzed ContextOS (gtm-context-os-quickstart by Jacob Dietle, taste.systems) - a practical Claude Code implementation of similar concepts. Created comprehensive analysis document at `Working/contextos-analysis.md`.

**Key Findings:**
- **Atomic concepts** - Define once, reference everywhere (ICP as single source of truth)
- **Constitutional documents** - taxonomy.yaml (controlled vocabulary) and ontology.yaml (relationship semantics)
- **Knowledge lifecycle** - emergent → validated → canonical (confidence metadata, NOT Precedent Layer)
- **Ingestion workflows** - Transform raw content into structured nodes (addresses creation friction)

**Testing Results:**
- Tested on sample transcript: worked but created broken WikiLinks, unenforced taxonomy
- Tested on real Razzo website content: significantly better results - coherent node network, resolved links, substantive content
- Real content produced 8 interconnected nodes telling coherent story (Problem → Solution → Method → ICP → Product)

**Strategic Insights:**

1. **Structure enables compounding** - Random content accumulation doesn't compound; structured accumulation with clear organizing principles does

2. **Opinionated software design** - CPF needs to be more explicitly opinionated about:
   - Domain presets (GTM/Sales vs. Product vs. Research)
   - What gets extracted per domain
   - Relationship types with semantic meaning
   - Quality standards (minimum links, attribution)

3. **Two organizational axes** - ContextOS organizes by reusability (atomic vs. operational); CPF organizes by scope (Company → Department → Project → Individual). These are orthogonal and can combine.

4. **Interface reality** - Claude Code limits adoption to technical users. For CPF service: setup can be technical, but daily use must work in familiar tools (Google Docs, Notion, Slack).

**Key Quote:** "The value isn't just in structure—it's in opinionated structure that compounds intelligently."

## Open Items

1. How to implement atomic concepts in CPF without over-complicating?
2. Design constitutional documents for CPF service
3. Define clearer node type criteria or simplify
4. Validate whether ContextOS-style ingestion should be part of CPF service offering
