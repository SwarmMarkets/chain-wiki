import React from 'react'
import { generatePath } from 'react-router-dom'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import RoutePaths from 'src/shared/enums/routes-paths'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'
import EditIndexPagesItem from '../Edit/EditIndexPageItem'
import EditIndexPages from '../Edit/EditIndexPages'
import EditIndexPagesTree from '../Edit/EditIndexPagesTree/EditIndexPagesTree'
import { isFullTokenId, splitTokenId } from 'src/shared/utils'

interface IndexPagesProps {
  nft: NFTWithMetadata | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ nft }) => {
  const tokenId = useFullTokenIdParam()

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
