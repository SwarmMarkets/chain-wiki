import { shortenAddress, useAddress } from '@thirdweb-dev/react'
import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MarkdownRenderer from 'src/components/Editor/MarkdownRenderer'
import ExplorerLink from 'src/components/common/ExplorerLink'
import DotMenu from 'src/components/ui-kit/DotMenu/DotMenu'
import Icon from 'src/components/ui-kit/Icon/Icon'
import Card from 'src/components/ui/Card'
import { useSX1155NFT } from 'src/hooks/contracts/useSX1155NFT'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import { CommentsQueryFullData, isSameEthereumAddress } from 'src/shared/utils'

interface AttestationCardProps {
  nftAddress: string
  tokenAddress: string
  attestation: CommentsQueryFullData
  isPreferredAttestator: boolean
}

const AttestationCard: React.FC<AttestationCardProps> = ({
  nftAddress,
  tokenAddress,
  attestation,
  isPreferredAttestator,
}) => {
  const { t } = useTranslation(['token', 'buttons'])
  const {
    permissions: { canManageRoles },
  } = useNftPermissions(nftAddress)
  const account = useAddress()

  const { call, txLoading: deleteTxLoading } = useSX1155NFT(nftAddress)
  const {
    signTransaction,
    tx: { txLoading: nftUpdateTxLoading },
  } = useNFTUpdate(nftAddress)

  const attestatorAddress = attestation.commentator
  const message = attestation.ipfsContent?.htmlContent || ''
  const date = dayjs(+attestation.createdAt * 1000).format(
    'MMMM D, YYYY h:mm A'
  )
  const dotMenuLoading = deleteTxLoading || nftUpdateTxLoading

  const handleDeleteAttestation = () => {
    const tokenId = Number(tokenAddress.split('-')[1])
    const commentId = Number(attestation.id.split('-')[2])

    return call('deleteAttestation', [tokenId, commentId])
  }

  const handleSetPreferredAttestator = () => {
    signTransaction({
      preferredAttestatorToAdd: attestatorAddress,
    })
  }

  const handleUnsetPreferredAttestator = () => {
    signTransaction({
      preferredAttestatorToRemove: attestatorAddress,
    })
  }

  const canDeleteAtestation = isSameEthereumAddress(attestatorAddress, account)
  const showDotMenu = canManageRoles || canDeleteAtestation

  return (
    <div className='bg-gray-100 rounded-lg p-2 group'>
      <MarkdownRenderer markdown={message} />
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 relative'>
          <div className='typo-body1'>{t('attestation.author')}</div>
          <ExplorerLink
            className='typo-body1'
            iconSize={10}
            type={'address'}
            hash={attestatorAddress}
          >
            {shortenAddress(attestatorAddress, true)}
          </ExplorerLink>
          {isPreferredAttestator && (
            <Icon name='checkmark-circle' size={20} className='text-primary' />
          )}
          {showDotMenu && (
            <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
              <DotMenu iconProps={{ size: 14 }} loading={dotMenuLoading}>
                {canManageRoles && (
                  <>
                    {isPreferredAttestator ? (
                      <li
                        onClick={handleUnsetPreferredAttestator}
                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded'
                      >
                        {t('unsetAttestator', { ns: 'buttons' })}
                      </li>
                    ) : (
                      <li
                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded'
                        onClick={handleSetPreferredAttestator}
                      >
                        {t('setAttestator', { ns: 'buttons' })}
                      </li>
                    )}
                  </>
                )}
                {canDeleteAtestation && (
                  <li
                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded'
                    onClick={handleDeleteAttestation}
                  >
                    {t('delete', { ns: 'buttons' })}
                  </li>
                )}
              </DotMenu>
            </div>
          )}
        </div>
        <div className='typo-body1'>{date}</div>
      </div>
    </div>
  )
}

export default AttestationCard
