import { TokenQueryFullData } from '@src/shared/utils/ipfs/types'
import React from 'react'

export const TokenContext = React.createContext<TokenQueryFullData | null>(null)

export const TokenContextProvider = TokenContext.Provider

export const useTokenContext = () => {
  return React.useContext(TokenContext)
}
