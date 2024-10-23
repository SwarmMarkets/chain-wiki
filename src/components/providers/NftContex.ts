import { NFTWithMetadata} from '@src/shared/utils/ipfs/types'
import React from 'react'

export const NftContext = React.createContext<NFTWithMetadata | null>(null)

export const NftContextProvider = NftContext.Provider

export const useNftContext = () => {
  return React.useContext(NftContext)
}
