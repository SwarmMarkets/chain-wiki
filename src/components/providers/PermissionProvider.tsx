/* eslint-disable react-refresh/only-export-components */
import { ChildrenProp } from '@src/shared/types/common-props'
import { useConnectionStatus } from '@thirdweb-dev/react'
import { createContext, useCallback, useContext, useMemo } from 'react'

export interface Permissions {
  canCreateProject: boolean
}

type HasPermissionsFunction = (permission: keyof Permissions) => boolean

interface PermissionContextType {
  hasPermission: HasPermissionsFunction
  permissions: Permissions
}

export const PermissionContext = createContext<PermissionContextType>({
  hasPermission: () => {
    throw new Error("Can't call tokenToXToken outside of DOTCContextProvider")
  },
  permissions: {
    canCreateProject: false
  }
})

export const PermissionsProvider = ({ children }: ChildrenProp) => {
  const connected = useConnectionStatus()

  const permissions = useMemo(
    () => ({
      canCreateProject: connected === 'connected'
    }),
    [connected]
  )

  const hasPermission: HasPermissionsFunction = useCallback(
    (permission: keyof Permissions) => {
      return permissions[permission]
    },
    [permissions]
  )

  const value = useMemo(
    () => ({
      permissions,
      hasPermission
    }),
    [hasPermission, permissions]
  )

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>
}

export const usePermissions = () => useContext(PermissionContext)
