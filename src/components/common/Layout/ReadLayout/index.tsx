import { Outlet, useParams } from 'react-router-dom'
import useNFT from 'src/hooks/subgraph/useNFT'
import ReadHeader from './ReadHeader'
import LeftSidebar from './LeftSidebar'

const ReadLayout = () => {
  const { nftId = '' } = useParams()

  const { nft } = useNFT(nftId, { fetchFullData: true })

  return (
    <div>
      <ReadHeader nft={nft} />
      <div className='grid grid-cols-12 gap-4 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto'>
        <LeftSidebar nft={nft} />
        <main className='col-span-7'>
          <Outlet />
        </main>
        <aside className='bg-error col-span-2'>Aside</aside>
      </div>
    </div>
  )
}

export default ReadLayout
