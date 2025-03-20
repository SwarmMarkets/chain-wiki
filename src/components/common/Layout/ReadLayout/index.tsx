import { Outlet, useParams } from 'react-router-dom'
import useNFT from 'src/hooks/subgraph/useNFT'
import LeftSidebar from './LeftSidebar'
import ReadHeader from './ReadHeader'
import RightSidebar from './RightSidebar'

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react'
import clsx from 'clsx'

const ContentRefContext = createContext<React.RefObject<HTMLDivElement> | null>(
  null
)

export const useContentRef = () => {
  return useContext(ContentRefContext)
}

interface ReadLayoutProps {
  preview?: boolean
}

const ReadLayout: React.FC<PropsWithChildren<ReadLayoutProps>> = ({
  children,
  preview,
}) => {
  const { nftId = '' } = useParams()
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const contentElemRef = useRef<HTMLDivElement>(null)

  if (loadingNft && !refetchingNft) return null

  return (
    <ContentRefContext.Provider value={contentElemRef}>
      <div className='flex flex-col w-full'>
        <ReadHeader nft={nft} preview={preview} />

        <div
          className={clsx(
            'flex flex-1 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 w-full',
            preview ? 'pt-8' : 'pt-24'
          )}
        >
          <LeftSidebar nft={nft} preview={preview} />

          <main className='flex-1 px-12'>{children || <Outlet />}</main>

          <RightSidebar
            contentElem={contentElemRef.current}
            preview={preview}
          />
        </div>
      </div>
    </ContentRefContext.Provider>
  )
}

export default ReadLayout
