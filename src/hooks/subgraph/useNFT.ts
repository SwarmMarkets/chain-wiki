import { NetworkStatus, useQuery } from '@apollo/client'
import { NFTQuery } from '@src/queries'
import { useMemo } from 'react'
import { useIpfsHeaderLinksContent, useIpfsNftContent } from '../ipfs/nft'

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
    headerLinks,
    failureReason: errorHeaderLinks,
    isLoading: loadingHeaderLinks,
  } = useIpfsHeaderLinksContent(headerLinksUri)

  const {
    ipfsContent,
    failureReason: errorNftContent,
    isLoading: loadingNftContent,
  } = useIpfsNftContent(contentUri)

  const nftWithMetadata = useMemo(() => {
    return {
      ...data?.nft,
      headerLinks,
      ipfsContent,
    }
  }, [data?.nft, headerLinks, ipfsContent])

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
