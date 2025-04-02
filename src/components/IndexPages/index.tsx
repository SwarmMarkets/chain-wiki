import React from 'react'
import { generatePath, useParams } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'
import EditIndexPages from '../Edit/EditIndexPages'
import EditIndexPagesTree from '../Edit/EditIndexPagesTree/EditIndexPagesTree'
import EditIndexPagesItem from '../Edit/EditIndexPageItem'

interface IndexPagesProps {
  nft: NFTWithMetadata | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ nft }) => {
  const { tokenId = '' } = useParams()

  const isEditMode = window.location.pathname.includes('edit')

  if (!nft) return null

  if (isEditMode) {
    return <EditIndexPages nft={nft} />
  }

  return (
    <>
      <EditIndexPagesItem
        className='mb-1'
        name={nft?.name}
        active={!tokenId}
        to={generatePath(RoutePaths.NFT, { nftId: nft?.id })}
        readonly
      />
      <EditIndexPagesTree
        activeId={tokenId}
        readonly
        to={node =>
          generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
            tokenId: node.id,
            nftId: nft.id,
          })
        }
      />
    </>
  )
}

export default IndexPages
