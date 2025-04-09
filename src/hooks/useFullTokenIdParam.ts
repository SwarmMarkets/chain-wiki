import { useParams } from 'react-router-dom'

const useFullTokenIdParam = () => {
  const { nftId = '', tokenId = '' } = useParams()

  return `${nftId}-${tokenId}`
}

export default useFullTokenIdParam
