import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import ActivityPage from './pages/ActivityPage'
import ProjectsListPage from './pages/ProjectsListPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </Layout>
  )
}

export default App
