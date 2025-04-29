import ConnectButton from 'src/components/common/ConnectButton'
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
      <div className='flex flex-col items-center bg-paper py-12 px-16 rounded-2xl shadow-xl'>
        <img src={'assets/logo.png'} alt='ChainWiki' className='w-72' />
        <h1 className='typo-title2 font-medium mt-5 mb-6'>{t('title')}</h1>
        <ConnectButton onConnect={handleConnectWallet} />
      </div>
    </div>
  )
}

export default ConnectWalletPage
