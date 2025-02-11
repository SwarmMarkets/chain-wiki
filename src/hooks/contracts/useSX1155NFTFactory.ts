import { SX1155NFTFactoryABI } from 'src/contracts/abis'
import { environment } from 'src/environment'
import { useWeb3Contract } from '../web3/useWeb3Contract'
import { SX1155NFTFactory } from './../../contracts/typechain/SX1155NFTFactory'

const {
  contractsAddresses: { sx1155NFTFactoryAddress },
} = environment

export const useSX1155NFTFactory = () => {
  const web3Contract = useWeb3Contract<SX1155NFTFactory>(
    sx1155NFTFactoryAddress,
    SX1155NFTFactoryABI
  )
  return web3Contract
}
