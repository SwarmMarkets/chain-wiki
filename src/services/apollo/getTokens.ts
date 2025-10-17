import { TokensQuery } from 'src/queries'
import {
  TokensQuery as TokensQueryGQL,
  TokensQueryVariables,
} from 'src/queries/gql/graphql'
import { joinTokenId, unifyAddressToId } from 'src/shared/utils'
import {
  IpfsTokenContent,
  TokensQueryFullData,
} from 'src/shared/utils/ipfs/types'
import deafultClient from '.'
import { fetchIpfsDataServer } from './fetchIpfsData'
import { ApolloClient } from '@apollo/client'

export const PAGE_LIMIT = 10

/**
 * Server-side version of useTokens.
 * Works without React and is suitable for SSR, SSG, and API routes.
 */

export async function getTokens(
  variables?: Partial<TokensQueryVariables>,
  config?: { fetchFullData?: boolean; client?: ApolloClient<any> }
) {
  try {
    const resolvedClient = config?.client || deafultClient

    const { data } = await resolvedClient.query<TokensQueryGQL, TokensQueryVariables>({
      query: TokensQuery,
      variables: {
        limit: PAGE_LIMIT,
        skip: 0,
        ...variables,
      },
      fetchPolicy: 'no-cache',
    })

    let fullData: TokensQueryFullData[] | null = null

    if (config?.fetchFullData) {
      const uris = data.tokens
        .map(token => token.uri)
        .filter(Boolean) as string[]

      const { mappedResults } = await fetchIpfsDataServer<IpfsTokenContent>(
        uris,
        {
          mapping: content =>
            joinTokenId(unifyAddressToId(content.address), content.tokenId),
        }
      )

      fullData = data.tokens.map(item => ({
        ...item,
        ipfsContent: item.uri ? mappedResults.get(item.id) : undefined,
      }))
    }

    return {
      tokens: data.tokens,
      fullTokens: fullData,
    }
  } catch (err) {
    console.error('Error fetching tokens:', err)
    return { tokens: [], fullTokens: null }
  }
}
