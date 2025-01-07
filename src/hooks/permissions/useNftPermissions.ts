import { useAddress, useConnectionStatus } from '@thirdweb-dev/react'
import { useCallback, useMemo } from 'react'
import useNFTRoles from '../subgraph/useNFTRoles'
import { isSameEthereumAddress, unifyAddressToId } from 'src/shared/utils/web3'

export interface Permissions {
  canCreateNft: boolean
  canUpdateSettings: boolean
  canUpdateContent: boolean
  canCreateToken: boolean
  canManageRoles: boolean
  canCreateAttestation: boolean
  canDeleteAttestation: boolean
}

type HasPermissionsFunction = (permission: keyof Permissions) => boolean

const initialPermissions: Permissions = {
  canCreateNft: false,
  canUpdateSettings: false,
  canUpdateContent: false,
  canCreateToken: false,
  canManageRoles: false,
  canCreateAttestation: false,
  canDeleteAttestation: false,
}

const useNftPermissions = (nftAddress?: string) => {
  const address = nftAddress ? unifyAddressToId(nftAddress) : ''
  const { nft } = useNFTRoles(address)

  const account = useAddress()
  const connected = useConnectionStatus()

  const permissions: Permissions = useMemo(() => {
    const canCreateNft = connected === 'connected'

    if (!nft) {
      return {
        ...initialPermissions,
        canCreateNft,
      }
    }

    const isEditor = nft.editors.some(address =>
      isSameEthereumAddress(address, account)
    )
    const isAdmin = nft.admins.some(address =>
      isSameEthereumAddress(address, account)
    )

    return {
      canCreateNft: connected === 'connected',
      canManageRoles: isAdmin,
      canUpdateSettings: isAdmin,
      canUpdateContent: isEditor,
      canCreateToken: isEditor,
      canCreateAttestation: connected === 'connected',
      canDeleteAttestation: isEditor,
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

export default useNftPermissions
