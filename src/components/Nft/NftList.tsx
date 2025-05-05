import clsx from 'clsx'
import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import { NfTsQuery } from 'src/queries/gql/graphql'
import RoutePaths from 'src/shared/enums/routes-paths'
import NftCard from './NftCard'
import NftSkeletonList from './NftSkeletonList'

interface NftListProps {
  loading: boolean
  nfts?: NfTsQuery['nfts'] | null
  skeletonLength?: number
  className?: string
}

const NftList: React.FC<NftListProps> = ({
  loading,
  nfts,
  skeletonLength,
  className,
}) => {
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
            <NftCard nft={nft} className='h-full' />
          </Link>
        ))
      )}
    </div>
  )
}

export default NftList
