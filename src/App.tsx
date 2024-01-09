import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import RoutePaths from './shared/enums/routes-paths'
import Layout from './components/ui/Layout'
import ArticlePage from './pages/ArticlePage'

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path={RoutePaths.HOME} element={<HomePage />} />
        <Route path={RoutePaths.PROJECT} element={<ProjectPage />}>
          <Route path={RoutePaths.PROJECT + RoutePaths.ARTICLE} element={<ArticlePage />} />
        </Route>

      </Routes>
      </Layout>
    </Router>
  )
}

export default App
