# Creating the Perfect CLAUDE.md for Claude Code

**Source:** https://dometrain.com/blog/creating-the-perfect-claudemd-for-claude-code/
**Author:** Ivan Kahl | **Date:** January 15, 2026
**Saved:** 2026-01-17

---

## Core Concept

CLAUDE.md is "persistent memory" for AI agents - project documentation stored in repo root that provides context across sessions. Contains terminal commands, workflows, domain terminology, and coding/architectural standards.

## Six Key Sections

### 1. Terminal Commands
Document all dev commands with specific flags and arguments. Don't assume the agent knows your team's conventions.

Example patterns:
- Build/test/run commands with project specifications
- Database migrations with explicit project parameters
- Frontend commands (install, dev, build, lint, test)

### 2. Workflows
Step-by-step procedures for common tasks. Removes guesswork.

Example "Creating API Endpoint" workflow:
1. Plan changes, get user confirmation
2. Implement the endpoint
3. Update .http files with documentation
4. Test using specified tools

### 3. Code Style Guidelines
Document conventions across languages:
- Naming conventions (PascalCase, camelCase, etc.)
- Indentation preferences
- Documentation requirements (XML docs, JSDoc)
- Test naming patterns (method_conditions_outcome)
- Commit message format (conventional commits with scopes)

### 4. Domain-Specific Terminology
Map business jargon to code concepts. Critical for domain-driven projects.

Example (fitness app):
- "Wraps" = annual video summaries
- "Athlete" = Users in system
- "Track" = GPX file segments

### 5. Architecture Documentation
Map file structure and design patterns:
- Layer organization (Clean Architecture, etc.)
- Routing structure
- Test file organization
- Which patterns are used where

### 6. MCP Instructions
Guide agents on third-party tool usage:
- When to use specific MCP servers
- What NOT to do directly (e.g., "Never run terminal commands directly for Shadcn")

---

## Best Practices

### Keep It Concise
Context window is precious. Link to separate docs instead of embedding everything:
> "Instead of summarizing your C# coding standards in the CLAUDE.md file, you can replace it with: Read `docs/csharp-standards.md` when modifying any C# files."

### Living Document
Continuously update based on:
- Agent behavior patterns you observe
- Gaps that cause repeated mistakes
- New conventions as they emerge

### Version Control
- Check into source control (team consistency)
- Avoid secrets or sensitive connection strings
- All team members and agents get identical guidance

---

## Expected Outcomes

- Fewer agent errors
- Code consistency with team standards
- Less correction needed
- Lower token usage (clear context upfront)

---

## Lessons for My System

1. **Link, don't embed** - My CLAUDE.md files could reference separate docs for detailed standards instead of growing forever

2. **Workflows are powerful** - Step-by-step procedures (like I have for `/log` and `/save`) reduce agent guesswork

3. **Domain terminology matters** - I should document business terms for Razzo/CPF so Claude understands context

4. **Architecture mapping** - Documenting folder structure explicitly (like I do for Chief of Staff) is a best practice

5. **MCP instructions** - I have calendar/email MCPs; could add guidance on when to use them
