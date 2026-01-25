import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Clock, RefreshCw } from 'lucide-react'

interface ProjectData {
  content: string
  lastUpdated: string
  stale: boolean
  name: string
}

function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    setLoading(true)
    fetch(`/api/projects/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load project')
        return res.json()
      })
      .then(data => {
        setProject(data)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin text-cos-muted" size={24} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl">
        <div className="bg-cos-surface border border-cos-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Project Analysis Not Available</h2>
          <p className="text-cos-muted mb-4">
            {error}. Run the project-analyzer agent to generate it:
          </p>
          <pre className="bg-cos-bg p-4 rounded-lg text-sm overflow-x-auto">
            <code>claude "Run the project-analyzer agent for {slug}"</code>
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      {/* Staleness indicator */}
      {project?.stale && (
        <div className="mb-4 flex items-center gap-2 text-cos-warning text-sm">
          <Clock size={14} />
          <span>
            Last updated {project.lastUpdated} - consider refreshing the analysis
          </span>
        </div>
      )}

      {!project?.stale && project?.lastUpdated && (
        <div className="mb-4 flex items-center gap-2 text-cos-muted text-sm">
          <Clock size={14} />
          <span>Last updated {project.lastUpdated}</span>
        </div>
      )}

      {/* Main content */}
      <div className="markdown-content">
        <ReactMarkdown>{project?.content || ''}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ProjectPage
