import { ApolloProvider } from '@apollo/client'
import {
  arbitrumSepoliaChainConfig,
  supportedChains,
} from '@src/environment/networks'
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
import NftPage from './pages/NftPage'
import client from './services/apollo'
import RoutePaths from './shared/enums/routes-paths'
import theme from './theme'
import MyNftsPage from './pages/MyNftsPage'
import { GlobalStyle } from './globalStyle'
import ConnectWalletPage from './pages/ConnectWalletPage'
import WalletConnectedProtect from './components/common/WalletConnectedProtect'
import { HeaderColorProvider } from './components/Nft/NftView/HeaderColorContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EditPage from './pages/EditPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <ThirdwebProvider
          supportedChains={supportedChains}
          activeChain={arbitrumSepoliaChainConfig.chainId}
          clientId={environment.thirdWebClientId}
          locale={en()}
          supportedWallets={[
            metamaskWallet(),
            coinbaseWallet({ recommended: true }),
            walletConnect(),
          ]}
        >
          <ThemeProvider theme={theme}>
            <HeaderColorProvider>
              <Router>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path={RoutePaths.NFT} element={<NftPage />} />
                    <Route
                      path={RoutePaths.NFT + RoutePaths.TOKEN}
                      element={<TokenPage />}
                    />
                    <Route
                      path={RoutePaths.MY_NFTS}
                      element={
                        <WalletConnectedProtect>
                          <MyNftsPage />
                        </WalletConnectedProtect>
                      }
                    />
                    <Route path={RoutePaths.EDIT} element={<EditPage />} />
                  </Route>
                  <Route
                    path={RoutePaths.CONNECT_WALLET}
                    element={<ConnectWalletPage />}
                  />
                </Routes>
              </Router>
              <GlobalStyle />
              <ToastContainer />
              <div id='drawers' />
              <div id='modals' />
            </HeaderColorProvider>
          </ThemeProvider>
        </ThirdwebProvider>
      </ApolloProvider>
    </QueryClientProvider>
  )
}

export default App
