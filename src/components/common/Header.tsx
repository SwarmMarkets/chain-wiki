import { useTranslation } from 'react-i18next'
import { generatePath, Link, useParams } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import Button from '../ui/Button/Button'
import Container from '../ui/Container'
import Flex from '../ui/Flex'
import ConnectButton from './ConnectButton'
import RequirePermissions from './RequirePermissions'
import useNFT from '@src/hooks/subgraph/useNFT'
import RoutePaths from '@src/shared/enums/routes-paths'
import { useHeaderColorContext } from '../Nft/NftView/HeaderColorContext'
import { useMemo } from 'react'

interface HeaderContainerProps {
  $headerBackground?: string
}

const HeaderContainer = styled(Container)<HeaderContainerProps>`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: ${({ $headerBackground }) => $headerBackground};
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
`

const Logo = styled.img`
  max-width: 230px;
  max-height: 70px;
`

const Header: React.FC = () => {
  const { nftId = '' } = useParams()
  const { nft, loadingNft } = useNFT(nftId, { disableRefetch: true })
  const { t } = useTranslation('layout')
  const theme = useTheme()
  const { headerColor } = useHeaderColorContext()

  const isNft = nftId === nft?.id && !loadingNft
  const showLogo = nft?.logoUrl && isNft

  const headerBackground = useMemo(() => {
    if (isNft) {
      if (headerColor) {
        return headerColor
      }
      if (nft.headerBackground) {
        return nft.headerBackground
      }
    } else {
      return theme.palette.white
    }
  }, [headerColor, nft?.headerBackground, isNft, theme.palette.white])

  return (
    <HeaderContainer as='header' $headerBackground={headerBackground}>
      <Flex $gap='60px' alignItems='center'>
        <Link to={generatePath(RoutePaths.NFT, { nftId })}>
          {showLogo && <Logo src={nft?.logoUrl} alt={nft?.name} />}
        </Link>
      </Flex>

      <Flex $gap='1rem' alignItems='center'>
        <RequirePermissions canCreateNft>
          <Link to={RoutePaths.MY_NFTS}>
            <Button style={{ backgroundColor: theme.palette.white }} mr={3}>
              {t('header.myNfts')}
            </Button>
          </Link>
        </RequirePermissions>
        <ConnectButton />
      </Flex>
    </HeaderContainer>
  )
}

export default Header
