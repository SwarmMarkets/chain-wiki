import React, { useMemo } from 'react'
import { generatePath, useParams } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'
import EditIndexPages from '../Edit/EditIndexPages'
import EditIndexPagesTree from '../Edit/EditIndexPagesTree/EditIndexPagesTree'
import useEdit from '../Edit/useEdit'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'

interface IndexPagesProps {
  nft: NFTWithMetadata | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ nft }) => {
  const { tokenIdOrSlug } = useParams()
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
        activeTokenIdOrSlug={tokenIdOrSlug || firstNotGroupTokenId?.slug}
        to={node =>
          generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
            tokenIdOrSlug: node.data?.slug,
            nftIdOrSlug: nft.slug,
          })
        }
        treeData={treeData}
        readonly
      />
    </>
  )
}

export default IndexPages
