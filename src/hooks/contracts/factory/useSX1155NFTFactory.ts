import { Abi } from 'thirdweb/utils'
import staticConfig from 'src/config'
import { SX1155NFTFactoryABI } from 'src/contracts/abis'
import useContract from 'src/hooks/web3/useContract'
import { DeployChainWikiParams, deployChainWiki } from 'src/thirdweb/factory'

const useSX1155NFTFactory = () => {
  const { contract } = useContract(
    staticConfig.defaultNetworkEnv.contracts.sx1155NFTFactoryAddress,
    SX1155NFTFactoryABI as Abi
  )
  const prepareDeployChainWikiTx = (params: DeployChainWikiParams) => {
    const deployChainWikiTx = deployChainWiki({
      contract,
      ...params,
    })

    return deployChainWikiTx
  }

  return { contract, prepareDeployChainWikiTx }
}

export default useSX1155NFTFactory
