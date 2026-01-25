import { NavLink } from 'react-router-dom'
import { Home, Activity, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Project {
  slug: string
  name: string
  momentum?: string
}

function Sidebar() {
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsExpanded, setProjectsExpanded] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(() => setProjects([]))
  }, [])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-cos-surface text-cos-text'
        : 'text-cos-muted hover:text-cos-text hover:bg-cos-surface/50'
    }`

  const getMomentumIcon = (momentum?: string) => {
    switch (momentum) {
      case 'active': return <span className="w-2 h-2 rounded-full bg-cos-success" />
      case 'slow': return <span className="w-2 h-2 rounded-full bg-cos-warning" />
      case 'stuck': return <span className="w-2 h-2 rounded-full bg-cos-danger" />
      default: return <span className="w-2 h-2 rounded-full bg-cos-muted" />
    }
  }

  return (
    <aside className="w-64 bg-cos-surface border-r border-cos-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-cos-border">
        <h1 className="text-lg font-semibold text-cos-text">Chief of Staff</h1>
        <p className="text-sm text-cos-muted">Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {/* Main navigation */}
        <NavLink to="/" className={navLinkClass}>
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/activity" className={navLinkClass}>
          <Activity size={18} />
          <span>Activity</span>
        </NavLink>

        {/* Projects section */}
        <div className="pt-4">
          <button
            onClick={() => setProjectsExpanded(!projectsExpanded)}
            className="flex items-center gap-2 px-3 py-2 w-full text-left text-cos-muted hover:text-cos-text transition-colors"
          >
            <ChevronRight
              size={14}
              className={`transition-transform ${projectsExpanded ? 'rotate-90' : ''}`}
            />
            <span className="text-sm font-medium uppercase tracking-wide">Projects</span>
          </button>

          {projectsExpanded && (
            <div className="mt-1 space-y-0.5">
              {projects.map(project => (
                <NavLink
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className={navLinkClass}
                >
                  {getMomentumIcon(project.momentum)}
                  <span className="truncate">{project.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-cos-border">
        <p className="text-xs text-cos-muted">
          Press <kbd className="px-1.5 py-0.5 bg-cos-bg rounded text-cos-text">?</kbd> for shortcuts
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
