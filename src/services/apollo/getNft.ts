import { ApolloClient } from '@apollo/client'
import { NFTQuery } from 'src/queries'
import {
  NftQuery as NFTQueryGQL,
  NftQueryVariables,
} from 'src/queries/gql/graphql'
import {
  NFTWithMetadata
} from 'src/shared/utils'
import defaultClient from '.'
import { fetchNftMetadata } from './fetchIpfsData'

/**
 * Fetches NFT data by ID for server environments (SSR, SSG, API routes).
 * Supports optional IPFS metadata resolution.
 */
export async function getNft(
  id: string,
  options?: {
    fetchFullData?: boolean
    client?: ApolloClient<any>
  }
): Promise<{ nft: NFTWithMetadata | null }> {
  if (!id) return { nft: null }

  const client = options?.client ?? defaultClient

  try {
    const { data } = await client.query<NFTQueryGQL, NftQueryVariables>({
      query: NFTQuery,
      variables: { id },
      fetchPolicy: 'no-cache',
    })

    const nft = data?.nft
    if (!nft) return { nft: null }

    if (!options?.fetchFullData) {
      return { nft: nft as NFTWithMetadata }
    }

    const nftWithMetadata = await fetchNftMetadata(nft)

    return { nft: nftWithMetadata }
  } catch (err) {
    console.error('Error fetching NFT:', err)
    return { nft: null }
  }
}
