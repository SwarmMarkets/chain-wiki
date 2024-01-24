import { ChildrenProp } from '@src/shared/types/common-props'
import { Permissions, usePermissions } from '../providers/PermissionProvider'

interface RequirePermissionsProps extends Partial<Permissions>, ChildrenProp {}

const RequirePermissions = ({ children, ...requiredPermissions }: RequirePermissionsProps) => {
  const { hasPermission } = usePermissions()

  const permissionKeys = Object.keys(requiredPermissions) as Array<keyof Permissions>
  const hasAllRequiredPermissions = permissionKeys.every(hasPermission)

  if (hasAllRequiredPermissions) {
    return children
  }

  return null
}

export default RequirePermissions
