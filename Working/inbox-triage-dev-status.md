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
├── .gitignore                               # excludes .claude/*.local.md
├── README.md                                # overview, usage, safety rules
└── skills/
    ├── setup/
    │   └── SKILL.md                         # Setup/onboarding skill (latest redesign below)
    └── inbox-triage/
        ├── SKILL.md                         # Core triage workflow (model: sonnet)
        └── references/
            ├── categorization.md            # 6 bucket definitions + sorting rules
            ├── calendar-extraction.md       # Event extraction + duration defaults
            └── output-format.md             # Summary template + action flows
```

## Build History

1. Built all 8 phases via `plugin-dev:create-plugin` workflow
2. Tested setup skill unhappy path (no MCP servers configured) — 4 rounds
3. Each round revealed issues, iterated on SKILL.md

## Current State

### Setup Skill (`skills/setup/SKILL.md`)

**Latest redesign (this session)** — complete rewrite with two paths:

- **Path A (servers connected):** Check connectivity → list calendars → configure preferences → save settings → verify
- **Path B (servers missing):** Check connectivity → search user's other projects for existing `.mcp.json` → copy config or guide fresh setup with WebSearch for packages → create `.mcp.json` → tell user to restart → re-run setup

Key design: the skill discovers existing MCP configs via `find ~/Documents/Projects -name ".mcp.json"` rather than asking the user "which MCP server are you using?" (they don't know).

**NOT YET TESTED** — this redesign needs both unhappy and happy path testing.

### Core Triage Skill (`skills/inbox-triage/SKILL.md`)

7-step workflow: parse args → parallel email search → selective reading → categorize into 6 buckets → extract calendar events → present summary → suggest/confirm actions.

**NOT YET TESTED** — need to test from CoS project where MCP servers are available.

## Known Issues

### ToolSearch Problem (may or may not persist)

In 4 rounds of testing the setup skill's unhappy path (MCP servers not configured), Sonnet consistently used ToolSearch to look for MCP tools despite instructions not to. When tools aren't in the model's tool list (because MCP server isn't configured), Sonnet's default behavior is to search for them.

Attempted fixes:
1. Per-step "do not use ToolSearch" — ignored
2. "If the tool is not in the available tools list" framing — still triggered ToolSearch
3. Top-level "CRITICAL RULE: Never Use ToolSearch" section — untested (part of latest redesign)

The latest redesign may help because the unhappy path now goes directly to file search and config creation rather than tool discovery. The flow naturally avoids the trigger.

### Context Window Usage

Setup skill test sessions consumed ~61% context. Causes:
- ToolSearch calls return verbose results
- Cursor IDE injects system-reminder blocks on every message (file modifications, skill listings, CLAUDE.md, hook outputs) — significant overhead vs terminal CLI
- Hookify errors were adding noise (now resolved)

## What Needs Testing

1. **Setup unhappy path** — Run `/inbox-triage:setup` in a project WITHOUT MCP servers. Should discover existing config from CoS project and offer to copy it.
2. **Setup happy path** — Run `/inbox-triage:setup` from CoS project where Gmail + Calendar MCP servers work. Should skip to preferences.
3. **Core triage** — Run `/inbox-triage` from CoS project. Full end-to-end: scan, categorize, present summary, offer actions.

### How to Test

```bash
# Unhappy path (from inbox-triage project dir, no .mcp.json there):
claude --plugin-dir /Users/jtnt/Documents/Projects/Code/inbox-triage

# Happy path (from CoS project, MCP servers configured):
claude --plugin-dir /Users/jtnt/Documents/Projects/Code/inbox-triage
# (run from Chief of Staff directory)
```

## Working MCP Config Reference

CoS project `.mcp.json` (the config the setup skill should discover):

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "npx",
      "args": ["@cocal/google-calendar-mcp"],
      "env": {
        "GOOGLE_OAUTH_CREDENTIALS": "/Users/jtnt/Documents/Projects/Chief of Staff/.claude/gcp-oauth.keys.json"
      }
    },
    "gmail": {
      "command": "npx",
      "args": ["@gongrzhe/server-gmail-autoauth-mcp"],
      "env": {
        "GMAIL_OAUTH_PATH": "/Users/jtnt/Documents/Projects/Chief of Staff/.claude/gcp-oauth.keys.json"
      }
    }
  }
}
```

## Related

- Original design spec: `Working/inbox-triage-design.md` (status: absorbed — design is now implemented)
- Plugin source: `/Users/jtnt/Documents/Projects/Code/inbox-triage/`
