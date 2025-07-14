import { NetworkStatus, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { TokenQuery } from 'src/queries'
import { QueryTokenArgs } from 'src/queries/gql/graphql'
import {
  IpfsTokenContent,
  IpfsVoteProposal,
  TokenQueryFullData,
} from 'src/shared/utils/ipfs/types'
import { useIpfsDownload } from '../web3/useIpfsDownload'

const POLL_INTERVAL = 1000 * 100

const useToken = (
  id: QueryTokenArgs['id'],
  options?: {
    disableRefetch?: boolean
  }
) => {
  const { download } = useIpfsDownload()

  const [tokenData, setTokenData] = useState<TokenQueryFullData | null>(null)

  const { loading, error, networkStatus, refetch } = useQuery(TokenQuery, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    pollInterval: options?.disableRefetch ? undefined : POLL_INTERVAL,
    variables: {
      id,
    },
    skip: !id,
    async onCompleted(data) {
      if (data.token?.uri || data.token?.voteProposalUri) {
        const ipfsContent = data.token.uri
          ? await download<IpfsTokenContent>(data.token.uri)
          : undefined
        const voteProposal = data.token.voteProposalUri
          ? await download<IpfsVoteProposal>(data.token.voteProposalUri)
          : undefined

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
