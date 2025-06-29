/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: string; output: string; }
  Bytes: { input: string; output: string; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Comment = {
  __typename?: 'Comment';
  commentator: Scalars['Bytes']['output'];
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  sectionId: Scalars['String']['output'];
  token: Token;
  uri: Scalars['String']['output'];
};

export type Comment_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Comment_Filter>>>;
  commentator?: InputMaybe<Scalars['Bytes']['input']>;
  commentator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  commentator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  commentator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  commentator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  commentator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  commentator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  commentator_not?: InputMaybe<Scalars['Bytes']['input']>;
  commentator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  commentator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Comment_Filter>>>;
  sectionId?: InputMaybe<Scalars['String']['input']>;
  sectionId_contains?: InputMaybe<Scalars['String']['input']>;
  sectionId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sectionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  sectionId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sectionId_gt?: InputMaybe<Scalars['String']['input']>;
  sectionId_gte?: InputMaybe<Scalars['String']['input']>;
  sectionId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sectionId_lt?: InputMaybe<Scalars['String']['input']>;
  sectionId_lte?: InputMaybe<Scalars['String']['input']>;
  sectionId_not?: InputMaybe<Scalars['String']['input']>;
  sectionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  sectionId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sectionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  sectionId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sectionId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sectionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  sectionId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sectionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  sectionId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_gt?: InputMaybe<Scalars['String']['input']>;
  uri_gte?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_lt?: InputMaybe<Scalars['String']['input']>;
  uri_lte?: InputMaybe<Scalars['String']['input']>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Comment_OrderBy {
  Commentator = 'commentator',
  CreatedAt = 'createdAt',
  Id = 'id',
  SectionId = 'sectionId',
  Token = 'token',
  TokenCarbonCreditTokenId = 'token__carbonCreditTokenId',
  TokenCreatedAt = 'token__createdAt',
  TokenGuid = 'token__guid',
  TokenId = 'token__id',
  TokenName = 'token__name',
  TokenSlug = 'token__slug',
  TokenUpdatedAt = 'token__updatedAt',
  TokenUri = 'token__uri',
  TokenVoteProposalUri = 'token__voteProposalUri',
  Uri = 'uri'
}

export type Nft = {
  __typename?: 'NFT';
  /** List of addresses with DEFAULT_ADMIN_ROLE */
  admins: Array<Scalars['Bytes']['output']>;
  createdAt: Scalars['BigInt']['output'];
  creator: Scalars['Bytes']['output'];
  /** List of addresses with EDITOR role */
  editors: Array<Scalars['Bytes']['output']>;
  headerBackground: Scalars['String']['output'];
  headerLinksUri: Scalars['String']['output'];
  iconLogoUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  indexPagesUri: Scalars['String']['output'];
  logoUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  preferredAttestators: Array<Scalars['Bytes']['output']>;
  slug: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  tokens?: Maybe<Array<Token>>;
  updatedAt: Scalars['BigInt']['output'];
  uri: Scalars['String']['output'];
};


export type NftTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Token_Filter>;
};

export type NftFactory = {
  __typename?: 'NFTFactory';
  id: Scalars['ID']['output'];
};

export type NftFactory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NftFactory_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<NftFactory_Filter>>>;
};

export enum NftFactory_OrderBy {
  Id = 'id'
}

export type NfturiUpdate = {
  __typename?: 'NFTURIUpdate';
  id: Scalars['ID']['output'];
  newURI: Scalars['String']['output'];
  nft: Nft;
  previousURI: Scalars['String']['output'];
  updatedAt: Scalars['BigInt']['output'];
};

