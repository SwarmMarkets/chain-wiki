import { NetworkStatus, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { NFTQuery } from '@src/queries'
import { QueryNftArgs } from '@src/queries/gql/graphql'
import { NFTQueryFullData } from '@src/shared/types/ipfs'
import { useStorage } from '@thirdweb-dev/react'

const POLL_INTERVAL = 5000

interface UseNFTOptions {
  disableRefetch?: boolean
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
      if (data.nft?.uri) {
        const ipfsContent = await storage?.downloadJSON(data.nft?.uri)
        setNftData({ ...data.nft, ipfsContent })
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
