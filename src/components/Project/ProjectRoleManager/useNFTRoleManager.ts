import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import { Roles } from '@src/shared/enums/roles'
import { stringToByteArray } from '@src/shared/utils'
import { getRoleHash } from '@thirdweb-dev/sdk'


const DEFAULT_ADMIN_ROLE_BYTES = getRoleHash('admin')

const EDITOR_ROLE_BYTES = stringToByteArray(
  'EDITOR_ROLE',
)

const rolesMapping = {
  [Roles.ADMIN]: DEFAULT_ADMIN_ROLE_BYTES,
  [Roles.EDITOR]: EDITOR_ROLE_BYTES
}

const useNFTRoleManager = (nftAddress: string) => {
  const { call, txLoading } = useSX1155NFT(nftAddress)

  const grantRole = (to: string, role: Roles) => {
    const roleToGrant = rolesMapping[role]

    call('grantRole', [roleToGrant, to])
  }

  const revokeRole = (from: string, role: Roles) => {
    const roleToRevoke = rolesMapping[role]

    call('grantRole', [roleToRevoke, from])
  }

  return {
    grantRole,
    revokeRole,
    txLoading,
  }
}

export default useNFTRoleManager
