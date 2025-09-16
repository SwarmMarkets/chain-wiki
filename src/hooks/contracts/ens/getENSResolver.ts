import { ethers } from 'ethers'
import { ENSResolverABI } from 'src/contracts/abis'
import { _getThirdwebContract } from 'src/hooks/web3/useContract'
import { Abi } from 'thirdweb/utils'
import { ethereum } from 'thirdweb/chains'

export const getENSResolver = (address: string) => {
  return _getThirdwebContract(address, ethereum, ENSResolverABI as Abi)
}

export const getENSResolverInterface = () => {
  return new ethers.utils.Interface(ENSResolverABI)
}
