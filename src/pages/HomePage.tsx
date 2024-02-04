import ProjectList from '@src/components/Project/ProjectList'
import useNFTs from '@src/hooks/subgraph/useNFTs'
import { useEffect } from 'react'
import ProjectListSkeletons from '@src/components/Project/ProjectListSkeletons'
import Box from '@src/components/ui/Box'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation('projects')
  const { fullNfts, loadingNfts, error, refetchingNfts } = useNFTs(
    {},
    { fetchFullData: true }
  )

  const skeletonsAreVisible = loadingNfts && !refetchingNfts

  useEffect(() => {
    if (error) {
      console.log('error', error)
    }
  }, [error])

  return (
    <>
      <h1>{t('title')}</h1>
      {fullNfts && (
        <Box mt={20}>
          {skeletonsAreVisible && <ProjectListSkeletons />}
          <ProjectList projects={fullNfts} />
        </Box>
      )}
    </>
  )
}

export default HomePage
