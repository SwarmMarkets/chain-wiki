import staticConfig from 'src/config'

export type ExplorerLinkType = 'tx' | 'address' | 'token'

export interface ExplorerUrlOptions {
  type: ExplorerLinkType
  hash?: string
  chainId?: number
}

export const getExplorerUrl = ({ type, hash, chainId }: ExplorerUrlOptions) => {
  if (!hash) return ''

  const chain =
    staticConfig.supportedChains.find(chain => chain.id === chainId) ||
    staticConfig.defaultChain

  const explorerLinkPrefix = chain?.blockExplorers?.[0].url

  return `${explorerLinkPrefix}/${type}/${hash}`
}
