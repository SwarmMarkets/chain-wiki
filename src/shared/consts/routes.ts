import { RoutePathSetting } from '../enums'

const Routes = {
  home: '/',
  explore: '/explore',
  manager: {
    nft: (nftIdOrSlug: string) => `/m/${nftIdOrSlug}`,
    editNft: (nftIdOrSlug: string) => `/m/edit/${nftIdOrSlug}`,
    settings: (nftIdOrSlug: string, setting: RoutePathSetting) =>
      `/m/${nftIdOrSlug}/settings/${setting}`,
  },
  read: {
    nft: (nftIdOrSlug: string) => `/${nftIdOrSlug}`,
    token: (nftIdOrSlug: string, tokenIdOrSlug: string) =>
      `/${nftIdOrSlug}/${tokenIdOrSlug}`,
    history: (nftIdOrSlug: string, tokenIdOrSlug: string) =>
      `/${nftIdOrSlug}/${tokenIdOrSlug}/history`,
  },
} as const

export default Routes
