import React from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useParams } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import {
  NFTWithMetadata,
  TokensQueryFullData,
} from 'src/shared/utils/ipfs/types'
import EditIndexPages from '../Edit/EditIndexPages'
import EditIndexPagesTree from '../Edit/EditIndexPagesTree/EditIndexPagesTree'

interface IndexPagesProps {
  tokens: TokensQueryFullData[] | null
  nft: NFTWithMetadata | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ tokens, nft, ...props }) => {
  const { t } = useTranslation(['nft', 'buttons'])
  const { tokenId = '' } = useParams()

  const isEditMode = window.location.pathname.includes('edit')

  const noTokens = tokens?.length === 0

  if (noTokens || !nft?.id) {
    return <p className='text-center'>{t('indexPages.noTokens')}</p>
  }

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
