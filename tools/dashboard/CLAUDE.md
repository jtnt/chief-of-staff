# Dashboard CLAUDE.md

Browser-based dashboard for Chief of Staff. No build step, no server, no framework. Chrome only (File System Access API). Open `index.html` to run.

## Gotchas

- **Never use `alert()`, `confirm()`, or `prompt()`.** Browser dialogs block Claude-in-Chrome's event loop and freeze the session.
- New HTML pages must define `onConnected()` (called by app.js after filesystem access) and `onCheckboxToggled()` (called after task checkbox changes).
