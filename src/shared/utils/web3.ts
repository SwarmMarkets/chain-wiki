import { ethers, PopulatedTransaction } from 'ethers'

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
  return staticConfig.supportedChains.some(chain => chain.id === chainId)
}

// Function to convert a string to a byte array and then hash it using keccak256
export const stringToByteArray = (str: string) => {
  // Convert the string to a byte array
  const bytes = ethers.utils.toUtf8Bytes(str)

  // Hash the byte array using keccak256
  const hashed = ethers.utils.keccak256(bytes)

  // Return the hashed value
  return hashed
}

import { TransactionBase } from '@safe-global/types-kit'
import staticConfig from 'src/config'
import { PreparedTransaction } from 'thirdweb'
import { resolvePromisedValue } from 'thirdweb/utils'

export const resolveThirdwebTransaction = async (
  thirdwebTx?: PreparedTransaction
): Promise<TransactionBase | null> => {
  if (!thirdwebTx) return null

  const to = await resolvePromisedValue(thirdwebTx.to)
  const data = await resolvePromisedValue(thirdwebTx.data)
  const value = await resolvePromisedValue(thirdwebTx.value)

  if (to && data) {
    return {
      to,
      data,
      value: value?.toString() || '',
    }
  }

  return null
}

export const resolveAllThirdwebTransactions = async (
  thirdwebTxs?: PreparedTransaction[]
): Promise<TransactionBase[]> => {
  if (!thirdwebTxs) return []
  const resolvedTxs = await Promise.all(
    thirdwebTxs.map(tx => resolveThirdwebTransaction(tx))
  )
  return resolvedTxs.filter(
    (tx): tx is TransactionBase => tx !== null && tx !== undefined
  )
}

export const resolveEthersPopulatedTransaction = async (
  ethersTx?: PopulatedTransaction
): Promise<TransactionBase | null> => {
  if (!ethersTx) return null

  const to = ethersTx.to
  const value = ethersTx.value?.toString() ?? ''
  const data = ethersTx.data

  if (to && data) {
    return {
      to,
      value,
      data,
    }
  }

  return null
}

export const resolveAllEthersPopulatedTransactions = async (
  ethersTxs?: PopulatedTransaction[]
): Promise<TransactionBase[]> => {
  if (!ethersTxs) return []
  const resolvedTxs = await Promise.all(
    ethersTxs.map(tx => resolveEthersPopulatedTransaction(tx))
  )
  return resolvedTxs.filter(
    (tx): tx is TransactionBase => tx !== null && tx !== undefined
  )
}

const { supportedChains } = staticConfig

export const checkChainSupported = (chainId?: number) =>
  supportedChains.some(chain => chainId === chain.id)

export const getActiveOrDefaultChain = (chainId?: number) =>
  supportedChains.find(chain => chainId === chain.id) ||
  staticConfig.defaultChain

export const getChainByName = (name: string) =>
  supportedChains.find(
    chain => chain.name?.toLowerCase() === name.toLowerCase()
  )

export const getChainById = (id: number) =>
  supportedChains.find(chain => chain.id === id)
