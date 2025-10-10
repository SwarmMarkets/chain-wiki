'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ConnectWallet from 'src/components/common/ConnectWallet/ConnectWallet'
import RoutePaths from 'src/shared/enums/routes-paths'
import { useActiveWalletConnectionStatus } from 'thirdweb/react'
import { useEffect } from 'react'

const ConnectWalletPage = () => {
  const { t } = useTranslation('connectWallet')
  const router = useRouter()
  const status = useActiveWalletConnectionStatus()

  const handleConnectWallet = () => {
    router.push(RoutePaths.HOME)
  }

  useEffect(() => {
    if (status === 'connected') {
      router.replace(RoutePaths.HOME)
    }
  }, [status, router])

  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-br from-[#c2ebfb] to-[#a1a7fd]'>
      <div className='flex flex-col items-center bg-paper py-12 px-16 rounded-2xl shadow-lg'>
        <img src={'assets/logo.png'} alt='ChainWiki' className='w-72' />
        <h1 className='typo-title2 font-medium mt-5 mb-6'>{t('title')}</h1>
        <ConnectWallet onConnect={handleConnectWallet} />
        <p className='typo-body1 text-center mt-3'>
          {t('orExplorePublicWikisPart1')}{' '}
          <Link
            href='/explore'
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
