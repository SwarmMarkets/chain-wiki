import SafeApiKit from '@safe-global/api-kit'
import { useMemo } from 'react'
import { safeTxServiceUrl } from './safe-client'
import { useChainId } from '@thirdweb-dev/react'
import { arbitrumSepoliaChainConfig } from 'src/environment/networks'

const useSafeApiKit = () => {
  const chainId = useChainId()

  const apiKit = useMemo(() => {
    return new SafeApiKit({
      chainId: BigInt(chainId || arbitrumSepoliaChainConfig.chainId),
      txServiceUrl: safeTxServiceUrl,
    })
  }, [chainId])

  return apiKit
}

export default useSafeApiKit
