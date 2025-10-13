'use client'

import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApolloProvider } from '@apollo/client'
import { ThirdwebProvider } from 'thirdweb/react'
import client from 'src/services/apollo'

const queryClient = new QueryClient()

const ClientProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </ApolloProvider>
    </QueryClientProvider>
  )
}

export default ClientProviders
