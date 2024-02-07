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
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Nft = {
  __typename?: 'NFT';
  /** List of addresses with DEFAULT_ADMIN_ROLE */
  admins: Array<Scalars['Bytes']['output']>;
  /** List of addresses with AGENT role */
  agents: Array<Scalars['Bytes']['output']>;
  createdAt: Scalars['BigInt']['output'];
  creator: Scalars['Bytes']['output'];
  /** List of addresses with EDITOR role */
  editors: Array<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  /** List of addresses with ISSUER role */
  issuers: Array<Scalars['Bytes']['output']>;
  name: Scalars['String']['output'];
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
  NftId = 'nft__id',
  NftName = 'nft__name',
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
  agents?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  agents_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  agents_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  agents_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  agents_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  agents_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
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
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  issuers?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  issuers_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  issuers_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  issuers_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  issuers_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  issuers_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
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
  Agents = 'agents',
  CreatedAt = 'createdAt',
  Creator = 'creator',
  Editors = 'editors',
  Id = 'id',
  Issuers = 'issuers',
  Name = 'name',
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

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionNftfactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NftFactory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NftFactory_Filter>;
};


export type SubscriptionNftfactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionNftsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Nft_Filter>;
};


export type SubscriptionNfturiupdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionNfturiupdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NfturiUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NfturiUpdate_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenUriUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenUriUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenUriUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenUriUpdate_Filter>;
};


export type SubscriptionTokensArgs = {
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
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  nft: Nft;
  updatedAt: Scalars['BigInt']['output'];
  uri: Scalars['String']['output'];
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
  NftId = 'nft__id',
  NftName = 'nft__name',
  NftSymbol = 'nft__symbol',
  NftUpdatedAt = 'nft__updatedAt',
  NftUri = 'nft__uri',
  PreviousUri = 'previousURI',
  Token = 'token',
  TokenCreatedAt = 'token__createdAt',
  TokenId = 'token__id',
  TokenUpdatedAt = 'token__updatedAt',
  TokenUri = 'token__uri',
  UpdatedAt = 'updatedAt'
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
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

export enum Token_OrderBy {
  CreatedAt = 'createdAt',
  Id = 'id',
  Nft = 'nft',
  NftCreatedAt = 'nft__createdAt',
  NftCreator = 'nft__creator',
  NftId = 'nft__id',
  NftName = 'nft__name',
  NftSymbol = 'nft__symbol',
  NftUpdatedAt = 'nft__updatedAt',
  NftUri = 'nft__uri',
  UpdatedAt = 'updatedAt',
  Uri = 'uri'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
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

export type NftQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NftQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string, name: string, symbol: string, updatedAt: string, createdAt: string, uri: string, creator: string, admins: Array<string>, issuers: Array<string>, agents: Array<string>, editors: Array<string>, tokens?: Array<{ __typename?: 'Token', createdAt: string, id: string, updatedAt: string, uri: string }> | null } | null };

export type NftAccessRolesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NftAccessRolesQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string, creator: string, admins: Array<string>, issuers: Array<string>, agents: Array<string>, editors: Array<string> } | null };

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


export type NfTsQuery = { __typename?: 'Query', nfts: Array<{ __typename?: 'NFT', id: string, name: string, symbol: string, createdAt: string, updatedAt: string, creator: string, uri: string, admins: Array<string>, issuers: Array<string>, agents: Array<string>, editors: Array<string> }> };


export const NftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NFT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"admins"}},{"kind":"Field","name":{"kind":"Name","value":"issuers"}},{"kind":"Field","name":{"kind":"Name","value":"agents"}},{"kind":"Field","name":{"kind":"Name","value":"editors"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]}}]} as unknown as DocumentNode<NftQuery, NftQueryVariables>;
export const NftAccessRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NFTAccessRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"admins"}},{"kind":"Field","name":{"kind":"Name","value":"issuers"}},{"kind":"Field","name":{"kind":"Name","value":"agents"}},{"kind":"Field","name":{"kind":"Name","value":"editors"}}]}}]}}]} as unknown as DocumentNode<NftAccessRolesQuery, NftAccessRolesQueryVariables>;
export const NfturiUpdatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NFTURIUpdates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFTURIUpdate_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFTURIUpdate_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nfturiupdates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newURI"}},{"kind":"Field","name":{"kind":"Name","value":"previousURI"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<NfturiUpdatesQuery, NfturiUpdatesQueryVariables>;
export const NfTsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NFTs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFT_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFT_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nfts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"admins"}},{"kind":"Field","name":{"kind":"Name","value":"issuers"}},{"kind":"Field","name":{"kind":"Name","value":"agents"}},{"kind":"Field","name":{"kind":"Name","value":"editors"}}]}}]}}]} as unknown as DocumentNode<NfTsQuery, NfTsQueryVariables>;