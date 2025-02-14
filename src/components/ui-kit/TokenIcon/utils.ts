import { AnyToken } from 'src/common/types/models/Tokens'
import staticConfig from 'src/config'
import { ethers } from 'ethers'

const SWARM_CDN_ICONS: Record<string, string> = {
  smt: 'SMT',
  vsmt: 'vSMT',
  spt: 'SPT',
  xspt: 'SPT',
  weth: 'Weth',
  wmatic: 'matic',
  pol: 'matic',
  '1inch': '1inch',
  cel: 'cel',
  luna: 'luna',
  sol: 'sol',
  tsla: 'tsla',
  aapl: 'aapl',
  coin: 'coin',
  euroc: 'euroc',
  // FOR TEST NETWORK
  euros: 'euroc',

  // StockTokens
  tslast: 'tsla',
  aaplst: 'aapl',
  coinst: 'coin',
  nvda: 'NVIDIA',
  msft: 'Microsoft',
  mstr: 'MicroStrategy',
  intc: 'Intel',
  cpng: 'Coupang',
  gme: 'gamestop',
  blk: 'BlackRock',

  // StakingNodes
  solsn: 'SOLsn',
  avaxsn: 'avalanche',
  dotsn: 'polkadot',
  ethsn: 'ethereum',
  eth2sn: 'ethereum',
  tbonds01: 'tbond01',
  tbonds13: 'tbond01',
  nasdaq: 'nasdaq',
  nearsn: 'near',
  swm: 'swm',

  // GoldTokens
  xgoldoz: 'GoldBar',
  xgoldkg: 'GoldBar',

  // FOR TEST NETWORK
  xgotest: 'GoldBar',
  xgktest: 'GoldBar',

  // Gold Bundles
  xgold: 'GoldBar',

  // FOR TEST NETWORK
  xgb: 'GoldBar',

  // Brands
  matr: 'vMATR',
  vmatr: 'vMATR',
  real: 'house-token',
}

const {
  resources: { iconsCdn, trustwalletIconsCdn },
} = staticConfig

const getTokenIconUrl = (chainName: string, token: AnyToken) => {
  const swarmCdnIconName: string | undefined =
    SWARM_CDN_ICONS[token.symbol.toLowerCase()]

  if (swarmCdnIconName) {
    return `${iconsCdn}/${swarmCdnIconName}.svg`
  }

  return `${trustwalletIconsCdn}/${chainName.toLowerCase()}/assets/${ethers.utils.getAddress(
    token.contractAddress.toLowerCase()
  )}/logo.png`
}

export default getTokenIconUrl
