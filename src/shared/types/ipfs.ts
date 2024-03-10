import {
  NfTsQuery,
  NftQuery,
  NfturiUpdatesQuery,
  TokenQuery,
  TokenUriUpdatesQuery,
  TokensQuery,
} from '@src/queries/gql/graphql'

export interface IpfsProjectContent {
  name: string
  address: string
  htmlContent: string
  error?: string
  
}

export interface IpfsVoteProposal {
  id: string
  space: string
  type: string
  title: string
  body: string
  choices: Array<string>
  start: number
  end: number
  timestamp: number
}

export interface IpfsArticleContent {
  name: string
  address: string
  tokenId: number
  htmlContent: string
  voteProposal?: IpfsVoteProposal
  error?: string
}

export type NFTsQueryFullData = NfTsQuery['nfts'][0] & IpfsProjectContent

export type NFTQueryFullData = NftQuery['nft'] & {
  ipfsContent?: IpfsProjectContent
}

export type NftUriUpdatesQueryFullData =
  NfturiUpdatesQuery['nfturiupdates'][0] & {
    ipfsNewUriContent?: IpfsProjectContent
    ipfsPrevUriContent?: IpfsProjectContent
  }

export type TokenQueryFullData = TokenQuery['token'] & {
  ipfsContent?: IpfsArticleContent
}

export type TokensQueryFullData = TokensQuery['tokens'][0] & {
  ipfsContent?: IpfsArticleContent
}

export type TokenUriUpdatesQueryFullData =
  TokenUriUpdatesQuery['tokenURIUpdates'][0] & {
    ipfsNewUriContent?: IpfsArticleContent
    ipfsPrevUriContent?: IpfsArticleContent
  }
