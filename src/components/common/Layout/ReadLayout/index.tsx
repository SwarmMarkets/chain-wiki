import { Outlet, useParams } from 'react-router-dom'
import useNFT from 'src/hooks/subgraph/useNFT'
import ReadHeader from './ReadHeader'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

const ReadLayout = () => {
  const { nftId = '' } = useParams()
  const { nft } = useNFT(nftId, { fetchFullData: true })

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Фиксированный хедер */}
      <ReadHeader nft={nft} />

      <div className='flex flex-1 max-w-screen-2xl mx-auto pt-24 px-4 sm:px-6 md:px-8'>
        <LeftSidebar nft={nft} />

        {/* Основной контент (скролл всей страницы) */}
        <main className='flex-1 px-12'>
          <Outlet />
        </main>

        <RightSidebar />
      </div>
    </div>
  )
}

export default ReadLayout
