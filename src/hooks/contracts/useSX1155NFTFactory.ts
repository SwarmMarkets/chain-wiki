import { SX1155NFTFactoryABI } from 'src/contracts/abis'
import { useWeb3Contract } from '../web3/useWeb3Contract'
import { SX1155NFTFactory } from './../../contracts/typechain/SX1155NFTFactory'
import staticConfig from 'src/config'

const {
  contracts: { sx1155NFTFactoryAddress },
} = staticConfig.defaultNetworkEnv

export const useSX1155NFTFactory = () => {
  const web3Contract = useWeb3Contract<SX1155NFTFactory>(
    sx1155NFTFactoryAddress,
    SX1155NFTFactoryABI
  )
  return web3Contract
}
