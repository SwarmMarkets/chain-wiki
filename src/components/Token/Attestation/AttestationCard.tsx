import { shortenAddress, useAddress } from '@thirdweb-dev/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MarkdownRenderer from 'src/components/Editor/MarkdownRenderer'
import SmartButton from 'src/components/SmartButton'
import UpdateNftContentButton from 'src/components/UpdateContent/UpdateNftContentButton'
import ExplorerLink from 'src/components/common/ExplorerLink'
import RequirePermissions from 'src/components/common/RequirePermissions'
import Icon from 'src/components/ui-kit/Icon/Icon'
import Card from 'src/components/ui/Card'
import { isSameEthereumAddress } from 'src/shared/utils'

interface AttestationCardProps {
  nftAddress: string
  address: string
  message: string
  date: string
  isPreferredAttestator: boolean
  onDelete: () => void
  onSetPreferredAttestator: () => void
  onUnsetPreferredAttestator: () => void
}

const AttestationCard: React.FC<AttestationCardProps> = ({
  nftAddress,
  address,
  message,
  date,
  isPreferredAttestator,
  onDelete,
  onSetPreferredAttestator,
  onUnsetPreferredAttestator,
}) => {
  const { t } = useTranslation(['token', 'buttons'])
  const account = useAddress()

  return (
    <Card>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div>{t('attestation.author')}</div>
          <ExplorerLink iconSize={10} type={'address'} hash={address}>
            {shortenAddress(address, true)}
          </ExplorerLink>
          {isPreferredAttestator && (
            <Icon name='checkmark-circle' size={20} className='text-primary' />
          )}
        </div>
        <div>{date}</div>
      </div>
      <MarkdownRenderer markdown={message} />

      <div className='flex gap-2'>
        {isSameEthereumAddress(address, account) && (
          <SmartButton size='sm' className='mt-2' onClick={onDelete}>
            {t('delete', { ns: 'buttons' })}
          </SmartButton>
        )}

        {isPreferredAttestator ? (
          <RequirePermissions canManageRoles nftAddress={nftAddress}>
            <SmartButton
              size='sm'
              className='mt-2'
              onClick={onUnsetPreferredAttestator}
            >
              {t('unsetAttestator', { ns: 'buttons' })}
            </SmartButton>
          </RequirePermissions>
        ) : (
          <RequirePermissions canManageRoles nftAddress={nftAddress}>
            <SmartButton
              size='sm'
              className='mt-2'
              onClick={onSetPreferredAttestator}
            >
              {t('setAttestator', { ns: 'buttons' })}
            </SmartButton>
          </RequirePermissions>
        )}
      </div>
    </Card>
  )
}

export default AttestationCard
