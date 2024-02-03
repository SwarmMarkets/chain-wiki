import { graphql } from './gql'

export const NFTURIUpdatesQuery = graphql(`
  query NFTURIUpdates(
    $limit: Int,
    $skip: Int = 0,
    $filter: NFTURIUpdate_filter
    $orderBy: NFTURIUpdate_orderBy
    $orderDirection: OrderDirection
  ) {
    nfturiupdates(
      where: $filter
      first: $limit
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      newURI
      previousURI
      updatedAt
    }
  }
`)
