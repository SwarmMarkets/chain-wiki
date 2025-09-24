import clsx from 'clsx'
import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import { NfTsQuery } from 'src/queries/gql/graphql'
import NftCard from './NftCard'
import NftSkeletonList from './NftSkeletonList'
import RoutePaths from 'src/shared/enums/routes-paths'
import { SupportedChainId } from 'src/environment/networks'

export type NFTWithChain = NfTsQuery['nfts'][0] & { chain?: SupportedChainId }

interface NftListProps {
  loading: boolean
  nfts?: NFTWithChain[]
  skeletonLength?: number
  className?: string
  to?: (nft: NFTWithChain) => string
  onClick?: (nft: NFTWithChain) => void
  showChain?: boolean
}

const NftList: React.FC<NftListProps> = ({
  loading,
  nfts,
  skeletonLength,
  className,
  onClick,
  to,
  showChain = false,
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
            onClick={() => onClick?.(nft)}
            to={
              to
                ? to(nft)
                : generatePath(RoutePaths.NFT, { nftIdOrSlug: nft.slug })
            }
            key={nft.id}
          >
            <NftCard
              nft={nft}
              className='h-full'
              chainId={nft.chain}
              showChain={showChain}
            />
          </Link>
        ))
      )}
    </div>
  )
}

export default NftList
