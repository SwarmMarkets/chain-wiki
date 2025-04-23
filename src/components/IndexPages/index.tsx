import React from 'react'
import { generatePath } from 'react-router-dom'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import RoutePaths from 'src/shared/enums/routes-paths'
import { isFullTokenId, splitTokenId } from 'src/shared/utils'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'
import EditIndexPages from '../Edit/EditIndexPages'
import EditIndexPagesTree from '../Edit/EditIndexPagesTree/EditIndexPagesTree'

interface IndexPagesProps {
  nft: NFTWithMetadata | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ nft }) => {
  const tokenId = useFullTokenIdParam()

  const isEditMode = window.location.pathname.includes('edit')

  if (!nft) return null

  if (isEditMode) {
    return <EditIndexPages />
  }

  return (
    <>
      <EditIndexPagesTree
        activeId={tokenId}
        readonly
        to={node =>
          generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
            tokenId: isFullTokenId(node.id.toString())
              ? splitTokenId(node.id.toString()).tokenId
              : '',
            nftId: nft.id,
          })
        }
      />
    </>
  )
}

export default IndexPages
