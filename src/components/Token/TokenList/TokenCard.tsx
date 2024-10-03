import React from 'react'
import Card from '@src/components/ui/Card'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import { IpfsTokenContent } from '@src/shared/types/ipfs'
import { getTextContentFromHtml, limitString } from '@src/shared/utils'
import { generatePath } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import Flex from '@src/components/ui/Flex'
import { useTokenCommentsCount } from '@src/hooks/subgraph/useTokenCommentsCount'
import RouterLink from '@src/components/ui/RouterLink'

const CountWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.linkPrimary};
  padding: 8px 12px;
  z-index: 1;
`

const Title = styled(Text.h2)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  const theme = useTheme()

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
          <Title
            color={theme.palette.linkPrimary}
            size={theme.fontSizes.mediumPlus}
            weight={theme.fontWeights.bold}
          >
            {name}
          </Title>
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
