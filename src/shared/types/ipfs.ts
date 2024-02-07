import {
  NfTsQuery,
  NftQuery,
  TokenQuery,
  TokensQuery,
} from '@src/queries/gql/graphql'

export interface IpfsProjectContent {
  name: string
  address: string
  htmlContent: string
  error?: string
}

export interface IpfsArticleContent {
  name: string
  address: string
  tokenId: number
  htmlContent: string
  error?: string
}

export type NFTsQueryFullData = NfTsQuery['nfts'][0] & IpfsProjectContent

export type NFTQueryFullData = NftQuery['nft'] & {
  ipfsContent?: IpfsProjectContent
}

export type TokenQueryFullData = TokenQuery['token'] & {
  ipfsContent?: IpfsArticleContent
}

export type TokensQueryFullData = TokensQuery['tokens'] & {
  ipfsContent?: IpfsArticleContent
}
