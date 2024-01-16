import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import RoutePaths from './shared/enums/routes-paths'
import Layout from './components/common/Layout'
import ArticlePage from './pages/ArticlePage'
import theme from './theme'
import {
  ThirdwebProvider,
  en,
  metamaskWallet,
  coinbaseWallet,
  walletConnect
} from '@thirdweb-dev/react'
import { config } from './config'

function App() {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId={config.thirdWebClientId}
      locale={en()}
      supportedWallets={[metamaskWallet(), coinbaseWallet({ recommended: true }), walletConnect()]}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path={RoutePaths.HOME} element={<HomePage />} />
              <Route path={RoutePaths.PROJECT} element={<ProjectPage />} />
              <Route path={RoutePaths.PROJECT + RoutePaths.ARTICLE} element={<ArticlePage />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </ThirdwebProvider>
  )
}

export default App
