import { IpfsIndexPage, TokensQueryFullData } from 'src/shared/utils'
import { HIDDEN_INDEX_PAGES_ID } from './const'
import { EditNodeModel } from './EditIndexPagesTree/types'

export const convertTokensToIndexPages = (
  tokens: TokensQueryFullData[]
): IpfsIndexPage[] =>
  tokens.map<IpfsIndexPage>(token => ({
    tokenId: token.id,
    title: token.name,
  }))

export const convertNodesToIndexPages = (nodes: EditNodeModel[]) =>
  nodes.map<IpfsIndexPage>(node => ({
    tokenId: node.id.toString(),
    title: node.text,
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
