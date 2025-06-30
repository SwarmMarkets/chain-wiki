import {
  useActiveAccount,
  useActiveWalletChain,
  useConnectModal,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'
import React, { MouseEvent } from 'react'
import Button, { ButtonProps } from './ui-kit/Button/Button'
import { useTranslation } from 'react-i18next'
import { Chain } from 'thirdweb'
import staticConfig from 'src/config'
import { thirdwebCommonConnectConfig } from 'src/config/thirdweb'

export interface SmartButtonProps extends ButtonProps {
  requireAccount?: boolean
  requireChain?: boolean
  desiredChain?: Chain
}

const { defaultChain } = staticConfig

const SmartButton: React.FC<SmartButtonProps> = ({
  children,
  requireAccount = true,
  requireChain = true,
  onClick,
  disabled: disabledProp,
  desiredChain,
  loading,
  ...rest
}) => {
  const { t } = useTranslation('connectWallet')
  const account = useActiveAccount()
  const activeChain = useActiveWalletChain()
  const { connect } = useConnectModal()
  const switchNetwork = useSwitchActiveWalletChain()

  // Use the passed desiredChain prop if available; otherwise, fallback to defaultChain.
  const targetChain = desiredChain ?? defaultChain

  const needConnect = requireAccount && !account
  const needSwitch = requireChain && activeChain?.id !== targetChain.id

  // If a connection or network switch is needed, ignore the passed disabled prop.
  const isDisabled = (!needConnect && !needSwitch && disabledProp) || loading

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (needConnect) {
      e.preventDefault()
      connect({ ...thirdwebCommonConnectConfig, size: 'compact' })
      return
    }

    if (needSwitch) {
      e.preventDefault()
      await switchNetwork(targetChain)
      return
    }

    onClick?.(e)
  }

  const renderButtonContent = () => {
    if (needConnect) return t('connectWalletToComment')
    if (needSwitch) return t('switchNetwork')
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
