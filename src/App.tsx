import { ApolloProvider } from '@apollo/client'
import { supportedChains } from '@src/environment/networks'
import {
  ThirdwebProvider,
  coinbaseWallet,
  en,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import Layout from './components/common/Layout'
import { environment } from './environment'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import client from './services/apollo'
import RoutePaths from './shared/enums/routes-paths'
import theme from './theme'
import MyProjectsPage from './pages/MyProjectsPage'
import { GlobalStyle } from './globalStyle'

function App() {
  return (
    <ApolloProvider client={client}>
      <ThirdwebProvider
        supportedChains={supportedChains}
        activeChain='mumbai'
        clientId={environment.thirdWebClientId}
        locale={en()}
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({ recommended: true }),
          walletConnect(),
        ]}
      >
        <ThemeProvider theme={theme}>
          <Router>
            <Layout>
              <Routes>
                <Route path={RoutePaths.HOME} element={<HomePage />} />
                <Route path={RoutePaths.PROJECT} element={<ProjectPage />} />
                <Route
                  path={RoutePaths.PROJECT + RoutePaths.ARTICLE}
                  element={<ArticlePage />}
                />
                <Route
                  path={RoutePaths.MY_PROJECTS}
                  element={<MyProjectsPage />}
                />
              </Routes>
            </Layout>
          </Router>
          <GlobalStyle />
          <ToastContainer />
        </ThemeProvider>
      </ThirdwebProvider>
    </ApolloProvider>
  )
}

export default App
