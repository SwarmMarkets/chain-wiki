import { SX1155NFTABI } from '@src/contracts/abis';
import { useWeb3Contract } from '../web3/useWeb3Contract';
import { SX1155NFT } from '@src/contracts/typechain';

export const useSX1155NFT = (address: string) => {
  const web3Contract = useWeb3Contract<SX1155NFT>(address, SX1155NFTABI)
  return web3Contract
}