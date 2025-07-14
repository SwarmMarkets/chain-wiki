import { useActiveAccount } from 'thirdweb/react'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import { isSameEthereumAddress, NFTsQueryFullData } from 'src/shared/utils'
import dayjs from 'src/shared/utils/dayjsConfig'
import RequirePermissions from '../common/RequirePermissions'
import UploadFileButton from '../common/UploadFileButton'
import Icon from '../ui-kit/Icon/Icon'
import IconButton from '../ui-kit/IconButton'
import { generatePath, Link } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'

interface NftCardProps {
  nft: NFTsQueryFullData
  addLogoButton?: boolean
  className?: string
}

const NftCard: React.FC<NftCardProps> = ({ nft, className }) => {
  const { t } = useTranslation(['nft', 'nfts', 'buttons'])
  const account = useActiveAccount()
  const { signTransaction, tx } = useNFTUpdate(nft.id)

  const roles = useMemo(() => {
    const isAdmin = nft.admins.some(address =>
      isSameEthereumAddress(address, account?.address)
    )
    const isEditor = nft.editors.some(address =>
      isSameEthereumAddress(address, account?.address)
    )
    const roles = []
    if (isAdmin) roles.push(t('filter.admin', { ns: 'nfts' }))
    if (isEditor) roles.push(t('filter.editor', { ns: 'nfts' }))
    return roles
  }, [account?.address, nft.admins, nft.editors, t])

  const handleUploadLogo = async (url: string) => {
    await signTransaction({ logoUrl: url })
  }

  return (
    <div
      className={clsx(
        'bg-paper rounded-lg p-4 flex flex-col gap-2 justify-between border border-main transition-shadow duration-300 hover:shadow-lg hover:shadow-main/50',
        className
      )}
    >
      <div
        className='flex justify-center items-center h-16 rounded-lg bg-gray-100'
        style={{ backgroundColor: nft.logoUrl && nft.headerBackground }}
      >
        {nft.logoUrl ? (
          <img
            src={nft.logoUrl}
            alt={nft.name}
            className='max-w-44 max-h-16 p-1'
          />
        ) : (
          <UploadFileButton
            size='sm'
            isLoading={tx.isPending}
            onUpload={handleUploadLogo}
            variant='outlined'
          >
            {t('addLogo', { ns: 'buttons' })}
          </UploadFileButton>
        )}
      </div>
      <div>
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-semibold truncate'>{nft.name}</h3>
          <Link
            to={generatePath(RoutePaths.NFT_READ, { nftIdOrSlug: nft.slug })}
            onClick={e => e.stopPropagation()}
            target='_blank'
          >
            <IconButton>
              <Icon name='externalLink' size={14} />
            </IconButton>
          </Link>
        </div>

        {roles.length > 0 && (
          <div className='typo-body1 text-main mt-1'>
            {t('roles', { ns: 'nfts' })}: {roles.join(', ')}
          </div>
        )}
        <div className='typo-body1 text-main-muted'>
          {t('card.lastEdited', {
            date: dayjs(+nft.updatedAt * 1000).fromNow(),
          })}
        </div>
      </div>
    </div>
  )
}

export default NftCard
