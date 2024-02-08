import LoadingButton from '@src/components/ui/Button/LoadingButton'
import { useTranslation } from 'react-i18next'
import useNFTRoleManager from './useNFTRoleManager'
import { Roles } from '@src/shared/enums/roles'

interface RevokeRoleButtonProps {
  from: string
  role: Roles
  projectAddress: string
}

const RevokeRoleButton: React.FC<RevokeRoleButtonProps> = ({
  from,
  role,
  projectAddress,
}) => {
  const { t } = useTranslation('project', { keyPrefix: 'roleManager.actions' })
  const { revokeRole, txLoading } = useNFTRoleManager(projectAddress)

  if (role === Roles.ADMIN) return null

  return (
    <LoadingButton onClick={() => revokeRole(from, role)} loading={txLoading}>
      {t('revokeRole')}
    </LoadingButton>
  )
}

export default RevokeRoleButton
