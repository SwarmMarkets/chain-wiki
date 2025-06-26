import React from 'react'
import RoutePaths from 'src/shared/enums/routes-paths'
import { ChildrenProp } from 'src/shared/types/common-props'
import { Navigate } from 'react-router-dom'
import { useActiveWalletConnectionStatus } from 'thirdweb/react'

type WalletConnectedProtectProps = ChildrenProp

const WalletConnectedProtect: React.FC<WalletConnectedProtectProps> = ({
  children,
}) => {
  const status = useActiveWalletConnectionStatus()

  if (status === 'connecting' || status === 'unknown') return null

  if (status === 'connected') return children

  return <Navigate to={RoutePaths.CONNECT_WALLET} />
}

export default WalletConnectedProtect
