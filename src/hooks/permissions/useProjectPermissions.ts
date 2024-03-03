import { useAddress, useConnectionStatus } from '@thirdweb-dev/react'
import { useCallback, useMemo } from 'react'
import useNFTRoles from '../subgraph/useNFTRoles'
import { isSameEthereumAddress, unifyAddressToId } from '@src/shared/utils/web3'

export interface Permissions {
  canCreateProject: boolean
  canUpdateContent: boolean
  canCreateArticle: boolean
  canManageRoles: boolean
}

type HasPermissionsFunction = (permission: keyof Permissions) => boolean

const initialPermissions: Permissions = {
  canCreateProject: false,
  canUpdateContent: false,
  canCreateArticle: false,
  canManageRoles: false,
}

const useProjectPermissions = (projectAddress?: string) => {
  const address = projectAddress ? unifyAddressToId(projectAddress) : ''
  const { nft } = useNFTRoles(address)

  const account = useAddress()
  const connected = useConnectionStatus()

  const permissions: Permissions = useMemo(() => {
    const canCreateProject = connected === 'connected'

    if (!nft) {
      return {
        ...initialPermissions,
        canCreateProject,
      }
    }

    const isEditor = nft.editors.some(address =>
      isSameEthereumAddress(address, account)
    )
    const isAdmin = nft.admins.some(address =>
      isSameEthereumAddress(address, account)
    )

    return {
      canCreateProject: connected === 'connected',
      canManageRoles: isAdmin,
      canUpdateContent: isEditor,
      canCreateArticle: isEditor,
    }
  }, [account, connected, nft])

  const hasPermission: HasPermissionsFunction = useCallback(
    (permission: keyof Permissions) => {
      return permissions[permission]
    },
    [permissions]
  )

  return {
    permissions,
    hasPermission,
  }
}

export default useProjectPermissions
