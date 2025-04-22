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

  const grantRole = (to: string, role: Roles) => {
    const roleToGrant = rolesMapping[role]

    call('grantRole', [roleToGrant, to])
  }

  const revokeRole = (from: string, role: Roles) => {
    const roleToRevoke = rolesMapping[role]

    call('revokeRole', [roleToRevoke, from])
  }

  return {
    grantRole,
    revokeRole,
    txLoading,
  }
}

export default useNFTRoleManager
