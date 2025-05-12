import { IpfsIndexPage } from './ipfs'

const buildChildrenMap = (
  nodes: IpfsIndexPage[]
): Record<string | number, IpfsIndexPage[]> => {
  const map: Record<string | number, IpfsIndexPage[]> = {}
  for (const node of nodes) {
    if (node.parent === undefined) {
      continue
    }

    if (!map[node.parent]) {
      map[node.parent] = []
    }
    map[node.parent].push(node)
  }
  return map
}

export const findFirstNonGroupVisibleNode = (
  nodes?: IpfsIndexPage[],
  rootId: string | number = 0
): IpfsIndexPage | undefined => {
  if (!nodes) return undefined
  const childrenMap = buildChildrenMap(nodes)

  function dfs(nodeList: IpfsIndexPage[]): IpfsIndexPage | undefined {
    for (const node of nodeList) {
      if (node.type !== 'group') {
        return node
      }
      const children = childrenMap[node.tokenId] || []
      const found = dfs(children)
      if (found) return found
    }
    return undefined
  }

  const rootNodes = childrenMap[rootId] || []
  return dfs(rootNodes)
}
