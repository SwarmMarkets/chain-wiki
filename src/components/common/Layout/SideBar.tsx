import { useAddress } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import { generatePath, NavLink, useParams } from 'react-router-dom'
import ExpandableList from 'src/components/ExpandableList'
import ExpandableListItem from 'src/components/ExpandableList/ExpandableListItem'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import RoutePaths from 'src/shared/enums/routes-paths'
import { isSameEthereumAddress } from 'src/shared/utils'
import ConnectButton from '../ConnectButton'
import PoweredByBadge from 'src/components/PoweredByBadge/PoweredByBadge'

const SideBar = () => {
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar' })
  const address = useAddress() || ''
  const { nftId = '' } = useParams()

  const { nfts } = useNFTs({
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
    <aside className='w-64 bg-gray-100 flex flex-col h-full border-r-gray-200 border-r'>
      <header className='p-4'>
        <ConnectButton style={{ width: '100%' }} />
      </header>
      <nav className='flex-1 overflow-y-auto p-4 flex flex-col gap-1'>
        <NavLink to={RoutePaths.MY_NFTS}>
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
      <footer className='p-4'>
        <PoweredByBadge />
      </footer>
    </aside>
  )
}

export default SideBar
