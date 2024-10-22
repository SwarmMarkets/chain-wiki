import { NetworkStatus, useQuery } from '@apollo/client'
import { NFTQuery } from '@src/queries'
import { QueryNftArgs } from '@src/queries/gql/graphql'
import { useMemo } from 'react'
import { useIpfsHeaderLinksContent, useIpfsNftContent } from '../ipfs/nft'

const POLL_INTERVAL = 15000

interface UseNFTOptions {
  disableRefetch?: boolean
  fetchFullData?: boolean
}

const useNFT = (id: QueryNftArgs['id'], options?: UseNFTOptions) => {
  const { data, loading, error, networkStatus, refetch } = useQuery(NFTQuery, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    pollInterval: options?.disableRefetch ? undefined : POLL_INTERVAL,
    variables: {
      id,
    },
  })

  const {
    headerLinks,
    failureReason: errorHeaderLinks,
    isLoading: loadingHeaderLinks,
  } = useIpfsHeaderLinksContent(data?.nft?.headerLinksUri)

  const {
    ipfsContent,
    failureReason: errorNftContent,
    isLoading: loadingNftContent,
  } = useIpfsNftContent(data?.nft?.uri)

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
