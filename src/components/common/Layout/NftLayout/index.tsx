import { Navigate, Outlet, useParams } from 'react-router-dom'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useNFT from 'src/hooks/subgraph/useNFT'
import RoutePaths from 'src/shared/enums/routes-paths'
import NftLayoutHeader from './NftLayoutHeader'
import NftLayoutSideBar from './NftLayoutSideBar'

const NftLayout = () => {
  const { nftId = '' } = useParams()

  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const { permissions, loading: loadingPermissions } = useNftPermissions(nftId)

  const loading = (loadingNft && !refetchingNft) || loadingPermissions

  if (!permissions.canGetAccessToManagerPage && !loading) {
    return <Navigate to={RoutePaths.HOME} />
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
