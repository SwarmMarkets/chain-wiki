/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useAddress } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import CreateNftModal from 'src/components/CreateNft/CreateNftModal'
import NftList from 'src/components/Nft/NftList'
import Button from 'src/components/ui-kit/Button/Button'
import useNFTs from 'src/hooks/subgraph/useNFTs'
import useModalState from 'src/hooks/useModalState'
import { Nft_OrderBy, OrderDirection } from 'src/queries/gql/graphql'

const HomePage = () => {
  const { t } = useTranslation('nfts')
  const address = useAddress()
  const { nfts, loadingNfts, refetchingNfts } = useNFTs({
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

  const loading = !address || (loadingNfts && !refetchingNfts)

  const { isOpen, open, close } = useModalState()

  const noNfts = !loading && (!nfts || nfts?.length === 0)

  return (
    <div className='p-20 h-full'>
      <h1 className='typo-heading1 text-main-accent font-medium'>
        {t('title')}
      </h1>
      <h3 className='heading-md'>{t('subtitle')}</h3>
      {noNfts ? (
        <div className='flex justify-center items-center h-full typo-title3'>
          <Button variant='text' onClick={open}>
            {t('noNfts')}
          </Button>
          <CreateNftModal isOpen={isOpen} onClose={close} />
        </div>
      ) : (
        <NftList
          loading={loading}
          nfts={nfts}
          skeletonLength={10}
          className='mt-7'
        />
      )}
    </div>
  )
}

export default HomePage
