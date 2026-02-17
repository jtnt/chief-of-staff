---
status: active
created: 2026-02-02
---

# Inbox Triage Plugin — Development Status

## Plugin Location

`/Users/jtnt/Documents/Projects/Code/inbox-triage/`

## File Inventory

```
inbox-triage/
├── .claude-plugin/
│   └── plugin.json                          # name: inbox-triage, v0.1.0
├── .gitignore
├── README.md
└── skills/
    ├── setup/
    │   └── SKILL.md                         # /inbox-triage:setup
    └── triage/
        ├── SKILL.md                         # /inbox-triage:triage
        └── references/
            ├── categorization.md
            ├── calendar-extraction.md
            └── output-format.md
```

## v2 Redesign (2026-02-02)

First version worked but was a **sorter, not an analyst** — it listed emails in categorized tables, which was just a worse Gmail UI. Redesigned around three principles:

1. **Analyst, not sorter.** Output is a narrative briefing that says what emails *mean* and what they *need*, not tables of subject lines.
2. **Act first, report after.** Newsletters get auto-labeled by sender. Noise gets auto-archived. Calendar events already on calendar are silently skipped. Only items needing human judgment appear in the briefing.
3. **Session memory.** `.claude/inbox-triage-state.json` tracks triaged message IDs, newsletter labels created, and filters. Previously handled emails don't resurface. Newsletter labeling accumulates across sessions.

### Key changes from v1

- Removed 6-bucket table output → narrative briefing with 4 sections (attention, calendar, worth a look, handled)
- Added auto-labeling: creates `Newsletters/[Sender Name]` labels and applies them
- Added auto-archiving: newsletters and noise removed from inbox automatically
- Calendar events already on calendar are silently dropped (not shown as "already on calendar")
- State file enables cross-session memory (30-day retention)
- Skill descriptions cleaned up (removed "This skill should be used when the user" boilerplate)
- Added parallel `read_email` instruction to reduce sequential tool calls

## Testing

```bash
# From any project directory:
claude --plugin-dir /Users/jtnt/Documents/Projects/Code/inbox-triage
```

Test from a project WITHOUT `.mcp.json` for setup unhappy path. Test from CoS project (has Gmail + Calendar MCP) for happy path and triage.

### Test Status

| Test | Status |
|------|--------|
| Setup unhappy path (no MCP servers) | Working |
| Setup happy path (MCP servers available) | Not tested |
| Triage v1 end-to-end | Tested — functional but not useful |
| Triage v2 narrative briefing | Not tested |
| Triage v2 auto-labeling | Not tested |
| Triage v2 auto-archiving | Not tested |
| Triage v2 state persistence | Not tested |
| Triage v2 calendar silent skip | Not tested |

### Issues Found During Testing

- **Calendar event duplication (fixed in v1, carried to v2):** Cross-references extracted events against existing calendar. v2 goes further — silently drops matches instead of showing "already on calendar."
- **Skill naming (fixed):** Removed explicit `name` fields, renamed directories.
- **ToolSearch problem (may be resolved):** Sonnet used ToolSearch for MCP tools despite instructions not to. Latest redesign redirects flow away from the trigger.
- **v1 output was useless (fixed in v2):** Tables of subject lines with category labels — just a worse Gmail. v2 uses narrative analysis.

## Next: Build Cleanup Skill

`/inbox-triage:cleanup` — One-time inbox zero mode. Separate skill to isolate context usage. Some of the original cleanup scope (newsletter labeling, noise archiving) is now handled by regular triage. Cleanup skill focuses on bulk historical cleanup.

**Remaining cleanup scope:**
1. Scan ALL inbox emails (not just unread), higher limit
2. Analyze patterns: top senders, sender types, volume by category
3. Present strategy: "You have ~N emails. Here's what I see..."
4. Offer bulk actions (multi-select):
   - Create Receipts label, move order confirmations/receipts
   - Archive old calendar acceptance/decline notifications
   - Bulk-label historical newsletters (sender patterns from triage state)
   - Create filters for high-volume senders
5. Execute with confirmation
6. Report results

## Related

- Design spec: `Working/inbox-triage-design.md` (status: absorbed)
