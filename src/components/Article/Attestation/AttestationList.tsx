import Flex from '@src/components/ui/Flex'
import { CommentsQueryFullData } from '@src/shared/types/ipfs'
import dayjs from 'dayjs'
import React from 'react'
import ArticleCardSkeleton from '../ArticleCardSkeleton'
import AttestationCard from './AttestationCard'

interface AttestationListProps {
  attestations: CommentsQueryFullData[] | null
  loading: boolean
}

const AttestationList: React.FC<AttestationListProps> = ({
  attestations,
  loading,
}) => {

  if (loading) {
    return (
      <Flex flexDirection='column' py={20} $gap='10px'>
        {[...new Array(3)].map(() => (
          <ArticleCardSkeleton />
        ))}
      </Flex>
    )
  }

  const handleDeleteAttestation = (id: string) => {
    console.log(id)
    // TODO: implement attestation deleting
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
