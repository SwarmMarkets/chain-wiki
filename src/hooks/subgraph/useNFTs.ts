import { NetworkStatus, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { NFTsQuery } from '@src/queries'
import { NfTsQuery, QueryNftsArgs } from '@src/queries/gql/graphql'
import { useStorage } from '@thirdweb-dev/react'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 5000

type FullNft = NfTsQuery & {name: string; htmlContent: string};

interface UseNftConfig {
  fetchFullData?: boolean;
}

const useNFTs = (options?: QueryNftsArgs, config?: UseNftConfig) => {
  const storage = useStorage();
  const [fullData, setFullData] = useState<FullNft[] | null>(null);

  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
    refetch,
  } = useQuery(NFTsQuery, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    pollInterval: POLL_INTERVAL,
    variables: {
      limit: PAGE_LIMIT,
      skip: 0,
      ...options
    },
    async onCompleted(data) {
      if(!config?.fetchFullData) {
        return;
      }

      const promises = data.nfts.map((item) =>
        storage?.downloadJSON(item.uri)
      );

      const additionalData = await Promise.all(promises);

      const fullData = data.nfts.map((item, index) => {
        if (additionalData[index].error) {
          return item;
        }

        return {
          ...item,
          ...additionalData[index],
        };
      });

      setFullData(fullData)
    },
  })

  return useMemo(
    () => ({
      nfts: config?.fetchFullData ? fullData : data?.nfts,
      loadingNfts:
        loading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      refetch,
      refetchingNfts: [NetworkStatus.poll].includes(networkStatus),
      fetchMoreNfts: fetchMore,
    }),
    [config?.fetchFullData, data?.nfts, error, fetchMore, fullData, loading, networkStatus, refetch],
  )
}

export default useNFTs
