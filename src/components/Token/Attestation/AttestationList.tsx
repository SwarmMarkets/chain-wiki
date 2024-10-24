import Flex from '@src/components/ui/Flex'
import { CommentsQueryFullData } from '@src/shared/utils/ipfs/types'
import dayjs from 'dayjs'
import React from 'react'
import AttestationCard from './AttestationCard'
import AttestationCardSkeleton from './AttestationCardSkeleton'
// import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'

interface AttestationListProps {
  attestations: CommentsQueryFullData[] | null
  loading: boolean
  // tokenAddress: string
  // nftAddress: string
}

const AttestationList: React.FC<AttestationListProps> = ({
  attestations,
  loading,
  // tokenAddress,
  // nftAddress,
}) => {
  // const { call } = useSX1155NFT(nftAddress)

  if (loading) {
    return (
      <Flex flexDirection='column' py={20} $gap='10px'>
        {[...new Array(3)].map((_, index) => (
          <AttestationCardSkeleton key={index} />
        ))}
      </Flex>
    )
  }

  // const handleDeleteAttestation = (attestationId: string) => {
  //   const tokenId = Number(tokenAddress.split('-')[1])
  //   const commentId = Number(attestationId.split('-')[2])

  //   return call('deleteAttestation', [tokenId, commentId])
  // }

  return (
    <Flex flexDirection='column' py={20} $gap='10px'>
      {attestations?.map(item => (
        <AttestationCard
          // onDelete={() => handleDeleteAttestation(item.id)}
          // nftAddress={nftAddress}
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
