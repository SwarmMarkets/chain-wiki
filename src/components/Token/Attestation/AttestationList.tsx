import dayjs from 'dayjs'
import React from 'react'
import { useSX1155NFT } from 'src/hooks/contracts/useSX1155NFT'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
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
  const { call } = useSX1155NFT(nft.id)
  const { signTransaction } = useNFTUpdate(nft.id)

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

  const handleSetPreferredAttestator = (attestatorAddress: string) => {
    signTransaction({
      preferredAttestatorToAdd: attestatorAddress,
    })
  }

  const handleUnsetPreferredAttestator = (attestatorAddress: string) => {
    signTransaction({
      preferredAttestatorToRemove: attestatorAddress,
    })
  }

  return (
    <div className='flex flex-col py-5 gap-2'>
      {attestations?.map(item => (
        <AttestationCard
          nftAddress={nft.id}
          onDelete={() => handleDeleteAttestation(item.id)}
          key={item.id}
          address={item.commentator}
          message={item.ipfsContent?.htmlContent || ''}
          date={dayjs(+item.createdAt * 1000).format('MMMM D, YYYY h:mm A')}
          onSetPreferredAttestator={() =>
            handleSetPreferredAttestator(item.commentator)
          }
          onUnsetPreferredAttestator={() => {
            handleUnsetPreferredAttestator(item.commentator)
          }}
          isPreferredAttestator={nft.preferredAttestators.includes(
            item.commentator
          )}
        />
      ))}
    </div>
  )
}

export default AttestationList
