import NftList from 'src/components/Nft/NftList'
import Pagination from 'src/components/common/Pagination'
import Box from 'src/components/ui/Box'
import ButtonGroup from 'src/components/ui/Button/ButtonGroup'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import { NftButtonOptions } from 'src/shared/enums/nfts/button-options'
import { ButtonOption } from 'src/shared/types/ui-components'
import { useAddress } from '@thirdweb-dev/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PAGE_LIMIT = 9

const MyNftsPage = () => {
  const { t } = useTranslation('nfts')
  const address = useAddress() || ''
  const [selectedOption, setSelectedOption] = useState<string>(
    NftButtonOptions.ALL
  )
  const [skip, setSkip] = useState(0)
  const { nfts, loadingNfts, refetchingNfts, refetch } = useNFTs({
    variables: {
      filter: {
        or: [
          { admins_contains_nocase: [address] },
          { editors_contains_nocase: [address] },
        ],
      },
      orderBy: Nft_OrderBy.CreatedAt,
      orderDirection: OrderDirection.Desc,
      skip,
      limit: PAGE_LIMIT,
    },
    skip: !address,
  })
  const options: ButtonOption[] = [
    { value: NftButtonOptions.ALL, label: t('filter.all') },
    { value: NftButtonOptions.ADMIN, label: t('filter.admin') },
    { value: NftButtonOptions.EDITOR, label: t('filter.editor') },
  ]

  const handleSelect = (value: string) => {
    const isAllFilter = value === NftButtonOptions.ALL
    const isAdminFilter = value === NftButtonOptions.ADMIN
    const isEditorFiter = value === NftButtonOptions.EDITOR

    refetch({
      filter: {
        ...(isAllFilter && {
          or: [
            { admins_contains_nocase: [address] },
            { editors_contains_nocase: [address] },
          ],
        }),
        ...(isAdminFilter && {
          admins_contains_nocase: [address],
        }),
        ...(isEditorFiter && {
          editors_contains_nocase: [address],
        }),
      },
    })

    setSelectedOption(value)
  }

  const loading = loadingNfts && !refetchingNfts

  const handleNextButton = () => {
    setSkip(skip + PAGE_LIMIT)
  }

  const handlePreviousButton = () => {
    setSkip(skip - PAGE_LIMIT)
  }

  const hasPrevious = skip > 0
  const hasNext = !!(nfts ? nfts.length >= PAGE_LIMIT : false)
  const showPagination = hasPrevious || hasNext

  return (
    <>
      <h1>{t('myNftsTitle')}</h1>
      <ButtonGroup
        mt={20}
        options={options}
        selectedValue={selectedOption}
        onSelect={handleSelect}
      />
      <Box mt={20}>
        <NftList nfts={nfts} loading={loading} showRole skeletonLength={9} />
      </Box>
      {showPagination && (
        <Pagination
          next={handleNextButton}
          previous={handlePreviousButton}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      )}
    </>
  )
}

export default MyNftsPage
