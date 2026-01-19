const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true
});

/**
 * Parse daily-focus.md and return today's items
 */
async function parseDailyFocus(cosRoot) {
  const filePath = path.join(cosRoot, 'daily-focus.md');

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const today = new Date().toISOString().split('T')[0];

    // Parse by date sections
    const sections = [];
    const lines = content.split('\n');
    let currentDate = null;
    let currentItems = [];

    for (const line of lines) {
      const dateMatch = line.match(/^## (\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        if (currentDate) {
          sections.push({ date: currentDate, items: currentItems });
        }
        currentDate = dateMatch[1];
        currentItems = [];
      } else if (currentDate && line.match(/^- \[[ x]\]/)) {
        const checked = line.includes('[x]');
        const text = line.replace(/^- \[[ x]\] /, '').trim();
        currentItems.push({ text, checked });
      }
    }

    if (currentDate) {
      sections.push({ date: currentDate, items: currentItems });
    }

    // Find today's section or return empty
    const todaySection = sections.find(s => s.date === today);

    return {
      date: today,
      items: todaySection ? todaySection.items : [],
      hasToday: !!todaySection
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist yet, return empty
      return {
        date: new Date().toISOString().split('T')[0],
        items: [],
        hasToday: false
      };
    }
    throw error;
  }
}

/**
 * Toggle a daily focus item's checked state
 */
async function toggleDailyFocusItem(cosRoot, date, index, checked) {
  const filePath = path.join(cosRoot, 'daily-focus.md');
  let content;

  try {
    content = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      content = '# Daily Focus\n';
    } else {
      throw error;
    }
  }

  const lines = content.split('\n');
  let currentDate = null;
  let itemIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const dateMatch = lines[i].match(/^## (\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      currentDate = dateMatch[1];
      itemIndex = 0;
    } else if (currentDate === date && lines[i].match(/^- \[[ x]\]/)) {
      if (itemIndex === index) {
        // Toggle this item
        if (checked) {
          lines[i] = lines[i].replace('[ ]', '[x]');
        } else {
          lines[i] = lines[i].replace('[x]', '[ ]');
        }
        break;
      }
      itemIndex++;
    }
  }

  await fs.writeFile(filePath, lines.join('\n'));
}

/**
 * Add a new daily focus item for today
 */
async function addDailyFocusItem(cosRoot, text) {
  const filePath = path.join(cosRoot, 'daily-focus.md');
  const today = new Date().toISOString().split('T')[0];
  let content;

  try {
    content = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      content = '# Daily Focus\n';
    } else {
      throw error;
    }
  }

  const lines = content.split('\n');
  const todayHeader = `## ${today}`;
  const todayIndex = lines.findIndex(l => l.startsWith(todayHeader));

  if (todayIndex === -1) {
    // Add today's section after the title
    const titleIndex = lines.findIndex(l => l.startsWith('# '));
    const insertAt = titleIndex === -1 ? 0 : titleIndex + 1;
    lines.splice(insertAt + 1, 0, '', todayHeader, `- [ ] ${text}`);
  } else {
    // Find where to insert (after the last item for today or after the header)
    let insertAt = todayIndex + 1;
    while (insertAt < lines.length && (lines[insertAt].startsWith('- [') || lines[insertAt] === '')) {
      if (lines[insertAt].startsWith('- [')) {
        insertAt++;
      } else {
        break;
      }
    }
    lines.splice(insertAt, 0, `- [ ] ${text}`);
  }

  await fs.writeFile(filePath, lines.join('\n'));
}

/**
 * Parse all cos-inbox.md files (root + projects)
 */