export type NfturiUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NfturiUpdate_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  newURI?: InputMaybe<Scalars['String']['input']>;
  newURI_contains?: InputMaybe<Scalars['String']['input']>;
  newURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  newURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_gt?: InputMaybe<Scalars['String']['input']>;
  newURI_gte?: InputMaybe<Scalars['String']['input']>;
  newURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newURI_lt?: InputMaybe<Scalars['String']['input']>;
  newURI_lte?: InputMaybe<Scalars['String']['input']>;
  newURI_not?: InputMaybe<Scalars['String']['input']>;
  newURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  newURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  newURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  newURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  newURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft?: InputMaybe<Scalars['String']['input']>;
  nft_?: InputMaybe<Nft_Filter>;
  nft_contains?: InputMaybe<Scalars['String']['input']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_ends_with?: InputMaybe<Scalars['String']['input']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_gt?: InputMaybe<Scalars['String']['input']>;
  nft_gte?: InputMaybe<Scalars['String']['input']>;
  nft_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nft_lt?: InputMaybe<Scalars['String']['input']>;
  nft_lte?: InputMaybe<Scalars['String']['input']>;
  nft_not?: InputMaybe<Scalars['String']['input']>;
  nft_not_contains?: InputMaybe<Scalars['String']['input']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nft_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_starts_with?: InputMaybe<Scalars['String']['input']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<NfturiUpdate_Filter>>>;
  previousURI?: InputMaybe<Scalars['String']['input']>;
  previousURI_contains?: InputMaybe<Scalars['String']['input']>;
  previousURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_gt?: InputMaybe<Scalars['String']['input']>;
  previousURI_gte?: InputMaybe<Scalars['String']['input']>;
  previousURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousURI_lt?: InputMaybe<Scalars['String']['input']>;
  previousURI_lte?: InputMaybe<Scalars['String']['input']>;
  previousURI_not?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum NfturiUpdate_OrderBy {
  Id = 'id',
  NewUri = 'newURI',
  Nft = 'nft',
  NftCreatedAt = 'nft__createdAt',
  NftCreator = 'nft__creator',
  NftHeaderBackground = 'nft__headerBackground',
  NftHeaderLinksUri = 'nft__headerLinksUri',
  NftIconLogoUrl = 'nft__iconLogoUrl',
  NftId = 'nft__id',
  NftIndexPagesUri = 'nft__indexPagesUri',
  NftLogoUrl = 'nft__logoUrl',
  NftName = 'nft__name',
  NftSlug = 'nft__slug',
  NftSymbol = 'nft__symbol',
  NftUpdatedAt = 'nft__updatedAt',
  NftUri = 'nft__uri',
  PreviousUri = 'previousURI',
  UpdatedAt = 'updatedAt'
}

