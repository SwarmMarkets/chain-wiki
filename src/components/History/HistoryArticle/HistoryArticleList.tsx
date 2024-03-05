import { TokenUriUpdatesQuery } from '@src/queries/gql/graphql'
import queryString from 'query-string'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Checkbox from '../../Checkbox'
import Card from '../../ui/Card'
import Flex from '../../ui/Flex'
import Text from '../../ui/Text'

interface HistoryArticleListProps {
  onSelectArticles: (articles: TokenUriUpdatesQuery['tokenURIUpdates']) => void
  selectedArticles: TokenUriUpdatesQuery['tokenURIUpdates']
  history: TokenUriUpdatesQuery['tokenURIUpdates']
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
  history,
}) => {
  const location = useLocation()
  const { t } = useTranslation('history')

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
      {history &&
        selectedArticles &&
        history.map((item, index) => (
          <StyledCard key={item.id}>
            <Text>
              (
              {index === 0 ? (
                <Text>{t('curr')}</Text>
              ) : (
                <StyledLink
                  onClick={resetSelectedArticles}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldArticleId: history[0]?.id,
                    newArticleId: item.id,
                  })}`}
                >
                  {t('curr')}
                </StyledLink>
              )}{' '}
              |{' '}
              {index === history.length - 1 ? (
                <Text>{t('prev')}</Text>
              ) : (
                <StyledLink
                  onClick={resetSelectedArticles}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldArticleId: history[index + 1]?.id,
                    newArticleId: item.id,
                  })}`}
                >
                  {t('prev')}
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
