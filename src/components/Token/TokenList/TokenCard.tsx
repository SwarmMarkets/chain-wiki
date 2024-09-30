import React from 'react'
import Card from '@src/components/ui/Card'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import { IpfsTokenContent } from '@src/shared/types/ipfs'
import { getTextContentFromHtml, limitString } from '@src/shared/utils'
import { generatePath } from 'react-router-dom'
import { usePageCommentsCount } from '@src/hooks/subgraph/usePageCommentsCount'
import styled from 'styled-components'
import Flex from '@src/components/ui/Flex'

const CountWrapper = styled(Flex)`
  position: absolute;
  top: 12px;
  right: 16px;
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.linkPrimary};
  padding: 8px 12px;
  z-index: 1;
`

const CardWrapper = styled(Flex)`
  position: relative;
`

interface TokenCardProps {
  tokenId: string
  name: string
  nftId: string
  content?: IpfsTokenContent
}

const TokenCard: React.FC<TokenCardProps> = ({
  tokenId,
  nftId,
  content,
  name,
}) => {
  const commentsCount = usePageCommentsCount(tokenId)

  return (
    <CardWrapper>
      <Card
        to={generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
          nftId,
          tokenId: tokenId,
        })}
        title={name}
      >
        {content && (
          <Text.p>
            {limitString(getTextContentFromHtml(content.htmlContent), 700)}
          </Text.p>
        )}
      </Card>
      <CountWrapper>
        <Text.p color='color'>Attestations: {commentsCount}</Text.p>
      </CountWrapper>
    </CardWrapper>
  )
}

export default TokenCard
