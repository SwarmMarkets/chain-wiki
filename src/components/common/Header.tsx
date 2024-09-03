// import logo from '@src/assets/logo.png'
import RoutePaths from '@src/shared/enums/routes-paths'
import { useTranslation } from 'react-i18next'
import { generatePath, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../ui/Button/Button'
import Container from '../ui/Container'
import Flex from '../ui/Flex'
import ConnectButton from './ConnectButton'
import RequirePermissions from './RequirePermissions'
import useNFT from '@src/hooks/subgraph/useNFT'

const HeaderContainer = styled(Container)`
  width: 100%;
  height: 90px;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`

const Logo = styled.img`
  max-width: 230px;
  max-height: 70px;
`

const Header = () => {
  const { nftId = '' } = useParams()
  const { nft, loadingNft } = useNFT(nftId, { disableRefetch: true })
  const { t } = useTranslation('layout')

  const showLogo = nftId === nft?.id && nft?.logoUrl && !loadingNft

  return (
    <HeaderContainer as='header'>
      <Flex $gap='60px' alignItems='center'>
        <Link to={generatePath(RoutePaths.NFT, { nftId })}>
          {showLogo && <Logo src={nft?.logoUrl} alt={nft?.name} />}
          {/* <TextField
          prependIcon='search'
          placeholder={t('header.searchPlaceholder')}
        /> */}
        </Link>
      </Flex>

      <Flex $gap={'1rem'} alignItems='center'>
        <RequirePermissions canCreateNft>
          <Link to={RoutePaths.MY_NFTS}>
            <Button mr={3}>{t('header.myNfts')}</Button>
          </Link>
        </RequirePermissions>
        <ConnectButton />
      </Flex>
    </HeaderContainer>
  )
}

export default Header
