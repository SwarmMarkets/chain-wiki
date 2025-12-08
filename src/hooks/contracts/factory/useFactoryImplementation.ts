import { useQuery } from '@tanstack/react-query'
import { currentImplementation } from 'src/thirdweb/factory'
import useSX1155NFTFactory from './useSX1155NFTFactory'

const useFactoryImplementation = () => {
  const { contract } = useSX1155NFTFactory()

  return {
    ...useQuery({
      queryKey: ['factory-current-implementation'],
      queryFn: () => {
        if (!contract) return null
        return currentImplementation({
          contract,
        })
      },
      enabled: Boolean(contract),
    }),
    contract,
  }
}

export default useFactoryImplementation
