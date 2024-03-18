import NftList from '@src/components/Nft/NftList'
import useNFTs, { PAGE_LIMIT } from '@src/hooks/subgraph/useNFTs'
import Box from '@src/components/ui/Box'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Pagination from '@src/components/common/Pagination'

const HomePage = () => {
  const { t } = useTranslation('nfts')
  const [skip, setSkip] = useState(0)
  const { fullNfts, loadingNfts, refetchingNfts } = useNFTs(
    { variables: { skip } },
    { fetchFullData: true }
  )

  const loading = loadingNfts && !refetchingNfts

  const handleNextButton = () => {
    setSkip(skip + PAGE_LIMIT)
  }

  const handlePreviousButton = () => {
    setSkip(skip - PAGE_LIMIT)
  }

  const hasPrevious = skip > 0
  const hasNext = !!(fullNfts ? fullNfts.length >= PAGE_LIMIT : false)

  return (
    <>
      <h1>{t('title')}</h1>
      <Box mt={20}>
        <NftList loading={loading} nfts={fullNfts} skeletonLength={10} />
        <Pagination
          next={handleNextButton}
          previous={handlePreviousButton}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </Box>
    </>
  )
}

export default HomePage
