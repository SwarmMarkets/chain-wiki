import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import NftList from 'src/components/Nft/NftList'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import RoutePaths from 'src/shared/enums/routes-paths'

const ExplorePage = () => {
  const { t } = useTranslation('explore')
  const { nfts, loadingNfts, refetchingNfts } = useNFTs({
    variables: {
      orderBy: Nft_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
    },
  })

  const loading = loadingNfts && !refetchingNfts

  const noNfts = !loading && (!nfts || nfts?.length === 0)

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
        {noNfts ? (
          <div className='text-center mt-14 typo-title2'>{t('noNfts')}</div>
        ) : (
          <NftList
            loading={loading}
            nfts={nfts}
            skeletonLength={10}
            className='mt-7'
            to={nft => generatePath(RoutePaths.NFT_READ, { nftId: nft.id })}
          />
        )}
      </div>
    </div>
  )
}

export default ExplorePage
