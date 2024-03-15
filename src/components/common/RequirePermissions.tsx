import useNftPermissions, {
  Permissions,
} from '@src/hooks/permissions/useNftPermissions'
import { ChildrenProp } from '@src/shared/types/common-props'

interface RequirePermissionsProps extends Partial<Permissions>, ChildrenProp {
  projectAddress?: string
}

const RequirePermissions = ({
  children,
  projectAddress,
  ...requiredPermissions
}: RequirePermissionsProps) => {
  const { hasPermission } = useNftPermissions(projectAddress)

  const permissionKeys = Object.keys(requiredPermissions) as Array<
    keyof Permissions
  >
  const hasAllRequiredPermissions = permissionKeys.every(hasPermission)

  if (hasAllRequiredPermissions) {
    return children
  }

  return null
}

export default RequirePermissions
