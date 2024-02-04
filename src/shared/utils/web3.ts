import { ethers } from "ethers"

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
  addressB?: string | null,
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