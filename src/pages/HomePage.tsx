/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useActiveAccount } from 'thirdweb/react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import NftList from 'src/components/Nft/NftList'
import useNFTExamples from 'src/hooks/subgraph/useNFTExamples'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import RoutePaths from 'src/shared/enums/routes-paths'

const HomePage = () => {
  const { t } = useTranslation(['nfts', 'explore'])
  const account = useActiveAccount()
  const address = account?.address

  const {
    nfts: userNfts,
    loadingNfts: loadingUserNfts,
    refetchingNfts: refetchingUserNfts,
  } = useNFTs({
    variables: {
      orderBy: Nft_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
      filter: {
        or: [
          { admins_contains_nocase: [address!] },
          { editors_contains_nocase: [address!] },
        ],
      },
    },
    skip: !address,
  })

  const { nfts: exploreNfts, loading: loadingExplore } = useNFTExamples()

  const loadingUser = loadingUserNfts && !refetchingUserNfts

  const hasUserNfts = !loadingUser && userNfts && userNfts.length > 0

  return (
    <div className='p-20 h-full'>
      {(hasUserNfts || loadingUser) && (
        <>
          <h1 className='typo-heading1 text-main-accent font-medium'>
            {t('title')}
          </h1>
          <h3 className='heading-md'>{t('subtitle')}</h3>
          <NftList
            loading={loadingUser}
            nfts={userNfts}
            skeletonLength={6}
            className='mt-7'
          />
        </>
      )}

      <div className={clsx(hasUserNfts && 'mt-14')}>
        <h1 className='typo-heading1 text-main-accent font-medium'>
          {t('explore:title')}
        </h1>
        <h3 className='heading-md'>{t('explore:subtitle')}</h3>
        <NftList
          loading={loadingExplore}
          nfts={exploreNfts}
          skeletonLength={6}
          className='mt-7'
          to={nft =>
            generatePath(RoutePaths.NFT_READ, { nftIdOrSlug: nft.slug })
          }
        />
      </div>
    </div>
  )
}

export default HomePage
