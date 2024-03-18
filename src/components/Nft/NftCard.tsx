import { NFTQueryFullData } from '@src/shared/types/ipfs'
import {
  getTextContentFromHtml,
  isSameEthereumAddress,
  limitString,
} from '@src/shared/utils'
import { shortenAddress, useAddress } from '@thirdweb-dev/react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import ExplorerLink from '../common/ExplorerLink'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import Text from '../ui/Text'
import { StyledCard, Title } from './styled-components'

interface NftCardProps {
  nft: NFTQueryFullData
  showRole?: boolean
}

const NftCard: React.FC<NftCardProps> = ({ nft, showRole = false }) => {
  const { t } = useTranslation(['errors', 'nfts'])
  const theme = useTheme()
  const account = useAddress()

  const roles = useMemo(() => {
    if (!showRole) return
    const isAdmin = nft.admins.some(address =>
      isSameEthereumAddress(address, account)
    )
    const isEditor = nft.editors.some(address =>
      isSameEthereumAddress(address, account)
    )
    const roles = []
    if (isAdmin) {
      roles.push(t('filter.admin', { ns: 'nfts' }))
    }
    if (isEditor) {
      roles.push(t('filter.editor', { ns: 'nfts' }))
    }

    return roles
  }, [account, nft.admins, nft.editors, t, showRole])

  return (
    <StyledCard minHeight={200}>
      <Flex flexDirection='column' justifyContent='space-between' height='100%'>
        <div>
          <Flex alignItems='center' $gap='3px'>
            <Icon name='document' size={40} />
            <Title>{nft.name}</Title>
          </Flex>
          {nft.ipfsContent?.htmlContent && (
            <Text.p mt={10}>
              {limitString(
                getTextContentFromHtml(nft.ipfsContent?.htmlContent),
                300
              )}
            </Text.p>
          )}
        </div>
        {!nft.ipfsContent?.htmlContent && (
          <Flex
            height='100%'
            flexDirection='column'
            $gap='5px'
            alignItems='center'
            justifyContent='center'
          >
            <Text.p color={theme.palette.gray}>
              {t('nft.contentNotFound')}
            </Text.p>
          </Flex>
        )}
        <Flex flexDirection='column' alignItems='end' pt={10} $gap='2px'>
          <ExplorerLink iconSize={10} type='address' hash={nft.id}>
            <Text
              fontSize={theme.fontSizes.small}
              color={theme.palette.linkPrimary}
            >
              {shortenAddress(nft.id, false)}
            </Text>
          </ExplorerLink>
          {roles && roles.length > 0 && (
            <Text fontSize={theme.fontSizes.small}>
              {t('roles', { ns: 'nfts' })} {roles.join(', ')}
            </Text>
          )}
        </Flex>
      </Flex>
    </StyledCard>
  )
}

export default NftCard
