import { useTranslation } from 'react-i18next'
import useNFTRoleManager from './useNFTRoleManager'
import { Roles } from 'src/shared/enums/roles'
import { useAddress } from '@thirdweb-dev/react'
import { isSameEthereumAddress } from 'src/shared/utils'
import Button from 'src/components/ui-kit/Button/Button'

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
  const { t } = useTranslation('nft', { keyPrefix: 'settings.roleManager.actions' })
  const { revokeRole, txLoading } = useNFTRoleManager(nftAddress)
  const account = useAddress()

  if (role === Roles.ADMIN && isSameEthereumAddress(account, from)) return null

  return (
    <Button
      onClick={() => revokeRole(from, role)}
      loading={txLoading}
      className='w-full'
    >
      {t('revokeRole')}
    </Button>
  )
}

export default RevokeRoleButton
