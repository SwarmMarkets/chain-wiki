import { useTranslation } from 'react-i18next'
import { generatePath, Link } from 'react-router-dom'
import NftList from 'src/components/Nft/NftList'
import Button from 'src/components/ui-kit/Button/Button'
import useNFTExamples from 'src/hooks/subgraph/useNFTExamples'
import RoutePaths from 'src/shared/enums/routes-paths'

const ExplorePage = () => {
  const { t } = useTranslation('explore')
  const { nfts, loadingNfts, refetchingNfts } = useNFTExamples()

  const loading = loadingNfts && !refetchingNfts

  const noNfts = !loading && (!nfts || nfts?.length === 0)

  return (
    <div
      className='h-screen flex flex-col items-center'
      style={{ background: 'rgb(249, 249, 249)' }}
    >
      <div className='w-full max-w-screen-lg mt-10'>
        <div
          className='rounded-full w-full px-5 py-2.5 flex items-center justify-between'
          style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 10px 0px' }}
        >
          <div className='p-2.5'>
            <img className='max-h-7' src='assets/logo.png' alt='ChainWiki' />
          </div>
          <Link to={RoutePaths.HOME}>
            <Button size='md' style={{ borderRadius: '50px', height: 43 }}>
              Open App
            </Button>
          </Link>
        </div>

        <div className='px-20 mt-9'>
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
              to={nft =>
                generatePath(RoutePaths.NFT_READ, { nftIdOrSlug: nft.slug })
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
