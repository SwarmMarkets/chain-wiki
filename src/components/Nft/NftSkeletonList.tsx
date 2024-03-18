import NftSkeleton from './NftSkeleton'

interface NftSkeletonListProps {
  skeletonLength?: number
}

const NftSkeletonList: React.FC<NftSkeletonListProps> = ({
  skeletonLength = 20,
}) => {
  return [...new Array(skeletonLength)].map((_, index) => (
    <NftSkeleton key={index} />
  ))
}

export default NftSkeletonList
