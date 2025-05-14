import { shortenAddress, useAddress } from '@thirdweb-dev/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MarkdownRenderer from 'src/components/Editor/MarkdownRenderer'
import SmartButton from 'src/components/SmartButton'
import ExplorerLink from 'src/components/common/ExplorerLink'
import Card from 'src/components/ui/Card'
import { isSameEthereumAddress } from 'src/shared/utils'

interface AttestationCardProps {
  address: string
  message: string
  date: string
  onDelete: () => void
}

const AttestationCard: React.FC<AttestationCardProps> = ({
  address,
  message,
  date,
  onDelete,
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
        </div>
        <div>{date}</div>
      </div>
      <MarkdownRenderer markdown={message} />

      {isSameEthereumAddress(address, account) && (
        <SmartButton size='sm' className='mt-2' onClick={onDelete}>
          {t('delete', { ns: 'buttons' })}
        </SmartButton>
      )}
    </Card>
  )
}

export default AttestationCard
