import HtmlRender from '@src/components/HtmlRender'
import ExplorerLink from '@src/components/common/ExplorerLink'
import Card from '@src/components/ui/Card'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import { shortenAddress } from '@thirdweb-dev/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
// import Button from '@src/components/ui/Button/Button'
// import RequirePermissions from '@src/components/common/RequirePermissions'

interface AttestationCardProps {
  // projectAddress: string
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
  // projectAddress,
}) => {
  const theme = useTheme()
  const { t } = useTranslation(['token', 'buttons'])

  return (
    <Card>
      <Flex alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center' $gap='5px'>
          <Text weight={theme.fontWeights.bold}>{t('attestation.author')}</Text>
          <ExplorerLink type={'address'} hash={address}>
            {shortenAddress(address, true)}
          </ExplorerLink>
        </Flex>
        <Text color={theme.palette.gray}>{date}</Text>
      </Flex>
      <HtmlRender html={message} />
      {/* <RequirePermissions projectAddress={projectAddress} canDeleteAttestation>
        <Button mt='8px' onClick={onDelete}>
          {t('delete', { ns: 'buttons' })}
        </Button>
      </RequirePermissions> */}
    </Card>
  )
}

export default AttestationCard
