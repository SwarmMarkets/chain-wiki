import { ApolloClient } from '@apollo/client'
import staticConfig from 'src/config'
import { polygonEnvironment } from 'src/environment/networks/polygon'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import client, { commonAppoloClientConfig } from 'src/services/apollo'
import useNFTs from './useNFTs'
import { baseEnvironment } from 'src/environment/networks/base'
import { useMemo } from 'react'

const EXAMPLE_ADDRESSES_BASE = [
  '0x4ea6e5b747e526362b1b8a7edb09791dfb44b925',
  '0x163ef516d69792b71a1bcef0eeda8830b1431776',
  '0xd373a30ef8b791a291685dda48296a0d99190976',
]
const EXAMPLE_ADDRESSES_POLYGON: string[] = []

const baseSubgraphClient = new ApolloClient({
  ...commonAppoloClientConfig,
  uri: baseEnvironment.subgraphURL,
})
const polygonSubgraphClient = new ApolloClient({
  uri: polygonEnvironment.subgraphURL,
  ...commonAppoloClientConfig,
})

const useNFTExamples = () => {
  const baseOrSepoliaNfts = useNFTs({
    variables: {
      orderBy: Nft_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
      ...(!staticConfig.isDevMode && {
        filter: {
          id_in: EXAMPLE_ADDRESSES_BASE,
        },
      }),
    },
    pollInterval: undefined,
    client: staticConfig.isDevMode ? client : baseSubgraphClient,
  })

  const polygonNfts = useNFTs({
    variables: {
      orderBy: Nft_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
      ...(!staticConfig.isDevMode && {
        filter: {
          id_in: EXAMPLE_ADDRESSES_POLYGON,
        },
      }),
    },
    skip: EXAMPLE_ADDRESSES_POLYGON.length === 0 || staticConfig.isDevMode,
    client: polygonSubgraphClient,
    pollInterval: undefined,
  })

  const isLoading = baseOrSepoliaNfts.loadingNfts || polygonNfts.loadingNfts
  const isError = baseOrSepoliaNfts.error || polygonNfts.error

  const combinedData = useMemo(() => {
    const base = baseOrSepoliaNfts.nfts || []
    const polygon = polygonNfts.nfts || []
    return [...base, ...polygon]
  }, [baseOrSepoliaNfts.nfts, polygonNfts.nfts])

  return {
    nfts: combinedData,
    loading: isLoading,
    error: isError,
  }
}

export default useNFTExamples
