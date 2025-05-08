import { shortenAddress } from '@thirdweb-dev/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MarkdownRenderer from 'src/components/Editor/MarkdownRenderer'
import ExplorerLink from 'src/components/common/ExplorerLink'
import Card from 'src/components/ui/Card'

interface AttestationCardProps {
  address: string
  message: string
  date: string
}

const AttestationCard: React.FC<AttestationCardProps> = ({
  address,
  message,
  date,
}) => {
  const { t } = useTranslation(['token', 'buttons'])

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
      {/* <RequirePermissions nftAddress={nftAddress} canDeleteAttestation>
        <Button mt='8px' onClick={onDelete}>
          {t('delete', { ns: 'buttons' })}
        </Button>
      </RequirePermissions> */}
    </Card>
  )
}

export default AttestationCard
