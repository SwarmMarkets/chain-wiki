import RoutePaths from 'src/shared/enums/routes-paths'
import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import NftCard from './NftCard'
import NftSkeletonList from './NftSkeletonList'
import { NfTsQuery } from 'src/queries/gql/graphql'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import Button from '../ui-kit/Button/Button'
import CreateNftModal from '../CreateNft/CreateNftModal'
import useModalState from 'src/hooks/useModalState'

interface NftListProps {
  loading: boolean
  nfts?: NfTsQuery['nfts'] | null
  showRole?: boolean
  skeletonLength?: number
  className?: string
}

const NftList: React.FC<NftListProps> = ({
  loading,
  nfts,
  showRole,
  skeletonLength,
  className,
}) => {
  const { t } = useTranslation('nfts')
  const { isOpen, open, close } = useModalState()

  const noNfts = !loading && (!nfts || nfts?.length === 0)

  if (noNfts) {
    return (
      <div className='flex justify-center items-center h-full typo-title3'>
        <Button variant='text' onClick={open}>
          {t('noNfts')}
        </Button>
        <CreateNftModal isOpen={isOpen} onClose={close} />
      </div>
    )
  }
  return (
    <div
      className={clsx(
        'grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4',
        className
      )}
    >
      {loading ? (
        <NftSkeletonList skeletonLength={skeletonLength} />
      ) : (
        nfts?.map(nft => (
          <Link
            to={generatePath(RoutePaths.NFT, { nftId: nft.id })}
            key={nft.id}
          >
            <NftCard nft={nft} showRole={showRole} />
          </Link>
        ))
      )}
    </div>
  )
}

export default NftList
