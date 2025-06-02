import { IpfsIndexPage, TokensQueryFullData } from 'src/shared/utils'
import { HIDDEN_INDEX_PAGES_ID } from './const'
import { EditNodeModel } from './EditIndexPagesTree/types'

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric chars with dash
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
}

export const convertTokensToIndexPages = (
  tokens: TokensQueryFullData[]
): IpfsIndexPage[] =>
  tokens.map<IpfsIndexPage>(token => ({
    tokenId: token.id,
    title: token.name,
    slug: token.slug || generateSlug(token.name),
  }))

export const convertNodesToIndexPages = (nodes: EditNodeModel[]) =>
  nodes.map<IpfsIndexPage>(node => ({
    tokenId: node.id.toString(),
    title: node.text,
    slug: node.data?.slug || generateSlug(node.text),
    parent: node.parent,
    droppable: node.droppable,
    type: node.data?.type,
  }))

export const convertIndexPagesToNodes = (indexPages: IpfsIndexPage[]) =>
  indexPages.map<EditNodeModel>(ip => ({
    id: ip.tokenId,
    text: ip.title,
    droppable: ip.droppable,
    parent: ip.parent || 0,
    data: {
      type: ip.type,
      slug: ip.slug || generateSlug(ip.title),
    },
  }))

export const reorderArray = (
  array: EditNodeModel[],
  sourceIndex: number,
  targetIndex: number
) => {
  const newArray = [...array]
  const element = newArray.splice(sourceIndex, 1)[0]
  newArray.splice(targetIndex, 0, element)
  return newArray
}

export const isHiddenList = (id: string) => {
  return id === HIDDEN_INDEX_PAGES_ID
}
