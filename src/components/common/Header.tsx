import styled from 'styled-components'
import Container from '../ui/Container'
import Flex from '../ui/Flex'
import TextField from '../ui/TextField/TextField'
import logo from '@src/assets/logo.png'
import SearchIcon from '../icons/SearchIcon'
import { Link, generatePath, useNavigate } from 'react-router-dom'
import RoutePaths from '@src/shared/enums/routes-paths'
import ConnectButton from './ConnectButton'
import Button from '../ui/Button'
import { useTranslation } from 'react-i18next'

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

const Header = () => {
  const { t } = useTranslation('layout')
  const navigate = useNavigate();

  const goToCreateProject = () => navigate(generatePath(RoutePaths.CREATE_PROJECT))

  return (
    <HeaderContainer as="header">
      <Flex $gap="60px">
        <Link to={RoutePaths.HOME}>
          <img src={logo} alt="ChainWiki" />
        </Link>
        <TextField prependIcon={<SearchIcon />} placeholder="Search ChainWiki" />
      </Flex>

      <Flex $gap={'1rem'} $alignItems='center'>
        <Button onClick={goToCreateProject}>
          {t('header.createProject')}
        </Button>
        <ConnectButton />
      </Flex>
    </HeaderContainer>
  )
}

export default Header
