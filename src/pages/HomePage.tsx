import ProjectList from '@src/components/Project/ProjectList'
import useNFTs from '@src/hooks/subgraph/useNFTs'
import Box from '@src/components/ui/Box'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation('projects')
  const { fullNfts, loadingNfts, refetchingNfts } = useNFTs(
    {},
    { fetchFullData: true }
  )

  const loading = loadingNfts && !refetchingNfts

  return (
    <>
      <h1>{t('title')}</h1>
      <Box mt={20}>
        <ProjectList loading={loading} projects={fullNfts} />
      </Box>
    </>
  )
}

export default HomePage
