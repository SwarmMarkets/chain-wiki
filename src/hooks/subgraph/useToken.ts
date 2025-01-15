import { NetworkStatus, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { TokenQuery } from 'src/queries'
import { QueryTokenArgs } from 'src/queries/gql/graphql'
import { TokenQueryFullData } from 'src/shared/utils/ipfs/types'
import { useStorage } from '@thirdweb-dev/react'

const POLL_INTERVAL = 15000

const useToken = (id: QueryTokenArgs['id']) => {
  const storage = useStorage()
  const [tokenData, setTokenData] = useState<TokenQueryFullData | null>(null)

  const { loading, error, networkStatus, refetch } = useQuery(TokenQuery, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    pollInterval: POLL_INTERVAL,
    variables: {
      id,
    },
    async onCompleted(data) {
      if (data.token?.uri || data.token?.voteProposalUri) {
        const ipfsContent =
          data.token.uri && (await storage?.downloadJSON(data.token.uri))
        const voteProposal =
          data.token.voteProposalUri &&
          (await storage?.downloadJSON(data.token.voteProposalUri))
        setTokenData({ ...data.token, ipfsContent, voteProposal })
        return
      }
      data.token && setTokenData(data.token)
    },
  })

  return useMemo(
    () => ({
      token: tokenData,
      loadingToken:
        loading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      refetch,
      refetchingToken: [NetworkStatus.poll].includes(networkStatus),
    }),
    [error, loading, networkStatus, refetch, tokenData]
  )
}

export default useToken
