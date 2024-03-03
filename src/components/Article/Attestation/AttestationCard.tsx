import HtmlRender from '@src/components/HtmlRender'
import ExplorerLink from '@src/components/common/ExplorerLink'
import Card from '@src/components/ui/Card'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import Icon from '@src/components/ui/Icon'
import { shortenAddress } from '@thirdweb-dev/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'

interface AttestationCardProps {
  address: string
  message: string
  date: string
  onDelete: () => void
}

const XmarkIcon = styled(Icon)`
  cursor: pointer;
`

const AttestationCard: React.FC<AttestationCardProps> = ({
  address,
  message,
  date,
  onDelete,
}) => {
  const theme = useTheme()
  const { t } = useTranslation('article')

  return (
    <Card position='relative'>
      <Flex alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center' $gap='5px'>
          <Text weight={theme.fontWeights.bold}>{t('attestation.author')}</Text>
          <ExplorerLink type={'address'} hash={address}>
            {shortenAddress(address, true)}
          </ExplorerLink>
        </Flex>
        <Text color={theme.palette.gray}>{date}</Text>
        <XmarkIcon
          onClick={onDelete}
          size={16}
          name='xmark'
          position='absolute'
          top='8px'
          right='8px'
        />
      </Flex>
      <HtmlRender html={message} />
    </Card>
  )
}

export default AttestationCard
