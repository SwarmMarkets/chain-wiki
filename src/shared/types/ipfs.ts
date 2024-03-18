import {
  CommentsQuery,
  NfTsQuery,
  NftQuery,
  NfturiUpdatesQuery,
  TokenQuery,
  TokenUriUpdatesQuery,
  TokensQuery,
} from '@src/queries/gql/graphql'

export interface IpfsNftContent {
  name: string
  address: string
  htmlContent: string
  indexPages?: string[]
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

export interface IpfsTokenContent {
  name: string
  address: string
  tokenId: number
  htmlContent: string
  voteProposal?: IpfsVoteProposal
  error?: string
}

export interface IpfsAttestationContent {
  htmlContent: string
}

export type NFTsQueryFullData = NfTsQuery['nfts'][0] & IpfsNftContent

export type NFTQueryFullData = NftQuery['nft'] & {
  ipfsContent?: IpfsNftContent
}

export type NftUriUpdatesQueryFullData =
  NfturiUpdatesQuery['nfturiupdates'][0] & {
    ipfsNewUriContent?: IpfsNftContent
    ipfsPrevUriContent?: IpfsNftContent
  }

export type TokenQueryFullData = TokenQuery['token'] & {
  ipfsContent?: IpfsTokenContent
}

export type TokensQueryFullData = TokensQuery['tokens'][0] & {
  ipfsContent?: IpfsTokenContent
}

export type TokenUriUpdatesQueryFullData =
  TokenUriUpdatesQuery['tokenURIUpdates'][0] & {
    ipfsNewUriContent?: IpfsTokenContent
    ipfsPrevUriContent?: IpfsTokenContent
  }

export type CommentsQueryFullData = CommentsQuery['comments'][0] & {
  ipfsContent?: IpfsAttestationContent
}
