import React from 'react'
import { TokensQueryFullData } from '@src/shared/types/ipfs'
import Text from '@src/components/ui/Text'
import Divider from '@src/components/ui/Divider'
import Box from '@src/components/ui/Box'
import { Link, generatePath } from 'react-router-dom'
import RoutePaths from '@src/shared/enums/routes-paths'
import styled from 'styled-components'
import Flex from '@src/components/ui/Flex'

interface ArticlesPreviewProps {
  articles: TokensQueryFullData[] | null
  projectAddress: string
}

export const StyledLink = styled(Link)`
  padding: 6px 0;
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }
`

const ArticlesPreview: React.FC<ArticlesPreviewProps> = ({
  articles,
  projectAddress,
  ...props
}) => {
  return (
    <Box {...props}>
      <Text.h3>Articles Preview</Text.h3>
      <Divider my='10px' />
      <Flex flexDirection='column'>
        {articles?.map(article => (
          <StyledLink
            to={generatePath(RoutePaths.PROJECT + RoutePaths.ARTICLE, {
              projectId: projectAddress,
              articleId: article.id,
            })}
            key={article?.id}
          >
            {article?.ipfsContent?.name}
          </StyledLink>
        ))}
      </Flex>
    </Box>
  )
}
export default ArticlesPreview
