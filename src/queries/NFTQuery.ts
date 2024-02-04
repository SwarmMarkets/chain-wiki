import { graphql } from './gql'

export const NFTQuery = graphql(`
  query NFT($id: ID!) {
    nft(id: $id) {
      createdAt
      creator
      id
      name
      symbol
      updatedAt
      uri
      admins
      issuers
      agents
      editors
    }
  }
`)