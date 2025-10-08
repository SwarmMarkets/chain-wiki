'use client'

import clsx from 'clsx'
import React from 'react'
import { NfTsQuery } from 'src/queries/gql/graphql'
import NftCard from './NftCard'
import NftSkeletonList from './NftSkeletonList'
import { SupportedChainId } from 'src/environment/networks'
import Link from 'next/link'
import Routes from 'src/shared/consts/routes'

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
        nfts?.map(nft => {
          const href = to ? to(nft) : Routes.manager.nft(nft.slug)

          return (
            <Link
              key={nft.id}
              href={href}
              onClick={e => {
                if (onClick) {
                  e.preventDefault()
                  onClick(nft)
                }
              }}
              className='block h-full'
            >
              <NftCard
                nft={nft}
                className='h-full'
                chainId={nft.chain}
                showChain={showChain}
              />
            </Link>
          )
        })
      )}
    </div>
  )
}

export default NftList
