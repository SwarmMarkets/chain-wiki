'use client'

import Link from 'next/link'
import CreateNftModal from 'src/components/CreateNft/CreateNftModal'
import NetworkSelector from 'src/components/NetworkSelector'
import Button from 'src/components/ui-kit/Button/Button'
import useModalState from 'src/hooks/useModalState'
import { useActiveAccount } from 'thirdweb/react'
import ConnectWallet from '../ConnectWallet/ConnectWallet'
import Routes from 'src/shared/consts/routes'

const TopNavBar = () => {
  const { isOpen, open, close } = useModalState()
  const account = useActiveAccount()

  return (
    <div className='bg-white border-b border-gray-200 flex items-center justify-between px-4 py-2 w-full'>
      <div className='flex items-center gap-4'>
        <Link href={Routes.manager.home} className='flex items-center'>
          <img src='/assets/logo.png' alt='ChainWiki' className='h-7' />
        </Link>
      </div>

      <div className='flex items-center gap-6'>
        {account && (
          <Button onClick={open} variant='outlined' size='sm' color='primary'>
            + New
          </Button>
        )}
        <NetworkSelector />
        <ConnectWallet
        // style={{
        //   border: 0,
        //   padding: 0,
        //   height: '40px',
        //   ...(account && { marginRight: '-40px' }),
        // }}
        />
      </div>

      <CreateNftModal isOpen={isOpen} onClose={close} />
    </div>
  )
}

export default TopNavBar
