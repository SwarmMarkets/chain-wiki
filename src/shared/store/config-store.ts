import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import staticConfig from 'src/config'

interface ConfigStore {
  lastChainId: number
  setLastChainId: (chainId: number) => void
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    set => ({
      lastChainId: staticConfig.defaultChain.id,
      setLastChainId: chainId =>
        set(() => ({
          lastChainId: chainId,
        })),
    }),
    {
      name: 'last-chain-id',
    }
  )
)