export type Nft_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  admins?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admins_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admins_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admins_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admins_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admins_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Nft_Filter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creator?: InputMaybe<Scalars['Bytes']['input']>;
  creator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  editors?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  editors_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  editors_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  editors_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  editors_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  editors_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  headerBackground?: InputMaybe<Scalars['String']['input']>;
  headerBackground_contains?: InputMaybe<Scalars['String']['input']>;
  headerBackground_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  headerBackground_ends_with?: InputMaybe<Scalars['String']['input']>;
  headerBackground_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  headerBackground_gt?: InputMaybe<Scalars['String']['input']>;
  headerBackground_gte?: InputMaybe<Scalars['String']['input']>;
  headerBackground_in?: InputMaybe<Array<Scalars['String']['input']>>;
  headerBackground_lt?: InputMaybe<Scalars['String']['input']>;
  headerBackground_lte?: InputMaybe<Scalars['String']['input']>;
  headerBackground_not?: InputMaybe<Scalars['String']['input']>;
  headerBackground_not_contains?: InputMaybe<Scalars['String']['input']>;
  headerBackground_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  headerBackground_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  headerBackground_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  headerBackground_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  headerBackground_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  headerBackground_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  headerBackground_starts_with?: InputMaybe<Scalars['String']['input']>;
  headerBackground_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_contains?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_ends_with?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_gt?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_gte?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  headerLinksUri_lt?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_lte?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_not?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_not_contains?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  headerLinksUri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_starts_with?: InputMaybe<Scalars['String']['input']>;
  headerLinksUri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_contains?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_ends_with?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_gt?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_gte?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  iconLogoUrl_lt?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_lte?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_not?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  iconLogoUrl_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_starts_with?: InputMaybe<Scalars['String']['input']>;
  iconLogoUrl_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  indexPagesUri?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_contains?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_gt?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_gte?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexPagesUri_lt?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_lte?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_not?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_not_contains?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexPagesUri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexPagesUri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  logoUrl_contains?: InputMaybe<Scalars['String']['input']>;
  logoUrl_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  logoUrl_ends_with?: InputMaybe<Scalars['String']['input']>;
  logoUrl_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  logoUrl_gt?: InputMaybe<Scalars['String']['input']>;
  logoUrl_gte?: InputMaybe<Scalars['String']['input']>;
  logoUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  logoUrl_lt?: InputMaybe<Scalars['String']['input']>;
  logoUrl_lte?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  logoUrl_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  logoUrl_starts_with?: InputMaybe<Scalars['String']['input']>;
  logoUrl_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Nft_Filter>>>;
  preferredAttestators?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  preferredAttestators_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  preferredAttestators_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  preferredAttestators_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  preferredAttestators_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  preferredAttestators_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  slug_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_gt?: InputMaybe<Scalars['String']['input']>;
  slug_gte?: InputMaybe<Scalars['String']['input']>;
  slug_in?: InputMaybe<Array<Scalars['String']['input']>>;
  slug_lt?: InputMaybe<Scalars['String']['input']>;
  slug_lte?: InputMaybe<Scalars['String']['input']>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  slug_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  slug_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  slug_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokens_?: InputMaybe<Token_Filter>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_gt?: InputMaybe<Scalars['String']['input']>;
  uri_gte?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_lt?: InputMaybe<Scalars['String']['input']>;
  uri_lte?: InputMaybe<Scalars['String']['input']>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Nft_OrderBy {
  Admins = 'admins',
  CreatedAt = 'createdAt',
  Creator = 'creator',
  Editors = 'editors',
  HeaderBackground = 'headerBackground',
  HeaderLinksUri = 'headerLinksUri',
  IconLogoUrl = 'iconLogoUrl',
  Id = 'id',
  IndexPagesUri = 'indexPagesUri',
  LogoUrl = 'logoUrl',
  Name = 'name',
  PreferredAttestators = 'preferredAttestators',
  Slug = 'slug',
  Symbol = 'symbol',
  Tokens = 'tokens',
  UpdatedAt = 'updatedAt',
  Uri = 'uri'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  nft?: Maybe<Nft>;
  nftfactories: Array<NftFactory>;
  nftfactory?: Maybe<NftFactory>;
  nfts: Array<Nft>;
  nfturiupdate?: Maybe<NfturiUpdate>;
  nfturiupdates: Array<NfturiUpdate>;
  token?: Maybe<Token>;
  tokenURIUpdate?: Maybe<TokenUriUpdate>;
  tokenURIUpdates: Array<TokenUriUpdate>;
  tokens: Array<Token>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryCommentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCommentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Comment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Comment_Filter>;
};


export type QueryNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryNftfactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NftFactory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NftFactory_Filter>;
};


export type QueryNftfactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryNftsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Nft_Filter>;
};


export type QueryNfturiupdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryNfturiupdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NfturiUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NfturiUpdate_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenUriUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenUriUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenUriUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenUriUpdate_Filter>;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Token = {
  __typename?: 'Token';
  carbonCreditTokenId: Scalars['String']['output'];
  createdAt: Scalars['BigInt']['output'];
  guid: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nft: Nft;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['BigInt']['output'];
  uri: Scalars['String']['output'];
  voteProposalUri: Scalars['String']['output'];
};

export type TokenUriUpdate = {
  __typename?: 'TokenURIUpdate';
  id: Scalars['ID']['output'];
  newURI: Scalars['String']['output'];
  nft: Nft;
  previousURI: Scalars['String']['output'];
  token: Token;
  updatedAt: Scalars['BigInt']['output'];
};

