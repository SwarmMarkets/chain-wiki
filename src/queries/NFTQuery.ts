import { graphql } from './gql'

export const NFTQuery = graphql(`
  query NFT($id: ID!) {
    nft(id: $id) {
      id
      slug
      name
      symbol
      updatedAt
      createdAt
      uri
      indexPagesUri
      headerLinksUri
      logoUrl
      iconLogoUrl
      creator
      admins
      editors
      headerBackground
      preferredAttestators
    }
  }
`)

export const NFTAccessRolesQuery = graphql(`
  query NFTAccessRoles($id: ID!) {
    nft(id: $id) {
      id
      creator
      admins
      editors
    }
  }
`)
