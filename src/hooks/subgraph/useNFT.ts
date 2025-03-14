import { NetworkStatus, useQuery } from '@apollo/client'
import { NFTQuery } from 'src/queries'
import { useMemo } from 'react'
import { useIpfsHeaderLinks, useIpfsNftContent } from '../ipfs/nft'
import {
  initialHeaderLinks,
  initialNftContent,
} from 'src/shared/utils/ipfs/consts'
import { NFTWithMetadata } from 'src/shared/utils'

const POLL_INTERVAL = 15000

interface UseNFTOptions {
  disableRefetch?: boolean
  fetchFullData?: boolean
}

const useNFT = (id: string, options?: UseNFTOptions) => {
  const { data, loading, error, networkStatus, refetch } = useQuery(NFTQuery, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    pollInterval: options?.disableRefetch ? undefined : POLL_INTERVAL,
    variables: {
      id,
    },
  })

  const headerLinksUri = options?.fetchFullData ? data?.nft?.headerLinksUri : ''
  const contentUri = options?.fetchFullData ? data?.nft?.uri : ''

  const {
    headerLinksContent = initialHeaderLinks,
    failureReason: errorHeaderLinks,
    isLoading: loadingHeaderLinks,
  } = useIpfsHeaderLinks(headerLinksUri)

  const {
    ipfsContent = initialNftContent,
    failureReason: errorNftContent,
    isLoading: loadingNftContent,
  } = useIpfsNftContent(contentUri)
  const nftWithMetadata = useMemo<NFTWithMetadata | null>(() => {
    if (!data?.nft) return null

    return {
      ...data?.nft,
      headerLinksContent,
      ipfsContent,
    }
  }, [data?.nft, headerLinksContent, ipfsContent])

  return useMemo(
    () => ({
      nft: nftWithMetadata,
      loadingNft:
        loading ||
        loadingHeaderLinks ||
        loadingNftContent ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error: error || errorHeaderLinks || errorNftContent,
      refetch,
      refetchingNft: [NetworkStatus.poll].includes(networkStatus),
    }),
    [
      error,
      errorHeaderLinks,
      errorNftContent,
      loading,
      loadingHeaderLinks,
      loadingNftContent,
      networkStatus,
      nftWithMetadata,
      refetch,
    ]
  )
}

export default useNFT
