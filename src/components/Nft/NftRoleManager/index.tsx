import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useNFTRoles from 'src/hooks/subgraph/useNFTRoles'
import { Roles } from 'src/shared/enums/roles'
import ExplorerLink from '../../common/ExplorerLink'
import Box from '../../ui/Box'
import { Table, TableCell, TableHeader, TableRow } from '../../ui/Table'
import GrantRoleForm from './GrantRoleForm'
import RevokeRoleButton from './RevokeRoleButton'

interface NftRoleManagerProps {
  nftAddress: string
}

const NftRoleManager: React.FC<NftRoleManagerProps> = ({ nftAddress }) => {
  const { nft } = useNFTRoles(nftAddress)
  const { t } = useTranslation('nft')

  const users = useMemo(() => {
    if (!nft) return

    const admins = nft.admins.map(admin => ({
      address: admin,
      role: t('roles.admin'),
      roleType: Roles.ADMIN,
    }))

    const editors = nft.editors.map(editor => ({
      address: editor,
      role: t('roles.editor'),
      roleType: Roles.EDITOR,
    }))

    return [...editors, ...admins]
  }, [nft, t])

  return (
    <Box>
      <Table mb={4}>
        <thead>
          <TableRow>
            <TableHeader p={2}>
              {t('roleManager.tableHead.address')}
            </TableHeader>
            <TableHeader p={2}>{t('roleManager.tableHead.role')}</TableHeader>
            <TableHeader p={2}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {users?.map(user => (
            <TableRow key={user.address + user.role}>
              <TableCell p={2}>
                <ExplorerLink type='address' hash={user.address}>
                  {user.address}
                </ExplorerLink>
              </TableCell>
              <TableCell width='30%' p={2}>
                {user.role}
              </TableCell>
              <TableCell p={2}>
                <RevokeRoleButton
                  from={user.address}
                  role={user.roleType}
                  nftAddress={nftAddress}
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <GrantRoleForm nftAddress={nftAddress} />
    </Box>
  )
}

export default NftRoleManager
