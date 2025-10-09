'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useActiveAccount } from 'thirdweb/react'
import { useTranslation } from 'react-i18next'
import ExpandableList from 'src/components/ExpandableList'
import ExpandableListItem, {
  ExpandableListItem as IExpandableListItem,
} from 'src/components/ExpandableList/ExpandableListItem'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import { isSameEthereumAddress } from 'src/shared/utils'
import CreateNftModal from 'src/components/CreateNft/CreateNftModal'
import useModalState from 'src/hooks/useModalState'
import Icon from 'src/components/ui-kit/Icon/Icon'
import IconButton from 'src/components/ui-kit/IconButton'
import SiteMenu from './SiteMenu'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import Routes from 'src/shared/consts/routes'

const SideBar = () => {
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar' })
  const account = useActiveAccount()
  const address = account?.address || ''
  const { nftId } = useNFTIdParam()
  const pathname = usePathname()

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

  const handleHelpItemClick = (item: IExpandableListItem) => {
    const urls = {
      github: 'https://github.com/SwarmMarkets/chain-wiki',
      changelog:
        'https://github.com/SwarmMarkets/nft-minter-contracts/commits/main/',
      docs: `${window.location.origin}/docs`,
    }
    const url = urls[item.id as keyof typeof urls]
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const isActiveLink = (href: string) => pathname === href

  return (
    <aside className='w-64 bg-gray-100 flex flex-col h-full border-r-gray-200 border-r'>
      <nav className='flex flex-col gap-1 flex-1 overflow-y-auto p-4'>
        <Link href={Routes.manager.home} className='block'>
          <ExpandableListItem
            item={{
              id: 'my-nfts',
              label: <div className='py-0.5'>{t('home')}</div>,
              icon: 'four-squares',
              active: isActiveLink(Routes.manager.home),
            }}
          />
        </Link>
        <ExpandableList
          title={
            <div className='flex justify-between items-center w-full'>
              <p className='typo-body1'>{t('sites')}</p>
              <IconButton
                onClick={handleOpenCreateNftModal}
                hoverBackground='gray-100'
                padding='p-1'
              >
                <Icon name='plus' size={14} />
              </IconButton>
            </div>
          }
          items={nfts?.map(nft => ({
            id: nft.id,
            label: (
              <div className='flex justify-between items-center w-full'>
                <span>{nft.name}</span>
                <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                  <SiteMenu nftSlug={nft.slug} />
                </div>
              </div>
            ),
            icon: 'internet',
            iconImageUrl: nft.iconLogoUrl,
            active: isSameEthereumAddress(nftId, nft.id),
            to: Routes.manager.nft(nft.slug),
          }))}
          noMarginLeft
        />
      </nav>
      <footer className='p-4 border-t border-gray-200'>
        <ExpandableList
          title={
            <div className='flex items-center gap-2'>
              <Icon name='info' size={16} />
              <span className='typo-body1'>{t('help')}</span>
            </div>
          }
          items={[
            {
              id: 'github',
              label: t('helpItems.github'),
              icon: 'external-link',
            },
            {
              id: 'changelog',
              label: t('helpItems.changelog'),
              icon: 'edit-paper',
            },
          ]}
          onClickItem={handleHelpItemClick}
          noMarginLeft
        />
      </footer>
      <CreateNftModal isOpen={isOpen} onClose={close} />
    </aside>
  )
}

export default SideBar
