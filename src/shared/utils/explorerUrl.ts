import { supportedChains } from "@src/environment/networks"

export type ExplorerLinkType = 'tx' | 'address' | 'token'

export interface ExplorerUrlOptions {
  type: ExplorerLinkType
  hash?: string
  chainId?: number
}

export const getExplorerUrl = ({
  type,
  hash,
  chainId,
}: ExplorerUrlOptions) => {
  if (!hash) return ''

  const chain = supportedChains.find(chain => chain.chainId === chainId)

  const explorerLinkPrefix = chain?.explorers?.[0].url

  return `${explorerLinkPrefix}/${type}/${hash}`
}
