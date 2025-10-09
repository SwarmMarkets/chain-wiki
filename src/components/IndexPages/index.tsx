'use client'

import React, { useMemo } from 'react'
import Routes, { MParams } from 'src/shared/consts/routes'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import EditIndexPages from '../Edit/EditIndexPages'
import EditIndexPagesTree from '../Edit/EditIndexPagesTree/EditIndexPagesTree'
import useEdit from '../Edit/useEdit'
import { useParams } from 'next/navigation'

interface IndexPagesProps {
  nft: NFTWithMetadata | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ nft }) => {
  const { tokenIdOrSlug } = useParams<MParams['token']>()
  const { treeData } = useEdit(true)
  const isEditMode = window.location.pathname.includes('/edit/')

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
        to={node => Routes.manager.token(nft.slug || '', node.data?.slug || '')}
        treeData={treeData}
        readonly
      />
    </>
  )
}

export default IndexPages
