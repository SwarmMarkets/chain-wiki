import { ApolloProvider } from '@apollo/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThirdwebProvider } from 'thirdweb/react'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import TokenPage from './pages/TokenPage'
import client from './services/apollo'
import RoutePaths from './shared/enums/routes-paths'
import theme from './theme'
import { GlobalStyle } from './globalStyle'
import ConnectWalletPage from './pages/ConnectWalletPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EditPage from './pages/EditPage'
import Layout from './components/common/Layout'
import NftLayout from './components/common/Layout/NftLayout'
import ReadLayout from './components/common/Layout/ReadLayout'
import NftReadPage from './pages/NftReadPage'
import HomePage from './pages/HomePage'
import NftSettingsPage from './pages/NftSettingsPage'
import HistoryPage from './pages/HistoryPage'
import NftReadHistory from './components/common/Layout/ReadLayout/NftReadHistory'
import ExplorePage from './pages/ExplorePage'
import staticConfig from './config'
import ToastManager from './components/ui-kit/Toast/ToastManager'
import { useConfigStore } from './shared/store/config-store'
import useOnFirstMount from './components/ui-kit/hooks/useOnFirstMount'

const queryClient = new QueryClient()

const { defaultChain } = staticConfig

function App() {
  const { lastChainId, setLastChainId } = useConfigStore()

  useOnFirstMount(() => {
    if (!lastChainId) {
      setLastChainId(defaultChain.chainId)
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <ThirdwebProvider>
          <ThemeProvider theme={theme}>
            <Router>
              <Routes>
                <Route element={<Layout />}>
                  <Route element={<NftLayout />}>
                    <Route path={RoutePaths.NFT} element={<TokenPage />} />
                    <Route
                      path={RoutePaths.NFT + RoutePaths.TOKEN}
                      element={<TokenPage />}
                    />
                    <Route path={RoutePaths.EDIT} element={<EditPage />} />
                    <Route
                      path={RoutePaths.SETTINGS}
                      element={<NftSettingsPage />}
                    />
                    <Route
                      path={RoutePaths.HISTORY}
                      element={<HistoryPage />}
                    />
                  </Route>

                  <Route path={RoutePaths.HOME} element={<HomePage />} />
                </Route>
                <Route element={<ReadLayout />}>
                  <Route path={RoutePaths.NFT_READ} element={<NftReadPage />} />
                  <Route
                    path={RoutePaths.TOKEN_READ}
                    element={<NftReadPage />}
                  />
                  <Route
                    path={RoutePaths.TOKEN_READ_HISTORY}
                    element={<NftReadHistory />}
                  />
                </Route>
                <Route
                  path={RoutePaths.CONNECT_WALLET}
                  element={<ConnectWalletPage />}
                />
                <Route path={RoutePaths.EXPLORE} element={<ExplorePage />} />
              </Routes>
              <ToastManager />
            </Router>
            <GlobalStyle />
            <ToastContainer />
            <div id='drawers' />
            <div id='modals' />
          </ThemeProvider>
        </ThirdwebProvider>
      </ApolloProvider>
    </QueryClientProvider>
  )
}

export default App
