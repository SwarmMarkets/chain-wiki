import {
  NfTsQuery as NFTsQueryGQL,
  NfTsQueryVariables,
} from 'src/queries/gql/graphql'
import { verifyNftValid, unifyAddressToId } from 'src/shared/utils'
import { IpfsNftContent, NFTsQueryFullData } from 'src/shared/utils/ipfs/types'
import { fetchIpfsDataServer } from './fetchIpfsData'
import { NFTsQuery } from 'src/queries'
import defaultClient from '.'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export const PAGE_LIMIT = 10

/**
 * Server-side equivalent of useNFTs.
 * Can be used inside server components, getServerSideProps, generateStaticParams, etc.
 */
export async function getNfts(
  variables?: Partial<NfTsQueryVariables>,
  config?: {
    fetchFullData?: boolean
    client?: ApolloClient<NormalizedCacheObject>
  }
) {
  try {
    const resolvedClient = config?.client || defaultClient
    const result = await resolvedClient.query<NFTsQueryGQL, NfTsQueryVariables>(
      {
        query: NFTsQuery,
        variables: {
          limit: PAGE_LIMIT,
          skip: 0,
          ...variables,
        },
        fetchPolicy: 'no-cache',
      }
    )

    const data = result?.data

    let fullData: NFTsQueryFullData[] | null = null

    if (config?.fetchFullData) {
      const uris = data.nfts.map(nft => nft.uri)
      const { mappedResults } = await fetchIpfsDataServer<IpfsNftContent>(
        uris,
        {
          validator: verifyNftValid,
          mapping: content => unifyAddressToId(content.address),
        }
      )

      fullData = data.nfts.map(item => {
        const ipfsContent = mappedResults.get(item.id)
        return ipfsContent ? { ...item, ipfsContent } : item
      })
    }

    return {
      nfts: data.nfts,
      fullNfts: fullData,
    }
  } catch (err) {
    console.error('Error fetching NFTs:', err)
    return { nfts: [], fullNfts: null }
  }
}
