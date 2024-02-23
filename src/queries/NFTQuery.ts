import { graphql } from './gql'

export const NFTQuery = graphql(`
  query NFT($id: ID!) {
    nft(id: $id) {
      id
      name
      symbol
      updatedAt
      createdAt
      uri
      creator
      admins
      issuers
      agents
      editors
    }
  }
`)

export const NFTAccessRolesQuery = graphql(`
  query NFTAccessRoles($id: ID!) {
    nft(id: $id) {
      id
      creator
      admins
      issuers
      agents
      editors
    }
  }
`)
