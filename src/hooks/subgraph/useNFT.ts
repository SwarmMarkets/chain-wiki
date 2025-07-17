import { NetworkStatus, useQuery } from '@apollo/client'
import { NFTQuery } from 'src/queries'
import { useMemo } from 'react'
import {
  useIpfsHeaderLinks,
  useIpfsIndexPages,
  useIpfsNftContent,
} from '../ipfs/nft'
import {
  initialHeaderLinks,
  initialIndexPagesContent,
  initialNftContent,
} from 'src/shared/utils/ipfs/consts'
import { NFTWithMetadata } from 'src/shared/utils'

const POLL_INTERVAL = 1000 * 15

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
    skip: !id,
  })

  const headerLinksUri = options?.fetchFullData ? data?.nft?.headerLinksUri : ''
  const contentUri = options?.fetchFullData ? data?.nft?.uri : ''
  const indexPagesUri = options?.fetchFullData ? data?.nft?.indexPagesUri : ''

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

  const {
    indexPagesContent = initialIndexPagesContent,
    failureReason: errorIndexPages,
    isLoading: loadingIndexPages,
  } = useIpfsIndexPages(indexPagesUri)

  const nftWithMetadata = useMemo<NFTWithMetadata | null>(() => {
    if (!data?.nft) return null

    return {
      ...data?.nft,
      headerLinksContent,
      ipfsContent,
      indexPagesContent,
    }
  }, [data?.nft, headerLinksContent, indexPagesContent, ipfsContent])

  return useMemo(
    () => ({
      nft: nftWithMetadata,
      loadingNft:
        loading ||
        loadingHeaderLinks ||
        loadingNftContent ||
        loadingIndexPages ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error: error || errorHeaderLinks || errorNftContent || errorIndexPages,
      refetch,
      refetchingNft: [NetworkStatus.poll].includes(networkStatus),
    }),
    [
      error,
      errorHeaderLinks,
      errorIndexPages,
      errorNftContent,
      loading,
      loadingHeaderLinks,
      loadingIndexPages,
      loadingNftContent,
      networkStatus,
      nftWithMetadata,
      refetch,
    ]
  )
}

export default useNFT
