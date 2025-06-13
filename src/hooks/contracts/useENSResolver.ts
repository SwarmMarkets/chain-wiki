import { ENSResolverABI } from 'src/contracts/abis'
import { ENSResolver } from 'src/contracts/typechain'
import { useWeb3Contract } from '../web3/useWeb3Contract'

export const useENSResolver = (address?: string) => {
  const web3Contract = useWeb3Contract<ENSResolver>(
    address || '',
    ENSResolverABI
  )
  return web3Contract
}
