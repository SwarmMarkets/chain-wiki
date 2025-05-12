import { useParams } from 'react-router-dom'

const useFullTokenIdParam = () => {
  const { nftId = '', tokenId = '' } = useParams()

  if (!nftId || !tokenId) return ''

  return `${nftId}-${tokenId}`
}

export default useFullTokenIdParam
