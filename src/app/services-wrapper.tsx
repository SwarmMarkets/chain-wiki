'use client'

import { ApolloProvider } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'
import client from 'src/services/apollo'
import theme from 'src/theme'
import { ThemeProvider } from 'styled-components'
import { ThirdwebProvider } from 'thirdweb/react'

const queryClient = new QueryClient()

const ServicesWrapper: React.FC<PropsWithChildren> = ({ children }) => {
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

export default ServicesWrapper
