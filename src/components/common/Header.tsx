import logo from '@src/assets/logo.png'
import RoutePaths from '@src/shared/enums/routes-paths'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../ui/Button/Button'
import Container from '../ui/Container'
import Flex from '../ui/Flex'
import ConnectButton from './ConnectButton'
import RequirePermissions from './RequirePermissions'

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
  width: 230px;
`

const Header = () => {
  const { t } = useTranslation('layout')

  return (
    <HeaderContainer as='header'>
      <Flex $gap='60px' alignItems='center'>
        <Link to={RoutePaths.HOME}>
          <Logo src={logo} alt='ChainWiki' />
        </Link>
        {/* <TextField
          prependIcon='search'
          placeholder={t('header.searchPlaceholder')}
        /> */}
      </Flex>

      <Flex $gap={'1rem'} alignItems='center'>
        <RequirePermissions canCreateNft>
          <Link to={RoutePaths.MY_PROJECTS}>
            <Button mr={3}>{t('header.myNfts')}</Button>
          </Link>
        </RequirePermissions>
        <ConnectButton />
      </Flex>
    </HeaderContainer>
  )
}

export default Header
