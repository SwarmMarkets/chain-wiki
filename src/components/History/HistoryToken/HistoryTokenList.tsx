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

interface HistoryTokenListProps {
  onSelectTokens: (articles: TokenUriUpdatesQuery['tokenURIUpdates']) => void
  selectedTokens: TokenUriUpdatesQuery['tokenURIUpdates']
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

const HistoryTokenList: React.FC<HistoryTokenListProps> = ({
  onSelectTokens,
  selectedTokens,
  history,
}) => {
  const location = useLocation()
  const { t } = useTranslation('history')

  const onChangeCheckbox = (
    article: TokenUriUpdatesQuery['tokenURIUpdates'][0]
  ) => {
    if (!selectedTokens) return
    const articleIsSelected = selectedTokens.find(
      item => item.id === article.id
    )

    if (articleIsSelected) {
      const newTokens = selectedTokens.filter(item => item.id !== article.id)
      onSelectTokens(newTokens)
      return
    }
    onSelectTokens([...selectedTokens, article])
  }

  const resetSelectedTokens = () => {
    onSelectTokens([])
  }

  return (
    <Flex flexDirection='column' $gap='10px'>
      {history &&
        selectedTokens &&
        history.map((item, index) => (
          <StyledCard key={item.id}>
            <Text>
              (
              {index === 0 ? (
                <Text>{t('curr')}</Text>
              ) : (
                <StyledLink
                  onClick={resetSelectedTokens}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldTokenId: history[0]?.id,
                    newTokenId: item.id,
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
                  onClick={resetSelectedTokens}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldTokenId: history[index + 1]?.id,
                    newTokenId: item.id,
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
                !!selectedTokens.find(
                  selectedItem => selectedItem.id === item.id
                )
              }
              disabled={
                selectedTokens.length >= 2 &&
                !selectedTokens.find(
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

export default HistoryTokenList
