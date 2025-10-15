import { polygonChainConfig } from 'src/environment/networks/polygon'
import { RoutePathSetting } from '../enums'

const Routes = {
  explore: '/explore',
  manager: {
    home: '/m/home',
    nft: (nftIdOrSlug: string) => `/m/${nftIdOrSlug}`,
    token: (nftIdOrSlug: string, tokenIdOrSlug: string) =>
      `/m/${nftIdOrSlug}/${tokenIdOrSlug}`,
    edit: (nftIdOrSlug: string) => `/m/edit/${nftIdOrSlug}`,

    settings: (nftIdOrSlug: string, setting: RoutePathSetting) =>
      `/m/${nftIdOrSlug}/settings/${setting}`,
    history: (nftIdOrSlug: string, tokenIdOrSlug: string) =>
      `/m/${nftIdOrSlug}/${tokenIdOrSlug}/history`,
  },
  read: {
    nft: (nftIdOrSlug: string, chain: ChainParam) => `/${chain}/${nftIdOrSlug}`,
    token: (nftIdOrSlug: string, tokenIdOrSlug: string, chain: ChainParam) =>
      `/${chain}/${nftIdOrSlug}/${tokenIdOrSlug}`,
    history: (nftIdOrSlug: string, tokenIdOrSlug: string, chain: ChainParam) =>
      `/${chain}/${nftIdOrSlug}/${tokenIdOrSlug}/history`,
    selectChain: (nftIdOrSlug: string) => `/${nftIdOrSlug}/select-chain`,
  },
} as const

export interface MParams {
  nft: { nftIdOrSlug: string }
  token: { nftIdOrSlug: string; tokenIdOrSlug: string }
  settings: { nftIdOrSlug: string; setting: RoutePathSetting }
}

export interface ReadParams {
  nft: { chain: ChainParam; nftIdOrSlug: string }
  token: { chain: ChainParam; nftIdOrSlug: string; tokenIdOrSlug: string }
}

export interface RouteParams {
  manager: MParams
  read: ReadParams
}

export enum ChainParam {
  Polygon = 'p',
  Base = 'b',
}

export const chainParamResolver = {
  [ChainParam.Polygon]: 'Polygon',
  [ChainParam.Base]: 'Base',
}

export default Routes
