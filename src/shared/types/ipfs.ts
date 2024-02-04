import { NfTsQuery } from "@src/queries/gql/graphql"

export interface IpfsProjectContent {
  name: string
  address: string
  htmlContent: string
}

export interface IpfsArticleContent {
  name: string
  address: string
  tokenId: string
  htmlContent: string
}

export type NftFullData = NfTsQuery['nfts'][0] & IpfsProjectContent;