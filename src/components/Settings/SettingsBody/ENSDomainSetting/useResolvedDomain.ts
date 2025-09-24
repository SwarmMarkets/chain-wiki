import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'
import useDebouncedValue from 'src/hooks/useDebouncedValue'
import { ethereum } from 'thirdweb/chains'

const provider = new ethers.providers.JsonRpcProvider(ethereum.rpc)

const useResolvedDomain = (domain: string) => {
  const debouncedDomain = useDebouncedValue(domain, 500)

  const { data: ownerAddress, isLoading: ownerLoading } = useQuery({
    queryKey: ['resolvedDomain', debouncedDomain],
    queryFn: async () => {
      if (!debouncedDomain || !debouncedDomain?.includes('.eth')) return null
      if (!window.ethereum) throw new Error('No ethereum provider')

      return await provider.resolveName(debouncedDomain)
    },
    staleTime: 1000 * 60,
  })

  return { ownerAddress, ownerLoading }
}

export default useResolvedDomain