export type TokenUriUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenUriUpdate_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  newURI?: InputMaybe<Scalars['String']['input']>;
  newURI_contains?: InputMaybe<Scalars['String']['input']>;
  newURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  newURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_gt?: InputMaybe<Scalars['String']['input']>;
  newURI_gte?: InputMaybe<Scalars['String']['input']>;
  newURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newURI_lt?: InputMaybe<Scalars['String']['input']>;
  newURI_lte?: InputMaybe<Scalars['String']['input']>;
  newURI_not?: InputMaybe<Scalars['String']['input']>;
  newURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  newURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  newURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  newURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  newURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft?: InputMaybe<Scalars['String']['input']>;
  nft_?: InputMaybe<Nft_Filter>;
  nft_contains?: InputMaybe<Scalars['String']['input']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_ends_with?: InputMaybe<Scalars['String']['input']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_gt?: InputMaybe<Scalars['String']['input']>;
  nft_gte?: InputMaybe<Scalars['String']['input']>;
  nft_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nft_lt?: InputMaybe<Scalars['String']['input']>;
  nft_lte?: InputMaybe<Scalars['String']['input']>;
  nft_not?: InputMaybe<Scalars['String']['input']>;
  nft_not_contains?: InputMaybe<Scalars['String']['input']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nft_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_starts_with?: InputMaybe<Scalars['String']['input']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<TokenUriUpdate_Filter>>>;
  previousURI?: InputMaybe<Scalars['String']['input']>;
  previousURI_contains?: InputMaybe<Scalars['String']['input']>;
  previousURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_gt?: InputMaybe<Scalars['String']['input']>;
  previousURI_gte?: InputMaybe<Scalars['String']['input']>;
  previousURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousURI_lt?: InputMaybe<Scalars['String']['input']>;
  previousURI_lte?: InputMaybe<Scalars['String']['input']>;
  previousURI_not?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum TokenUriUpdate_OrderBy {
  Id = 'id',
  NewUri = 'newURI',
  Nft = 'nft',
  NftCreatedAt = 'nft__createdAt',
  NftCreator = 'nft__creator',
  NftHeaderBackground = 'nft__headerBackground',
  NftHeaderLinksUri = 'nft__headerLinksUri',
  NftIconLogoUrl = 'nft__iconLogoUrl',
  NftId = 'nft__id',
  NftIndexPagesUri = 'nft__indexPagesUri',
  NftLogoUrl = 'nft__logoUrl',
  NftName = 'nft__name',
  NftSlug = 'nft__slug',
  NftSymbol = 'nft__symbol',
  NftUpdatedAt = 'nft__updatedAt',
  NftUri = 'nft__uri',
  PreviousUri = 'previousURI',
  Token = 'token',
  TokenCarbonCreditTokenId = 'token__carbonCreditTokenId',
  TokenCreatedAt = 'token__createdAt',
  TokenGuid = 'token__guid',
  TokenId = 'token__id',
  TokenName = 'token__name',
  TokenSlug = 'token__slug',
  TokenUpdatedAt = 'token__updatedAt',
  TokenUri = 'token__uri',
  TokenVoteProposalUri = 'token__voteProposalUri',
  UpdatedAt = 'updatedAt'
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  carbonCreditTokenId?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_contains?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_gt?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_gte?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  carbonCreditTokenId_lt?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_lte?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_not?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  carbonCreditTokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  carbonCreditTokenId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  guid?: InputMaybe<Scalars['String']['input']>;
  guid_contains?: InputMaybe<Scalars['String']['input']>;
  guid_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  guid_ends_with?: InputMaybe<Scalars['String']['input']>;
  guid_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  guid_gt?: InputMaybe<Scalars['String']['input']>;
  guid_gte?: InputMaybe<Scalars['String']['input']>;
  guid_in?: InputMaybe<Array<Scalars['String']['input']>>;
  guid_lt?: InputMaybe<Scalars['String']['input']>;
  guid_lte?: InputMaybe<Scalars['String']['input']>;
  guid_not?: InputMaybe<Scalars['String']['input']>;
  guid_not_contains?: InputMaybe<Scalars['String']['input']>;
  guid_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  guid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  guid_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  guid_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  guid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  guid_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  guid_starts_with?: InputMaybe<Scalars['String']['input']>;
  guid_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft?: InputMaybe<Scalars['String']['input']>;
  nft_?: InputMaybe<Nft_Filter>;
  nft_contains?: InputMaybe<Scalars['String']['input']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_ends_with?: InputMaybe<Scalars['String']['input']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_gt?: InputMaybe<Scalars['String']['input']>;
  nft_gte?: InputMaybe<Scalars['String']['input']>;
  nft_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nft_lt?: InputMaybe<Scalars['String']['input']>;
  nft_lte?: InputMaybe<Scalars['String']['input']>;
  nft_not?: InputMaybe<Scalars['String']['input']>;
  nft_not_contains?: InputMaybe<Scalars['String']['input']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nft_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nft_starts_with?: InputMaybe<Scalars['String']['input']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  slug_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_gt?: InputMaybe<Scalars['String']['input']>;
  slug_gte?: InputMaybe<Scalars['String']['input']>;
  slug_in?: InputMaybe<Array<Scalars['String']['input']>>;
  slug_lt?: InputMaybe<Scalars['String']['input']>;
  slug_lte?: InputMaybe<Scalars['String']['input']>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  slug_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  slug_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  slug_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_gt?: InputMaybe<Scalars['String']['input']>;
  uri_gte?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_lt?: InputMaybe<Scalars['String']['input']>;
  uri_lte?: InputMaybe<Scalars['String']['input']>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_contains?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_ends_with?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_gt?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_gte?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voteProposalUri_lt?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_lte?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_not?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_not_contains?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voteProposalUri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_starts_with?: InputMaybe<Scalars['String']['input']>;
  voteProposalUri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Token_OrderBy {
  CarbonCreditTokenId = 'carbonCreditTokenId',
  CreatedAt = 'createdAt',
  Guid = 'guid',
  Id = 'id',
  Name = 'name',
  Nft = 'nft',
  NftCreatedAt = 'nft__createdAt',
  NftCreator = 'nft__creator',
  NftHeaderBackground = 'nft__headerBackground',
  NftHeaderLinksUri = 'nft__headerLinksUri',
  NftIconLogoUrl = 'nft__iconLogoUrl',
  NftId = 'nft__id',
  NftIndexPagesUri = 'nft__indexPagesUri',
  NftLogoUrl = 'nft__logoUrl',
  NftName = 'nft__name',
  NftSlug = 'nft__slug',
  NftSymbol = 'nft__symbol',
  NftUpdatedAt = 'nft__updatedAt',
  NftUri = 'nft__uri',
  Slug = 'slug',
  UpdatedAt = 'updatedAt',
  Uri = 'uri',
  VoteProposalUri = 'voteProposalUri'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type CommentIdsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Comment_Filter>;
}>;


export type CommentIdsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, sectionId: string }> };

