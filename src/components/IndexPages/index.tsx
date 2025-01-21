import React from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useParams } from 'react-router-dom'
import Box from 'src/components/ui/Box'
import Text from 'src/components/ui/Text'
import RoutePaths from 'src/shared/enums/routes-paths'
import {
  NFTWithMetadata,
  TokensQueryFullData,
} from 'src/shared/utils/ipfs/types'
import { useTheme } from 'styled-components'
import EditIndexPagesTree from '../Edit/EditIndexPagesTree/EditIndexPagesTree'
import { SideContentWrap } from '../Nft/styled-components'

interface IndexPagesProps {
  tokens: TokensQueryFullData[] | null
  nft: NFTWithMetadata | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ tokens, nft, ...props }) => {
  const theme = useTheme()
  const { t } = useTranslation(['nft', 'buttons'])
  const { tokenId = '' } = useParams()

  const noTokens = tokens?.length === 0

  if (noTokens || !nft?.id) {
    return (
      <SideContentWrap {...props}>
        <Text.p
          textAlign='center'
          fontWeight={theme.fontWeights.medium}
          color={theme.palette.gray}
        >
          {t('indexPages.noTokens')}
        </Text.p>
      </SideContentWrap>
    )
  }

  return (
    <SideContentWrap>
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
    </SideContentWrap>
  )
}

export default IndexPages
