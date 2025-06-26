import { useConfigStore } from 'src/shared/store/config-store'
import { getActiveOrDefaultChain } from 'src/shared/utils'

const useActiveOrDefaultChain = () => {
  const { lastChainId } = useConfigStore()
  const defaultValue = getActiveOrDefaultChain(lastChainId)
  return defaultValue
}

export default useActiveOrDefaultChain
