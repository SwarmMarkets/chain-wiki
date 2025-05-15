import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import RoutePaths from 'src/shared/enums/routes-paths'
import { isFullTokenId, splitTokenId } from 'src/shared/utils'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'
import EditIndexPages from '../Edit/EditIndexPages'
import EditIndexPagesTree from '../Edit/EditIndexPagesTree/EditIndexPagesTree'
import useEdit from '../Edit/useEdit'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'

interface IndexPagesProps {
  nft: NFTWithMetadata | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ nft }) => {
  const fullTokenId = useFullTokenIdParam()
  const { treeData } = useEdit(true)
  const isEditMode = window.location.pathname.includes('edit')

  const firstNotGroupTokenId = useMemo(
    () =>
      nft?.indexPagesContent?.indexPages &&
      findFirstNonGroupVisibleNode(nft?.indexPagesContent?.indexPages),
    [nft?.indexPagesContent?.indexPages]
  )

  if (!nft) return null

  if (isEditMode) {
    return <EditIndexPages />
  }

  return (
    <>
      <EditIndexPagesTree
        activeId={fullTokenId || firstNotGroupTokenId?.tokenId}
        to={node =>
          generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
            tokenId: isFullTokenId(node.id.toString())
              ? splitTokenId(node.id.toString()).tokenId
              : '',
            nftId: nft.id,
          })
        }
        treeData={treeData}
        readonly
      />
    </>
  )
}

export default IndexPages
