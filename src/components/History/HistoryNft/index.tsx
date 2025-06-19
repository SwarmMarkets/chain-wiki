import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import HistoryProjcetDifference from './HistoryNftDifference'
import HistoryNftList from './HistoryNftList'
import {
  NfturiUpdate_OrderBy,
  NfturiUpdatesQuery,
  OrderDirection,
} from 'src/queries/gql/graphql'
import Box from 'src/components/ui/Box'
import Text from 'src/components/ui/Text'
import Button from 'src/components/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import useNFTURIUpdates from 'src/hooks/subgraph/useNFTURIUpdates'
import HistoryCardSkeleton from '../HistoryCardSkeleton'
import { useTheme } from 'styled-components'
import useNFTIdParam from 'src/hooks/useNftIdParam'

const HistoryNft = () => {
  const theme = useTheme()
  const { t } = useTranslation(['buttons', 'history'])
  const location = useLocation()
  const { nftId } = useNFTIdParam()

  const { nftUriUpdates, loading, refetching } = useNFTURIUpdates(nftId, {
    variables: {
      orderBy: NfturiUpdate_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
    },
  })
  const mode = useMemo(() => {
    const params = queryString.parse(location.search)
    if (params.oldNftId && params.newNftId) {
      return 'difference'
    } else {
      return 'list'
    }
  }, [location.search])
  const [selectedNfts, setSelectedNfts] = useState<
    NfturiUpdatesQuery['nfturiupdates']
  >([])
  const showSkeletons = loading && !refetching

  const onSelectNfts = (nfts: NfturiUpdatesQuery['nfturiupdates']) => {
    setSelectedNfts(nfts)
  }

  const sortedNftsByUpdatedAt = useMemo(
    () => selectedNfts.sort((a, b) => +a.updatedAt - +b.updatedAt),
    [selectedNfts]
  )

  if ((!nftUriUpdates || !nftUriUpdates.length) && !showSkeletons)
    return (
      <Text.p
        mt={3}
        textAlign='center'
        color={theme.palette.gray}
        fontWeight={theme.fontWeights.medium}
      >
        {t('messages.noHistory', { ns: 'history' })}
      </Text.p>
    )

  return (
    <div>
      {mode === 'list' ? (
        <Box>
          {nftUriUpdates &&
            nftUriUpdates?.length > 1 &&
            (selectedNfts.length === 2 ? (
              <Link
                onClick={() => onSelectNfts([])}
                to={`?${queryString.stringify({
                  ...queryString.parse(location.search),
                  oldNftId: sortedNftsByUpdatedAt[0]?.id,
                  newNftId: sortedNftsByUpdatedAt[1]?.id,
                })}`}
              >
                <Button>{t('compare')}</Button>
              </Link>
            ) : (
              <Button disabled>{t('compare')}</Button>
            ))}
          <Box mt='10px'>
            {showSkeletons &&
              [...Array(5)].map((_, index) => (
                <HistoryCardSkeleton key={index} />
              ))}
            {nftUriUpdates && (
              <HistoryNftList
                selectedNfts={selectedNfts}
                onSelectNfts={onSelectNfts}
                history={nftUriUpdates}
              />
            )}
          </Box>
        </Box>
      ) : (
        <HistoryProjcetDifference />
      )}
    </div>
  )
}

export default HistoryNft
