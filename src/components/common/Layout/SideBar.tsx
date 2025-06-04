import { useAddress } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import { generatePath, NavLink, useParams } from 'react-router-dom'
import ExpandableList from 'src/components/ExpandableList'
import ExpandableListItem from 'src/components/ExpandableList/ExpandableListItem'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import RoutePaths from 'src/shared/enums/routes-paths'
import { isSameEthereumAddress } from 'src/shared/utils'
import PoweredByBadge from 'src/components/PoweredByBadge/PoweredByBadge'
import CreateNftModal from 'src/components/CreateNft/CreateNftModal'
import useModalState from 'src/hooks/useModalState'
import Icon from 'src/components/ui-kit/Icon/Icon'
import IconButton from 'src/components/ui-kit/IconButton'

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

  const { isOpen, open, close } = useModalState()

  const handleOpenCreateNftModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    open()
  }

  return (
    <aside className='w-64 bg-gray-100 flex flex-col h-full border-r-gray-200 border-r'>
      <nav className='flex flex-col gap-1 flex-1 overflow-y-auto p-4'>
        <NavLink to={RoutePaths.HOME}>
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
          title={
            <div className='flex justify-between items-center w-full'>
              <p>{t('sites')}</p>
              <IconButton
                onClick={handleOpenCreateNftModal}
                hoverBackground='gray-100'
              >
                <Icon name='plus' size={16} />
              </IconButton>
            </div>
          }
          items={nfts?.map(nft => ({
            id: nft.id,
            label: nft.name,
            icon: 'internet',
            iconImageUrl: nft.iconLogoUrl,
            active: isSameEthereumAddress(nftId, nft.id),
            to: generatePath(RoutePaths.NFT, { nftId: nft.id }),
          }))}
          noMarginLeft
        />
      </nav>
      <footer className='p-4'></footer>
      <CreateNftModal isOpen={isOpen} onClose={close} />
    </aside>
  )
}

export default SideBar
