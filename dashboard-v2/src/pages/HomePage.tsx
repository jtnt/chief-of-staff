import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Clock, RefreshCw } from 'lucide-react'

interface DailyBrief {
  content: string
  lastUpdated: string
  stale: boolean
}

function HomePage() {
  const [brief, setBrief] = useState<DailyBrief | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBrief = () => {
    setLoading(true)
    fetch('/api/daily-brief')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load daily brief')
        return res.json()
      })
      .then(data => {
        setBrief(data)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchBrief()
  }, [])

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
          <h2 className="text-xl font-semibold mb-2">Daily Brief Not Available</h2>
          <p className="text-cos-muted mb-4">
            {error}. Run the daily-briefer agent to generate it:
          </p>
          <pre className="bg-cos-bg p-4 rounded-lg text-sm overflow-x-auto">
            <code>claude "Run the daily-briefer agent"</code>
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      {/* Staleness indicator */}
      {brief?.stale && (
        <div className="mb-4 flex items-center gap-2 text-cos-warning text-sm">
          <Clock size={14} />
          <span>
            Last updated {brief.lastUpdated} - consider refreshing the brief
          </span>
        </div>
      )}

      {!brief?.stale && brief?.lastUpdated && (
        <div className="mb-4 flex items-center gap-2 text-cos-muted text-sm">
          <Clock size={14} />
          <span>Last updated {brief.lastUpdated}</span>
        </div>
      )}

      {/* Main content */}
      <div className="markdown-content">
        <ReactMarkdown>{brief?.content || ''}</ReactMarkdown>
      </div>
    </div>
  )
}

export default HomePage
