import React, { useMemo } from 'react'
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
import useModalState from '@src/hooks/useModalState'
import CreateNftModal from '../CreateNft/CreateNftModal'

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

interface StyledLinkProps {
  linksColor: string
}

const StyledLink = styled.a<StyledLinkProps>`
  color: ${({ linksColor, theme }) => linksColor || theme.palette.black};
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.darkGray};
  }

  &:active {
    color: ${({ theme }) => theme.palette.darkGray};
  }
`

const Header: React.FC = () => {
  const { nftId = '' } = useParams()
  const { nft, loadingNft } = useNFT(nftId, {
    disableRefetch: true,
    fetchFullData: true,
  })
  const { t } = useTranslation('layout')
  const theme = useTheme()
  const { headerColor, linksColor } = useHeaderColorContext()

  const { isOpen, open, close } = useModalState(false)

  const isNft = nftId === nft?.id && !loadingNft
  const showLogo = nft?.logoUrl && isNft

  const headerBackground = useMemo(() => {
    if (isNft) {
      return headerColor || nft?.headerBackground || theme.palette.white
    }
    return theme.palette.white
  }, [isNft, theme.palette.white, headerColor, nft?.headerBackground])

  return (
    <HeaderContainer as='header' $headerBackground={headerBackground}>
      <Link to={generatePath(RoutePaths.NFT, { nftId })}>
        {showLogo && <Logo src={nft?.logoUrl} alt={nft?.name} />}
      </Link>
      <Flex alignItems='center' justifyContent='center' flex='1' $gap='30px'>
        {nft?.headerLinks.map(headerLink => (
          <StyledLink
            key={headerLink.id}
            linksColor={linksColor}
            onClick={() => window.open(headerLink.link, '_blank')}
          >
            {headerLink.title}
          </StyledLink>
        ))}
      </Flex>
      <Flex $gap='1rem' alignItems='center'>
        <RequirePermissions canCreateNft>
          <Link to={RoutePaths.MY_NFTS}>
            <Button style={{ backgroundColor: theme.palette.white }} mr={3}>
              {t('header.myNfts')}
            </Button>
          </Link>
          <Button
            style={{ backgroundColor: theme.palette.white }}
            mr={3}
            onClick={open}
          >
            {t('addNft', { ns: 'nfts' })}
          </Button>
        </RequirePermissions>
        <ConnectButton />
      </Flex>
      <CreateNftModal isOpen={isOpen} onClose={close} />
    </HeaderContainer>
  )
}

export default Header

