import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import useNFTs from './useNFTs'
import staticConfig from 'src/config'

const EXAMPLE_ADDRESSES_BASE = [
  '0x4ea6e5b747e526362b1b8a7edb09791dfb44b925',
  '0x163ef516d69792b71a1bcef0eeda8830b1431776',
  '0xd373a30ef8b791a291685dda48296a0d99190976',
]

const useNFTExamples = () => {
  return useNFTs({
    variables: {
      orderBy: Nft_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
      ...(!staticConfig.isDevMode && {
        filter: {
          id_in: EXAMPLE_ADDRESSES_BASE,
        },
      }),
    },
    pollInterval: undefined,
  })
}

export default useNFTExamples
