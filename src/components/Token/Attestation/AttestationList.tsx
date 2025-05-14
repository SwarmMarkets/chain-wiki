import { CommentsQueryFullData } from 'src/shared/utils/ipfs/types'
import dayjs from 'dayjs'
import React from 'react'
import AttestationCard from './AttestationCard'
import AttestationCardSkeleton from './AttestationCardSkeleton'
import { useSX1155NFT } from 'src/hooks/contracts/useSX1155NFT'

interface AttestationListProps {
  attestations: CommentsQueryFullData[] | null
  tokenAddress: string
  nftAddress: string
}

const AttestationList: React.FC<AttestationListProps> = ({
  attestations,
  tokenAddress,
  nftAddress,
}) => {
  const { call } = useSX1155NFT(nftAddress)

  if (!attestations) {
    return (
      <div className='flex flex-col py-5 gap-2'>
        {[...new Array(3)].map((_, index) => (
          <AttestationCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  const handleDeleteAttestation = (attestationId: string) => {
    const tokenId = Number(tokenAddress.split('-')[1])
    const commentId = Number(attestationId.split('-')[2])

    return call('deleteAttestation', [tokenId, commentId])
  }

  return (
    <div className='flex flex-col py-5 gap-2'>
      {attestations?.map(item => (
        <AttestationCard
          onDelete={() => handleDeleteAttestation(item.id)}
          key={item.id}
          address={item.commentator}
          message={item.ipfsContent?.htmlContent || ''}
          date={dayjs(+item.createdAt * 1000).format('MMMM D, YYYY h:mm A')}
        />
      ))}
    </div>
  )
}

export default AttestationList