export type CommentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Comment_Filter>;
  orderBy?: InputMaybe<Comment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', commentator: string, createdAt: string, id: string, sectionId: string, uri: string, token: { __typename?: 'Token', createdAt: string, id: string, updatedAt: string, uri: string } }> };

export type NftQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NftQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string, slug: string, name: string, symbol: string, updatedAt: string, createdAt: string, uri: string, indexPagesUri: string, headerLinksUri: string, logoUrl: string, iconLogoUrl: string, creator: string, admins: Array<string>, editors: Array<string>, headerBackground: string, preferredAttestators: Array<string> } | null };

export type NftAccessRolesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NftAccessRolesQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string, creator: string, admins: Array<string>, editors: Array<string> } | null };

export type NfturiUpdatesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<NfturiUpdate_Filter>;
  orderBy?: InputMaybe<NfturiUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type NfturiUpdatesQuery = { __typename?: 'Query', nfturiupdates: Array<{ __typename?: 'NFTURIUpdate', id: string, newURI: string, previousURI: string, updatedAt: string }> };

export type NfTsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Nft_Filter>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type NfTsQuery = { __typename?: 'Query', nfts: Array<{ __typename?: 'NFT', id: string, slug: string, name: string, symbol: string, createdAt: string, updatedAt: string, creator: string, uri: string, indexPagesUri: string, headerBackground: string, logoUrl: string, iconLogoUrl: string, admins: Array<string>, editors: Array<string>, preferredAttestators: Array<string> }> };

