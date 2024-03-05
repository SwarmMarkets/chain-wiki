import { supportedChains } from '@src/environment/networks'
import { ethers } from 'ethers'

export const unifyAddressToId = (address: string) => {
  return address.toLowerCase()
}

export const unifyAddress = (address: string) => {
  try {
    return ethers.utils.getAddress(address.replace('×', 'x').toLowerCase())
  } catch {
    return address
  }
}

export const isSameEthereumAddress = (
  addressA?: string | null,
  addressB?: string | null
): boolean => {
  if (
    addressA === null ||
    addressB === null ||
    addressA === undefined ||
    addressB === undefined
  ) {
    return false
  }

  try {
    return (
      ethers.utils.getAddress(unifyAddress(addressA)) ===
      ethers.utils.getAddress(unifyAddress(addressB))
    )
  } catch {
    return false
  }
}

export const checkNetworkSupported = (chainId?: number) => {
  return supportedChains.some(chain => chain.chainId === chainId)
}

// Function to convert a string to a byte array and then hash it using keccak256
export const stringToByteArray = (str: string) => {
  // Convert the string to a byte array
  const bytes = ethers.utils.toUtf8Bytes(str);

  // Hash the byte array using keccak256
  const hashed = ethers.utils.keccak256(bytes);

  // Return the hashed value
  return hashed;
}