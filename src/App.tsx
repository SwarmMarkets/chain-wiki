import {
  ThirdwebProvider,
  coinbaseWallet,
  en,
  metamaskWallet,
  walletConnect
} from '@thirdweb-dev/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Layout from './components/common/Layout'
import { environment } from './environment'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import RoutePaths from './shared/enums/routes-paths'
import theme from './theme'
import { PermissionsProvider } from './components/providers/PermissionProvider'
import { ApolloProvider } from '@apollo/client'
import client from './services/apollo'

function App() {
  return (
    <ApolloProvider client={client}>
      <ThirdwebProvider
        activeChain="mumbai"
        clientId={environment.thirdWebClientId}
        locale={en()}
        supportedWallets={[metamaskWallet(), coinbaseWallet({ recommended: true }), walletConnect()]}>
        <ThemeProvider theme={theme}>
          <PermissionsProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path={RoutePaths.HOME} element={<HomePage />} />
                  <Route path={RoutePaths.PROJECT} element={<ProjectPage />} />
                  <Route path={RoutePaths.PROJECT + RoutePaths.ARTICLE} element={<ArticlePage />} />
                </Routes>
              </Layout>
            </Router>
          </PermissionsProvider>
        </ThemeProvider>
      </ThirdwebProvider>
    </ApolloProvider>
  )
}

export default App
