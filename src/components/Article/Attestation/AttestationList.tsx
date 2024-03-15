import Flex from '@src/components/ui/Flex'
import { CommentsQueryFullData } from '@src/shared/types/ipfs'
import dayjs from 'dayjs'
import React from 'react'
import AttestationCard from './AttestationCard'
import AttestationCardSkeleton from './AttestationCardSkeleton'
import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'

interface AttestationListProps {
  attestations: CommentsQueryFullData[] | null
  loading: boolean
  articleAddress: string
  projectAddress: string
}

const AttestationList: React.FC<AttestationListProps> = ({
  attestations,
  loading,
  articleAddress,
  projectAddress,
}) => {
  // TODO: Delete attestation
  const { call, txLoading } = useSX1155NFT(projectAddress)

  if (loading) {
    return (
      <Flex flexDirection='column' py={20} $gap='10px'>
        {[...new Array(3)].map((_, index) => (
          <AttestationCardSkeleton key={index} />
        ))}
      </Flex>
    )
  }

  const handleDeleteAttestation = (attestationId: string) => {
    const tokenId = Number(articleAddress.split('-')[1])
    const commentId = Number(attestationId.split('-')[2])
    console.log(tokenId, commentId)
    return call('deleteAttestation', [tokenId, commentId])
  }

  return (
    <Flex flexDirection='column' py={20} $gap='10px'>
      {attestations?.map(item => (
        <AttestationCard
          onDelete={() => handleDeleteAttestation(item.id)}
          key={item.id}
          address={item.commentator}
          message={item.ipfsContent?.htmlContent || ''}
          date={dayjs(+item.createdAt * 1000).format('MMMM D, YYYY h:mm A')}
        />
      ))}
    </Flex>
  )
}

export default AttestationList
