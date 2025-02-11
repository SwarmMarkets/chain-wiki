import { useAddress, useConnectionStatus } from '@thirdweb-dev/react'
import { useCallback, useMemo } from 'react'
import useNFTRoles from '../subgraph/useNFTRoles'
import { isSameEthereumAddress, unifyAddressToId } from 'src/shared/utils/web3'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'

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
  const { nft, loadingNft, refetchingNft } = useNFTRoles(address)

  const account = useAddress()
  const { smartAccountInfo, isLoading: isSmartAccountLoading } =
    useSmartAccount()
  const connected = useConnectionStatus()

  const getPermissionsByAddress = useCallback(
    (accountAddress?: string) => {
      if (!accountAddress) return initialPermissions

      const canCreateNft = connected === 'connected'

      if (!nft) {
        return {
          ...initialPermissions,
          canCreateNft,
        }
      }

      const isEditor = nft.editors.some(address =>
        isSameEthereumAddress(address, accountAddress)
      )
      const isAdmin = nft.admins.some(address =>
        isSameEthereumAddress(address, accountAddress)
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
    },
    [connected, nft]
  )

  const permissions: Permissions = useMemo(() => {
    return getPermissionsByAddress(account)
  }, [account, getPermissionsByAddress])

  const smartAccountPermissions = useMemo(() => {
    return getPermissionsByAddress(smartAccountInfo?.address)
  }, [getPermissionsByAddress, smartAccountInfo?.address])

  const hasPermission: HasPermissionsFunction = useCallback(
    (permission: keyof Permissions) => {
      return permissions[permission]
    },
    [permissions]
  )

  return {
    permissions,
    smartAccountPermissions,
    hasPermission,
    loading: (loadingNft && !refetchingNft) || isSmartAccountLoading,
  }
}

export default useNftPermissions
