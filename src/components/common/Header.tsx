import logo from '@src/assets/logo.png'
import useModalState from '@src/hooks/useModalState'
import RoutePaths from '@src/shared/enums/routes-paths'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CreateProjectModal from '../CreateProject/CreateProjectModal'
import SearchIcon from '../icons/SearchIcon'
import Button from '../ui/Button/Button'
import Container from '../ui/Container'
import Flex from '../ui/Flex'
import TextField from '../ui/TextField/TextField'
import ConnectButton from './ConnectButton'
import { useAddress } from '@thirdweb-dev/react'

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
  const { isOpen, open, close } = useModalState(false)
  const address = useAddress()

  return (
    <HeaderContainer as="header">
      <Flex $gap="60px">
        <Link to={RoutePaths.HOME}>
          <img src={logo} alt="ChainWiki" />
        </Link>
        <TextField prependIcon={<SearchIcon />} placeholder="Search ChainWiki" />
      </Flex>

      <Flex $gap={'1rem'} alignItems="center">
        {address ? (
          <Button onClick={open} mr={3}>
            {t('header.createProject')}
          </Button>
        ) : null}
        <ConnectButton />
      </Flex>

      <CreateProjectModal isOpen={isOpen} onClose={close} />
    </HeaderContainer>
  )
}

export default Header
