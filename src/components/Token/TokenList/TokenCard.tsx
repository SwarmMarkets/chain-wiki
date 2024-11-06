import React from 'react'
import Card from '@src/components/ui/Card'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import { IpfsTokenContent } from '@src/shared/utils/ipfs/types'
import { getTextContentFromHtml, limitString } from '@src/shared/utils'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'
import Flex from '@src/components/ui/Flex'
import { useTokenCommentsCount } from '@src/hooks/subgraph/useTokenCommentsCount'
import RouterLink from '@src/components/ui/RouterLink'

const CountWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.linkPrimary};
  padding: 8px 12px;
  z-index: 1;
`

const StyledTitle = styled(Text.h2)`
  color: ${({ theme }) => theme.palette.linkPrimary};
  font-size: ${({ theme }) => theme.fontSizes.mediumPlus};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.linkPrimaryAccent};
  }
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
  const commentsCount = useTokenCommentsCount(tokenId)

  return (
    <Card>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        marginBottom='5px'
      >
        <RouterLink
          to={generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
            nftId,
            tokenId: tokenId,
          })}
        >
          <StyledTitle>{name}</StyledTitle>
        </RouterLink>
        <CountWrapper>
          <Text.p color='color'>Attestations: {commentsCount}</Text.p>
        </CountWrapper>
      </Flex>
      {content && (
        <Text.p>
          {limitString(getTextContentFromHtml(content.htmlContent), 700)}
        </Text.p>
      )}
    </Card>
  )
}

export default TokenCard
