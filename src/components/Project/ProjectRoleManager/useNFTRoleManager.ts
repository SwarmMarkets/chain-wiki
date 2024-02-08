import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import { Roles } from '@src/shared/enums/roles'

const useNFTRoleManager = (nftAddress: string) => {
  const { call, txLoading } = useSX1155NFT(nftAddress)

  const grantRole = (to: string, role: Roles) => {
    if (role === 'agent') {
      call('grantAgentRole', [to])
    }
    if (role === 'editor') {
      call('grantEditorRole', [to])
    }
    if (role === 'issuer') {
      call('grantIssuerRole', [to])
    }
  }

  const revokeRole = (from: string, role: Roles) => {
    if (role === 'agent') {
      call('revokeAgentRole', [from])
    }
    if (role === 'editor') {
      call('revokeEditorRole', [from])
    }
    if (role === 'issuer') {
      call('revokeIssuerRole', [from])
    }
  }

  return {
    grantRole,
    revokeRole,
    txLoading,
  }
}

export default useNFTRoleManager
