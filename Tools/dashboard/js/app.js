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
  cosInbox: null,         // Parsed cos-inbox.md
  projectIndex: null,     // Raw project-index.md content
  pendingSuggestionCount: 0, // Files with pending CLAUDE.md suggestions
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

async function writeFile(dirHandle, pathParts, content) {
  try {
    let dir = dirHandle;
    const fileName = pathParts[pathParts.length - 1];
    for (let i = 0; i < pathParts.length - 1; i++) {
      dir = await dir.getDirectoryHandle(pathParts[i]);
    }
    const fileHandle = await dir.getFileHandle(fileName);
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

  state.projects = enriched;
  return enriched;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
  // Sort each group alphabetically
  for (const g of Object.values(groups)) {
    g.items.sort((a, b) => a.name.localeCompare(b.name));
  }
  return groups;
}

// ─── Inbox Parser ────────────────────────────────────

function parseInbox(content) {
  if (!content) return { sections: [], raw: '' };

  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  let lineNumber = 0;

  for (const line of lines) {
    lineNumber++;

    // Section headers
    const sectionMatch = line.match(/^## (.+)$/);
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

async function toggleInboxCheckbox(filePath, lineNumber, newChecked) {
  const pathParts = filePath.split('/');
  const content = await readFile(state.rootHandle, ...pathParts);
  if (!content) return false;

  const lines = content.split('\n');
  const idx = lineNumber - 1;
  if (idx < 0 || idx >= lines.length) return false;

  if (newChecked) {
    lines[idx] = lines[idx].replace('[ ]', '[x]');
    // Add done:date if completing a top-level task in Done section or subtask
    if (!lines[idx].includes('done:')) {
      const today = new Date().toISOString().split('T')[0];
      lines[idx] = lines[idx].trimEnd() + ` done:${today}`;
    }
  } else {
    lines[idx] = lines[idx].replace('[x]', '[ ]');
    // Remove done:date if unchecking
    lines[idx] = lines[idx].replace(/\s*done:\d{4}-\d{2}-\d{2}/, '');
  }

  return await writeFile(state.rootHandle, pathParts, lines.join('\n'));
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

    // Extract first non-heading, non-empty line as preview
    const previewLines = content.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('---'));
    const preview = previewLines[0] || '';

    // Extract session ID from transcript path (UUID before .jsonl)
    let sessionId = null;
    if (frontmatter.transcript) {
      const idMatch = frontmatter.transcript.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.jsonl$/);
      if (idMatch) sessionId = idMatch[1];
    }

    const displayDate = frontmatter.date || date;
    logs.push({
      filename: entry.name,
      date: displayDate,
      sortDate: toSortableDate(displayDate),
      title,
      preview: preview.slice(0, 120),
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

function createTaskItemEl(item, filePath, sectionName) {
  const frag = document.createDocumentFragment();

  // Main task
  const div = document.createElement('div');
  div.className = 'task-item' + (item.checked ? ' checked' : '');

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = item.checked;
  cb.addEventListener('change', () => handleCheckboxToggle(filePath, item.lineNumber, cb.checked));
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

  if (hasMeta) content.appendChild(meta);
  div.appendChild(content);
  frag.appendChild(div);

  // Subtasks
  if (item.subtasks && item.subtasks.length) {
    for (const st of item.subtasks) {
      const stDiv = document.createElement('div');
      stDiv.className = 'task-item subtask' + (st.checked ? ' checked' : '');

      const stCb = document.createElement('input');
      stCb.type = 'checkbox';
      stCb.checked = st.checked;
      stCb.addEventListener('change', () => handleCheckboxToggle(filePath, st.lineNumber, stCb.checked));
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

async function handleCheckboxToggle(filePath, lineNumber, newChecked) {
  const success = await toggleInboxCheckbox(filePath, lineNumber, newChecked);
  if (!success) {
    alert('Failed to save change. File may be read-only or the line format changed.');
  }
}

// ─── Task Detail Slide-over ──────────────────────────

async function openTaskDetail(linkPath) {
  const backdrop = document.getElementById('slide-over-backdrop');
  if (!backdrop) return;

  // linkPath is relative to Chief of Staff, e.g. "Tasks/20260203-foo.md"
  const content = await readFile(state.rootHandle, 'Chief of Staff', ...linkPath.split('/'));
  if (!content) {
    alert('Could not read file: ' + linkPath);
    return;
  }

  // Parse YAML frontmatter for meta
  let meta = {};
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    for (const line of fmMatch[1].split('\n')) {
      const kv = line.match(/^(\w[\w-]*):\s*(.+)$/);
      if (kv) meta[kv[1]] = kv[2].trim();
    }
  }

  const filename = linkPath.split('/').pop();

  // Header
  const headerTitle = backdrop.querySelector('.slide-over-header h3');
  if (headerTitle) headerTitle.textContent = filename;

  // Meta
  const metaContainer = backdrop.querySelector('.slide-over-meta');
  if (metaContainer) {
    metaContainer.textContent = '';
    if (Object.keys(meta).length === 0) {
      const noMeta = document.createElement('div');
      noMeta.className = 'meta-item';
      noMeta.textContent = 'No metadata';
      metaContainer.appendChild(noMeta);
    } else {
      for (const [k, v] of Object.entries(meta)) {
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

  // Body — rendered markdown from trusted local file
  const body = backdrop.querySelector('.slide-over-body');
  if (body) {
    const mdDiv = document.createElement('div');
    mdDiv.className = 'markdown-body';
    mdDiv.innerHTML = renderMarkdown(content); // Content from user's own local files only
    body.textContent = '';
    body.appendChild(mdDiv);
  }

  backdrop.classList.add('open');
}

function closeSlideOver() {
  const backdrop = document.getElementById('slide-over-backdrop');
  if (backdrop) backdrop.classList.remove('open');
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

// ─── Parse project-index.md for open items ───────────

function parseOpenItems(indexContent, projectName) {
  if (!indexContent) return [];

  // Find the project section
  const headingPattern = new RegExp('### ' + escapeRegex(projectName) + '([\\s\\S]*?)(?=\\n---\\n|\\n### |$)', 'i');
  const sectionMatch = indexContent.match(headingPattern);
  if (!sectionMatch) return [];

  const section = sectionMatch[1];

  // Find Open Items subsection
  const openMatch = section.match(/\*\*Open Items:\*\*([\s\S]*?)(?=\n\*\*|\n---|\n###|$)/);
  if (!openMatch) return [];

  const items = [];
  for (const line of openMatch[1].split('\n')) {
    const itemMatch = line.match(/^- (.+)$/);
    if (itemMatch) {
      items.push(itemMatch[1].trim());
    }
  }
  return items;
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
