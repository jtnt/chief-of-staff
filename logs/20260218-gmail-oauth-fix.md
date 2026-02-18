---
date: 2026-02-18 18:07 EST
title: Gmail OAuth Token Fix
type: meta-work
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-chief-of-staff/2b25b477-1ec1-4a2c-8704-45c575f6a1ad.jsonl
working_directory: /Users/jtnt/Documents/Projects/chief_of_staff
---

# Chief of Staff: Gmail OAuth Token Fix

## What Was Done

User tried to check email via Gmail MCP and got `invalid_grant` errors. Spent the session diagnosing the expired OAuth credentials and clearing them to force re-auth.

**Root cause found:** The Gmail MCP server (`@gongrzhe/server-gmail-autoauth-mcp`) stores OAuth tokens in a project-level file: `/Users/jtnt/Documents/Projects/chief_of_staff/.claude/gmail-credentials.json`. The token had `expiry_date` of ~Feb 7, and Google's refresh token TTL is ~7 days — so both the access token and refresh token were dead by Feb 18.

**Fix applied:** Deleted `gmail-credentials.json`. The `autoauth` package is designed to detect missing credentials and automatically open a browser OAuth window on next server start.

**Status at session end:** File deleted, user restarted Claude Code. The `autoauth` MCP should re-auth on next Gmail tool call. If the browser window didn't appear automatically, user can run:
```bash
GMAIL_OAUTH_PATH="/Users/jtnt/Documents/Projects/chief_of_staff/.claude/gcp-oauth.keys.json" \
GMAIL_CREDENTIALS_PATH="/Users/jtnt/Documents/Projects/chief_of_staff/.claude/gmail-credentials.json" \
npx @gongrzhe/server-gmail-autoauth-mcp
```

## Key Decisions

- **Deleted credentials file** rather than attempting manual token refresh — cleaner path to re-auth.
- **`gcp-oauth.keys.json` was NOT deleted** — only the credentials file. The OAuth app keys are stable; only the user token expires.
- **Initial misdiagnosis:** Suggested going through claude.ai web app settings, but user correctly noted there's no such option in Claude Code. The tokens are actually stored locally, not in the cloud — confirmed by finding `gmail-credentials.json` in the project `.claude/` folder.

## Reasoning

- **Why local not cloud:** Gmail MCP in Claude Code uses a self-hosted local MCP server (`npx @gongrzhe/server-gmail-autoauth-mcp`) that handles its own OAuth, not a cloud integration via claude.ai. The package name "autoauth" means it handles the auth flow automatically.
- **Pattern to remember:** When Gmail MCP stops working after ~7-11 days, it's a token expiry issue. Delete `gmail-credentials.json` from the project's `.claude/` folder and restart Claude Code to re-auth.
- **Thinking evolution:** Initial hypothesis was claude.ai managed this (wrong). Investigation of `~/.claude.json` showed the MCP config pointed to local credentials. Once credentials file found, fix was straightforward.

## Changes Made

- **Deleted:** `/Users/jtnt/Documents/Projects/chief_of_staff/.claude/gmail-credentials.json` — expired OAuth token file removed to force fresh auth on next startup.
- **Retained:** `/Users/jtnt/Documents/Projects/chief_of_staff/.claude/gcp-oauth.keys.json` — OAuth app keys, not affected.

## Open Items

- Verify Gmail MCP is working in next session (the `autoauth` flow should have triggered when Claude Code restarted).
- If still broken: run the manual `npx @gongrzhe/server-gmail-autoauth-mcp` command in terminal to force the browser auth flow.
- Consider: Google OAuth tokens with 7-day TTL will expire again. If this becomes frequent, could set up a longer-lived refresh token or explore `offline_access` scope options.
