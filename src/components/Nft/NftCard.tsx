import { useAddress, useChainId } from '@thirdweb-dev/react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import { getExplorerUrl, isSameEthereumAddress } from 'src/shared/utils'
import { NFTsQueryFullData } from 'src/shared/utils/ipfs/types'
import RequirePermissions from '../common/RequirePermissions'
import UploadFileButton from '../common/UploadFileButton'
import Icon from '../ui-kit/Icon/Icon'
import IconButton from '../ui-kit/IconButton'
import dayjs from 'src/shared/utils/dayjsConfig'
import clsx from 'clsx'

interface NftCardProps {
  nft: NFTsQueryFullData
  addLogoButton?: boolean
  className?: string
}

const NftCard: React.FC<NftCardProps> = ({ nft, className }) => {
  const { t } = useTranslation(['nft', 'nfts'])
  const account = useAddress()
  const { signTransaction, tx } = useNFTUpdate(nft.id)
  const chainId = useChainId()

  const roles = useMemo(() => {
    const isAdmin = nft.admins.some(address =>
      isSameEthereumAddress(address, account)
    )
    const isEditor = nft.editors.some(address =>
      isSameEthereumAddress(address, account)
    )
    const roles = []
    if (isAdmin) roles.push(t('filter.admin', { ns: 'nfts' }))
    if (isEditor) roles.push(t('filter.editor', { ns: 'nfts' }))
    return roles
  }, [account, nft.admins, nft.editors, t])

  const handleUploadLogo = async (url: string) => {
    await signTransaction({ logoUrl: url })
  }

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const explorerUrl = getExplorerUrl({
      type: 'address',
      chainId,
      hash: nft.id,
    })
    window.open(explorerUrl, '_blank')
  }

  return (
    <div
      className={clsx(
        'bg-paper rounded-lg p-4 flex flex-col gap-2 justify-between border border-main transition-shadow duration-300 hover:shadow-lg hover:shadow-main/50',
        className
      )}
    >
      <div className='flex justify-center items-center h-16 bg-gray-100 rounded-lg'>
        {nft.logoUrl ? (
          <img
            src={nft.logoUrl}
            alt={nft.name}
            className='max-w-44 max-h-16 p-1'
          />
        ) : (
          <RequirePermissions nftAddress={nft.id} canUpdateContent>
            <UploadFileButton
              size='sm'
              isLoading={tx.txLoading}
              onUpload={handleUploadLogo}
              variant='outlined'
            >
              {t('messages.addLogo')}
            </UploadFileButton>
          </RequirePermissions>
        )}
      </div>
      <div>
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-semibold truncate'>{nft.name}</h3>
          <IconButton onClick={handleIconClick}>
            <Icon name='externalLink' size={14} />
          </IconButton>
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
