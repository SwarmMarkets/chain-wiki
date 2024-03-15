import NftList from '@src/components/Nft/NftList'
import Box from '@src/components/ui/Box'
import ButtonGroup from '@src/components/ui/Button/ButtonGroup'
import useNFTs from '@src/hooks/subgraph/useNFTs'
import { NftButtonOptions } from '@src/shared/enums/nfts/button-options'
import { ButtonOption } from '@src/shared/types/ui-components'
import { useAddress } from '@thirdweb-dev/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const MyNftsPage = () => {
  const { t } = useTranslation('nfts')
  const address = useAddress() || ''
  const [selectedOption, setSelectedOption] = useState<string>(
    NftButtonOptions.ALL
  )
  const { fullNfts, loadingNfts, refetchingNfts, refetch } = useNFTs(
    {
      variables: {
        filter: {
          or: [
            { admins_contains_nocase: [address] },
            { editors_contains_nocase: [address] },
          ],
        },
      },
      skip: !address,
    },
    { fetchFullData: true }
  )
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
        <NftList nfts={fullNfts} loading={loading} addNftCard showRole />
      </Box>
    </>
  )
}

export default MyNftsPage
