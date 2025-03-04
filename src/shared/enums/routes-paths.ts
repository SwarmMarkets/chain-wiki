enum RoutePaths {
  CONNECT_WALLET = '/',
  TOKEN = '/page/:tokenId',
  NFT = '/site/:nftId',
  MY_NFTS = '/home',
  EDIT = '/edit/:nftId',
  NFT_READ = '/site/:nftId/read',
  TOKEN_READ = '/site/:nftId/page/:tokenId/read',
}

export default RoutePaths
