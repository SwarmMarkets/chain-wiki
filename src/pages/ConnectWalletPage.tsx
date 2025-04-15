import ConnectButton from 'src/components/common/ConnectButton'
import Card from 'src/components/ui/Card'
import Flex from 'src/components/ui/Flex'
import Text from 'src/components/ui/Text'
import RoutePaths from 'src/shared/enums/routes-paths'
import { useConnectionStatus } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'

const Logo = styled.img`
  width: 230px;
`

const ConnectWalletPage = () => {
  const { t } = useTranslation('connectWallet')
  const theme = useTheme()
  const navigate = useNavigate()
  const connected = useConnectionStatus()

  const handleConnectWallet = () => {
    navigate(RoutePaths.HOME)
  }

  if (connected === 'connected') {
    return <Navigate to={RoutePaths.HOME} />
  }

  return (
    <Flex height='100vh' justifyContent='center' alignItems='center'>
      <Card p='40px'>
        <Flex flexDirection='column' alignItems='center'>
          <Logo src={'assets/logo.png'} alt='ChainWiki' />
          <Text.h1 mt='20px' mb='30px' fontSize={theme.fontSizes.mediumPlus}>
            {t('title')}
          </Text.h1>
          <ConnectButton onConnect={handleConnectWallet} />
        </Flex>
      </Card>
    </Flex>
  )
}

export default ConnectWalletPage
