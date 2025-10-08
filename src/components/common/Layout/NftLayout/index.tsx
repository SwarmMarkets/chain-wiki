'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useNFT from 'src/hooks/subgraph/useNFT'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import NftLayoutHeader from './NftLayoutHeader'
import NftLayoutSideBar from './NftLayoutSideBar'
import Routes from 'src/shared/consts/routes'

const NftLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { nftId, loading: loadingNftId } = useNFTIdParam()
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })
  const { permissions, loading: loadingPermissions } = useNftPermissions(nftId)

  const loading =
    (loadingNft && !refetchingNft) || loadingPermissions || loadingNftId

  useEffect(() => {
    if (!loading && !permissions.canGetAccessToManagerPage) {
      router.replace(Routes.manager.home)
    }
  }, [loading, permissions, router])

  return (
    <div className='h-full flex flex-col'>
      <NftLayoutHeader nft={nft} loading={loading} />
      <div className='flex flex-1 overflow-hidden'>
        <NftLayoutSideBar nft={nft} loading={loading} />
        <div className='flex-1 overflow-auto p-4'>{children}</div>
      </div>
    </div>
  )
}

export default NftLayout
