import { graphql } from './gql'

export const TokenURIUpdatesQuery = graphql(`
  query TokenURIUpdates(
    $limit: Int
    $skip: Int = 0
    $filter: TokenURIUpdate_filter
    $orderBy: TokenURIUpdate_orderBy
    $orderDirection: OrderDirection
  ) {
    tokenURIUpdates(
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
