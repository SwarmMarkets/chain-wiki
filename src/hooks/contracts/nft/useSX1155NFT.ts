import { Abi } from 'thirdweb/utils'
import useContract from '../../web3/useContract'
import { SX1155NFTABI } from 'src/contracts/abis'
import {
  deleteAttestation,
  DeleteAttestationParams,
  grantRole,
  GrantRoleParams,
  makeAttestation,
  MakeAttestationParams,
  mint,
  mintBatch,
  MintBatchParams,
  MintParams,
  revokeRole,
  setContractKya,
  SetContractKyaParams,
  setContractSlug,
  SetContractSlugParams,
  setTokenKya,
  SetTokenKyaParams,
  updateTokenSlug,
  UpdateTokenSlugParams,
} from 'src/thirdweb/nft'

const useSX1155NFT = (contractAddress: string) => {
  const { contract } = useContract(contractAddress, SX1155NFTABI as Abi)

  const prepareMintTx = (params: MintParams) => {
    const mintTx = mint({ contract, ...params })
    return mintTx
  }

  const prepareMintBatchTx = (params: MintBatchParams) => {
    const mintTx = mintBatch({ contract, ...params })
    return mintTx
  }

  const prepareDeletteAttestationTx = (params: DeleteAttestationParams) => {
    const tx = deleteAttestation({ contract, ...params })
    return tx
  }

  const prepareGrantRoleTx = (params: GrantRoleParams) => {
    const tx = grantRole({ contract, ...params })
    return tx
  }

  const prepareRevokeRoleTx = (params: GrantRoleParams) => {
    const tx = revokeRole({ contract, ...params })
    return tx
  }

  const prepareMakeAttestationTx = (params: MakeAttestationParams) => {
    const tx = makeAttestation({ contract, ...params })
    return tx
  }

  const prepareSetContractKyaTx = (params: SetContractKyaParams) => {
    const tx = setContractKya({ contract, ...params })
    return tx
  }

  const prepareSetTokenKyaTx = (params: SetTokenKyaParams) => {
    const tx = setTokenKya({ contract, ...params })
    return tx
  }

  const prepareSetContractSlugTx = (params: SetContractSlugParams) => {
    const tx = setContractSlug({ contract, ...params })
    return tx
  }

  const prepareUpdateTokenSlugTx = (params: UpdateTokenSlugParams) => {
    const tx = updateTokenSlug({ contract, ...params })
    return tx
  }

  return {
    contract,
    prepareMintTx,
    prepareDeletteAttestationTx,
    prepareGrantRoleTx,
    prepareRevokeRoleTx,
    prepareMakeAttestationTx,
    prepareMintBatchTx,
    prepareSetContractKyaTx,
    prepareSetTokenKyaTx,
    prepareSetContractSlugTx,
    prepareUpdateTokenSlugTx,
  }
}

export default useSX1155NFT
