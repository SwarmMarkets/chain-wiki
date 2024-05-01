import { NFTQueryFullData } from '@src/shared/types/ipfs'
import { isSameEthereumAddress } from '@src/shared/utils'
import { shortenAddress, useAddress } from '@thirdweb-dev/react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'
import ExplorerLink from '../common/ExplorerLink'
import RequirePermissions from '../common/RequirePermissions'
import UploadFileButton from '../common/UploadFileButton'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import Text from '../ui/Text'
import { StyledCard, Title } from './styled-components'

interface NftCardProps {
  nft: NFTQueryFullData
  showRole?: boolean
}

const Logo = styled.img`
  max-width: 230px;
  max-height: 70px;
`

const NftCard: React.FC<NftCardProps> = ({ nft, showRole = false }) => {
  const { t } = useTranslation(['nft', 'nfts'])
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

  const handleUploadLogo = () => {}

  return (
    <StyledCard minHeight={200}>
      <Flex flexDirection='column' justifyContent='space-between' height='100%'>
        <div>
          <Flex alignItems='center' $gap='3px'>
            <Icon cursor='pointer' name='document' size={40} />
            <Title>{nft.name}</Title>
          </Flex>
          {nft.logoUrl ? (
            <Flex justifyContent='center' alignItems='center' height='100%'>
              <Logo src={nft?.logoUrl} alt={nft?.name} />
            </Flex>
          ) : (
            <Flex
              height='100%'
              flexDirection='column'
              $gap='10px'
              alignItems='center'
              justifyContent='center'
            >
              <RequirePermissions nftAddress={nft.id} canUpdateContent>
                <UploadFileButton
                  size='small'
                  mt={2}
                  onUpload={handleUploadLogo}
                >
                  {t('messages.addLogo')}
                </UploadFileButton>
              </RequirePermissions>
            </Flex>
          )}
        </div>
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
