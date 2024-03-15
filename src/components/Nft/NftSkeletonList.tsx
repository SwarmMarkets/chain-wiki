import Grid from '../ui/Grid'
import NftSkeleton from './NftSkeleton'

const NftSkeletonList = () => {
  return (
    <Grid gap='20px' minColumnWidth='250px'>
      {[...new Array(20)].map((_, index) => (
        <NftSkeleton key={index} />
      ))}
    </Grid>
  )
}

export default NftSkeletonList
