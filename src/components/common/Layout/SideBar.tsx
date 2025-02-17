import { useAddress } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import { generatePath, NavLink, useParams } from 'react-router-dom'
import ExpandableList from 'src/components/ExpandableList'
import ExpandableListItem from 'src/components/ExpandableList/ExpandableListItem'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import RoutePaths from 'src/shared/enums/routes-paths'
import { isSameEthereumAddress } from 'src/shared/utils'

const SideBar = () => {
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar' })
  const address = useAddress() || ''
  const { nftId = '' } = useParams()

  const { nfts, loadingNfts, refetchingNfts, refetch } = useNFTs({
    variables: {
      filter: {
        or: [
          { admins_contains_nocase: [address] },
          { editors_contains_nocase: [address] },
        ],
      },
      orderBy: Nft_OrderBy.CreatedAt,
      orderDirection: OrderDirection.Desc,
      skip: 0,
      limit: 100,
    },
    skip: !address,
  })

  return (
    <div className='w-64 bg-gray-100'>
      <div className='h-1/4'></div>
      <nav className='ext-black p-4 flex flex-col'>
        <NavLink to={RoutePaths.MY_NFTS} className='mb-2'>
          {({ isActive }) => (
            <ExpandableListItem
              item={{
                id: 'my-nfts',
                label: t('home'),
                icon: 'four-squares',
                active: isActive,
              }}
            />
          )}
        </NavLink>
        <ExpandableList
          title={t('sites')}
          items={nfts?.map(nft => ({
            id: nft.id,
            label: nft.name,
            icon: 'internet',
            active: isSameEthereumAddress(nftId, nft.id),
            to: generatePath(RoutePaths.NFT, { nftId: nft.id }),
          }))}
          noMarginLeft
        />
      </nav>
    </div>
  )
}

export default SideBar
