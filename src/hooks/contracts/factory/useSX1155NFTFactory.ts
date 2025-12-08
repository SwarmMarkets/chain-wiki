import { Abi } from 'thirdweb/utils'
import staticConfig from 'src/config'
import { SX1155NFTFactoryABI } from 'src/contracts/abis'
import useContract from 'src/hooks/web3/useContract'
import {
  DeployChainWikiParams,
  UpdateChainWikiSlugParams,
  deployChainWiki,
  updateChainWikiSlug,
  upgradeImplementation,
} from 'src/thirdweb/factory'

const useSX1155NFTFactory = () => {
  const { contract } = useContract(
    staticConfig.defaultNetworkEnv.contracts.sx1155NFTFactoryAddress,
    SX1155NFTFactoryABI as Abi
  )

  const prepareDeployChainWikiTx = (params: DeployChainWikiParams) => {
    if (!contract) return null

    const deployChainWikiTx = deployChainWiki({
      contract,
      ...params,
    })

    return deployChainWikiTx
  }

  const prepareUpdateChainWikiSlugTx = (params: UpdateChainWikiSlugParams) => {
    if (!contract) return null

    const deployChainWikiTx = updateChainWikiSlug({
      contract,
      ...params,
    })

    return deployChainWikiTx
  }

  const prepareUpgradeImplementationTx = (newImplementation: string) => {
    if (!contract) return null

    return upgradeImplementation({
      contract,
      newImplementation: newImplementation as '0x{string}',
    })
  }

  return {
    contract,
    prepareDeployChainWikiTx,
    prepareUpdateChainWikiSlugTx,
    prepareUpgradeImplementationTx,
  }
}

export default useSX1155NFTFactory
