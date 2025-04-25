import { useSX1155NFT } from 'src/hooks/contracts/useSX1155NFT'
import { Roles } from 'src/shared/enums/roles'

const DEFAULT_ADMIN_ROLE = BigInt(
  '14021228976840725488525552479734472711044670502834235584757705851145082423405'
)

const EDITOR_ROLE = BigInt(
  '15295750152466503620906458519173777810506558812978484234968466519847000678044'
)

const rolesMapping = {
  [Roles.ADMIN]: DEFAULT_ADMIN_ROLE,
  [Roles.EDITOR]: EDITOR_ROLE,
}

const useNFTRoleManager = (nftAddress: string) => {
  const { call, txLoading } = useSX1155NFT(nftAddress)

  const grantRole = async (to: string, role: Roles): Promise<boolean> => {
    const roleToGrant = rolesMapping[role]

    try {
      await call('grantRole', [roleToGrant, to])
      return true
    } catch (err) {
      console.error('Failed to grant role:', err)
      return false
    }
  }

  const revokeRole = async (from: string, role: Roles): Promise<boolean> => {
    const roleToRevoke = rolesMapping[role]

    try {
      await call('revokeRole', [roleToRevoke, from])
      return true
    } catch (err) {
      console.error('Failed to revoke role:', err)
      return false
    }
  }

  return {
    grantRole,
    revokeRole,
    txLoading,
  }
}

export default useNFTRoleManager
