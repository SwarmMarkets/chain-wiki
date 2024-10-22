import { NetworkStatus, useQuery } from '@apollo/client'
import { NFTQuery } from '@src/queries'
import { QueryNftArgs } from '@src/queries/gql/graphql'
import { NFTQueryFullData } from '@src/shared/utils/ipfs/types'
import { useStorage } from '@thirdweb-dev/react'
import { useMemo, useState } from 'react'

const POLL_INTERVAL = 5000

interface UseNFTOptions {
  disableRefetch?: boolean
  fetchFullData?: boolean
}

const useNFT = (id: QueryNftArgs['id'], options?: UseNFTOptions) => {
  const storage = useStorage()
  const [nftData, setNftData] = useState<NFTQueryFullData | null>(null)

  const { loading, error, networkStatus, refetch } = useQuery(NFTQuery, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    pollInterval: options?.disableRefetch ? undefined : POLL_INTERVAL,
    variables: {
      id,
    },
    async onCompleted(data) {
      if (data.nft?.uri && options?.fetchFullData) {
        const ipfsContent = await storage?.downloadJSON(data.nft?.uri)
        const headerLinks = await storage?.downloadJSON(
          data.nft?.headerLinksUri
        )
        setNftData({ ...data.nft, ipfsContent, headerLinks })
        return
      }
      data?.nft && setNftData(data?.nft)
    },
  })

  return useMemo(
    () => ({
      nft: nftData,
      loadingNft:
        loading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      refetch,
      refetchingNft: [NetworkStatus.poll].includes(networkStatus),
    }),
    [error, loading, networkStatus, nftData, refetch]
  )
}

export default useNFT
