import { createServer } from 'http'
import { readFile, readdir, stat } from 'fs/promises'
import { join, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Path to dashboard-views directory
const DASHBOARD_VIEWS_PATH = join(__dirname, '../../dashboard-views')

// Staleness threshold in hours
const STALE_THRESHOLD_HOURS = 4

const PORT = 3001

// Helper to parse markdown frontmatter and extract last updated time
function parseMarkdown(content) {
  // Try to extract "Last updated" from content
  const lastUpdatedMatch = content.match(/\*Last updated:\s*([^*]+)\*/)
  let lastUpdated = null

  if (lastUpdatedMatch) {
    lastUpdated = lastUpdatedMatch[1].trim()
  }

  return {
    content,
    lastUpdated
  }
}

// Check if file is stale
async function isStale(filePath) {
  try {
    const stats = await stat(filePath)
    const hoursAgo = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60)
    return hoursAgo > STALE_THRESHOLD_HOURS
  } catch {
    return true
  }
}

// Format file modification time as relative time
function formatRelativeTime(mtime) {
  const now = Date.now()
  const diff = now - mtime.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  return `${days} day${days === 1 ? '' : 's'} ago`
}

// Read a markdown file and return structured data
async function readMarkdownFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8')
    const stats = await stat(filePath)
    const parsed = parseMarkdown(content)
    const stale = await isStale(filePath)

    return {
      content: parsed.content,
      lastUpdated: parsed.lastUpdated || formatRelativeTime(stats.mtime),
      stale,
      exists: true
    }
  } catch (error) {
    return {
      content: null,
      lastUpdated: null,
      stale: true,
      exists: false,
      error: error.message
    }
  }
}

// Get list of projects from projects/ directory
async function getProjectsList() {
  const projectsDir = join(DASHBOARD_VIEWS_PATH, 'projects')

  try {
    const files = await readdir(projectsDir)
    const projects = []

    for (const file of files) {
      if (file.endsWith('.md') && file !== 'README.md') {
        const slug = file.replace('.md', '')
        const filePath = join(projectsDir, file)
        const content = await readFile(filePath, 'utf-8')

        // Extract project name from first H1
        const nameMatch = content.match(/^#\s+(.+)$/m)
        const name = nameMatch ? nameMatch[1] : slug

        // Extract momentum from content
        let momentum = 'unknown'
        if (content.includes('🟢')) momentum = 'active'
        else if (content.includes('🟡')) momentum = 'slow'
        else if (content.includes('🔴')) momentum = 'stuck'

        projects.push({ slug, name, momentum })
      }
    }

    return projects
  } catch {
    // Return default projects if directory doesn't exist yet
    return [
      { slug: 'razzo', name: 'Razzo', momentum: 'unknown' },
      { slug: 'context-profile-framework', name: 'Context Profile Framework', momentum: 'unknown' },
      { slug: 'writing', name: 'Writing', momentum: 'unknown' },
      { slug: 'job-search', name: 'Job Search', momentum: 'unknown' },
      { slug: 'chief-of-staff', name: 'Chief of Staff', momentum: 'unknown' }
    ]
  }
}

// Request handler
async function handleRequest(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const path = url.pathname

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  try {
    // Daily brief
    if (path === '/api/daily-brief') {
      const data = await readMarkdownFile(join(DASHBOARD_VIEWS_PATH, 'daily-brief.md'))
      if (!data.exists) {
        res.writeHead(404)
        res.end(JSON.stringify({ error: 'Daily brief not found' }))
        return
      }
      res.writeHead(200)
      res.end(JSON.stringify(data))
      return
    }

    // Projects overview
    if (path === '/api/projects-overview') {
      const data = await readMarkdownFile(join(DASHBOARD_VIEWS_PATH, 'projects-overview.md'))
      if (!data.exists) {
        res.writeHead(404)
        res.end(JSON.stringify({ error: 'Projects overview not found' }))
        return
      }
      res.writeHead(200)
      res.end(JSON.stringify(data))
      return
    }

    // Activity feed
    if (path === '/api/activity') {
      const data = await readMarkdownFile(join(DASHBOARD_VIEWS_PATH, 'activity-feed.md'))
      if (!data.exists) {
        res.writeHead(404)
        res.end(JSON.stringify({ error: 'Activity feed not found' }))
        return
      }
      res.writeHead(200)
      res.end(JSON.stringify(data))
      return
    }

    // Projects list
    if (path === '/api/projects') {
      const projects = await getProjectsList()
      res.writeHead(200)
      res.end(JSON.stringify({ projects }))
      return
    }

    // Individual project
    const projectMatch = path.match(/^\/api\/projects\/([a-z0-9-]+)$/)
    if (projectMatch) {
      const slug = projectMatch[1]
      const data = await readMarkdownFile(join(DASHBOARD_VIEWS_PATH, 'projects', `${slug}.md`))
      if (!data.exists) {
        res.writeHead(404)
        res.end(JSON.stringify({ error: `Project ${slug} not found` }))
        return
      }

      // Extract name from content
      const nameMatch = data.content?.match(/^#\s+(.+)$/m)
      data.name = nameMatch ? nameMatch[1] : slug

      res.writeHead(200)
      res.end(JSON.stringify(data))
      return
    }

    // 404 for unknown routes
    res.writeHead(404)
    res.end(JSON.stringify({ error: 'Not found' }))

  } catch (error) {
    console.error('Server error:', error)
    res.writeHead(500)
    res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}

// Start server
const server = createServer(handleRequest)

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
  console.log(`Reading from: ${DASHBOARD_VIEWS_PATH}`)
})
