enum RoutePaths {
  CONNECT_WALLET = '/connect',
  TOKEN = '/:tokenIdOrSlug',
  NFT = '/m/:nftIdOrSlug',
  HOME = '/',
  EXPLORE = '/explore',
  EDIT = '/m/edit/:nftIdOrSlug',
  NFT_READ = '/:nftIdOrSlug',
  TOKEN_READ = '/:nftIdOrSlug/:tokenIdOrSlug',
  SETTINGS = '/m/:nftIdOrSlug/settings/:setting',
  HISTORY = '/m/:nftIdOrSlug/:tokenIdOrSlug/history',
  TOKEN_READ_HISTORY = '/:nftIdOrSlug/:tokenIdOrSlug/history',
}

export default RoutePaths

export enum RoutePathSetting {
  GENERAL = 'general',
  CUSTOMIZATION = 'customization',
}