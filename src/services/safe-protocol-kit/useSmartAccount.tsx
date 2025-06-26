import { SafeClient } from '@safe-global/sdk-starter-kit'
import { useQuery } from '@tanstack/react-query'
import { useActiveAccount } from 'thirdweb/react'
import { initSafeClient } from './safe-client'
import useActiveOrDefaultChain from 'src/hooks/web3/useActiveOrDefaultChain'

let safeClientInstance: SafeClient | null = null

const useSmartAccount = () => {
  const account = useActiveAccount()
  const { id: chainId } = useActiveOrDefaultChain()

  const { data: smartAccount, ...accountState } = useQuery({
    queryKey: ['safeClient', account, chainId],
    queryFn: async () => {
      if (!account || !chainId) return null

      if (safeClientInstance) {
        const isOwner = await safeClientInstance.isOwner(account.address)
        const clientChainId = await safeClientInstance.protocolKit.getChainId()
        if (isOwner && clientChainId === BigInt(chainId)) {
          return safeClientInstance
        }
      }

      const newClient = await initSafeClient(account.address, chainId)
      safeClientInstance = newClient
      return newClient
    },
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(account && chainId),
  })

  const { data: smartAccountInfo, ...infoState } = useQuery({
    queryKey: ['smartAccountAddress', account, chainId],
    queryFn: async () => {
      const address = await smartAccount?.getAddress()
      const isDeployed = await smartAccount?.isDeployed()
      return {
        address,
        isDeployed,
      }
    },
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(account && chainId && smartAccount),
  })

  return {
    smartAccountInfo,
    smartAccount,
    ...accountState,
    isLoading: infoState.isLoading || accountState.isLoading,
  }
}

export default useSmartAccount