async function parseAllInboxes(cosRoot) {
  const items = [];

  // Parse root inbox
  const rootInbox = path.join(cosRoot, 'cos-inbox.md');
  try {
    const rootItems = await parseInboxFile(rootInbox, 'Chief of Staff');
    items.push(...rootItems);
  } catch (error) {
    // Ignore if doesn't exist
  }

  // Parse project inboxes from project-sources.md
  try {
    const sourcesPath = path.join(cosRoot, 'project-sources.md');
    const sourcesContent = await fs.readFile(sourcesPath, 'utf-8');

    // Extract project paths
    const pathMatches = sourcesContent.matchAll(/\*\*Source:\*\* `([^`]+)`/g);
    for (const match of pathMatches) {
      const projectPath = match[1];
      const inboxPath = path.join(projectPath, 'cos-inbox.md');
      const projectName = path.basename(projectPath);

      try {
        const projectItems = await parseInboxFile(inboxPath, projectName);
        items.push(...projectItems);
      } catch (error) {
        // Ignore if doesn't exist
      }
    }
  } catch (error) {
    // Ignore if project-sources.md doesn't exist
  }

  return items;
}

/**
 * Parse a single cos-inbox.md file
 */
async function parseInboxFile(filePath, source) {
  const content = await fs.readFile(filePath, 'utf-8');
  const items = [];

  // Only parse the Pending section
  const pendingMatch = content.match(/## Pending\n([\s\S]*?)(?=\n## |$)/);
  if (!pendingMatch) return items;

  const pendingContent = pendingMatch[1];
  const itemMatches = pendingContent.matchAll(/### (.+?)\n([\s\S]*?)(?=\n### |$)/g);

  let index = 0;
  for (const match of itemMatches) {
    const title = match[1].trim();
    const body = match[2].trim();

    // Extract date if present
    const dateMatch = body.match(/\*\*Date:\*\* (.+)/);
    const date = dateMatch ? dateMatch[1] : null;

    items.push({
      title,
      body,
      date,
      source,
      filePath,
      index: index++
    });
  }

  return items;
}

/**
 * Archive an inbox item (move from Pending to Archive)
 */
async function archiveInboxItem(filePath, index) {
  const content = await fs.readFile(filePath, 'utf-8');

  // Find the Pending section
  const pendingStart = content.indexOf('## Pending');
  const archiveStart = content.indexOf('## Archive');

  if (pendingStart === -1) return;

  // Extract all pending items
  const pendingSection = archiveStart > pendingStart
    ? content.slice(pendingStart, archiveStart)
    : content.slice(pendingStart);

  const itemMatches = [...pendingSection.matchAll(/### (.+?)\n([\s\S]*?)(?=\n### |$)/g)];

  if (index >= itemMatches.length) return;

  const itemToArchive = itemMatches[index];
  const archivedDate = new Date().toISOString().split('T')[0];
  const archivedItem = `### ${itemToArchive[1]}\n**Archived:** ${archivedDate}\n${itemToArchive[2]}`;

  // Remove from pending
  let newContent = content.replace(itemToArchive[0], '');

  // Add to archive
  if (archiveStart === -1) {
    newContent += '\n\n## Archive\n\n' + archivedItem;
  } else {
    const archiveInsertPoint = newContent.indexOf('## Archive') + '## Archive'.length;
    newContent = newContent.slice(0, archiveInsertPoint) + '\n\n' + archivedItem + newContent.slice(archiveInsertPoint);
  }

  // Clean up extra newlines
  newContent = newContent.replace(/\n{3,}/g, '\n\n');

  await fs.writeFile(filePath, newContent);
}

/**
 * Parse strategic priorities from project-knowledge.md
 */
async function parsePriorities(cosRoot) {
  const filePath = path.join(cosRoot, 'project-knowledge.md');

  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Find Current Priorities section
    const prioritiesMatch = content.match(/## Current Priorities\n([\s\S]*?)(?=\n---|\n## [^#])/);
    if (!prioritiesMatch) return { p0: [], p1: [], p2: [] };

    const prioritiesContent = prioritiesMatch[1];

    const priorities = { p0: [], p1: [], p2: [] };

    // Look for P0, P1, P2 headers (### P0:, ### P1:, etc.)
    // Also handle format like "### P0: Revenue Generation"
    for (const level of ['P0', 'P1', 'P2']) {
      const levelMatch = prioritiesContent.match(new RegExp(`### ${level}[^\\n]*\\n([\\s\\S]*?)(?=\\n### |$)`));
      if (levelMatch) {
        const sectionContent = levelMatch[1];
        // Look for bold items like **Razzo - Get Clients**
        const boldItems = sectionContent.match(/\*\*([^*]+)\*\*/g) || [];
        // Only take the main items (ones that look like titles, not sub-items)
        const mainItems = boldItems
          .map(item => item.replace(/\*\*/g, '').trim())
          .filter(item => !item.match(/^(Actions|Purpose|Primary|Need|Timing)/i))
          .slice(0, 5); // Limit to 5 items
        priorities[level.toLowerCase()] = mainItems;
      }
    }

    return priorities;
  } catch (error) {
    return { p0: [], p1: [], p2: [] };
  }
}

