'use client'

import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApolloProvider } from '@apollo/client'
import { ThirdwebProvider } from 'thirdweb/react'
import { ThemeProvider } from 'styled-components'
import theme from 'src/theme'
import client from 'src/services/apollo'

const queryClient = new QueryClient()

const ClientProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <ThirdwebProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThirdwebProvider>
      </ApolloProvider>
    </QueryClientProvider>
  )
}

export default ClientProviders
