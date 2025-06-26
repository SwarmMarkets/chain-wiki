import useActiveOrDefaultChain from './useActiveOrDefaultChain'
import { useMemo } from 'react'
import { thirdwebClient } from 'src/shared/api-clients/thirdweb'
import { Chain, getContract } from 'thirdweb'
import { Abi } from 'thirdweb/utils'

export const _getThirdwebContract = (
  contractAddress: string,
  chain: Chain,
  abi?: Abi
) => {
  const contract = getContract({
    address: contractAddress,
    chain: chain,
    client: thirdwebClient,
    abi: abi,
  })

  return contract
}

const useContract = (contractAddress: string, abi?: Abi) => {
  const chain = useActiveOrDefaultChain()

  const contract = useMemo(() => {
    return contractAddress
      ? _getThirdwebContract(contractAddress, chain, abi)
      : null
  }, [contractAddress, chain, abi])

  return {
    contract,
  }
}

export default useContract
