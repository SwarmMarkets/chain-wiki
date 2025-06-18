enum RoutePaths {
  CONNECT_WALLET = '/connect',
  TOKEN = '/page/:tokenIdOrSlug',
  NFT = '/m/site/:nftIdOrSlug',
  HOME = '/',
  EXPLORE = '/explore',
  EDIT = '/m/edit/:nftIdOrSlug',
  NFT_READ = '/site/:nftIdOrSlug',
  TOKEN_READ = '/site/:nftIdOrSlug/page/:tokenIdOrSlug',
  SETTINGS = '/m/site/:nftIdOrSlug/settings/:setting',
  HISTORY = '/m/site/:nftIdOrSlug/page/:tokenIdOrSlug/history',
  TOKEN_READ_HISTORY = '/site/:nftIdOrSlug/page/:tokenIdOrSlug/history',
}

export default RoutePaths

export enum RoutePathSetting {
  GENERAL = 'general',
  CUSTOMIZATION = 'customization',
}
