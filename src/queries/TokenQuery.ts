import { graphql } from './gql'

export const TokenQuery = graphql(`
  query Token($id: ID!) {
    token(id: $id) {
      createdAt
      id
      updatedAt
      uri
      nft {
        createdAt
        creator
        id
        name
        symbol
        updatedAt
        uri
      }
    }
  }
`)
