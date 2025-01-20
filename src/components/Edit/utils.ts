import { NodeModel } from '@minoru/react-dnd-treeview'
import { IpfsIndexPage, TokensQueryFullData } from 'src/shared/utils'
import { HIDDEN_INDEX_PAGES_ID } from './const'

export const convertTokensToIndexPages = (
  tokens: TokensQueryFullData[]
): IpfsIndexPage[] =>
  tokens.map<IpfsIndexPage>(token => ({
    tokenId: token.id,
    title: token.name,
  }))

export const convertNodesToIndexPages = (nodes: NodeModel[]) =>
  nodes.map<IpfsIndexPage>(node => ({
    tokenId: node.id.toString(),
    title: node.text,
    parent: node.parent,
    droppable: node.droppable,
  }))

export const convertIndexPagesToNodes = (indexPages: IpfsIndexPage[]) =>
  indexPages.map<NodeModel>(node => ({
    id: node.tokenId,
    text: node.title,
    droppable: node.droppable,
    parent: node.parent || 0,
  }))

export const reorderArray = (
  array: NodeModel[],
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
