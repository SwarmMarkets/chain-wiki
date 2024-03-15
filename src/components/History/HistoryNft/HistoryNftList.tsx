import { NfturiUpdatesQuery } from '@src/queries/gql/graphql'
import queryString from 'query-string'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Checkbox from '@src/components/Checkbox'
import Card from '@src/components/ui/Card'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'

interface HistoryNftListProps {
  onSelectNfts: (nfts: NfturiUpdatesQuery['nfturiupdates']) => void
  selectedNfts: NfturiUpdatesQuery['nfturiupdates']
  history: NfturiUpdatesQuery['nfturiupdates']
}

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }
`

const HistoryNftList: React.FC<HistoryNftListProps> = ({
  onSelectNfts,
  selectedNfts,
  history,
}) => {
  const location = useLocation()
  const { t } = useTranslation('history')

  const onChangeCheckbox = (nft: NfturiUpdatesQuery['nfturiupdates'][0]) => {
    if (!selectedNfts) return
    const nftIsSelected = selectedNfts.find(item => item.id === nft.id)

    if (nftIsSelected) {
      const newNfts = selectedNfts.filter(item => item.id !== nft.id)
      onSelectNfts(newNfts)
      return
    }
    onSelectNfts([...selectedNfts, nft])
  }

  const resetSelectedNfts = () => {
    onSelectNfts([])
  }

  return (
    <Flex flexDirection='column' $gap='10px'>
      {history &&
        selectedNfts &&
        history.map((item, index) => (
          <Card key={item.id}>
            <Text>
              (
              {index === 0 ? (
                <Text>{t('curr')}</Text>
              ) : (
                <StyledLink
                  onClick={resetSelectedNfts}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldNftId: history[0]?.id,
                    newNftId: item.id,
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
                  onClick={resetSelectedNfts}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldNftId: history[index + 1]?.id,
                    newNftId: item.id,
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
                !!selectedNfts.find(selectedItem => selectedItem.id === item.id)
              }
              disabled={
                selectedNfts.length >= 2 &&
                !selectedNfts.find(selectedItem => selectedItem.id === item.id)
              }
              onChange={() => onChangeCheckbox(item)}
            />
            <Text ml='20px'>{new Date(+item.updatedAt).toLocaleString()} </Text>
          </Card>
        ))}
    </Flex>
  )
}

export default HistoryNftList
