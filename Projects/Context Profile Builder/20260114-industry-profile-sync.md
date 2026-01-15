# Context Profile Builder: Sync from Source

**Date:** 2026-01-14 08:51 PM EST
**Source:** /Users/jtnt/Documents/Projects/context-profile-builder

## Recent Git Activity

```
4d9aa71 Add progress steps UI and UX fixes
867baf8 Add opinionated workflow with sequential document locking
9354640 Add project documentation
a2f8ac4 Add Context Profile Builder MVP
f3a2295 Initial commit from Create Next App
```

(Note: Industry Profile implementation not yet committed - files created but uncommitted)

## Current State

MVP functional with full opinionated workflow. Company Background and Industry Profile documents both working.

**Core Philosophy: Opinionated Software** - Now properly framed as the foundational lens for all product decisions, not just a feature checklist. The app enforces a workflow because each step genuinely depends on the previous ones. This is the value proposition, not a constraint.

**Principles:**
- Sequential by design (documents build on each other)
- Transparency over magic (show what's happening)
- Minimal decisions (auto-unlock, auto-save, one clear action)
- Cross-document intelligence (each doc informs the next)

## Recent Work

### Industry Profile Implementation (this session)

Built new document type with multi-step research flow:

1. **Input step** - User provides industry name, niche, additional context
2. **URL Discovery** - Claude suggests URLs from training knowledge (informed by Company Background)
3. **URL Verification** - User reviews/unchecks URLs, can add their own
4. **Research & Generate** - Fetch URLs via Jina Reader, synthesize Industry Profile

**Key decisions:**
- Uses custom page component (not shared document-editor) because flow is different
- URL suggestions come from Claude's training data, not external search API
- User verification step mitigates stale URLs
- Cross-document intelligence: Company Background content passed to both URL suggestion and generation APIs

**New document order:** Company Background → Industry Profile → ICP → Competitor → Brand Voice

**Files created:**
- `src/app/documents/industry_profile/page.tsx`
- `src/app/api/industry-research/suggest-urls/route.ts`
- `src/app/api/industry-research/generate/route.ts`
- `supabase/migrations/002_add_industry_profile.sql`

**Technical lessons documented:**
- Route path convention: use underscores (`industry_profile/`) not hyphens
- Supabase client: use `createClient` from `@/lib/supabase/client`, not auth-helpers

### Phase 6 UX Refinements Identified (7 items)

From user testing, these refinements were identified for future implementation:
1. Smart pre-fill from Company Background
2. Port dynamic progress animation to all documents
3. Source attribution (UI tab + document section)
4. Better preview formatting/spacing
5. Toggle between rendered and raw markdown
6. Button consistency across documents
7. Filename with company name

## Open Items

**Immediate:**
- Run database migration for `industry_profile` enum value
- Test Industry Profile end-to-end flow
- Implement Phase 6 UX refinements

**Next:**
- Build ICP Definition questionnaire (with pre-fill from Industry Profile)
- Build Competitor Intelligence questionnaire (with pre-fill from Industry Profile)
- Build Brand Voice questionnaire

**Technical debt:**
- Re-enable RLS with correct policies
- Generate proper Supabase types
- Deploy to production
