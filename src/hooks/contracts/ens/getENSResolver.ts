import { ethers } from 'ethers'
import { ENSResolverABI } from 'src/contracts/abis'
import { _getThirdwebContract } from 'src/hooks/web3/useContract'
import staticConfig from 'src/config'
import { Abi } from 'thirdweb/utils'

export const getENSResolver = (address: string) => {
  return _getThirdwebContract(
    address,
    staticConfig.defaultChain,
    ENSResolverABI as Abi
  )
}

export const getENSResolverInterface = () => {
  return new ethers.utils.Interface(ENSResolverABI)
}
