import { graphql } from './gql'

export const CommentsQuery = graphql(`
  query Comments(
    $limit: Int
    $skip: Int = 0
    $filter: Comment_filter
    $orderBy: Comment_orderBy
    $orderDirection: OrderDirection
  ) {
    comments(
      where: $filter
      first: $limit
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      commentator
      createdAt
      id
      sectionId
      uri
      token {
        createdAt
        id
        updatedAt
        uri
      }
    }
  }
`)
