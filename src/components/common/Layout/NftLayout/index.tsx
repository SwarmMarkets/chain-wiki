import { generatePath, Navigate, Outlet, useParams } from 'react-router-dom'
import useNFT from 'src/hooks/subgraph/useNFT'
import NftLayoutHeader from './NftLayoutHeader'
import NftLayoutSideBar from './NftLayoutSideBar'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import RoutePaths from 'src/shared/enums/routes-paths'
import { splitTokenId } from 'src/shared/utils'

const NftLayout = () => {
  const { nftId = '', tokenId = '' } = useParams()

  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const { permissions, loading: loadingPermissions } = useNftPermissions(nftId)

  const loading = (loadingNft && !refetchingNft) || loadingPermissions

  if (!permissions.canGetAccessToManagerPage && !loading) {
    return <Navigate to={RoutePaths.HOME} />
  }

  const isEditMode = window.location.pathname.includes('edit')
  const isSettingsPage = window.location.pathname.includes('settings')

  const firstNotGroupTokenId = nft?.indexPagesContent?.indexPages.find(
    ip => ip.type !== 'group'
  )?.tokenId

  if (!isEditMode && !isSettingsPage && !tokenId && firstNotGroupTokenId) {
    return (
      <Navigate
        to={generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
          nftId: nft?.id,
          tokenId: splitTokenId(firstNotGroupTokenId).tokenId,
        })}
        replace
      />
    )
  }

  return (
    <div className='flex flex-col h-screen'>
      <NftLayoutHeader nft={nft} loading={loading} />
      <div className='flex flex-1 min-h-0'>
        <NftLayoutSideBar nft={nft} loading={loading} />
        <div className='flex flex-col flex-1 min-h-0'>
          <div className='flex-1 overflow-auto p-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftLayout
