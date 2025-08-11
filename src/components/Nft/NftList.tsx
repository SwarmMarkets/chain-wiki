import clsx from 'clsx'
import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import { NfTsQuery } from 'src/queries/gql/graphql'
import { generateSiteLink } from 'src/shared/utils'
import NftCard from './NftCard'
import NftSkeletonList from './NftSkeletonList'
import RoutePaths from 'src/shared/enums/routes-paths'

export type NFTWithChain = NfTsQuery['nfts'][0] & { chain?: number }

interface NftListProps {
  loading: boolean
  nfts?: NFTWithChain[]
  skeletonLength?: number
  className?: string
  to?: (nft: NFTWithChain) => string
}

const NftList: React.FC<NftListProps> = ({
  loading,
  nfts,
  skeletonLength,
  className,
  to,
}) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-[repeat(auto-fit,minmax(250px,400px))] gap-4',
        className
      )}
    >
      {loading ? (
        <NftSkeletonList skeletonLength={skeletonLength} />
      ) : (
        nfts?.map(nft => (
          <Link
            to={
              to
                ? to(nft)
                : generatePath(RoutePaths.NFT, { nftIdOrSlug: nft.slug })
            }
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
