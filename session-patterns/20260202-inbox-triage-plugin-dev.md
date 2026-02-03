---
date: 2026-02-02 05:30 PM EST
session-log: ../logs/20260202-inbox-triage-plugin-dev.md
transcript: /Users/jtnt/.claude/projects/-Users-jtnt-Documents-Projects-Chief-of-Staff/4ed80d24-a8c4-41a1-b31e-a88b7725e63d.jsonl
---

# Session Patterns

## Observations

**Plugin development workflow patterns:**
1. The `plugin-dev:create-plugin` skill provides excellent scaffolding but requires iterative testing, especially for MCP-dependent functionality
2. Setup skills for MCP-dependent plugins need careful design - technical users don't know MCP server names, so file discovery is better than asking questions
3. Testing both happy and unhappy paths is critical - the "no MCP servers" experience is often overlooked but affects adoption

**Context window management:**
- Cursor IDE injects significant system reminder overhead compared to terminal CLI
- ToolSearch calls in error conditions consume substantial context with verbose output
- For plugin testing, terminal-based testing may be more efficient

**Progressive disclosure in skill design:**
- Core SKILL.md should contain essential workflow only
- Detailed rules, examples, and edge cases belong in references/ folder
- This pattern improves readability while preserving comprehensive guidance

## CLAUDE.md Suggestions

### For Project CLAUDE.md

```suggestion:project
## Plugin Development

**MCP dependency testing** - When building plugins that depend on MCP servers, always test both scenarios:
1. **Happy path** - MCP servers configured and working
2. **Unhappy path** - MCP servers missing or misconfigured

The setup experience for missing dependencies often determines plugin adoption success.

**Setup skill patterns** - For technical dependencies (MCP servers, API keys), use file discovery rather than asking users technical questions:
- Search user's other projects for existing configs: `find ~/Documents/Projects -name ".mcp.json"`
- Offer to copy working configs instead of manual configuration
- Provide fallback to guided setup with web search for package discovery

**Progressive disclosure** - Structure plugin skills with:
- Core SKILL.md: Essential workflow and steps only
- references/ folder: Detailed rules, examples, edge cases, templates
- This improves skill readability while preserving comprehensive documentation
```

### For Global ~/.claude/CLAUDE.md

```suggestion:global
## Plugin Development Testing

**Context optimization for plugin testing** - When testing plugins extensively, prefer terminal CLI over Cursor/IDE mode. IDE system reminders and file modification notifications consume significant context during iterative testing.

**MCP server dependency patterns** - Plugin setup skills should discover existing MCP configurations via file search (`find ~/Documents/Projects -name ".mcp.json"`) rather than asking users technical questions they may not know how to answer.
```