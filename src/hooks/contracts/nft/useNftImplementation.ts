import { useQuery } from '@tanstack/react-query'
import { selfImplementation } from 'src/thirdweb/nft'
import useSX1155NFT from './useSX1155NFT'

const useNftImplementation = (nftAddress?: string) => {
  const { contract } = useSX1155NFT(nftAddress)

  return useQuery({
    queryKey: ['nft-self-implementation', nftAddress],
    queryFn: () => {
      if (!contract) return null

      return selfImplementation({
        contract: contract,
      })
    },
    enabled: Boolean(contract),
  })
}

export default useNftImplementation
