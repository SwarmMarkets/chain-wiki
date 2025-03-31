import { Outlet, useParams } from 'react-router-dom'
import useNFT from 'src/hooks/subgraph/useNFT'
import NftLayoutHeader from './NftLayoutHeader'
import NftLayoutSideBar from './NftLayoutSideBar'

const NftLayout = () => {
  const { nftId = '' } = useParams()

  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const loading = loadingNft && !refetchingNft

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
