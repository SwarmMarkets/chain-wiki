import HtmlRender from 'src/components/HtmlRender'
import ExplorerLink from 'src/components/common/ExplorerLink'
import Card from 'src/components/ui/Card'
import Flex from 'src/components/ui/Flex'
import Text from 'src/components/ui/Text'
import { shortenAddress } from '@thirdweb-dev/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
// import Button from 'src/components/ui/Button/Button'
// import RequirePermissions from 'src/components/common/RequirePermissions'

interface AttestationCardProps {
  // nftAddress: string
  address: string
  message: string
  date: string
  // onDelete?: () => void
}

const AttestationCard: React.FC<AttestationCardProps> = ({
  address,
  message,
  date,
  // onDelete,
  // nftAddress,
}) => {
  const theme = useTheme()
  const { t } = useTranslation(['token', 'buttons'])

  return (
    <Card>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div>{t('attestation.author')}</div>
          <ExplorerLink iconSize={10} type={'address'} hash={address}>
            <Text
              fontSize={theme.fontSizes.small}
              color={theme.palette.linkPrimary}
            >
              {shortenAddress(address, true)}
            </Text>
          </ExplorerLink>
        </div>
        <div>{date}</div>
      </div>
      <HtmlRender html={message} />
      {/* <RequirePermissions nftAddress={nftAddress} canDeleteAttestation>
        <Button mt='8px' onClick={onDelete}>
          {t('delete', { ns: 'buttons' })}
        </Button>
      </RequirePermissions> */}
    </Card>
  )
}

export default AttestationCard
