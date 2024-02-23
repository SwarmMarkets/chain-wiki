import { TokenQueryFullData } from '@src/shared/types/ipfs'
import React from 'react'

export const TokenContext = React.createContext<TokenQueryFullData | null>(null)

export const TokenContextProvider = TokenContext.Provider

export const useTokenContext = () => {
  return React.useContext(TokenContext)
}
