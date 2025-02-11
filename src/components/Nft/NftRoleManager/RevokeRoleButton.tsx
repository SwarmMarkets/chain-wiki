import LoadingButton from 'src/components/ui/Button/LoadingButton'
import { useTranslation } from 'react-i18next'
import useNFTRoleManager from './useNFTRoleManager'
import { Roles } from 'src/shared/enums/roles'
import { useAddress } from '@thirdweb-dev/react'
import { isSameEthereumAddress } from 'src/shared/utils'

interface RevokeRoleButtonProps {
  from: string
  role: Roles
  nftAddress: string
}

const RevokeRoleButton: React.FC<RevokeRoleButtonProps> = ({
  from,
  role,
  nftAddress,
}) => {
  const { t } = useTranslation('nft', { keyPrefix: 'roleManager.actions' })
  const { revokeRole, txLoading } = useNFTRoleManager(nftAddress)
  const account = useAddress()

  if (role === Roles.ADMIN && isSameEthereumAddress(account, from)) return null

  return (
    <LoadingButton
      py={2}
      onClick={() => revokeRole(from, role)}
      loading={txLoading}
    >
      {t('revokeRole')}
    </LoadingButton>
  )
}

export default RevokeRoleButton
