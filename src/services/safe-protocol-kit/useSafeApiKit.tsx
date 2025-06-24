import SafeApiKit from '@safe-global/api-kit'
import { useMemo } from 'react'
import { safeTxServiceUrl } from './safe-client'
import { arbitrumSepoliaChainConfig } from 'src/environment/networks/arbitrum-sepolia'
import useActiveOrDefaultChain from 'src/hooks/web3/useActiveOrDefaultChain'
const useSafeApiKit = () => {
  const chain = useActiveOrDefaultChain()

  const apiKit = useMemo(() => {
    return new SafeApiKit({
      chainId: BigInt(chain.id || arbitrumSepoliaChainConfig.id),
      txServiceUrl: safeTxServiceUrl,
    })
  }, [chain.id])

  return apiKit
}

export default useSafeApiKit
