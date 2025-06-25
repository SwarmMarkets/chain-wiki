import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ConnectWallet from 'src/components/common/ConnectWallet/ConnectWallet'
import RoutePaths from 'src/shared/enums/routes-paths'
import { useActiveWalletConnectionStatus } from 'thirdweb/react'

const ConnectWalletPage = () => {
  const { t } = useTranslation('connectWallet')
  const navigate = useNavigate()
  const status = useActiveWalletConnectionStatus()

  const handleConnectWallet = () => {
    navigate(RoutePaths.HOME)
  }

  if (status === 'connected') {
    return <Navigate to={RoutePaths.HOME} />
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-br from-[#c2ebfb] to-[#a1a7fd]'>
      <div className='flex flex-col items-center bg-paper py-12 px-16 rounded-2xl shadow-lg'>
        <img src={'assets/logo.png'} alt='ChainWiki' className='w-72' />
        <h1 className='typo-title2 font-medium mt-5 mb-6'>{t('title')}</h1>
        <ConnectWallet onConnect={handleConnectWallet} />
        <p className='typo-body1 text-center mt-3'>
          {t('orExplorePublicWikisPart1')}{' '}
          <Link
            to='/explore'
            className='text-primary hover:text-primary-accent'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('orExplorePublicWikisPart2')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ConnectWalletPage
