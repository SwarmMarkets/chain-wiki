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
  address: string
  htmlContent: string
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
  address: string
  tokenId: number
  htmlContent: string
}

export interface IpfsAttestationContent {
  htmlContent: string
}

export interface IpfsIndexPage {
  tokenId: string
  title: string
  child?: IpfsIndexPage
}

export interface IpfsIndexPagesContent {
  address: string
  indexPages: IpfsIndexPage[]
}

export interface IpfsHeaderLinksContent {
  address: string
  headerLinks: IpfsHeaderLink[]
}

export interface IpfsHeaderLink {
  id: string
  title: string
  link: string
}

export type NFTsQueryFullData = NfTsQuery['nfts'][0] & {
  ipfsContent?: IpfsNftContent
}

export type NFTWithMetadata = NftQuery['nft'] & {
  ipfsContent?: IpfsNftContent
  headerLinks?: IpfsHeaderLink[]
}

export type NftUriUpdatesQueryFullData =
  NfturiUpdatesQuery['nfturiupdates'][0] & {
    ipfsNewUriContent?: IpfsNftContent
    ipfsPrevUriContent?: IpfsNftContent
  }

export type TokenQueryFullData = TokenQuery['token'] & {
  ipfsContent?: IpfsTokenContent
  voteProposal?: IpfsVoteProposal
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
