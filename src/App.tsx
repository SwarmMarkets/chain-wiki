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
import TokenPage from './pages/TokenPage'
import HomePage from './pages/HomePage'
import NftPage from './pages/NftPage'
import client from './services/apollo'
import RoutePaths from './shared/enums/routes-paths'
import theme from './theme'
import MyNftsPage from './pages/MyNftsPage'
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
            <Routes>
              <Route element={<Layout />}>
                <Route path={RoutePaths.HOME} element={<HomePage />} />
                <Route path={RoutePaths.NFT} element={<NftPage />} />
                <Route
                  path={RoutePaths.NFT + RoutePaths.TOKEN}
                  element={<TokenPage />}
                />
                <Route path={RoutePaths.MY_NFTS} element={<MyNftsPage />} />
              </Route>
            </Routes>
          </Router>
          <GlobalStyle />
          <ToastContainer />
          <div id='drawers' />
          <div id='modals' />
        </ThemeProvider>
      </ThirdwebProvider>
    </ApolloProvider>
  )
}

export default App
