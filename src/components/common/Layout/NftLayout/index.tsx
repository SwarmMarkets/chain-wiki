import { Outlet, useParams } from 'react-router-dom'
import IndexPages from 'src/components/IndexPages'
import useNFT from 'src/hooks/subgraph/useNFT'
import NftLayoutHeader from './NftLayoutHeader'

const NftLayout = () => {
  const { nftId = '' } = useParams()

  const { nft } = useNFT(nftId, { fetchFullData: true })

  if (!nft) {
    return null
  }

  return (
    <div className='flex flex-col h-screen'>
      <NftLayoutHeader nft={nft} />
      <div className='flex flex-1 min-h-0'>
        <aside className='w-64 bg-paper flex flex-col border-r-gray-200 border-r overflow-y-auto h-full'>
          <nav className='flex-1 overflow-y-auto p-4 flex flex-col gap-1'>
            <IndexPages nft={nft} />
          </nav>
          <footer></footer>
        </aside>

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
