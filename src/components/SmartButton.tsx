import {
  useAddress,
  useChainId,
  useSetIsWalletModalOpen,
  useSetWalletModalConfig,
  useSwitchChain,
} from '@thirdweb-dev/react'
import React, { MouseEvent } from 'react'
import staticConfig from 'src/config'
import Button, { ButtonProps } from './ui-kit/Button/Button'

export interface SmartButtonProps extends ButtonProps {
  requireAccount?: boolean
  requireChain?: boolean
  desiredChainId?: number
}

const { defaultChain } = staticConfig

const SmartButton: React.FC<SmartButtonProps> = ({
  children,
  requireAccount = true,
  requireChain = true,
  onClick,
  disabled: disabledProp,
  desiredChainId,
  loading,
  ...rest
}) => {
  const account = useAddress()
  const activeChainId = useChainId()
  const setIsWalletModalOpen = useSetIsWalletModalOpen()
  const setWalletModalConfig = useSetWalletModalConfig()
  const switchNetwork = useSwitchChain()
  // Use the passed desiredChain prop if available; otherwise, fallback to defaultChain.
  const targetChainId = desiredChainId ?? defaultChain.chainId

  const needConnect = requireAccount && !account
  const needSwitch = requireChain && activeChainId !== targetChainId

  // If a connection or network switch is needed, ignore the passed disabled prop.
  const isDisabled = (!needConnect && !needSwitch && disabledProp) || loading

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (needConnect) {
      setWalletModalConfig({
        modalSize: 'compact',
        theme: 'light',
      })
      setIsWalletModalOpen(true)
      return
    }

    if (needSwitch) {
      await switchNetwork(targetChainId)
    }

    onClick?.(e)
  }

  const renderButtonContent = () => {
    if (needConnect) return 'Connect wallet'
    if (needSwitch) return 'Switch network'
    return children
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      loading={loading}
      {...rest}
    >
      {renderButtonContent()}
    </Button>
  )
}

export default SmartButton
