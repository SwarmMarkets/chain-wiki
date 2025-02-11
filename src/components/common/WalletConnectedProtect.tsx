import React from 'react'
import RoutePaths from 'src/shared/enums/routes-paths'
import { ChildrenProp } from 'src/shared/types/common-props'
import { useConnectionStatus } from '@thirdweb-dev/react'
import { Navigate } from 'react-router-dom'

type WalletConnectedProtectProps = ChildrenProp

const WalletConnectedProtect: React.FC<WalletConnectedProtectProps> = ({
  children,
}) => {
  const connected = useConnectionStatus()
  const isConnected = connected === 'connected'

  if (!isConnected) return <Navigate to={RoutePaths.CONNECT_WALLET} />

  return children
}

export default WalletConnectedProtect
