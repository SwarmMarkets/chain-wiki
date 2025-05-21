import React from 'react'
import {
  CommentsQueryFullData,
  NFTWithMetadata,
} from 'src/shared/utils/ipfs/types'
import AttestationCard from './AttestationCard'
import AttestationCardSkeleton from './AttestationCardSkeleton'

interface AttestationListProps {
  nft: NFTWithMetadata
  attestations: CommentsQueryFullData[] | null
  tokenAddress: string
}

const AttestationList: React.FC<AttestationListProps> = ({
  nft,
  attestations,
  tokenAddress,
}) => {
  if (!attestations) {
    return (
      <div className='flex flex-col py-5 gap-2'>
        {[...new Array(3)].map((_, index) => (
          <AttestationCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className='flex flex-col py-5 gap-2'>
      {attestations?.map(item => (
        <AttestationCard
          nftAddress={nft.id}
          tokenAddress={tokenAddress}
          key={item.id}
          attestation={item}
          isPreferredAttestator={nft.preferredAttestators.includes(
            item.commentator
          )}
        />
      ))}
    </div>
  )
}

export default AttestationList
