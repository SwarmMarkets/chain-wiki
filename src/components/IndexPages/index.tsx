import React from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useParams } from 'react-router-dom'
import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import RoutePaths from 'src/shared/enums/routes-paths'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'
import EditIndexPages from '../Edit/EditIndexPages'
import EditIndexPagesTree from '../Edit/EditIndexPagesTree/EditIndexPagesTree'

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
  )
}

export default IndexPages
