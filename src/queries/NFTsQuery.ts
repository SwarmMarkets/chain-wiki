import { graphql } from './gql'

export const NFTsQuery = graphql(`
  query NFTs(
    $limit: Int
    $skip: Int = 0
    $filter: NFT_filter
    $orderBy: NFT_orderBy
    $orderDirection: OrderDirection
  ) {
    nfts(
      where: $filter
      first: $limit
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      slug
      name
      symbol
      createdAt
      updatedAt
      creator
      uri
      indexPagesUri
      headerBackground
      logoUrl
      iconLogoUrl
      admins
      editors
      preferredAttestators
    }
  }
`)
