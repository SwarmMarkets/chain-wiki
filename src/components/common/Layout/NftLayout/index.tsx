import { Navigate, Outlet } from 'react-router-dom'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useNFT from 'src/hooks/subgraph/useNFT'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import RoutePaths from 'src/shared/enums/routes-paths'
import NftLayoutHeader from './NftLayoutHeader'
import NftLayoutSideBar from './NftLayoutSideBar'

const NftLayout = () => {
  const { nftId, loading: loadingNftId } = useNFTIdParam()

  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const { permissions, loading: loadingPermissions } = useNftPermissions(nftId)

  const loading =
    (loadingNft && !refetchingNft) || loadingPermissions || loadingNftId

  if (!permissions.canGetAccessToManagerPage && !loading) {
    return <Navigate to={RoutePaths.HOME} />
  }

  return (
    <div className='h-full flex flex-col'>
      <NftLayoutHeader nft={nft} loading={loading} />
      <div className='flex flex-1'>
        <NftLayoutSideBar nft={nft} loading={loading} />
        <div className='flex-1 relative'>
          <div className='absolute inset-0 overflow-auto p-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftLayout
