import { useTranslation } from 'react-i18next'
import NftList from 'src/components/Nft/NftList'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'

const ExplorePage = () => {
  const { t } = useTranslation('explore')
  const { nfts, loadingNfts, refetchingNfts } = useNFTs({
    variables: {
      orderBy: Nft_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
    },
  })

  const loading = loadingNfts && !refetchingNfts

  return (
    <div className='h-full'>
      <div
        className='px-20 py-10'
        style={{
          background: 'linear-gradient(60deg,#c2ebfb 0%, #a1a7fd 100%)',
        }}
      >
        <img className='max-w-96' src='assets/logo.png' alt='ChainWiki' />
      </div>
      <div className='px-20 mt-7'>
        <h1 className='typo-heading1 text-main-accent font-medium'>
          {t('title')}
        </h1>
        <h3 className='heading-md'>{t('subtitle')}</h3>
        <NftList
          loading={loading}
          nfts={nfts}
          skeletonLength={10}
          className='mt-7'
          showRole
        />
      </div>
    </div>
  )
}

export default ExplorePage
