import ConnectButton from 'src/components/common/ConnectButton'
import Card from 'src/components/ui/Card'
import { useConnectionStatus } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'

const ConnectWalletPage = () => {
  const { t } = useTranslation('connectWallet')
  const navigate = useNavigate()
  const connected = useConnectionStatus()

  const handleConnectWallet = () => {
    navigate('/')
  }

  if (connected === 'connected') {
    return <Navigate to='/' />
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-br from-[#c2ebfb] to-[#a1a7fd]'>
      <Card p='40px'>
        <div className='flex flex-col items-center'>
          <img src={'assets/logo.png'} alt='ChainWiki' className='w-[230px]' />
          <h1 className='typo-title3 mt-5 mb-7'>{t('title')}</h1>
          <ConnectButton onConnect={handleConnectWallet} />
        </div>
      </Card>
    </div>
  )
}

export default ConnectWalletPage
