enum RoutePaths {
  CONNECT_WALLET = '/',
  TOKEN = '/page/:tokenIdOrSlug',
  NFT = '/m/site/:nftId',
  HOME = '/home',
  EXPLORE = '/explore',
  EDIT = '/m/edit/:nftId',
  NFT_READ = '/site/:nftId',
  TOKEN_READ = '/site/:nftId/page/:tokenIdOrSlug',
  SETTINGS = '/m/site/:nftId/settings/:setting',
  HISTORY = '/m/site/:nftId/page/:tokenIdOrSlug/history',
  TOKEN_READ_HISTORY = '/site/:nftId/page/:tokenIdOrSlug/history',
}

export default RoutePaths

export enum RoutePathSetting {
  GENERAL = 'general',
  CUSTOMIZATION = 'customization',
}
