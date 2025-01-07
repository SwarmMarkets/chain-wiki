import useNftPermissions, {
  Permissions,
} from 'src/hooks/permissions/useNftPermissions'
import { ChildrenProp } from 'src/shared/types/common-props'

interface RequirePermissionsProps extends Partial<Permissions>, ChildrenProp {
  nftAddress?: string
}

const RequirePermissions = ({
  children,
  nftAddress,
  ...requiredPermissions
}: RequirePermissionsProps) => {
  const { hasPermission } = useNftPermissions(nftAddress)

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
