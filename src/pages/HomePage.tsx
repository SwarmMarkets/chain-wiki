import { useAddress } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import NftList from 'src/components/Nft/NftList'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'

const HomePage = () => {
  const { t } = useTranslation('nfts')
  // const [skip, setSkip] = useState(0)
  const address = useAddress()
  const { nfts, loadingNfts, refetchingNfts } = useNFTs(
    {
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
    }
    // { fetchFullData: true }
  )

  const loading = loadingNfts && !refetchingNfts

  // const handleNextButton = () => {
  //   setSkip(skip + PAGE_LIMIT)
  // }

  // const handlePreviousButton = () => {
  //   setSkip(skip - PAGE_LIMIT)
  // }

  // const hasPrevious = skip > 0
  // const hasNext = !!(fullNfts ? fullNfts.length >= PAGE_LIMIT : false)

  return (
    <div className='p-20 h-full'>
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
  )
}

export default HomePage
