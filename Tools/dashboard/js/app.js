/* ============================================
   CoS Dashboard — Shared Application Module
   File System Access API, parsers, renderers

   SECURITY NOTE: This dashboard reads ONLY from the user's
   local filesystem (~/Documents/Projects/). All rendered content
   originates from the user's own markdown files. There is no
   server, no external data, no untrusted input. innerHTML usage
   is appropriate here as the data source is trusted local files.
   ============================================ */

// ─── State ───────────────────────────────────────────
const state = {
  rootHandle: null,       // FileSystemDirectoryHandle for ~/Documents/Projects/
  projects: [],           // Discovered projects [{name, slug, path, status, category}]
  cosInbox: null,         // Parsed Tasks section from project-knowledge.md
  projectIndex: null,     // Raw project-index.md content
  pendingSuggestionCount: 0, // Files with pending CLAUDE.md suggestions
  healthAlerts: [],       // [{project, issue}] — populated by scanHealthAlerts()
  healthDotLevel: 'green', // 'green' | 'amber' | 'red'
  allTasks: [],           // Cross-project tasks [{item, filePath, projectName, projectSlug, sectionName, priority}]
  totalPendingCount: 0,   // All unchecked items + subtasks across all projects
};

// ─── IndexedDB for directory handle persistence ──────
const DB_NAME = 'cos-dashboard';
const DB_VERSION = 1;
const STORE_NAME = 'handles';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveHandle(handle) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).put(handle, 'rootDir');
  return new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function loadHandle() {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const req = tx.objectStore(STORE_NAME).get('rootDir');
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

// ─── File System Access API ──────────────────────────

// Hardcoded project root — the picker opens here directly.
// Browser requires a one-time user gesture to grant access;
// after that, Chrome remembers via IndexedDB and auto-connects.
const PROJECTS_DIR = 'Documents/Projects';

async function pickDirectory() {
  const handle = await window.showDirectoryPicker({
    mode: 'readwrite',
    startIn: 'documents',  // Opens near ~/Documents so user just clicks Projects/
  });
  await saveHandle(handle);
  state.rootHandle = handle;
  return handle;
}

async function tryRestoreHandle() {
  const handle = await loadHandle();
  if (!handle) return null;
  // Verify permission
  const perm = await handle.queryPermission({ mode: 'readwrite' });
  if (perm === 'granted') {
    state.rootHandle = handle;
    return handle;
  }
  // Permission expired — store handle so we can re-request on user click
  state.pendingHandle = handle;
  return null;
}

// Called from a button click (user gesture) to re-grant permission
async function regrantPermission() {
  if (state.pendingHandle) {
    try {
      const perm = await state.pendingHandle.requestPermission({ mode: 'readwrite' });
      if (perm === 'granted') {
        state.rootHandle = state.pendingHandle;
        state.pendingHandle = null;
        await discoverProjects();
        buildSidebar(getCurrentSlug());
        if (typeof onConnected === 'function') onConnected();
        return true;
      }
    } catch (e) { /* fall through to picker */ }
  }
  // Fallback: open picker
  return await reconnectFS();
}

async function getSubDir(parent, ...segments) {
  let dir = parent;
  for (const seg of segments) {
    try {
      dir = await dir.getDirectoryHandle(seg);
    } catch (e) {
      return null;
    }
  }
  return dir;
}

async function readFile(dirHandle, ...pathParts) {
  try {
    let dir = dirHandle;
    const parts = [...pathParts]; // Don't mutate original
    const fileName = parts.pop();
    for (const part of parts) {
      dir = await dir.getDirectoryHandle(part);
    }
    const fileHandle = await dir.getFileHandle(fileName);
    const file = await fileHandle.getFile();
    return await file.text();
  } catch (e) {
    return null;
  }
}

async function writeFile(dirHandle, pathParts, content, createIfMissing) {
  try {
    let dir = dirHandle;
    const fileName = pathParts[pathParts.length - 1];
    for (let i = 0; i < pathParts.length - 1; i++) {
      dir = await dir.getDirectoryHandle(pathParts[i]);
    }
    const fileHandle = await dir.getFileHandle(fileName, createIfMissing ? { create: true } : undefined);
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
    return true;
  } catch (e) {
    console.error('Write failed:', e);
    return false;
  }
}

async function listDir(dirHandle, ...pathParts) {
  try {
    let dir = dirHandle;
    for (const part of pathParts) {
      dir = await dir.getDirectoryHandle(part);
    }
    const entries = [];
    for await (const [name, handle] of dir.entries()) {
      entries.push({ name, kind: handle.kind });
    }
    return entries;
  } catch (e) {
    return [];
  }
}

// ─── Project Discovery ───────────────────────────────

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function relativePathFromAbsolute(absPath) {
  // Convert /Users/jtnt/Documents/Projects/Foo → Foo
  // /Users/jtnt/Documents/Projects/Clients/Bar → Clients/Bar
  // /Users/jtnt/Documents/Projects/Code/baz → Code/baz
  const marker = '/Documents/Projects/';
  const idx = absPath.indexOf(marker);
  if (idx >= 0) return absPath.slice(idx + marker.length);
  return absPath;
}

async function discoverProjects() {
  const sourcesContent = await readFile(state.rootHandle, 'Chief of Staff', 'project-sources.md');
  if (!sourcesContent) return [];

  const indexContent = await readFile(state.rootHandle, 'Chief of Staff', 'project-index.md');

  const projects = [];
  const lines = sourcesContent.split('\n');
  let currentName = null;
  let currentSource = null;

  for (const line of lines) {
    const nameMatch = line.match(/^## (.+)$/);
    if (nameMatch) {
      if (currentName && currentSource) {
        projects.push({ name: currentName, source: currentSource });
      }
      currentName = nameMatch[1].trim();
      currentSource = null;
      continue;
    }
    const sourceMatch = line.match(/\*\*Source:\*\*\s*`([^`]+)`/);
    if (sourceMatch && currentName) {
      currentSource = sourceMatch[1].trim();
    }
  }
  if (currentName && currentSource) {
    projects.push({ name: currentName, source: currentSource });
  }

  // Enrich with status/category from project-index.md
  const enriched = projects.map(p => {
    const slug = slugify(p.name);
    const relPath = relativePathFromAbsolute(p.source);
    let status = 'Active';
    let category = 'projects';

    if (indexContent) {
      // Find status line near the project heading
      const headingPattern = new RegExp(`### ${escapeRegex(p.name)}[\\s\\S]*?\\*\\*Status:\\*\\*\\s*(.+?)\\n`, 'i');
      const match = indexContent.match(headingPattern);
      if (match) {
        const statusLine = match[1].trim();
        if (/paused/i.test(statusLine)) status = 'Paused';
        else if (/client/i.test(statusLine)) status = 'Client';
        else if (/infrastructure/i.test(statusLine)) status = 'Infrastructure';
        else if (/learning/i.test(statusLine)) status = 'Learning';
        else if (/utility|tool/i.test(statusLine)) status = 'Tool';
        else if (/personal/i.test(statusLine)) status = 'Personal';
        else if (/r&d|product/i.test(statusLine)) status = 'R&D';
        else if (/exploration/i.test(statusLine)) status = 'Exploration';
        else if (/repository/i.test(statusLine)) status = 'Repository';
        else status = 'Active';
      }
    }

    // Categorize based on path or status
    if (/^Clients\//i.test(relPath)) category = 'clients';
    else if (/^Code\//i.test(relPath)) category = 'tools';
    else if (/paused/i.test(status)) category = 'paused';
    else if (p.name === 'Chief of Staff') category = 'infrastructure';
    else category = 'active';

    return { name: p.name, slug, relPath, status, category };
  });

  // Load task counts + last activity date for each project (parallel)
  await Promise.all(enriched.map(async (p) => {
    const pathParts = p.relPath.split('/').filter(Boolean);

    // Task count from ## Tasks section in project-knowledge.md
    const content = await readFile(state.rootHandle, ...pathParts, 'project-knowledge.md');
    if (content) {
      const tasksSection = extractTasksSection(content);
      p.inboxCount = tasksSection ? (tasksSection.text.match(/^- \[ \]/gm) || []).length : 0;
    } else {
      p.inboxCount = 0;
    }

    // Last activity from most recent log filename (YYYYMMDD-*.md)
    p.lastLogDate = '';
    const logEntries = await listDir(state.rootHandle, ...pathParts, 'logs');
    if (logEntries.length) {
      const dated = logEntries
        .filter(e => e.kind === 'file' && /^\d{8}-/.test(e.name))
        .map(e => e.name.slice(0, 8))
        .sort();
      if (dated.length) {
        const d = dated[dated.length - 1];
        p.lastLogDate = d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8);
      }
    }
  }));

  state.projects = enriched;
  return enriched;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Extract ## Tasks section from project-knowledge.md content
// Returns { text, lineOffset } where lineOffset is the 0-based line number
// of the ## Tasks heading within the full file content.
function extractTasksSection(content) {
  if (!content) return null;
  const idx = content.indexOf('\n## Tasks\n');
  if (idx === -1) {
    // Check if file starts with ## Tasks
    if (!content.startsWith('## Tasks\n')) return null;
    const fromTasks = content;
    const nextHeading = fromTasks.search(/\n## (?!#)/);
    return { text: nextHeading === -1 ? fromTasks : fromTasks.substring(0, nextHeading), lineOffset: 0 };
  }
  const fromTasks = content.substring(idx + 1); // skip the leading \n
  const nextHeading = fromTasks.search(/\n## (?!#)/);
  const text = nextHeading === -1 ? fromTasks : fromTasks.substring(0, nextHeading);
  const lineOffset = content.substring(0, idx + 1).split('\n').length - 1;
  return { text, lineOffset };
}

// Extract a non-generic heading from markdown content
function extractHeadingTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  if (!match) return null;
  const heading = match[1];
  // Skip generic headings
  if (/^(session (log|patterns?))$/i.test(heading.replace(/^.+:\s*/, ''))) return null;
  return heading;
}

// Strip "ProjectName: " or "ProjectName — " prefix from titles
function stripProjectPrefix(title) {
  return title.replace(/^[^:—]+[:\u2014]\s+/u, '');
}

// Convert "2026-02-07 07:19 PM EST" → "2026-02-07 19:19" for correct string sorting
function toSortableDate(dateStr) {
  const m = dateStr.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return dateStr;
  let hour = parseInt(m[2]);
  if (m[4].toUpperCase() === 'PM' && hour !== 12) hour += 12;
  if (m[4].toUpperCase() === 'AM' && hour === 12) hour = 0;
  return m[1] + ' ' + String(hour).padStart(2, '0') + ':' + m[3];
}

// Normalize date display: "YYYY-MM-DD h:mm PM" (EST) or "YYYY-MM-DD" (no time)
// Handles both 12-hour (h:mm AM/PM) and 24-hour (HH:mm) formats with optional timezones
function formatDisplayDate(dateStr) {
  if (!dateStr) return '';

  // Try 12-hour format first: YYYY-MM-DD h:mm AM/PM [TZ]
  let m = dateStr.match(/^(\d{4}-\d{2}-\d{2})(?:\s+(\d{1,2}):(\d{2})\s*(AM|PM)(?:\s+(.+))?)?$/i);
  if (m) {
    const datePart = m[1];
    if (!m[2]) return datePart; // Date-only

    let hour = parseInt(m[2]);
    const min = m[3];
    const ampm = m[4].toUpperCase();
    const tz = (m[5] || '').trim();

    // Convert to 24h
    let h24 = hour;
    if (ampm === 'PM' && hour !== 12) h24 += 12;
    if (ampm === 'AM' && hour === 12) h24 = 0;

    // Apply timezone offset to EST
    const tzOffsets = { 'PST': 3, 'PDT': 3, 'CST': 1, 'CDT': 1, 'MST': 2, 'MDT': 2, 'EST': 0, 'EDT': 0 };
    const offset = tzOffsets[tz] || 0;
    h24 += offset;
    if (h24 >= 24) h24 -= 24;
    if (h24 < 0) h24 += 24;

    // Convert back to 12h
    const displayAmpm = h24 >= 12 ? 'PM' : 'AM';
    const display12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;

    return datePart + '  ' + display12 + ':' + min + ' ' + displayAmpm;
  }

  // Try 24-hour format: YYYY-MM-DD HH:mm [TZ]
  m = dateStr.match(/^(\d{4}-\d{2}-\d{2})(?:\s+(\d{1,2}):(\d{2})(?:\s+(.+))?)?$/);
  if (m) {
    const datePart = m[1];
    if (!m[2]) return datePart; // Date-only

    let h24 = parseInt(m[2]);
    const min = m[3];
    const tz = (m[4] || '').trim();

    // Apply timezone offset to EST
    const tzOffsets = { 'PST': 3, 'PDT': 3, 'CST': 1, 'CDT': 1, 'MST': 2, 'MDT': 2, 'EST': 0, 'EDT': 0 };
    const offset = tzOffsets[tz] || 0;
    h24 += offset;
    if (h24 >= 24) h24 -= 24;
    if (h24 < 0) h24 += 24;

    // Convert to 12h
    const displayAmpm = h24 >= 12 ? 'PM' : 'AM';
    const display12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;

    return datePart + '  ' + display12 + ':' + min + ' ' + displayAmpm;
  }

  // Fallback: return as-is if no pattern matches
  return dateStr;
}

function groupProjects(projects) {
  const groups = {
    active: { label: 'Active', items: [] },
    clients: { label: 'Client Projects', items: [] },
    tools: { label: 'Tools & Code', items: [] },
    infrastructure: { label: 'Infrastructure', items: [] },
    paused: { label: 'Paused', items: [] },
  };
  for (const p of projects) {
    const key = groups[p.category] ? p.category : 'active';
    groups[key].items.push(p);
  }
  // Sort each group: open tasks (desc), then last activity (desc)
  for (const g of Object.values(groups)) {
    g.items.sort((a, b) => {
      if (b.inboxCount !== a.inboxCount) return b.inboxCount - a.inboxCount;
      return (b.lastLogDate || '').localeCompare(a.lastLogDate || '');
    });
  }
  return groups;
}

// ─── Inbox Parser ────────────────────────────────────

function parseInbox(content, lineOffset) {
  if (!content) return { sections: [], raw: '' };
  const baseOffset = lineOffset || 0;

  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  let lineNumber = baseOffset;

  for (const line of lines) {
    lineNumber++;

    // Section headers — match both ## and ### (Tasks uses ### for subsections)
    const sectionMatch = line.match(/^#{2,3} (.+)$/);
    if (sectionMatch) {
      currentSection = { name: sectionMatch[1].trim(), items: [] };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection) continue;

    // Top-level task: - [ ] or - [x]
    const taskMatch = line.match(/^- \[([ x])\] (.+)$/);
    if (taskMatch) {
      const checked = taskMatch[1] === 'x';
      const rawText = taskMatch[2];
      const item = parseTaskLine(rawText, checked, lineNumber, line);
      currentSection.items.push(item);
      continue;
    }

    // Sub-task (indented): starts with spaces + - [ ] or - [x]
    const subMatch = line.match(/^\s+- \[([ x])\] (.+)$/);
    if (subMatch && currentSection.items.length > 0) {
      const checked = subMatch[1] === 'x';
      const rawText = subMatch[2];
      const parent = currentSection.items[currentSection.items.length - 1];
      if (!parent.subtasks) parent.subtasks = [];
      parent.subtasks.push(parseSubtaskLine(rawText, checked, lineNumber, line));
      continue;
    }

    // Description sub-bullet (indented dash, no checkbox) — new format
    const descMatch = line.match(/^\s+- (?!\[[ x]\])(.+)$/);
    if (descMatch && currentSection.items.length > 0) {
      const parent = currentSection.items[currentSection.items.length - 1];
      // Only treat as description if parent has no context yet
      if (!parent.context) {
        const descText = descMatch[1].trim();
        // Extract source, date, link from the description line
        const sourceMatch = descText.match(/`#(\w+)`/);
        if (sourceMatch) parent.source = sourceMatch[1];
        const dateMatch = descText.match(/`(\d{4}-\d{2}-\d{2})`/);
        if (dateMatch) parent.date = dateMatch[1];
        const linkMatch = descText.match(/\[\[(.+?)\]\]/);
        if (linkMatch) parent.link = linkMatch[1];
        // Context is the text minus tags and links
        parent.context = descText
          .replace(/`#\w+`/g, '')
          .replace(/`\d{4}-\d{2}-\d{2}`/g, '')
          .replace(/\[\[.+?\]\]/g, '')
          .trim();
      }
    }
  }

  return { sections, raw: content };
}

function parseTaskLine(text, checked, lineNumber, rawLine) {
  // Extract **Title** — context `#source` `date` [[link]] done:date
  let title = '';
  let context = '';
  let source = '';
  let date = '';
  let link = '';
  let doneDate = '';

  // Title: **text**
  const titleMatch = text.match(/\*\*(.+?)\*\*/);
  if (titleMatch) title = titleMatch[1];

  // Context: everything between ** — and first backtick
  const contextMatch = text.match(/\*\*\s*—\s*(.+?)(?:\s*`|$)/);
  if (contextMatch) context = contextMatch[1].trim();

  // Source: `#word`
  const sourceMatch = text.match(/`#(\w+)`/);
  if (sourceMatch) source = sourceMatch[1];

  // Date: `YYYY-MM-DD` (not a source tag)
  const dateMatch = text.match(/`(\d{4}-\d{2}-\d{2})`/);
  if (dateMatch) date = dateMatch[1];

  // Wikilink: [[path]]
  const linkMatch = text.match(/\[\[(.+?)\]\]/);
  if (linkMatch) link = linkMatch[1];

  // Done date
  const doneMatch = text.match(/done:(\d{4}-\d{2}-\d{2})/);
  if (doneMatch) doneDate = doneMatch[1];

  return { title, context, source, date, link, doneDate, checked, lineNumber, rawLine, subtasks: [] };
}

function parseSubtaskLine(text, checked, lineNumber, rawLine) {
  // Simpler: just text with optional `due:date` or `done:date`
  let due = '';
  let done = '';
  let cleanText = text;

  const dueMatch = text.match(/`due:(\d{4}-\d{2}-\d{2})`/);
  if (dueMatch) { due = dueMatch[1]; cleanText = cleanText.replace(dueMatch[0], '').trim(); }

  const doneMatch = text.match(/`done:(\d{4}-\d{2}-\d{2})`/);
  if (doneMatch) { done = doneMatch[1]; cleanText = cleanText.replace(doneMatch[0], '').trim(); }

  // Also handle done:date without backticks
  const doneMatch2 = text.match(/done:(\d{4}-\d{2}-\d{2})/);
  if (!done && doneMatch2) { done = doneMatch2[1]; cleanText = cleanText.replace(doneMatch2[0], '').trim(); }

  return { text: cleanText, checked, due, done, lineNumber, rawLine };
}

// ─── Toggle Checkbox in Inbox ────────────────────────

async function toggleInboxCheckbox(filePath, lineNumber, newChecked, expectedLine) {
  const pathParts = filePath.split('/');
  const content = await readFile(state.rootHandle, ...pathParts);
  if (!content) return false;

  const lines = content.split('\n');
  let idx = lineNumber - 1;
  if (idx < 0 || idx >= lines.length) return false;

  // Validate line content matches what was displayed — guards against
  // external edits (Obsidian, Claude Code) shifting line numbers.
  if (expectedLine && lines[idx] !== expectedLine) {
    const newIdx = lines.indexOf(expectedLine);
    if (newIdx >= 0) {
      idx = newIdx;
    } else {
      console.error('toggleInboxCheckbox: line shifted and content not found:', expectedLine);
      return false;
    }
  }

  const isTopLevel = /^- \[[ x]\]/.test(lines[idx]);
  const hasDescLine = isTopLevel && idx + 1 < lines.length && /^\t- (?!\[[ x]\])/.test(lines[idx + 1]);

  if (newChecked) {
    lines[idx] = lines[idx].replace('[ ]', '[x]');
    const today = new Date().toISOString().split('T')[0];
    if (hasDescLine) {
      if (!lines[idx + 1].includes('done:')) {
        lines[idx + 1] = lines[idx + 1].trimEnd() + ` done:${today}`;
      }
    } else if (!lines[idx].includes('done:')) {
      lines[idx] = lines[idx].trimEnd() + ` done:${today}`;
    }

    // Auto-move top-level tasks to Done section (if not already there)
    if (isTopLevel) {
      const currentSection = findSectionForLine(lines, idx);
      if (currentSection && currentSection !== 'Done') {
        const blockEnd = findTaskBlockEnd(lines, idx);
        const block = lines.splice(idx, blockEnd - idx);
        // Find Done section header and insert after it
        const doneIdx = lines.findIndex(l => /^#{2,3} Done/.test(l));
        if (doneIdx >= 0) {
          // Insert after header (skip blank line if present)
          let insertAt = doneIdx + 1;
          if (insertAt < lines.length && lines[insertAt].trim() === '') insertAt++;
          lines.splice(insertAt, 0, ...block);
        }
      }
    }
  } else {
    lines[idx] = lines[idx].replace('[x]', '[ ]');
    if (hasDescLine) {
      lines[idx + 1] = lines[idx + 1].replace(/\s*done:\d{4}-\d{2}-\d{2}/, '');
    }
    lines[idx] = lines[idx].replace(/\s*done:\d{4}-\d{2}-\d{2}/, '');
  }

  return await writeFile(state.rootHandle, pathParts, lines.join('\n'));
}

// Find which section (## or ###) a line belongs to
function findSectionForLine(lines, lineIdx) {
  for (let i = lineIdx; i >= 0; i--) {
    const m = lines[i].match(/^#{2,3} (.+)$/);
    if (m) return m[1].trim();
  }
  return null;
}

// Find the end of a task block (title + desc + subtasks)
function findTaskBlockEnd(lines, startIdx) {
  let i = startIdx + 1;
  while (i < lines.length) {
    // Stop at next top-level task, section header, or non-indented non-blank line
    if (/^- \[[ x]\]/.test(lines[i])) break;
    if (/^#{2,3} /.test(lines[i])) break;
    if (lines[i].trim() !== '' && !/^\s/.test(lines[i])) break;
    // Stop at blank lines only if next non-blank is a new task or section
    if (lines[i].trim() === '') {
      let next = i + 1;
      while (next < lines.length && lines[next].trim() === '') next++;
      if (next >= lines.length || /^- \[[ x]\]/.test(lines[next]) || /^#{2,3} /.test(lines[next])) break;
    }
    i++;
  }
  return i;
}

// ─── Archive Completed Items ─────────────────────────

async function archiveCompletedItems(filePath) {
  const pathParts = filePath.split('/');
  const content = await readFile(state.rootHandle, ...pathParts);
  if (!content) return false;

  const lines = content.split('\n');
  const today = new Date().toISOString().split('T')[0];

  // Find Done section
  const doneHeaderIdx = lines.findIndex(l => /^#{2,3} Done/.test(l));
  if (doneHeaderIdx < 0) return false;

  // Find end of Done section (next ## or EOF)
  let doneEndIdx = lines.length;
  for (let i = doneHeaderIdx + 1; i < lines.length; i++) {
    if (/^#{2,3} /.test(lines[i])) { doneEndIdx = i; break; }
  }

  // Extract completed task blocks from Done section
  const doneLines = lines.slice(doneHeaderIdx + 1, doneEndIdx);
  const archiveBlocks = [];
  let i = 0;
  while (i < doneLines.length) {
    if (/^- \[x\]/.test(doneLines[i])) {
      const blockStart = i;
      i++;
      while (i < doneLines.length && !/^- \[[ x]\]/.test(doneLines[i]) && !/^#{2,3} /.test(doneLines[i])) {
        if (doneLines[i].trim() === '' && (i + 1 >= doneLines.length || /^- \[[ x]\]/.test(doneLines[i + 1]))) break;
        i++;
      }
      const block = doneLines.slice(blockStart, i);
      // Ensure done:date exists somewhere in the block
      const hasDoneDate = block.some(l => /done:\d{4}-\d{2}-\d{2}/.test(l));
      if (!hasDoneDate) {
        // Add done:today as fallback (for items checked in Obsidian without a date)
        if (block.length > 1 && /^\t- /.test(block[1])) {
          block[1] = block[1].trimEnd() + ` done:${today}`;
        } else {
          block[0] = block[0].trimEnd() + ` done:${today}`;
        }
      }
      archiveBlocks.push(block);
    } else {
      i++;
    }
  }

  if (archiveBlocks.length === 0) return false;

  // Build archive content
  const archivePathParts = [...pathParts];
  archivePathParts[archivePathParts.length - 1] = archivePathParts[archivePathParts.length - 1].replace('.md', '-archive.md');

  let archiveContent = await readFile(state.rootHandle, ...archivePathParts);
  if (!archiveContent) {
    // Create new archive file
    const inboxName = pathParts[pathParts.length - 1].replace('.md', '');
    archiveContent = '# ' + inboxName + ' — Archive\n\nCompleted items archived from ' + pathParts.join('/') + '.\n';
  }

  // Append archived items with date header
  const monthHeader = '\n## Archived ' + today + '\n';
  const archivedText = archiveBlocks.map(b => b.join('\n')).join('\n');
  archiveContent = archiveContent.trimEnd() + '\n' + monthHeader + '\n' + archivedText + '\n';

  // Write archive (create if needed)
  const dirParts = archivePathParts.slice(0, -1);
  const archiveFileName = archivePathParts[archivePathParts.length - 1];
  let dir = state.rootHandle;
  for (const part of dirParts) {
    dir = await dir.getDirectoryHandle(part);
  }
  try {
    const fileHandle = await dir.getFileHandle(archiveFileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(archiveContent);
    await writable.close();
  } catch (e) {
    console.error('Archive write failed:', e);
    return false;
  }

  // Remove archived items from Done section, keep header
  const keptDoneLines = doneLines.filter((l, idx) => {
    // Keep blank lines and unchecked items
    for (const block of archiveBlocks) {
      const blockStartLine = block[0];
      if (l === blockStartLine && /^- \[x\]/.test(l)) return false;
    }
    return true;
  });

  // Simpler: rebuild by removing all [x] task blocks from Done
  const newDoneLines = [];
  let j = 0;
  while (j < doneLines.length) {
    if (/^- \[x\]/.test(doneLines[j])) {
      // Skip this block
      j++;
      while (j < doneLines.length && !/^- \[[ x]\]/.test(doneLines[j]) && !/^#{2,3} /.test(doneLines[j])) {
        if (doneLines[j].trim() === '' && (j + 1 >= doneLines.length || /^- \[[ x]\]/.test(doneLines[j + 1]))) break;
        j++;
      }
    } else {
      newDoneLines.push(doneLines[j]);
      j++;
    }
  }

  // Rebuild file
  const before = lines.slice(0, doneHeaderIdx + 1);
  const after = lines.slice(doneEndIdx);
  const rebuilt = [...before, ...newDoneLines, ...after];

  return await writeFile(state.rootHandle, pathParts, rebuilt.join('\n'));
}

// ─── Log Parser ──────────────────────────────────────

async function loadProjectLogs(relPath) {
  const pathParts = relPath.split('/').filter(Boolean);
  const entries = await listDir(state.rootHandle, ...pathParts, 'logs');
  if (!entries.length) return [];

  const logs = [];
  for (const entry of entries) {
    if (entry.kind !== 'file' || !entry.name.endsWith('.md')) continue;

    const content = await readFile(state.rootHandle, ...pathParts, 'logs', entry.name);
    if (!content) continue;

    // Extract date from filename: YYYYMMDD-...
    const dateMatch = entry.name.match(/^(\d{4})(\d{2})(\d{2})-(.+)\.md$/);
    let date = '';
    let titleSlug = entry.name.replace('.md', '');

    if (dateMatch) {
      date = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
      titleSlug = dateMatch[4].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    // Extract YAML frontmatter first (needed for title)
    let frontmatter = {};
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (fmMatch) {
      for (const line of fmMatch[1].split('\n')) {
        const kv = line.match(/^(\w+):\s*(.+)$/);
        if (kv) frontmatter[kv[1]] = kv[2].trim();
      }
    }

    // Title priority: frontmatter title > non-generic heading > filename slug
    const title = stripProjectPrefix(
      frontmatter.title || extractHeadingTitle(content) || titleSlug
    );

    // Extract first non-heading, non-empty line as preview (strip frontmatter first)
    let contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n?/, '');
    const previewLines = contentWithoutFrontmatter.split('\n').filter(l => {
      const trimmed = l.trim();
      if (!trimmed) return false;
      if (trimmed.startsWith('#')) return false;
      if (trimmed.startsWith('**Date:**')) return false; // Skip redundant date lines
      return true;
    });
    const preview = previewLines[0] || '';

    // Extract session ID from transcript path (UUID before .jsonl)
    let sessionId = null;
    if (frontmatter.transcript) {
      const idMatch = frontmatter.transcript.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.jsonl$/);
      if (idMatch) sessionId = idMatch[1];
    }

    const displayDate = frontmatter.date || date;

    // Expand preview to capture full sentences (look for sentence endings)
    let previewText = preview;
    if (previewText.length > 200) {
      // Try to cut at sentence boundary within 250 chars
      const sentenceEnd = previewText.slice(0, 250).search(/[.!?]\s/);
      if (sentenceEnd > 100) {
        previewText = previewText.slice(0, sentenceEnd + 1);
      } else {
        previewText = previewText.slice(0, 200) + '...';
      }
    }

    logs.push({
      filename: entry.name,
      date: displayDate,
      sortDate: toSortableDate(displayDate),
      title,
      preview: previewText,
      content,
      type: frontmatter.type || 'session',
      sessionId,
    });
  }

  // Sort newest first (using 24h-normalized date for correct ordering)
  logs.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  return logs;
}

// ─── Simple Markdown Renderer ────────────────────────
// Data source is ONLY the user's own local markdown files.
// No external/untrusted content is ever rendered.

function renderMarkdown(text) {
  if (!text) return '';

  // Remove YAML frontmatter
  text = text.replace(/^---\n[\s\S]*?\n---\n?/, '');

  let html = text;

  // Escape HTML entities from source files
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return '<pre><code class="lang-' + lang + '">' + code.trim() + '</code></pre>';
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

  // Unordered lists (simple — one level)
  html = html.replace(/^(\s*)- (.+)$/gm, (_, indent, content) => {
    return indent + '<li>' + content + '</li>';
  });
  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>[\s\S]*?<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Paragraphs: wrap non-tag lines
  html = html.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (/^<(h[1-6]|ul|ol|li|pre|blockquote|hr|div)/.test(trimmed)) return line;
    if (/^<\//.test(trimmed)) return line;
    return '<p>' + trimmed + '</p>';
  }).join('\n');

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');

  return html;
}

// ─── Sidebar Builder ─────────────────────────────────

function buildSidebar(activeSlug) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const groups = groupProjects(state.projects);
  const currentPage = window.location.pathname.split('/').pop();
  const isHome = currentPage === 'index.html' || currentPage === '' || currentPage === 'dashboard';
  const isPatterns = currentPage === 'patterns.html';
  const isHealth = currentPage === 'health.html';

  // Build sidebar using DOM methods
  sidebar.textContent = ''; // Clear

  // Brand
  const brand = document.createElement('div');
  brand.className = 'sidebar-brand';
  const h1 = document.createElement('h1');
  h1.textContent = 'Chief of Staff';
  brand.appendChild(h1);
  sidebar.appendChild(brand);

  // Home + CoS links (pinned at top)
  const homeSection = document.createElement('div');
  homeSection.className = 'sidebar-section';

  const homeLink = document.createElement('a');
  homeLink.className = 'sidebar-item' + (isHome && !activeSlug ? ' active' : '');
  homeLink.href = 'index.html';
  const homeIcon = document.createElement('span');
  homeIcon.className = 'icon';
  homeIcon.textContent = '\u2630';
  homeLink.appendChild(homeIcon);
  homeLink.appendChild(document.createTextNode(' Home / Inbox'));
  homeSection.appendChild(homeLink);

  // Patterns link
  const patternsLink = document.createElement('a');
  patternsLink.className = 'sidebar-item' + (isPatterns ? ' active' : '');
  patternsLink.href = 'patterns.html';
  patternsLink.title = 'Session Patterns';
  const patternsIcon = document.createElement('span');
  patternsIcon.className = 'icon';
  patternsIcon.textContent = '\u25C6';
  patternsLink.appendChild(patternsIcon);
  patternsLink.appendChild(document.createTextNode(' Patterns'));

  // Add amber dot if suggestions pending (stored on state by patterns page or preloaded)
  if (state.pendingSuggestionCount > 0) {
    const dot = document.createElement('span');
    dot.className = 'sidebar-suggestion-dot';
    patternsLink.appendChild(dot);
  }
  homeSection.appendChild(patternsLink);

  // Health link
  const healthLink = document.createElement('a');
  healthLink.className = 'sidebar-item' + (isHealth ? ' active' : '');
  healthLink.href = 'health.html';
  healthLink.title = 'Project Health';
  const healthIcon = document.createElement('span');
  healthIcon.className = 'icon';
  healthIcon.textContent = '\u2764'; // heart
  healthLink.appendChild(healthIcon);
  healthLink.appendChild(document.createTextNode(' Health'));

  // Health dot indicator
  if (state.healthDotLevel && state.healthDotLevel !== 'green') {
    const healthDot = document.createElement('span');
    healthDot.className = 'sidebar-health-dot dot-' + state.healthDotLevel;
    healthLink.appendChild(healthDot);
  }
  homeSection.appendChild(healthLink);

  // Chief of Staff pinned at top
  const cosProject = state.projects.find(p => p.name === 'Chief of Staff');
  if (cosProject) {
    const cosLink = document.createElement('a');
    cosLink.className = 'sidebar-item' + (activeSlug === cosProject.slug ? ' active' : '');
    cosLink.href = 'project.html?project=' + cosProject.slug;
    cosLink.title = 'Chief of Staff';
    const cosIcon = document.createElement('span');
    cosIcon.className = 'icon';
    cosIcon.textContent = '\u2699';
    cosLink.appendChild(cosIcon);
    cosLink.appendChild(document.createTextNode(' Chief of Staff'));

    // CoS inbox badge
    if (cosProject.inboxCount > 0) {
      const cosBadge = document.createElement('span');
      cosBadge.className = 'sidebar-inbox-badge';
      if (cosProject.inboxCount >= 10) cosBadge.classList.add('crit');
      else if (cosProject.inboxCount >= 6) cosBadge.classList.add('warn');
      cosBadge.textContent = cosProject.inboxCount;
      cosLink.appendChild(cosBadge);
    }

    homeSection.appendChild(cosLink);
  }

  sidebar.appendChild(homeSection);

  // Project groups (CoS excluded — already pinned above)
  const groupOrder = ['active', 'clients', 'tools', 'paused'];
  const iconMap = { active: '\u25CF', clients: '\u2605', tools: '\u2699', infrastructure: '\u2699', paused: '\u25CB' };

  for (const key of groupOrder) {
    const group = groups[key];
    if (!group) continue;
    const items = group.items.filter(p => p.name !== 'Chief of Staff');
    if (!items.length) continue;

    const section = document.createElement('div');
    section.className = 'sidebar-section';

    const title = document.createElement('div');
    title.className = 'sidebar-section-title';
    title.textContent = group.label;
    section.appendChild(title);

    for (const p of items) {
      const link = document.createElement('a');
      link.className = 'sidebar-item' + (activeSlug === p.slug ? ' active' : '');
      link.href = 'project.html?project=' + p.slug;
      link.title = p.name;

      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.textContent = iconMap[p.category] || '\u25CF';
      link.appendChild(icon);
      link.appendChild(document.createTextNode(' ' + p.name));

      // Inbox count badge
      if (p.inboxCount > 0) {
        const badge = document.createElement('span');
        badge.className = 'sidebar-inbox-badge';
        if (p.inboxCount >= 10) badge.classList.add('crit');
        else if (p.inboxCount >= 6) badge.classList.add('warn');
        badge.textContent = p.inboxCount;
        link.appendChild(badge);
      }

      section.appendChild(link);
    }

    sidebar.appendChild(section);
  }

  // Footer
  const footer = document.createElement('div');
  footer.className = 'sidebar-footer';

  const statusDiv = document.createElement('div');
  statusDiv.className = 'connect-status' + (state.rootHandle ? ' connected' : '');
  statusDiv.id = 'connect-status';
  statusDiv.textContent = state.rootHandle ? '~/Documents/Projects/' : 'Not connected';
  footer.appendChild(statusDiv);

  sidebar.appendChild(footer);

  // Build quick-add bar in page header (only once)
  if (!document.querySelector('.quick-add-bar')) {
    buildQuickAddBar();
  }
}

// ─── Quick Add Task ──────────────────────────────────

async function addQuickTask(text, project) {
  if (!state.rootHandle || !text) return false;

  const pathParts = project
    ? project.relPath.split('/').filter(Boolean).concat('project-knowledge.md')
    : ['Chief of Staff', 'project-knowledge.md'];

  const content = await readFile(state.rootHandle, ...pathParts);
  if (!content) return false;

  const today = new Date().toISOString().split('T')[0];
  let title = text;
  let context = '';
  const dashIdx = text.indexOf(' \u2014 ');
  if (dashIdx > 0) {
    title = text.slice(0, dashIdx);
    context = text.slice(dashIdx + 3);
  }
  const newLine = context
    ? '- [ ] **' + title + '**\n\t- ' + context + ' `#manual` `' + today + '`'
    : '- [ ] **' + title + '**\n\t- `#manual` `' + today + '`';

  const lines = content.split('\n');
  let insertIdx = -1;

  // Find ## Tasks, then ### Inbox if it exists, otherwise insert at top of Tasks
  for (let i = 0; i < lines.length; i++) {
    if (/^## Tasks$/.test(lines[i])) {
      // Look for ### Inbox (CoS pattern)
      for (let j = i + 1; j < lines.length; j++) {
        if (/^### Inbox$/.test(lines[j])) {
          insertIdx = j + 1;
          while (insertIdx < lines.length && lines[insertIdx].trim() === '') insertIdx++;
          break;
        }
        if (/^#{2,3} /.test(lines[j]) && !/^### Inbox/.test(lines[j])) break;
      }
      if (insertIdx === -1) {
        insertIdx = i + 1;
        while (insertIdx < lines.length && lines[insertIdx].trim() === '') insertIdx++;
        // Insert before ### Done if it exists
        for (let j = insertIdx; j < lines.length; j++) {
          if (/^### Done$/.test(lines[j])) {
            insertIdx = j;
            while (insertIdx > i + 1 && lines[insertIdx - 1].trim() === '') insertIdx--;
            break;
          }
          if (/^## (?!#)/.test(lines[j])) break;
        }
      }
      break;
    }
  }

  if (insertIdx === -1) {
    // No ## Tasks section — append one
    lines.push('', '## Tasks', '');
    insertIdx = lines.length;
  }

  lines.splice(insertIdx, 0, newLine);
  return await writeFile(state.rootHandle, pathParts, lines.join('\n'));
}

function buildQuickAddBar() {
  const header = document.querySelector('.page-header') || document.querySelector('.project-header');
  if (!header) return;

  const bar = document.createElement('div');
  bar.className = 'quick-add-bar';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'quick-add-input';
  input.placeholder = 'Add task... (Title \u2014 context)';

  const select = document.createElement('select');
  select.className = 'quick-add-project';

  // CoS default
  const cosOpt = document.createElement('option');
  cosOpt.value = '';
  cosOpt.textContent = 'CoS Inbox';
  select.appendChild(cosOpt);

  // All non-paused projects
  const projects = state.projects.filter(p => p.name !== 'Chief of Staff' && p.category !== 'paused');
  if (projects.length) {
    for (const p of projects) {
      const opt = document.createElement('option');
      opt.value = p.slug;
      opt.textContent = p.name;
      select.appendChild(opt);
    }
  }

  const submit = async () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.disabled = true;
    select.disabled = true;

    const project = select.value ? state.projects.find(p => p.slug === select.value) : null;
    const ok = await addQuickTask(text, project);

    input.disabled = false;
    select.disabled = false;
    input.focus();
    if (ok && typeof onCheckboxToggled === 'function') onCheckboxToggled();
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submit();
  });

  bar.appendChild(input);
  bar.appendChild(select);
  header.appendChild(bar);
}

// ─── Triage Task ─────────────────────────────────────

async function triageTask(item, fromFilePath, destination) {
  const fromParts = fromFilePath.split('/');
  const content = await readFile(state.rootHandle, ...fromParts);
  if (!content) return false;

  const lines = content.split('\n');
  let startIdx = item.lineNumber - 1;

  // Validate line content matches — guards against external edits shifting lines.
  if (item.rawLine && (startIdx < 0 || startIdx >= lines.length || lines[startIdx] !== item.rawLine)) {
    const newIdx = lines.indexOf(item.rawLine);
    if (newIdx >= 0) {
      startIdx = newIdx;
    } else {
      console.error('triageTask: line shifted and content not found:', item.rawLine);
      return false;
    }
  }

  // Find extent of this task block (main line + indented continuation lines)
  let endIdx = startIdx + 1;
  while (endIdx < lines.length) {
    const line = lines[endIdx];
    if (/^- \[[ x]\]/.test(line) || /^#{2,3} /.test(line)) break;
    if (line.trim() === '') break;
    if (!/^\s/.test(line)) break;
    endIdx++;
  }

  const taskLines = lines.slice(startIdx, endIdx);

  if (typeof destination === 'string') {
    // Moving within same file (Inbox → Active or Backlog)
    lines.splice(startIdx, endIdx - startIdx);

    let insertIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (new RegExp('^### ' + escapeRegex(destination) + '$').test(lines[i])) {
        insertIdx = i + 1;
        while (insertIdx < lines.length && lines[insertIdx].trim() === '') insertIdx++;
        break;
      }
    }
    if (insertIdx === -1) return false;

    lines.splice(insertIdx, 0, ...taskLines);
    return await writeFile(state.rootHandle, fromParts, lines.join('\n'));
  } else {
    // Moving to a different project — read target FIRST before modifying source
    const toParts = destination.relPath.split('/').filter(Boolean).concat('project-knowledge.md');
    let toContent = await readFile(state.rootHandle, ...toParts);

    // If project-knowledge.md doesn't exist yet, create it with a Tasks section
    if (toContent === null) {
      toContent = '# ' + destination.name + '\n\n## Tasks\n';
      const createOk = await writeFile(state.rootHandle, toParts, toContent, true);
      if (!createOk) {
        console.error('triageTask: could not create project-knowledge.md at', toParts.join('/'));
        return false;
      }
    }

    const toLines = toContent.split('\n');
    let insertIdx = -1;

    for (let i = 0; i < toLines.length; i++) {
      if (/^## Tasks$/.test(toLines[i])) {
        insertIdx = i + 1;
        while (insertIdx < toLines.length && toLines[insertIdx].trim() === '') insertIdx++;
        // Insert before ### Done if it exists
        for (let j = insertIdx; j < toLines.length; j++) {
          if (/^### Done$/.test(toLines[j])) {
            insertIdx = j;
            while (insertIdx > i + 1 && toLines[insertIdx - 1].trim() === '') insertIdx--;
            break;
          }
          if (/^## (?!#)/.test(toLines[j])) break;
        }
        break;
      }
    }

    if (insertIdx === -1) {
      // No ## Tasks section — append one
      toLines.push('', '## Tasks', '');
      insertIdx = toLines.length;
    }

    toLines.splice(insertIdx, 0, ...taskLines);
    const writeTargetOk = await writeFile(state.rootHandle, toParts, toLines.join('\n'));
    if (!writeTargetOk) {
      console.error('triageTask: failed to write target', toParts.join('/'));
      return false;
    }

    // Only remove from source AFTER target write succeeded
    lines.splice(startIdx, endIdx - startIdx);
    return await writeFile(state.rootHandle, fromParts, lines.join('\n'));
  }
}

// ─── Reconnect FS ────────────────────────────────────

async function reconnectFS() {
  try {
    await pickDirectory();
    await discoverProjects();
    buildSidebar(getCurrentSlug());
    const statusEl = document.getElementById('connect-status');
    if (statusEl) {
      statusEl.textContent = 'Connected to Projects/';
      statusEl.classList.add('connected');
    }
    if (typeof onConnected === 'function') onConnected();
  } catch (e) {
    console.error('Failed to connect:', e);
  }
}

function getCurrentSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('project') || '';
}

// ─── Resume Session Buttons ─────────────────────────

function createResumeBtns(sessionId) {
  const wrap = document.createElement('span');
  wrap.className = 'resume-btns';
  wrap.appendChild(makeResumeBtn(sessionId, false));
  wrap.appendChild(makeResumeBtn(sessionId, true));
  return wrap;
}

function makeResumeBtn(sessionId, yolo) {
  const btn = document.createElement('button');
  btn.className = yolo ? 'resume-btn resume-yolo' : 'resume-btn';
  const label = yolo ? 'YOLO' : '\u25B6 Resume';
  btn.title = yolo ? 'Copy resume command (--dangerously-skip-permissions)' : 'Copy resume command';
  btn.textContent = label;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    let cmd = 'claude --resume ' + sessionId;
    if (yolo) cmd += ' --dangerously-skip-permissions';
    navigator.clipboard.writeText(cmd).then(() => {
      btn.textContent = '\u2713 Copied';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = label;
        btn.classList.remove('copied');
      }, 1500);
    });
  });
  return btn;
}

// ─── Render Task Item HTML ───────────────────────────
// Returns a DocumentFragment (safe DOM construction)

function createTaskItemEl(item, filePath, sectionName, projectName) {
  const frag = document.createDocumentFragment();

  // Main task
  const div = document.createElement('div');
  div.className = 'task-item' + (item.checked ? ' checked' : '');

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = item.checked;
  cb.addEventListener('change', () => handleCheckboxToggle(filePath, item.lineNumber, cb.checked, item.rawLine));
  div.appendChild(cb);

  const content = document.createElement('div');
  content.className = 'task-content';

  const titleEl = document.createElement('div');
  titleEl.className = 'task-title';
  titleEl.textContent = item.title || item.context || '(untitled)';
  content.appendChild(titleEl);

  if (item.context) {
    const ctx = document.createElement('div');
    ctx.className = 'task-context';
    ctx.textContent = item.context;
    content.appendChild(ctx);
  }

  // Meta row
  const meta = document.createElement('div');
  meta.className = 'task-meta';
  let hasMeta = false;

  if (item.source) {
    const tag = document.createElement('span');
    tag.className = 'tag tag-' + item.source;
    tag.textContent = '#' + item.source;
    meta.appendChild(tag);
    hasMeta = true;
  }
  if (item.date) {
    const d = document.createElement('span');
    d.className = 'tag-date';
    d.textContent = item.date;
    meta.appendChild(d);
    hasMeta = true;
  }
  if (item.link) {
    const lnk = document.createElement('span');
    lnk.className = 'tag-wikilink';
    lnk.textContent = '[[' + item.link.split('/').pop() + ']]';
    lnk.addEventListener('click', () => openTaskDetail(item.link));
    meta.appendChild(lnk);
    hasMeta = true;
  }
  if (item.doneDate) {
    const dd = document.createElement('span');
    dd.className = 'tag-done-date';
    dd.textContent = 'done: ' + item.doneDate;
    meta.appendChild(dd);
    hasMeta = true;
  }
  if (projectName) {
    const pill = document.createElement('span');
    pill.className = 'activity-project-pill';
    pill.textContent = projectName;
    meta.appendChild(pill);
    hasMeta = true;
  }

  if (hasMeta) content.appendChild(meta);
  div.appendChild(content);

  // Triage dropdown for Inbox items
  if (sectionName === 'Inbox' && !item.checked) {
    const select = document.createElement('select');
    select.className = 'task-triage-select';
    select.title = 'Move to...';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Move \u25BE';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    // CoS internal moves
    const cosGroup = document.createElement('optgroup');
    cosGroup.label = 'Chief of Staff';
    for (const dest of ['Active', 'Backlog']) {
      const opt = document.createElement('option');
      opt.value = 'cos:' + dest;
      opt.textContent = dest;
      cosGroup.appendChild(opt);
    }
    select.appendChild(cosGroup);

    // External projects
    const extProjects = state.projects.filter(p => p.name !== 'Chief of Staff' && p.category !== 'paused');
    if (extProjects.length > 0) {
      const projGroup = document.createElement('optgroup');
      projGroup.label = 'Route to project';
      for (const p of extProjects) {
        const opt = document.createElement('option');
        opt.value = 'project:' + p.slug;
        opt.textContent = p.name;
        projGroup.appendChild(opt);
      }
      select.appendChild(projGroup);
    }

    select.addEventListener('change', async () => {
      const val = select.value;
      if (!val) return;

      select.disabled = true;
      let ok = false;

      if (val.startsWith('cos:')) {
        ok = await triageTask(item, filePath, val.replace('cos:', ''));
      } else if (val.startsWith('project:')) {
        const slug = val.replace('project:', '');
        const project = state.projects.find(p => p.slug === slug);
        if (project) ok = await triageTask(item, filePath, project);
      }

      if (ok && typeof onCheckboxToggled === 'function') onCheckboxToggled();
      else if (ok) window.location.reload();
      else {
        console.error('Triage failed for', item.title, 'to', val);
        select.disabled = false;
        select.value = '';
        // Brief visual error feedback
        select.style.outline = '2px solid #f87171';
        setTimeout(() => { select.style.outline = ''; }, 2000);
      }
    });

    div.appendChild(select);
  }

  // Copy prompt button (top-level tasks only, not in Done section)
  if (!item.checked || sectionName !== 'Done') {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'task-copy-btn';
    copyBtn.title = 'Copy prompt for Claude Code';
    copyBtn.textContent = '\u2398'; // clipboard icon
    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      let prompt = item.title || '(untitled)';
      if (item.context) prompt += '\n\nContext: ' + item.context;
      if (item.subtasks && item.subtasks.length) {
        const openSubs = item.subtasks.filter(s => !s.checked);
        if (openSubs.length) {
          prompt += '\n\nSub-tasks:\n' + openSubs.map(s => '- ' + s.text).join('\n');
        }
      }
      if (item.link) {
        prompt += '\n\nSee task spec: ' + item.link;
      }
      await navigator.clipboard.writeText(prompt);
      copyBtn.textContent = '\u2713';
      copyBtn.classList.add('copied');
      setTimeout(() => { copyBtn.textContent = '\u2398'; copyBtn.classList.remove('copied'); }, 1500);
    });
    div.appendChild(copyBtn);
  }

  frag.appendChild(div);

  // Subtasks
  if (item.subtasks && item.subtasks.length) {
    for (const st of item.subtasks) {
      const stDiv = document.createElement('div');
      stDiv.className = 'task-item subtask' + (st.checked ? ' checked' : '');

      const stCb = document.createElement('input');
      stCb.type = 'checkbox';
      stCb.checked = st.checked;
      stCb.addEventListener('change', () => handleCheckboxToggle(filePath, st.lineNumber, stCb.checked, st.rawLine));
      stDiv.appendChild(stCb);

      const stContent = document.createElement('div');
      stContent.className = 'task-content';

      const stTitle = document.createElement('div');
      stTitle.className = 'task-title';
      stTitle.textContent = st.text;
      stContent.appendChild(stTitle);

      const stMeta = document.createElement('div');
      stMeta.className = 'task-meta';
      let hasStMeta = false;

      if (st.due) {
        const d = document.createElement('span');
        d.className = 'tag-due';
        d.textContent = 'due: ' + st.due;
        stMeta.appendChild(d);
        hasStMeta = true;
      }
      if (st.done) {
        const d = document.createElement('span');
        d.className = 'tag-done-date';
        d.textContent = 'done: ' + st.done;
        stMeta.appendChild(d);
        hasStMeta = true;
      }

      if (hasStMeta) stContent.appendChild(stMeta);
      stDiv.appendChild(stContent);
      frag.appendChild(stDiv);
    }
  }

  return frag;
}

// ─── Checkbox Toggle Handler ─────────────────────────

async function handleCheckboxToggle(filePath, lineNumber, newChecked, expectedLine) {
  const success = await toggleInboxCheckbox(filePath, lineNumber, newChecked, expectedLine);
  if (success) {
    // Notify page-level callback (e.g., home page reloads inbox after move-to-Done)
    if (typeof onCheckboxToggled === 'function') onCheckboxToggled();
  } else {
    alert('Failed to save change. File may be read-only or the line format changed.');
  }
}

// ─── Slide-over Panel ────────────────────────────────
// SECURITY NOTE: All content rendered in the slide-over originates
// exclusively from the user's own local filesystem (markdown files
// in ~/Documents/Projects/). There is no server, no external data
// input, and no untrusted content. This is a personal offline tool.

function openSlideOver(title, content, sessionId) {
  const backdrop = document.getElementById('slide-over-backdrop');
  if (!backdrop) return;

  // Parse YAML frontmatter for meta
  let meta = {};
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    for (const line of fmMatch[1].split('\n')) {
      const kv = line.match(/^(\w[\w-]*):\s*(.+)$/);
      if (kv) meta[kv[1]] = kv[2].trim();
    }
  }

  // Header
  const headerTitle = backdrop.querySelector('.slide-over-header h3');
  if (headerTitle) headerTitle.textContent = title;

  // Resume buttons in header (between title and close button)
  const header = backdrop.querySelector('.slide-over-header');
  const oldBtns = header.querySelector('.resume-btns');
  if (oldBtns) oldBtns.remove();
  if (sessionId) {
    const closeBtn = header.querySelector('.slide-over-close');
    header.insertBefore(createResumeBtns(sessionId), closeBtn);
  }

  // Meta
  const metaContainer = backdrop.querySelector('.slide-over-meta');
  if (metaContainer) {
    metaContainer.textContent = '';

    // Filter out redundant fields (title and date are already shown in header/activity item)
    const filteredMeta = Object.entries(meta).filter(([k]) => k !== 'title' && k !== 'date');

    if (filteredMeta.length === 0) {
      const noMeta = document.createElement('div');
      noMeta.className = 'meta-item';
      noMeta.textContent = 'No additional metadata';
      metaContainer.appendChild(noMeta);
    } else {
      for (const [k, v] of filteredMeta) {
        const item = document.createElement('div');
        item.className = 'meta-item';
        const strong = document.createElement('strong');
        strong.textContent = k + ': ';
        item.appendChild(strong);
        item.appendChild(document.createTextNode(v));
        metaContainer.appendChild(item);
      }
    }
  }

  // Body — rendered markdown from trusted local files only
  const body = backdrop.querySelector('.slide-over-body');
  if (body) {
    const mdDiv = document.createElement('div');
    mdDiv.className = 'markdown-body';
    // renderMarkdown processes user's own local files only (see security note above)
    mdDiv.innerHTML = renderMarkdown(content);
    body.textContent = '';
    body.appendChild(mdDiv);
  }

  backdrop.classList.add('open');

  // Push main content left
  const main = document.querySelector('.main');
  if (main) main.classList.add('slide-over-active');
}

async function openTaskDetail(linkPath) {
  // linkPath is relative to Chief of Staff, e.g. "Tasks/20260203-foo.md"
  const content = await readFile(state.rootHandle, 'Chief of Staff', ...linkPath.split('/'));
  if (!content) {
    alert('Could not read file: ' + linkPath);
    return;
  }
  const filename = linkPath.split('/').pop();
  openSlideOver(filename, content);
}

function closeSlideOver() {
  const backdrop = document.getElementById('slide-over-backdrop');
  if (backdrop) backdrop.classList.remove('open');
  const main = document.querySelector('.main');
  if (main) main.classList.remove('slide-over-active');
}

// ─── Pattern Loading ─────────────────────────────────

async function loadProjectPatterns(relPath) {
  const pathParts = relPath.split('/').filter(Boolean);
  const entries = await listDir(state.rootHandle, ...pathParts, 'session-patterns');
  if (!entries.length) return [];

  const patterns = [];
  for (const entry of entries) {
    if (entry.kind !== 'file' || !entry.name.endsWith('.md')) continue;

    const content = await readFile(state.rootHandle, ...pathParts, 'session-patterns', entry.name);
    if (!content) continue;

    // Extract date from filename: YYYYMMDD-...
    const dateMatch = entry.name.match(/^(\d{4})(\d{2})(\d{2})-(.+)\.md$/);
    let date = '';
    let titleSlug = entry.name.replace('.md', '');

    if (dateMatch) {
      date = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
      titleSlug = dateMatch[4].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    // Extract YAML frontmatter first (needed for title)
    let frontmatter = {};
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (fmMatch) {
      for (const line of fmMatch[1].split('\n')) {
        const kv = line.match(/^([\w-]+):\s*(.+)$/);
        if (kv) frontmatter[kv[1]] = kv[2].trim();
      }
    }

    // Title priority: frontmatter title > non-generic heading > filename slug
    const title = stripProjectPrefix(
      frontmatter.title || extractHeadingTitle(content) || titleSlug
    );

    // Check for suggestion blocks
    const hasSuggestions = /```suggestion:(project|global)/.test(content);

    // Extract individual suggestion blocks
    const suggestions = [];
    const suggestionRegex = /```suggestion:(project|global)\n([\s\S]*?)```/g;
    let match;
    while ((match = suggestionRegex.exec(content)) !== null) {
      suggestions.push({ type: match[1], text: match[2].trim() });
    }

    const displayDate = frontmatter.date ? frontmatter.date.split(' ')[0] : date;
    patterns.push({
      filename: entry.name,
      date: displayDate,
      sortDate: toSortableDate(frontmatter.date || date),
      title,
      content,
      hasSuggestions,
      suggestions,
    });
  }

  // Sort newest first
  patterns.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  return patterns;
}

async function loadAllPatterns() {
  const allPatterns = [];

  for (const project of state.projects) {
    const patterns = await loadProjectPatterns(project.relPath);
    for (const p of patterns) {
      allPatterns.push({ ...p, projectName: project.name, projectSlug: project.slug });
    }
  }

  allPatterns.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  return allPatterns;
}

// ─── Aggregated Recent Logs ──────────────────────────

async function loadAllRecentLogs(limit = 20) {
  const allLogs = [];

  for (const project of state.projects) {
    const logs = await loadProjectLogs(project.relPath);
    for (const log of logs) {
      allLogs.push({ ...log, projectName: project.name, projectSlug: project.slug });
    }
  }

  // Sort by date descending and take limit
  allLogs.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  return allLogs.slice(0, limit);
}

// ─── Aggregated Cross-Project Tasks ──────────────────

async function loadAllTasks(limit = 20) {
  const allTasks = [];
  let totalPending = 0;

  // Read all project-knowledge.md files in parallel
  const results = await Promise.all(state.projects.map(async (project) => {
    const pathParts = project.relPath.split('/').filter(Boolean);
    const content = await readFile(state.rootHandle, ...pathParts, 'project-knowledge.md');
    if (!content) return null;

    const tasksResult = extractTasksSection(content);
    if (!tasksResult) return null;

    const parsed = parseInbox(tasksResult.text, tasksResult.lineOffset);
    const filePath = project.relPath + '/project-knowledge.md';

    return { project, parsed, filePath };
  }));

  for (const result of results) {
    if (!result) continue;
    const { project, parsed, filePath } = result;

    for (const section of parsed.sections) {
      // Determine priority: Active/Tasks (flat) = 1, Inbox = 2, Backlog = 3, Done = skip
      let priority;
      const sName = section.name;
      if (sName === 'Done') continue;
      if (sName === 'Active' || sName === 'Tasks') priority = 1;
      else if (sName === 'Inbox') priority = 2;
      else if (sName === 'Backlog') priority = 3;
      else priority = 1; // default for unknown sections

      for (const item of section.items) {
        if (!item.checked) {
          totalPending++;
          allTasks.push({
            item,
            filePath,
            projectName: project.name,
            projectSlug: project.slug,
            sectionName: sName,
            priority,
          });
        }
        // Count unchecked subtasks
        if (item.subtasks) {
          for (const st of item.subtasks) {
            if (!st.checked) totalPending++;
          }
        }
      }
    }
  }

  // Sort: priority asc, then date desc (newest first within same priority)
  allTasks.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    const dateA = a.item.date || '';
    const dateB = b.item.date || '';
    return dateB.localeCompare(dateA);
  });

  state.allTasks = allTasks.slice(0, limit);
  state.totalPendingCount = totalPending;
  return state.allTasks;
}

// ─── Init ────────────────────────────────────────────

async function initApp() {
  // Try to restore saved handle
  const handle = await tryRestoreHandle();

  if (!handle) {
    showOnboarding();
    return false;
  }

  await discoverProjects();
  return true;
}

function showOnboarding() {
  const app = document.getElementById('app');
  if (!app) return;

  const needsRegrant = !!state.pendingHandle;

  app.textContent = '';
  const container = document.createElement('div');
  container.className = 'onboarding';

  const h1 = document.createElement('h1');
  h1.textContent = 'Chief of Staff Dashboard';
  container.appendChild(h1);

  const p = document.createElement('p');
  if (needsRegrant) {
    p.textContent = 'Chrome needs to re-confirm access to ~/Documents/Projects/. One click and you\'re in.';
  } else {
    p.textContent = 'One-time setup: grant access to ~/Documents/Projects/. Chrome will remember this permanently.';
  }
  container.appendChild(p);

  const btn = document.createElement('button');
  btn.className = 'btn btn-primary connect-btn';
  btn.textContent = needsRegrant ? '\uD83D\uDD13 Re-authorize Access' : '\uD83D\uDCC2 Connect ~/Documents/Projects/';
  btn.addEventListener('click', async () => {
    try {
      if (needsRegrant) {
        await regrantPermission();
      } else {
        await pickDirectory();
      }
      window.location.reload();
    } catch (e) {
      console.error('Connection failed:', e);
    }
  });
  container.appendChild(btn);

  const hint = document.createElement('p');
  hint.style.cssText = 'font-size: 0.75rem; color: var(--text-muted); margin-top: 16px;';
  hint.textContent = needsRegrant
    ? 'This happens occasionally when Chrome restarts.'
    : 'Navigate to ~/Documents/Projects/ in the picker and click "Select."';
  container.appendChild(hint);

  app.appendChild(container);
}

// ─── Health Scanning ─────────────────────────────────

async function scanProjectHealth(project) {
  const pathParts = project.relPath.split('/').filter(Boolean);
  const health = {
    name: project.name,
    slug: project.slug,
    category: project.category,
    inboxCount: project.inboxCount || 0,
    pkExists: false,
    pkDaysOld: null,
    claudeMdExists: false,
    zContextExists: false,
    zContextIndexExists: false,
    logCount: 0,
    latestLogDate: null,
    grade: 'D',
    issues: [],
  };

  // Check project-knowledge.md
  try {
    const pkDir = await getSubDir(state.rootHandle, ...pathParts);
    if (pkDir) {
      try {
        const pkHandle = await pkDir.getFileHandle('project-knowledge.md');
        const pkFile = await pkHandle.getFile();
        health.pkExists = true;
        health.pkDaysOld = Math.floor((Date.now() - pkFile.lastModified) / 86400000);
      } catch (e) { /* doesn't exist */ }

      // CLAUDE.md
      try {
        await pkDir.getFileHandle('CLAUDE.md');
        health.claudeMdExists = true;
      } catch (e) { /* doesn't exist */ }

      // z_context/
      try {
        const zDir = await pkDir.getDirectoryHandle('z_context');
        health.zContextExists = true;
        try {
          await zDir.getFileHandle('INDEX.md');
          health.zContextIndexExists = true;
        } catch (e) { /* no INDEX.md */ }
      } catch (e) { /* no z_context */ }
    }
  } catch (e) { /* project dir not accessible */ }

  // Count logs
  const logEntries = await listDir(state.rootHandle, ...pathParts, 'logs');
  const logFiles = logEntries.filter(e => e.kind === 'file' && e.name.endsWith('.md'));
  health.logCount = logFiles.length;

  // Find latest log date
  if (logFiles.length > 0) {
    const dates = logFiles
      .map(f => f.name.match(/^(\d{4})(\d{2})(\d{2})/))
      .filter(Boolean)
      .map(m => `${m[1]}-${m[2]}-${m[3]}`)
      .sort()
      .reverse();
    if (dates.length > 0) health.latestLogDate = dates[0];
  }

  // Compute issues and grade
  let reds = 0;
  let ambers = 0;

  // PK freshness
  if (!health.pkExists) {
    if (health.category !== 'paused') {
      health.issues.push('No project-knowledge.md');
      reds++;
    }
  } else if (health.pkDaysOld > 14) {
    health.issues.push('project-knowledge.md is ' + health.pkDaysOld + 'd old');
    reds++;
  } else if (health.pkDaysOld > 7) {
    health.issues.push('project-knowledge.md is ' + health.pkDaysOld + 'd old');
    ambers++;
  }

  // Inbox overload
  if (health.inboxCount > 10) {
    health.issues.push(health.inboxCount + ' open inbox items');
    reds++;
  } else if (health.inboxCount >= 6) {
    health.issues.push(health.inboxCount + ' open inbox items');
    ambers++;
  }

  // CLAUDE.md
  if (!health.claudeMdExists && health.category !== 'paused') {
    health.issues.push('No CLAUDE.md');
    ambers++;
  }

  // z_context integrity
  if (health.zContextExists && !health.zContextIndexExists) {
    health.issues.push('z_context/ missing INDEX.md');
    ambers++;
  }

  // Grade
  if (reds === 0 && ambers === 0) health.grade = 'A';
  else if (reds === 0 && ambers >= 1) health.grade = 'B';
  else if (reds === 1) health.grade = 'C';
  else health.grade = 'D';

  return health;
}

async function scanAllProjectHealth() {
  const results = await Promise.all(state.projects.map(p => scanProjectHealth(p)));
  return results;
}

// Quick scan for home page alerts (PK freshness + inbox only)
async function scanHealthAlerts() {
  const alerts = [];
  let hasRed = false;
  let hasAmber = false;

  for (const p of state.projects) {
    if (p.category === 'paused') continue;

    const pathParts = p.relPath.split('/').filter(Boolean);
    const issues = [];

    // Check PK freshness
    try {
      const dir = await getSubDir(state.rootHandle, ...pathParts);
      if (dir) {
        try {
          const pkHandle = await dir.getFileHandle('project-knowledge.md');
          const pkFile = await pkHandle.getFile();
          const daysOld = Math.floor((Date.now() - pkFile.lastModified) / 86400000);
          if (daysOld > 14) { issues.push('PK ' + daysOld + 'd stale'); hasRed = true; }
          else if (daysOld > 7) { issues.push('PK ' + daysOld + 'd old'); hasAmber = true; }
        } catch (e) {
          issues.push('no project-knowledge.md');
          hasRed = true;
        }
      }
    } catch (e) { /* skip */ }

    // Inbox
    if (p.inboxCount > 10) { issues.push(p.inboxCount + ' inbox items'); hasRed = true; }
    else if (p.inboxCount >= 6) { issues.push(p.inboxCount + ' inbox items'); hasAmber = true; }

    if (issues.length > 0) {
      alerts.push({ project: p.name, issues });
    }
  }

  state.healthAlerts = alerts;
  state.healthDotLevel = hasRed ? 'red' : hasAmber ? 'amber' : 'green';
  return alerts;
}

// ─── Click-to-close on Slide-over ────────────────────

document.addEventListener('click', (e) => {
  const backdrop = document.getElementById('slide-over-backdrop');
  if (!backdrop || !backdrop.classList.contains('open')) return;
  const slideOver = backdrop.querySelector('.slide-over');
  if (!slideOver || !slideOver.contains(e.target)) return;
  // Don't close if clicking interactive elements
  if (e.target.closest('a, button, input, select, textarea, .resume-btn')) return;
  closeSlideOver();
});

// ─── Keyboard Shortcuts ──────────────────────────────

document.addEventListener('keydown', (e) => {
  // Escape to close slide-over
  if (e.key === 'Escape') {
    closeSlideOver();
  }

  // / to focus search (if exists)
  if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
    const search = document.querySelector('.search-bar input');
    if (search && document.activeElement !== search) {
      e.preventDefault();
      search.focus();
    }
  }
});
