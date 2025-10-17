'use client'

import { useActiveAccount } from 'thirdweb/react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import NftList from 'src/components/Nft/NftList'
import useNFTExamples from 'src/hooks/subgraph/useNFTExamples'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import { generateSiteLink } from 'src/shared/utils'
import ClientProviders from 'src/app/client-providers'

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
    <ClientProviders>
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
              generateSiteLink({ nftIdOrSlug: nft.slug, chain: nft.chain })
            }
            showChain
          />
        </div>
      </div>
    </ClientProviders>
  )
}

export default HomePage
