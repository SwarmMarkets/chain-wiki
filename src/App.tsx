import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import RoutePaths from './shared/enums/routes-paths'
import Layout from './components/common/Layout'
import ArticlePage from './pages/ArticlePage'
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App
