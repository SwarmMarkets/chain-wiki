import { isAddress } from 'ethers/lib/utils'

export const isFullTokenId = (tokenId: string) => {
  const parts = tokenId.split('-')
  if (parts.length !== 2) {
    return false
  }

  return isAddress(parts[0])
}

export const splitTokenId = (tokenId: string) => {
  const parts = tokenId.split('-')
  if (!isFullTokenId(tokenId)) {
    throw new Error(
      'Incorrect tokenId format. The expected format is {nftId}-{tokenId}'
    )
  }
  return { nftId: parts[0], tokenId: parts[1] }
}
