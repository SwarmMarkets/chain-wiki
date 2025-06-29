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
    "\n  query CommentIds($limit: Int, $skip: Int = 0, $filter: Comment_filter) {\n    comments(where: $filter, first: $limit, skip: $skip) {\n      id\n      sectionId\n    }\n  }\n": types.CommentIdsDocument,
    "\n  query Comments(\n    $limit: Int\n    $skip: Int = 0\n    $filter: Comment_filter\n    $orderBy: Comment_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    comments(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      commentator\n      createdAt\n      id\n      sectionId\n      uri\n      token {\n        createdAt\n        id\n        updatedAt\n        uri\n      }\n    }\n  }\n": types.CommentsDocument,
    "\n  query NFT($id: ID!) {\n    nft(id: $id) {\n      id\n      slug\n      name\n      symbol\n      updatedAt\n      createdAt\n      uri\n      indexPagesUri\n      headerLinksUri\n      logoUrl\n      iconLogoUrl\n      creator\n      admins\n      editors\n      headerBackground\n      preferredAttestators\n    }\n  }\n": types.NftDocument,
    "\n  query NFTAccessRoles($id: ID!) {\n    nft(id: $id) {\n      id\n      creator\n      admins\n      editors\n    }\n  }\n": types.NftAccessRolesDocument,
    "\n  query NFTURIUpdates(\n    $limit: Int,\n    $skip: Int = 0,\n    $filter: NFTURIUpdate_filter\n    $orderBy: NFTURIUpdate_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfturiupdates(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      newURI\n      previousURI\n      updatedAt\n    }\n  }\n": types.NfturiUpdatesDocument,
    "\n  query NFTs(\n    $limit: Int\n    $skip: Int = 0\n    $filter: NFT_filter\n    $orderBy: NFT_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfts(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      slug\n      name\n      symbol\n      createdAt\n      updatedAt\n      creator\n      uri\n      indexPagesUri\n      headerBackground\n      logoUrl\n      iconLogoUrl\n      admins\n      editors\n      preferredAttestators\n    }\n  }\n": types.NfTsDocument,
    "\n  query Token($id: ID!) {\n    token(id: $id) {\n      createdAt\n      id\n      slug\n      name\n      voteProposalUri\n      updatedAt\n      uri\n      nft {\n        createdAt\n        creator\n        id\n        name\n        symbol\n        updatedAt\n        uri\n      }\n    }\n  }\n": types.TokenDocument,
    "\n  query TokenURIUpdates(\n    $limit: Int\n    $skip: Int = 0\n    $filter: TokenURIUpdate_filter\n    $orderBy: TokenURIUpdate_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    tokenURIUpdates(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      newURI\n      previousURI\n      updatedAt\n    }\n  }\n": types.TokenUriUpdatesDocument,
    "\n  query Tokens(\n    $limit: Int\n    $skip: Int = 0\n    $filter: Token_filter\n    $orderBy: Token_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    tokens(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      slug\n      updatedAt\n      createdAt\n      name\n      voteProposalUri\n      uri\n      nft {\n        name\n        symbol\n        id\n      }\n    }\n  }\n": types.TokensDocument,
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
export function graphql(source: "\n  query CommentIds($limit: Int, $skip: Int = 0, $filter: Comment_filter) {\n    comments(where: $filter, first: $limit, skip: $skip) {\n      id\n      sectionId\n    }\n  }\n"): (typeof documents)["\n  query CommentIds($limit: Int, $skip: Int = 0, $filter: Comment_filter) {\n    comments(where: $filter, first: $limit, skip: $skip) {\n      id\n      sectionId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Comments(\n    $limit: Int\n    $skip: Int = 0\n    $filter: Comment_filter\n    $orderBy: Comment_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    comments(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      commentator\n      createdAt\n      id\n      sectionId\n      uri\n      token {\n        createdAt\n        id\n        updatedAt\n        uri\n      }\n    }\n  }\n"): (typeof documents)["\n  query Comments(\n    $limit: Int\n    $skip: Int = 0\n    $filter: Comment_filter\n    $orderBy: Comment_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    comments(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      commentator\n      createdAt\n      id\n      sectionId\n      uri\n      token {\n        createdAt\n        id\n        updatedAt\n        uri\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NFT($id: ID!) {\n    nft(id: $id) {\n      id\n      slug\n      name\n      symbol\n      updatedAt\n      createdAt\n      uri\n      indexPagesUri\n      headerLinksUri\n      logoUrl\n      iconLogoUrl\n      creator\n      admins\n      editors\n      headerBackground\n      preferredAttestators\n    }\n  }\n"): (typeof documents)["\n  query NFT($id: ID!) {\n    nft(id: $id) {\n      id\n      slug\n      name\n      symbol\n      updatedAt\n      createdAt\n      uri\n      indexPagesUri\n      headerLinksUri\n      logoUrl\n      iconLogoUrl\n      creator\n      admins\n      editors\n      headerBackground\n      preferredAttestators\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NFTAccessRoles($id: ID!) {\n    nft(id: $id) {\n      id\n      creator\n      admins\n      editors\n    }\n  }\n"): (typeof documents)["\n  query NFTAccessRoles($id: ID!) {\n    nft(id: $id) {\n      id\n      creator\n      admins\n      editors\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NFTURIUpdates(\n    $limit: Int,\n    $skip: Int = 0,\n    $filter: NFTURIUpdate_filter\n    $orderBy: NFTURIUpdate_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfturiupdates(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      newURI\n      previousURI\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query NFTURIUpdates(\n    $limit: Int,\n    $skip: Int = 0,\n    $filter: NFTURIUpdate_filter\n    $orderBy: NFTURIUpdate_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfturiupdates(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      newURI\n      previousURI\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NFTs(\n    $limit: Int\n    $skip: Int = 0\n    $filter: NFT_filter\n    $orderBy: NFT_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfts(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      slug\n      name\n      symbol\n      createdAt\n      updatedAt\n      creator\n      uri\n      indexPagesUri\n      headerBackground\n      logoUrl\n      iconLogoUrl\n      admins\n      editors\n      preferredAttestators\n    }\n  }\n"): (typeof documents)["\n  query NFTs(\n    $limit: Int\n    $skip: Int = 0\n    $filter: NFT_filter\n    $orderBy: NFT_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    nfts(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      slug\n      name\n      symbol\n      createdAt\n      updatedAt\n      creator\n      uri\n      indexPagesUri\n      headerBackground\n      logoUrl\n      iconLogoUrl\n      admins\n      editors\n      preferredAttestators\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Token($id: ID!) {\n    token(id: $id) {\n      createdAt\n      id\n      slug\n      name\n      voteProposalUri\n      updatedAt\n      uri\n      nft {\n        createdAt\n        creator\n        id\n        name\n        symbol\n        updatedAt\n        uri\n      }\n    }\n  }\n"): (typeof documents)["\n  query Token($id: ID!) {\n    token(id: $id) {\n      createdAt\n      id\n      slug\n      name\n      voteProposalUri\n      updatedAt\n      uri\n      nft {\n        createdAt\n        creator\n        id\n        name\n        symbol\n        updatedAt\n        uri\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TokenURIUpdates(\n    $limit: Int\n    $skip: Int = 0\n    $filter: TokenURIUpdate_filter\n    $orderBy: TokenURIUpdate_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    tokenURIUpdates(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      newURI\n      previousURI\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query TokenURIUpdates(\n    $limit: Int\n    $skip: Int = 0\n    $filter: TokenURIUpdate_filter\n    $orderBy: TokenURIUpdate_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    tokenURIUpdates(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      newURI\n      previousURI\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Tokens(\n    $limit: Int\n    $skip: Int = 0\n    $filter: Token_filter\n    $orderBy: Token_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    tokens(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      slug\n      updatedAt\n      createdAt\n      name\n      voteProposalUri\n      uri\n      nft {\n        name\n        symbol\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Tokens(\n    $limit: Int\n    $skip: Int = 0\n    $filter: Token_filter\n    $orderBy: Token_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    tokens(\n      where: $filter\n      first: $limit\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      slug\n      updatedAt\n      createdAt\n      name\n      voteProposalUri\n      uri\n      nft {\n        name\n        symbol\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;