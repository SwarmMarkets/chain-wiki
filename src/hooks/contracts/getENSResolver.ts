import { ethers } from 'ethers'
import { ENSResolver } from 'src/contracts/typechain'
import { ENSResolverABI } from 'src/contracts/abis'

export const getENSResolver = (
  address: string,
  signerOrProvider: ethers.Signer | ethers.providers.Provider
): ENSResolver => {
  return new ethers.Contract(
    address,
    ENSResolverABI,
    signerOrProvider
  ) as ENSResolver
}

export const getENSResolverInterface = () => {
  return new ethers.utils.Interface(ENSResolverABI)
}
