import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Card from '../ui/Card'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import queryString from 'query-string'
import useTokenURIUpdates from '@src/hooks/subgraph/useTokenURIUpdates'
import styled from 'styled-components'
import Checkbox from '../Checkbox'
import HistoryCardSkeleton from './HistoryCardSkeleton'
import {
  OrderDirection,
  TokenUriUpdate_OrderBy,
  TokenUriUpdatesQuery,
} from '@src/queries/gql/graphql'

interface HistoryArticleListProps {
  onSelectArticles: (articles: TokenUriUpdatesQuery['tokenURIUpdates']) => void
  selectedArticles: TokenUriUpdatesQuery['tokenURIUpdates']
}

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }
`

const StyledCard = styled(Card)`
  padding: 18px;
  user-select: none;
`

const HistoryArticleList: React.FC<HistoryArticleListProps> = ({
  onSelectArticles,
  selectedArticles,
}) => {
  const location = useLocation()
  const { articleId = '' } = useParams()
  const { tokenUriUpdates, loading, refetching } = useTokenURIUpdates(
    articleId,
    {
      variables: {
        orderBy: TokenUriUpdate_OrderBy.UpdatedAt,
        orderDirection: OrderDirection.Desc,
      },
    }
  )

  const showSkeletons = loading && !refetching

  const onChangeCheckbox = (
    article: TokenUriUpdatesQuery['tokenURIUpdates'][0]
  ) => {
    if (!selectedArticles) return
    const articleIsSelected = selectedArticles.find(
      item => item.id === article.id
    )

    if (articleIsSelected) {
      const newArticles = selectedArticles.filter(
        item => item.id !== article.id
      )
      onSelectArticles(newArticles)
      return
    }
    onSelectArticles([...selectedArticles, article])
  }

  const resetSelectedArticles = () => {
    onSelectArticles([])
  }

  return (
    <Flex flexDirection='column' $gap='10px'>
      {showSkeletons &&
        [...Array(5)].map((_, index) => <HistoryCardSkeleton key={index} />)}
      {tokenUriUpdates &&
        selectedArticles &&
        tokenUriUpdates.map((item, index) => (
          <StyledCard key={item.id}>
            <Text>
              (
              {index === 0 ? (
                <Text>curr</Text>
              ) : (
                <StyledLink
                  onClick={resetSelectedArticles}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldTokenId: tokenUriUpdates[0]?.id,
                    newTokenId: item.id,
                  })}`}
                >
                  curr
                </StyledLink>
              )}{' '}
              |{' '}
              {index === tokenUriUpdates.length - 1 ? (
                <Text>prev</Text>
              ) : (
                <StyledLink
                  onClick={resetSelectedArticles}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldTokenId: tokenUriUpdates[index + 1]?.id,
                    newTokenId: item.id,
                  })}`}
                >
                  prev
                </StyledLink>
              )}
              )
            </Text>
            <Checkbox
              ml='10px'
              checked={
                !!selectedArticles.find(
                  selectedItem => selectedItem.id === item.id
                )
              }
              disabled={
                selectedArticles.length >= 2 &&
                !selectedArticles.find(
                  selectedItem => selectedItem.id === item.id
                )
              }
              onChange={() => onChangeCheckbox(item)}
            />
            <Text ml='20px'>{new Date(+item.updatedAt).toLocaleString()} </Text>
          </StyledCard>
        ))}
    </Flex>
  )
}

export default HistoryArticleList
