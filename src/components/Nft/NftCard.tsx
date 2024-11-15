import { NFTsQueryFullData } from '@src/shared/utils/ipfs/types'
import { isSameEthereumAddress } from '@src/shared/utils'
import { useAddress, useChainId } from '@thirdweb-dev/react'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'
import RequirePermissions from '../common/RequirePermissions'
import UploadFileButton from '../common/UploadFileButton'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import Text from '../ui/Text'
import { StyledCard, Title } from './styled-components'
import useNFTUpdate from '@src/hooks/useNFTUpdate'
import { getExplorerUrl } from '@src/shared/utils'

interface NftCardProps {
  nft: NFTsQueryFullData
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
  const { signTransaction, tx } = useNFTUpdate(nft.id)
  const [isHovered, setIsHovered] = useState(false)

  const chainId = useChainId()

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

  const handleUploadLogo = async (url: string) => {
    await signTransaction({ logoUrl: url })
  }

  const handleIconClick = () => {
    const explorerUrl = getExplorerUrl({
      type: 'address',
      chainId,
      hash: nft.id,
    })
    window.open(explorerUrl, '_blank')
  }

  return (
    <StyledCard minHeight={200} position='relative'>
      <Flex flexDirection='column' justifyContent='space-between' height='100%'>
        <Flex justifyContent='center' alignItems='center'>
          {nft.logoUrl ? (
            <Logo src={nft?.logoUrl} alt={nft?.name} />
          ) : (
            <RequirePermissions nftAddress={nft.id} canUpdateContent>
              <UploadFileButton
                isLoading={tx.txLoading}
                size='small'
                onUpload={handleUploadLogo}
              >
                {t('messages.addLogo')}
              </UploadFileButton>
            </RequirePermissions>
          )}
        </Flex>

        <Flex alignItems='center' justifyContent='space-between' $gap='3px'>
          <Title>{nft.name}</Title>
          <Icon
            cursor='pointer'
            name='externalLink'
            size={10}
            color={isHovered ? theme.palette.linkPrimary : theme.palette.black}
            onClick={handleIconClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </Flex>

        <Flex flexDirection='column' alignItems='end' pt={10} $gap='2px'>
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
