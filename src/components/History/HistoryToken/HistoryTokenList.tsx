import queryString from 'query-string'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import Checkbox from 'src/components/ui-kit/Checkbox/Checkbox'
import { TokenUriUpdatesQuery } from 'src/queries/gql/graphql'
import Card from '../../ui/Card'
import dayjs from 'dayjs'

interface HistoryTokenListProps {
  onSelectTokens: (tokens: TokenUriUpdatesQuery['tokenURIUpdates']) => void
  selectedTokens: TokenUriUpdatesQuery['tokenURIUpdates']
  history: TokenUriUpdatesQuery['tokenURIUpdates']
}

const HistoryTokenList: React.FC<HistoryTokenListProps> = ({
  onSelectTokens,
  selectedTokens,
  history,
}) => {
  const location = useLocation()
  const { t } = useTranslation('history')

  const onChangeCheckbox = (
    token: TokenUriUpdatesQuery['tokenURIUpdates'][0]
  ) => {
    if (!selectedTokens) return
    const tokenIsSelected = selectedTokens.find(item => item.id === token.id)

    if (tokenIsSelected) {
      const newTokens = selectedTokens.filter(item => item.id !== token.id)
      onSelectTokens(newTokens)
      return
    }
    onSelectTokens([...selectedTokens, token])
  }

  const resetSelectedTokens = () => {
    onSelectTokens([])
  }

  return (
    <div className='flex flex-col gap-3'>
      {history &&
        selectedTokens &&
        history.map((item, index) => (
          <Card className='select-none flex items-center' key={item.id}>
            <span>
              (
              {index === 0 ? (
                <span>{t('curr')}</span>
              ) : (
                <Link
                  className='text-primary hover:text-primary-accent transition-colors'
                  onClick={resetSelectedTokens}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldTokenId: history[0]?.id,
                    newTokenId: item.id,
                  })}`}
                >
                  {t('curr')}
                </Link>
              )}{' '}
              |{' '}
              {index === history.length - 1 ? (
                <span>{t('prev')}</span>
              ) : (
                <Link
                  className='text-primary hover:text-primary-accent transition-colors'
                  onClick={resetSelectedTokens}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldTokenId: history[index + 1]?.id,
                    newTokenId: item.id,
                  })}`}
                >
                  {t('prev')}
                </Link>
              )}
              )
            </span>
            <Checkbox
              className='ml-3'
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
            <span className='ml-auto text-main-muted'>
              {dayjs(+item.updatedAt * 1000).format('MMMM D, YYYY h:mm A')}
            </span>
          </Card>
        ))}
    </div>
  )
}

export default HistoryTokenList
