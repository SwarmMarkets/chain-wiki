import { RoutePathSetting } from '../enums'

const Routes = {
  explore: '/explore',
  manager: {
    home: '/m',
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
    nft: (nftIdOrSlug: string) => `/${nftIdOrSlug}`,
    token: (nftIdOrSlug: string, tokenIdOrSlug: string) =>
      `/${nftIdOrSlug}/${tokenIdOrSlug}`,
    history: (nftIdOrSlug: string, tokenIdOrSlug: string) =>
      `/${nftIdOrSlug}/${tokenIdOrSlug}/history`,
  },
} as const

export interface MParams {
  nft: { nftIdOrSlug: string }
  token: { nftIdOrSlug: string; tokenIdOrSlug: string }
  editNft: { nftIdOrSlug: string }
  settings: { nftIdOrSlug: string; setting: RoutePathSetting }
  history: { nftIdOrSlug: string; tokenIdOrSlug: string }
}

export interface RouteParams {
  manager: MParams
}

export default Routes
