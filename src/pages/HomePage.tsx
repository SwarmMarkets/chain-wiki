import NftList from '@src/components/Nft/NftList'
import useNFTs, { PAGE_LIMIT } from '@src/hooks/subgraph/useNFTs'
import Box from '@src/components/ui/Box'
import { useTranslation } from 'react-i18next'
import Flex from '@src/components/ui/Flex'
import Button from '@src/components/ui/Button/Button'
import { useState } from 'react'

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

  const noPrevious = skip === 0
  const noNext = !!(fullNfts && fullNfts.length < PAGE_LIMIT)

  return (
    <>
      <h1>{t('title')}</h1>
      <Box mt={20}>
        <NftList loading={loading} nfts={fullNfts} />
        <Flex mt={15} justifyContent='center' $gap='10px'>
          <Button disabled={noPrevious} onClick={handlePreviousButton}>
            {'<< Previous'}
          </Button>
          <Button disabled={noNext} onClick={handleNextButton}>
            {'Next >>'}
          </Button>
        </Flex>
      </Box>
    </>
  )
}

export default HomePage
