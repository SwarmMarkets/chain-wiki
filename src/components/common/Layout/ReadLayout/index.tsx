import { Outlet, useParams } from 'react-router-dom'
import useNFT from 'src/hooks/subgraph/useNFT'
import ReadHeader from './ReadHeader'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

import { createContext, useContext, useRef } from 'react'

const ContentRefContext = createContext<React.RefObject<HTMLDivElement> | null>(
  null
)

export const useContentRef = () => {
  return useContext(ContentRefContext)
}

const ReadLayout = () => {
  const { nftId = '' } = useParams()
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const contentElemRef = useRef<HTMLDivElement>(null)

  if (loadingNft && !refetchingNft) return null

  return (
    <ContentRefContext.Provider value={contentElemRef}>
      <div className='flex flex-col min-h-screen'>
        <ReadHeader nft={nft} />

        <div className='flex flex-1 max-w-screen-2xl mx-auto pt-24 px-4 sm:px-6 md:px-8 w-full'>
          <LeftSidebar nft={nft} />

          <main className='flex-1 px-12'>
            <Outlet />
          </main>

          <RightSidebar contentElem={contentElemRef.current} />
        </div>
      </div>
    </ContentRefContext.Provider>
  )
}

export default ReadLayout
