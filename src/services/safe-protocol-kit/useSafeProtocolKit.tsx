import useSmartAccount from './useSmartAccount'

const useProtocolKit = () => {
  const { smartAccount, ...rest } = useSmartAccount()
  return {
    protocolKit: smartAccount?.protocolKit,
    ...rest,
  }
}

export default useProtocolKit
