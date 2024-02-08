import useNFTRoles from '@src/hooks/subgraph/useNFTRoles'
import { Table, TableRow, TableHeader, TableCell } from '../../ui/Table'
import Text from '../../ui/Text'
import { useTranslation } from 'react-i18next'
import Box from '../../ui/Box'
import { StyledRolesDescription } from '../styled-components'
import { useMemo } from 'react'
import ExplorerLink from '../../common/ExplorerLink'

interface ProjectRoleManagerProps {
  projectAddress: string
}

const ProjectRoleManager: React.FC<ProjectRoleManagerProps> = ({
  projectAddress,
}) => {
  const { nft } = useNFTRoles(projectAddress)
  const { t } = useTranslation('project')

  const users = useMemo(() => {
    if (!nft) return

    const admins = nft.admins.map(admin => ({
      address: admin,
      role: t('roles.admin')
    }))

    const editors = nft.editors.map(editor => ({
      address: editor,
      role: t('roles.admin')
    }))

    const issuers = nft.issuers.map(issuer => ({
      address: issuer,
      role: t('roles.admin')
    }))

    return [...issuers, ...editors, ...admins]
  }, [nft, t])

  return (
    <Box>
      <Text.h2 mb={3}>{t('roleManager.title')}</Text.h2>
      <StyledRolesDescription mb={3}>
        {t('roleManager.description')}
      </StyledRolesDescription>
      <Table mb={4}>
        <thead>
          <TableRow>
            <TableHeader p={2}>{t('roleManager.tableHead.address')}</TableHeader>
            <TableHeader p={2}>{t('roleManager.tableHead.role')}</TableHeader>
            <TableHeader p={2}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {users?.map(user => 
            <TableRow>
              <TableCell p={2}>    
              <ExplorerLink type="address" hash={projectAddress}>
                {projectAddress}
              </ExplorerLink>
              </TableCell>
              <TableCell width="30%" p={2}>{user.role}</TableCell>
              <TableCell p={2}>
                Actions
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </Box>
  )
}

export default ProjectRoleManager
