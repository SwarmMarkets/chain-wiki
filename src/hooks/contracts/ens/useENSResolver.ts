import { ENSResolverABI } from 'src/contracts/abis'
import useContract from 'src/hooks/web3/useContract'
import { Abi } from 'thirdweb/utils'

export const useENSResolver = (address?: string) => {
  const contract = useContract(address || '', ENSResolverABI as Abi)

  return contract
}