/**
 * Parse recent logs from logs/ folder
 */
async function parseRecentLogs(cosRoot, limit = 10) {
  const logsDir = path.join(cosRoot, 'logs');
  const logs = [];

  try {
    const files = await fs.readdir(logsDir);
    const mdFiles = files.filter(f => f.endsWith('.md')).sort().reverse();

    for (const file of mdFiles.slice(0, limit)) {
      const filePath = path.join(logsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed = matter(content);

      // Extract date from filename (YYYYMMDD format)
      const dateMatch = file.match(/^(\d{8})/);
      const date = dateMatch ? formatDate(dateMatch[1]) : null;

      // Get title from frontmatter or first heading
      let title = parsed.data.title;
      if (!title) {
        const headingMatch = content.match(/^# (.+)/m);
        title = headingMatch ? headingMatch[1] : file.replace('.md', '');
      }

      // Get session type if present
      const sessionType = parsed.data.session_type || parsed.data['Session Type'] || null;

      // Get summary (first paragraph after frontmatter/title)
      const bodyContent = parsed.content.replace(/^# .+\n/, '').trim();
      const summaryMatch = bodyContent.match(/^([^\n]+)/);
      const summary = summaryMatch ? summaryMatch[1].substring(0, 150) : '';

      logs.push({
        file,
        date,
        title,
        sessionType,
        summary,
        path: filePath
      });
    }
  } catch (error) {
    // Logs folder might not exist
  }

  return logs;
}

/**
 * Parse recent thoughts from Check-Ins/thoughts/
 */
async function parseRecentThoughts(cosRoot, limit = 10) {
  const thoughtsDir = path.join(cosRoot, 'Check-Ins', 'thoughts');
  const thoughts = [];

  try {
    const files = await fs.readdir(thoughtsDir);
    const mdFiles = files.filter(f => f.endsWith('.md')).sort().reverse();

    for (const file of mdFiles.slice(0, limit)) {
      const filePath = path.join(thoughtsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed = matter(content);

      // Extract date from filename
      const dateMatch = file.match(/^(\d{8})/);
      const date = dateMatch ? formatDate(dateMatch[1]) : null;

      // Get title
      let title = parsed.data.title;
      if (!title) {
        const headingMatch = content.match(/^# (.+)/m);
        title = headingMatch ? headingMatch[1] : file.replace('.md', '');
      }

      // Get preview
      const preview = parsed.content.substring(0, 100).replace(/\n/g, ' ').trim();

      thoughts.push({
        file,
        date,
        title,
        preview,
        path: filePath
      });
    }
  } catch (error) {
    // Thoughts folder might not exist
  }

  return thoughts;
}

/**
 * Parse project-index.md for project cards
 */
async function parseProjectIndex(cosRoot) {
  const filePath = path.join(cosRoot, 'project-index.md');
  const projects = [];

  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Find each project section (## Project Name)
    const projectMatches = content.matchAll(/## ([^\n]+)\n([\s\S]*?)(?=\n## |\n---|\Z|$)/g);

    for (const match of projectMatches) {
      const name = match[1].trim();
      const body = match[2];

      // Skip non-project sections
      if (name.toLowerCase().includes('patterns') || name.toLowerCase().includes('observations')) {
        continue;
      }

      // Extract status
      const statusMatch = body.match(/\*\*Status:\*\* ([^\n]+)/);
      const status = statusMatch ? statusMatch[1].trim() : 'Unknown';

      // Extract description
      const descMatch = body.match(/\*\*Description:\*\* ([^\n]+)/);
      const description = descMatch ? descMatch[1].trim() : '';

      // Extract open items
      const openItems = [];
      const openItemsMatch = body.match(/\*\*Open Items:\*\*\n((?:- [^\n]+\n?)*)/);
      if (openItemsMatch) {
        const items = openItemsMatch[1].match(/- [^\n]+/g) || [];
        openItems.push(...items.map(i => i.replace(/^- /, '').trim()));
      }

      // Extract recent work
      const recentWork = [];
      const recentMatch = body.match(/\*\*Recent Work:\*\*\n((?:- [^\n]+\n?)*)/);
      if (recentMatch) {
        const items = recentMatch[1].match(/- [^\n]+/g) || [];
        recentWork.push(...items.map(i => i.replace(/^- /, '').trim()));
      }

      projects.push({
        name,
        status,
        description,
        openItems,
        recentWork
      });
    }
  } catch (error) {
    // File might not exist
  }

  return projects;
}

/**
 * Parse project-sources.md for sync status
 */
async function parseSyncStatus(cosRoot) {
  const filePath = path.join(cosRoot, 'project-sources.md');
  const syncStatus = {};

  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Find each project and its last synced date
    const projectMatches = content.matchAll(/### ([^\n]+)\n([\s\S]*?)(?=\n### |$)/g);

    for (const match of projectMatches) {
      const name = match[1].trim();
      const body = match[2];

      const syncMatch = body.match(/\*\*Last synced:\*\* ([^\n]+)/);
      const lastSynced = syncMatch ? syncMatch[1].trim() : 'Never';

      syncStatus[name] = lastSynced;
    }
  } catch (error) {
    // File might not exist
  }

  return syncStatus;
}

/**
 * Format YYYYMMDD to readable date
 */
function formatDate(dateStr) {
  if (dateStr.length === 8) {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  return dateStr;
}

/**
 * Get a single log by filename and render its markdown
 */
async function getLog(cosRoot, filename) {
  const filePath = path.join(cosRoot, 'logs', filename);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(content);

    // Extract date from filename
    const dateMatch = filename.match(/^(\d{8})/);
    const date = dateMatch ? formatDate(dateMatch[1]) : null;

    // Get title from frontmatter or first heading
    let title = parsed.data.title;
    if (!title) {
      const headingMatch = content.match(/^# (.+)/m);
      title = headingMatch ? headingMatch[1] : filename.replace('.md', '');
    }

    // Render markdown to HTML
    const htmlContent = marked(parsed.content);

    return {
      filename,
      title,
      date,
      sessionType: parsed.data.session_type || parsed.data['Session Type'] || null,
      frontmatter: parsed.data,
      content: parsed.content,
      htmlContent,
      path: filePath
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * Get a single thought by filename and render its markdown
 */
async function getThought(cosRoot, filename) {
  const filePath = path.join(cosRoot, 'Check-Ins', 'thoughts', filename);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(content);

    // Extract date from filename
    const dateMatch = filename.match(/^(\d{8})/);
    const date = dateMatch ? formatDate(dateMatch[1]) : null;

    // Get title from frontmatter or first heading
    let title = parsed.data.title;
    if (!title) {
      const headingMatch = content.match(/^# (.+)/m);
      title = headingMatch ? headingMatch[1] : filename.replace('.md', '');
    }

    // Render markdown to HTML
    const htmlContent = marked(parsed.content);

    return {
      filename,
      title,
      date,
      tags: parsed.data.tags || [],
      frontmatter: parsed.data,
      content: parsed.content,
      htmlContent,
      path: filePath
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * Get detailed project information including project-knowledge.md, logs, and inbox
 */
async function getProjectDetail(cosRoot, projectName) {
  // Read project-sources.md to find the project path
  const sourcesPath = path.join(cosRoot, 'project-sources.md');

  try {
    const sourcesContent = await fs.readFile(sourcesPath, 'utf-8');

    // Find project section
    const projectRegex = new RegExp(`### ${projectName}[\\s\\S]*?\\*\\*Source:\\*\\* \`([^\`]+)\``, 'i');
    const match = sourcesContent.match(projectRegex);

    let projectPath = null;
    let lastSynced = null;

    if (match) {
      projectPath = match[1];
      const syncMatch = sourcesContent.match(new RegExp(`### ${projectName}[\\s\\S]*?\\*\\*Last synced:\\*\\* ([^\\n]+)`, 'i'));
      lastSynced = syncMatch ? syncMatch[1].trim() : 'Never';
    }

    // Get project info from project-index.md
    const indexPath = path.join(cosRoot, 'project-index.md');
    const indexContent = await fs.readFile(indexPath, 'utf-8');

    const projectMatch = indexContent.match(new RegExp(`## ${projectName}[\\n]([\\s\\S]*?)(?=\\n## |\\n---|\$)`, 'i'));

    let status = 'Unknown';
    let description = '';
    let openItems = [];
    let recentWork = [];

    if (projectMatch) {
      const body = projectMatch[1];

      const statusMatch = body.match(/\*\*Status:\*\* ([^\n]+)/);
      status = statusMatch ? statusMatch[1].trim() : 'Unknown';

      const descMatch = body.match(/\*\*Description:\*\* ([^\n]+)/);
      description = descMatch ? descMatch[1].trim() : '';

      const openItemsMatch = body.match(/\*\*Open Items:\*\*\n((?:- [^\n]+\n?)*)/);
      if (openItemsMatch) {
        const items = openItemsMatch[1].match(/- [^\n]+/g) || [];
        openItems = items.map(i => i.replace(/^- /, '').trim());
      }

      const recentMatch = body.match(/\*\*Recent Work:\*\*\n((?:- [^\n]+\n?)*)/);
      if (recentMatch) {
        const items = recentMatch[1].match(/- [^\n]+/g) || [];
        recentWork = items.map(i => i.replace(/^- /, '').trim());
      }
    }

    // Try to read project-knowledge.md if project path exists
    let knowledgeContent = null;
    let knowledgeHtml = null;

    if (projectPath) {
      const knowledgePath = path.join(projectPath, 'project-knowledge.md');
      try {
        const rawContent = await fs.readFile(knowledgePath, 'utf-8');
        const parsed = matter(rawContent);
        knowledgeContent = parsed.content;
        knowledgeHtml = marked(parsed.content);
      } catch (e) {
        // project-knowledge.md might not exist
      }
    }

    // Try to read project logs
    let projectLogs = [];
    if (projectPath) {
      const logsPath = path.join(projectPath, 'logs');
      try {
        const files = await fs.readdir(logsPath);
        const mdFiles = files.filter(f => f.endsWith('.md')).sort().reverse();

        for (const file of mdFiles.slice(0, 10)) {
          const filePath = path.join(logsPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = matter(content);

          const dateMatch = file.match(/^(\d{8})/);
          const date = dateMatch ? formatDate(dateMatch[1]) : null;

          let title = parsed.data.title;
          if (!title) {
            const headingMatch = content.match(/^# (.+)/m);
            title = headingMatch ? headingMatch[1] : file.replace('.md', '');
          }

          projectLogs.push({
            file,
            date,
            title,
            sessionType: parsed.data.session_type || parsed.data['Session Type'] || null
          });
        }
      } catch (e) {
        // logs folder might not exist
      }
    }

    // Try to read project inbox
    let inboxItems = [];
    if (projectPath) {
      const inboxPath = path.join(projectPath, 'cos-inbox.md');
      try {
        inboxItems = await parseInboxFile(inboxPath, projectName);
      } catch (e) {
        // inbox might not exist
      }
    }

    return {
      name: projectName,
      status,
      description,
      openItems,
      recentWork,
      lastSynced,
      projectPath,
      knowledgeContent,
      knowledgeHtml,
      projectLogs,
      inboxItems
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * Get yesterday's incomplete daily focus items (for "carried over" feature)
 */
async function getCarriedOverItems(cosRoot) {
  const filePath = path.join(cosRoot, 'daily-focus.md');

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const today = new Date().toISOString().split('T')[0];

    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Parse by date sections
    const lines = content.split('\n');
    let currentDate = null;
    const uncheckedItems = [];

    for (const line of lines) {
      const dateMatch = line.match(/^## (\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        currentDate = dateMatch[1];
      } else if (currentDate === yesterdayStr && line.match(/^- \[ \]/)) {
        // Unchecked item from yesterday
        const text = line.replace(/^- \[ \] /, '').trim();
        uncheckedItems.push(text);
      }
    }

    return uncheckedItems;
  } catch (error) {
    return [];
  }
}

module.exports = {
  parseDailyFocus,
  toggleDailyFocusItem,
  addDailyFocusItem,
  parseAllInboxes,
  archiveInboxItem,
  parsePriorities,
  parseRecentLogs,
  parseRecentThoughts,
  parseProjectIndex,
  parseSyncStatus,
  getLog,
  getThought,
  getProjectDetail,
  getCarriedOverItems
};