export type TokenQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TokenQuery = { __typename?: 'Query', token?: { __typename?: 'Token', createdAt: string, id: string, slug: string, name: string, voteProposalUri: string, updatedAt: string, uri: string, nft: { __typename?: 'NFT', createdAt: string, creator: string, id: string, name: string, symbol: string, updatedAt: string, uri: string } } | null };

export type TokenUriUpdatesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<TokenUriUpdate_Filter>;
  orderBy?: InputMaybe<TokenUriUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type TokenUriUpdatesQuery = { __typename?: 'Query', tokenURIUpdates: Array<{ __typename?: 'TokenURIUpdate', id: string, newURI: string, previousURI: string, updatedAt: string }> };

export type TokensQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Token_Filter>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type TokensQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', id: string, slug: string, updatedAt: string, createdAt: string, name: string, voteProposalUri: string, uri: string, nft: { __typename?: 'NFT', name: string, symbol: string, id: string } }> };


export const CommentIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}}]}}]}}]} as unknown as DocumentNode<CommentIdsQuery, CommentIdsQueryVariables>;
export const CommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Comments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentator"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]}}]} as unknown as DocumentNode<CommentsQuery, CommentsQueryVariables>;
export const NftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NFT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"indexPagesUri"}},{"kind":"Field","name":{"kind":"Name","value":"headerLinksUri"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"iconLogoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"admins"}},{"kind":"Field","name":{"kind":"Name","value":"editors"}},{"kind":"Field","name":{"kind":"Name","value":"headerBackground"}},{"kind":"Field","name":{"kind":"Name","value":"preferredAttestators"}}]}}]}}]} as unknown as DocumentNode<NftQuery, NftQueryVariables>;
export const NftAccessRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NFTAccessRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"admins"}},{"kind":"Field","name":{"kind":"Name","value":"editors"}}]}}]}}]} as unknown as DocumentNode<NftAccessRolesQuery, NftAccessRolesQueryVariables>;
export const NfturiUpdatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NFTURIUpdates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFTURIUpdate_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFTURIUpdate_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nfturiupdates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newURI"}},{"kind":"Field","name":{"kind":"Name","value":"previousURI"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<NfturiUpdatesQuery, NfturiUpdatesQueryVariables>;
export const NfTsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NFTs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFT_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFT_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nfts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"indexPagesUri"}},{"kind":"Field","name":{"kind":"Name","value":"headerBackground"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"iconLogoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"admins"}},{"kind":"Field","name":{"kind":"Name","value":"editors"}},{"kind":"Field","name":{"kind":"Name","value":"preferredAttestators"}}]}}]}}]} as unknown as DocumentNode<NfTsQuery, NfTsQueryVariables>;
export const TokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Token"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"voteProposalUri"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]}}]} as unknown as DocumentNode<TokenQuery, TokenQueryVariables>;
export const TokenUriUpdatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TokenURIUpdates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenURIUpdate_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenURIUpdate_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenURIUpdates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newURI"}},{"kind":"Field","name":{"kind":"Name","value":"previousURI"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TokenUriUpdatesQuery, TokenUriUpdatesQueryVariables>;
export const TokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Token_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Token_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"voteProposalUri"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TokensQuery, TokensQueryVariables>;