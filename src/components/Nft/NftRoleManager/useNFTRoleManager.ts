import useSX1155NFT from 'src/hooks/contracts/nft/useSX1155NFT'
import useSendTx from 'src/hooks/web3/useSendTx'
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
  const { prepareGrantRoleTx, prepareRevokeRoleTx } = useSX1155NFT(nftAddress)
  const { sendTx, isPending } = useSendTx()

  const grantRole = async (to: string, role: Roles): Promise<boolean> => {
    const roleToGrant = rolesMapping[role]

    try {
      const tx = prepareGrantRoleTx({
        account: to,
        role: roleToGrant,
      })
      const result = await sendTx(tx)

      if (result?.status === 'success') {
        return true
      } else {
        throw new Error('Failed to grant role')
      }
    } catch (err) {
      console.error('Failed to grant role:', err)
      return false
    }
  }

  const revokeRole = async (from: string, role: Roles): Promise<boolean> => {
    const roleToRevoke = rolesMapping[role]

    try {
      const tx = prepareRevokeRoleTx({
        account: from,
        role: roleToRevoke,
      })
      const result = await sendTx(tx)

      if (result?.status === 'success') {
        return true
      } else {
        throw new Error('Failed to revoke role')
      }
    } catch (err) {
      console.error('Failed to revoke role:', err)
      return false
    }
  }

  return {
    grantRole,
    revokeRole,
    txLoading: isPending,
  }
}

export default useNFTRoleManager
