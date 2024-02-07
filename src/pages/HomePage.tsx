import ProjectList from '@src/components/Project/ProjectList'
import useNFTs from '@src/hooks/subgraph/useNFTs'
import Box from '@src/components/ui/Box'
import { useTranslation } from 'react-i18next'
import ProjectSkeletonList from '@src/components/Project/ProjectSkeletonList'

const HomePage = () => {
  const { t } = useTranslation('projects')
  const { fullNfts, loadingNfts, refetchingNfts } = useNFTs(
    {},
    { fetchFullData: true }
  )

  const skeletonsAreVisible = loadingNfts && !refetchingNfts

  return (
    <>
      <h1>{t('title')}</h1>
      <Box mt={20}>
        {fullNfts && <ProjectList projects={fullNfts} />}
        {skeletonsAreVisible && <ProjectSkeletonList />}
      </Box>
    </>
  )
}

export default HomePage
