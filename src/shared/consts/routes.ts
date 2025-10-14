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
    nft: (nftIdOrSlug: string, chain = 'base') => `/${chain}/${nftIdOrSlug}`,
    token: (nftIdOrSlug: string, tokenIdOrSlug: string, chain = 'base') =>
      `/${chain}/${nftIdOrSlug}/${tokenIdOrSlug}`,
    history: (nftIdOrSlug: string, tokenIdOrSlug: string, chain = 'base') =>
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
  nft: { chain: string; nftIdOrSlug: string }
  token: { chain: string; nftIdOrSlug: string; tokenIdOrSlug: string }
}

export interface RouteParams {
  manager: MParams
  read: ReadParams
}

export default Routes
