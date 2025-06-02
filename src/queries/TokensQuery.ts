import { graphql } from './gql'

export const TokensQuery = graphql(`
  query Tokens(
    $limit: Int
    $skip: Int = 0
    $filter: Token_filter
    $orderBy: Token_orderBy
    $orderDirection: OrderDirection
  ) {
    tokens(
      where: $filter
      first: $limit
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      slug
      updatedAt
      createdAt
      name
      voteProposalUri
      uri
      nft {
        name
        symbol
        id
      }
    }
  }
`)
