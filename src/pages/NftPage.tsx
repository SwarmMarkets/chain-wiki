import { useParams } from 'react-router-dom'
import NftContentSkeleton from 'src/components/Nft/NftContentSkeleton'
import { NftView } from 'src/components/Nft/NftView'
import useNFT from 'src/hooks/subgraph/useNFT'

const NftPage = () => {
  const { nftId = '' } = useParams()
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const showSkeleton = loadingNft && !refetchingNft

  return (
    <div>
      {showSkeleton ? (
        <NftContentSkeleton />
      ) : (
        <div className='w-full flex flex-col gap-4'>
          <h1 className='typo-heading1 text-main-accent'>{nft?.name}</h1>

          <NftView nft={nft} />
        </div>
      )}
    </div>
  )
}

export default NftPage
