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

## Testing

```bash
# From any project directory:
claude --plugin-dir /Users/jtnt/Documents/Projects/Code/inbox-triage
```

Test from a project WITHOUT `.mcp.json` for setup unhappy path. Test from CoS project (has Gmail + Calendar MCP) for happy path and triage.

### Test Status

| Test | Status |
|------|--------|
| Setup unhappy path (no MCP servers) | In progress — working well after redesign |
| Setup happy path (MCP servers available) | Not tested |
| Triage end-to-end | Not tested |

### Issues Found During Testing

- **Calendar event duplication (fixed):** Triage was suggesting calendar events for emails where the event was already on the user's calendar (e.g., accepted invites). Fix: Step 5 now calls `list-events` for the relevant date range and cross-references extracted events against existing ones by date, time, and title similarity. Only surfaces events genuinely missing from the calendar.
- **Skill naming (fixed):** Skills showed as `/inbox-triage-setup` instead of `/inbox-triage:setup`. Cause: explicit `name` fields in SKILL.md override plugin auto-namespacing. Fix: removed `name` fields, renamed `skills/inbox-triage/` → `skills/triage/` directory.
- **ToolSearch problem (may be resolved):** In earlier unhappy path testing, Sonnet used ToolSearch for MCP tools despite instructions not to. Latest redesign redirects flow away from the trigger. Current testing shows improvement.

## Next: Build Cleanup Skill

`/inbox-triage:cleanup` — One-time inbox zero mode. Separate skill to isolate context usage.

**Flow:**
1. Scan ALL inbox emails (not just unread), higher limit
2. Analyze patterns: top senders, sender types, volume by category
3. Present strategy: "You have ~N emails. Here's what I see..."
4. Offer cleanup actions (multi-select):
   - Create labels for newsletter senders and move them
   - Create Receipts label, move order confirmations/receipts
   - Archive calendar acceptance/decline notifications
   - Create filters for recurring noise senders
   - Archive social media notifications
5. Execute selected cleanup with confirmation
6. Report results

## Related

- Design spec: `Working/inbox-triage-design.md` (status: absorbed)
