/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query NFT($id: ID!) {\n    nft(id: $id) {\n      createdAt\n      creator\n      id\n      name\n      symbol\n      updatedAt\n      uri\n      admins\n      issuers\n      agents\n      editors\n    }\n  }\n": types.NftDocument,
    "\n  query NFTURIUpdates(\n    $limit: Int,\n    $skip: Int = 0,\n    $filter: NFTURIUpdate_filter\n    $orderBy: NFTURIUpdate_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfturiupdates(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      newURI\n      previousURI\n      updatedAt\n    }\n  }\n": types.NfturiUpdatesDocument,
    "\n  query NFTs(\n    $limit: Int,\n    $skip: Int = 0,\n    $filter: NFT_filter\n    $orderBy: NFT_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfts(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      name\n      symbol\n      createdAt\n      updatedAt\n      creator\n      uri\n      admins\n      issuers\n      agents\n      editors\n    }\n  }\n": types.NfTsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NFT($id: ID!) {\n    nft(id: $id) {\n      createdAt\n      creator\n      id\n      name\n      symbol\n      updatedAt\n      uri\n      admins\n      issuers\n      agents\n      editors\n    }\n  }\n"): (typeof documents)["\n  query NFT($id: ID!) {\n    nft(id: $id) {\n      createdAt\n      creator\n      id\n      name\n      symbol\n      updatedAt\n      uri\n      admins\n      issuers\n      agents\n      editors\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NFTURIUpdates(\n    $limit: Int,\n    $skip: Int = 0,\n    $filter: NFTURIUpdate_filter\n    $orderBy: NFTURIUpdate_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfturiupdates(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      newURI\n      previousURI\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query NFTURIUpdates(\n    $limit: Int,\n    $skip: Int = 0,\n    $filter: NFTURIUpdate_filter\n    $orderBy: NFTURIUpdate_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfturiupdates(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      newURI\n      previousURI\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NFTs(\n    $limit: Int,\n    $skip: Int = 0,\n    $filter: NFT_filter\n    $orderBy: NFT_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfts(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      name\n      symbol\n      createdAt\n      updatedAt\n      creator\n      uri\n      admins\n      issuers\n      agents\n      editors\n    }\n  }\n"): (typeof documents)["\n  query NFTs(\n    $limit: Int,\n    $skip: Int = 0,\n    $filter: NFT_filter\n    $orderBy: NFT_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfts(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      name\n      symbol\n      createdAt\n      updatedAt\n      creator\n      uri\n      admins\n      issuers\n      agents\n      editors\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;