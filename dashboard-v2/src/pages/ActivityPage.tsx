import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Clock, RefreshCw } from 'lucide-react'

interface ActivityData {
  content: string
  lastUpdated: string
  stale: boolean
}

function ActivityPage() {
  const [activity, setActivity] = useState<ActivityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/activity')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load activity feed')
        return res.json()
      })
      .then(data => {
        setActivity(data)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
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
          <h2 className="text-xl font-semibold mb-2">Activity Feed Not Available</h2>
          <p className="text-cos-muted mb-4">
            {error}. Run the activity-synthesizer agent to generate it:
          </p>
          <pre className="bg-cos-bg p-4 rounded-lg text-sm overflow-x-auto">
            <code>claude "Run the activity-synthesizer agent"</code>
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      {/* Staleness indicator */}
      {activity?.stale && (
        <div className="mb-4 flex items-center gap-2 text-cos-warning text-sm">
          <Clock size={14} />
          <span>
            Last updated {activity.lastUpdated} - consider refreshing the feed
          </span>
        </div>
      )}

      {!activity?.stale && activity?.lastUpdated && (
        <div className="mb-4 flex items-center gap-2 text-cos-muted text-sm">
          <Clock size={14} />
          <span>Last updated {activity.lastUpdated}</span>
        </div>
      )}

      {/* Main content */}
      <div className="markdown-content">
        <ReactMarkdown>{activity?.content || ''}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ActivityPage
