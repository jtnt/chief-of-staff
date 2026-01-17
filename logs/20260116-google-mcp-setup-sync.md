# Chief of Staff: Session Log

**Date:** 2026-01-16 05:25 PM EST
**Session Type:** meta-work

## What Was Done

Set up Google Calendar and Gmail MCP (Model Context Protocol) integrations for Chief of Staff project. This enables Claude Code to interact with calendar events and Gmail directly from this project.

## Key Decisions

**Project-scoped vs Global Configuration**
- User wanted MCP access limited to Chief of Staff project only, not globally accessible
- Used `.mcp.json` in project root instead of `~/.claude/mcp.json`
- Credentials stored in project's `.claude/` folder

**OAuth Client Type**
- Initially created Desktop app OAuth client (following typical pattern)
- Had to switch to Web application type because MCP servers require redirect URIs
- Desktop app type doesn't support redirect URIs in Google Cloud

**Scope Trade-offs**
- User initially wanted read-only calendar and Gmail read + draft (no send)
- Both MCP servers request broader permissions (Calendar edit, Gmail send)
- No clear way to customize scopes in these MCP packages
- User accepted broader permissions with understanding to instruct Claude to only use read/draft functions

**MCP Server Selection**
- Calendar: `@cocal/google-calendar-mcp` (user specifically wanted this one)
- Gmail: `@gongrzhe/server-gmail-autoauth-mcp` (user specifically wanted this one)

## Changes Made

**Files Created:**
- `.mcp.json` - MCP server configuration for Chief of Staff project
- `.claude/gcp-oauth.keys.json` - OAuth credentials from Google Cloud

**Google Cloud Configuration:**
- Created project: `claude-code-484521`
- Enabled APIs: Google Calendar API, Gmail API
- Created OAuth 2.0 Web application client
- Configured OAuth consent screen (External, testing mode)
- Added authorized redirect URIs: `http://localhost:3000/oauth2callback`, `http://localhost:3500/oauth2callback`, `http://localhost:3501/oauth2callback`
- Added user as test user

**Authentication Completed:**
- Calendar tokens: `~/.config/google-calendar-mcp/tokens.json`
- Gmail credentials: `~/.gmail-mcp/credentials.json`

**CLAUDE.md Updated:**
- Added "Calendar Preferences" section noting to check BOTH calendars (primary + nicholas@razzohq.com)

## Open Items

**Token Expiration**
- OAuth tokens expire after 7 days in testing mode
- Will need to re-authenticate periodically
- Alternative: Publish the app or keep as test user (current approach)

**Scope Limitations**
- Both services have broader permissions than ideal
- No apparent way to customize scopes with current MCP servers
- Consider finding different MCP servers if this becomes problematic

**Testing**
- Calendar tested and working
- Gmail not yet tested (user will test in separate session)

## Technical Notes

**Why Multiple Redirect URIs?**
- Different MCP servers use different localhost ports
- Calendar MCP tried ports 3500 and 3501
- Gmail MCP used port 3000
- Added all three to avoid redirect_uri_mismatch errors

**OAuth Credentials Format**
- Google provides credentials with `"web"` or `"installed"` keys
- Calendar MCP requires `"installed"` format
- Had to reformat the web app credentials to use `"installed"` key

**Directory Requirements**
- Gmail MCP expects `~/.gmail-mcp/` directory to exist before first auth
- Had to create manually with `mkdir -p ~/.gmail-mcp`
