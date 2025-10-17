import {
  TokenQuery as TokenQueryGQL,
  QueryTokenArgs,
} from 'src/queries/gql/graphql'
import {
  IpfsTokenContent,
  IpfsVoteProposal,
  TokenQueryFullData,
} from 'src/shared/utils/ipfs/types'
import { fetchIpfsDataServer } from './fetchIpfsData'
import client from '.'
import { TokenQuery } from 'src/queries'

/**
 * Server-side version of useToken.
 * Fetches a token by ID and optionally loads full IPFS content.
 */

export async function getToken(
  id: QueryTokenArgs['id']
): Promise<{ token: TokenQueryFullData | null }> {
  if (!id) return { token: null }

  try {
    const { data } = await client.query<TokenQueryGQL, QueryTokenArgs>({
      query: TokenQuery,
      variables: { id },
      fetchPolicy: 'no-cache',
    })

    const token = data.token
    if (!token) return { token: null }

    let ipfsContent: IpfsTokenContent | undefined
    let voteProposal: IpfsVoteProposal | undefined

    if (token.uri) {
      ipfsContent = (
        await fetchIpfsDataServer<IpfsTokenContent>([token.uri])
      ).mappedResults.get(token.uri)
    }

    if (token.voteProposalUri) {
      voteProposal = (
        await fetchIpfsDataServer<IpfsVoteProposal>([token.voteProposalUri])
      ).mappedResults.get(token.voteProposalUri)
    }

    const tokenFull: TokenQueryFullData = {
      ...token,
      ipfsContent,
      voteProposal,
    }

    return { token: tokenFull }
  } catch (err) {
    console.error('Error fetching token:', err)
    return { token: null }
  }
}
