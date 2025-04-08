import { useParams } from 'react-router-dom'

const useTokenIdParam = () => {
  const { nftId = '', tokenId = '' } = useParams()

  return `${nftId}-${tokenId}`
}

export default useTokenIdParam
