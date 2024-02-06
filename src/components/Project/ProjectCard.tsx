import React, { useMemo } from 'react'
import { NftFullData } from '@src/shared/types/ipfs'
import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import {
  getTextContentFromHtml,
  isSameEthereumAddress,
  limitString,
} from '@src/shared/utils'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import Text from '../ui/Text'
import styled, { useTheme } from 'styled-components'
import { useAddress } from '@thirdweb-dev/react'

interface ProjectCardProps {
  project: NftFullData
  showRole?: boolean
}

const Title = styled(Text.h2)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  showRole = false,
}) => {
  const { t } = useTranslation(['errors', 'projects'])
  const theme = useTheme()
  const account = useAddress()

  const role = useMemo(() => {
    if (!showRole) return
    const isEditor = project.editors.some(address =>
      isSameEthereumAddress(address, account)
    )
    if (isEditor) {
      return t('filter.editor', { ns: 'projects' })
    }
    const isIssuer = project.issuers.some(address =>
      isSameEthereumAddress(address, account)
    )
    if (isIssuer) {
      return t('filter.issuer', { ns: 'projects' })
    }
    const isAdmin = project.admins.some(address =>
      isSameEthereumAddress(address, account)
    )
    if (isAdmin) {
      return t('filter.admin', { ns: 'projects' })
    }
  }, [account, project.admins, project.editors, project.issuers, t, showRole])

  return (
    <Card height='200px'>
      <Flex flexDirection='column' justifyContent='space-between' height='100%'>
        <div>
          <Flex alignItems='center' $gap='3px'>
            <Icon name='document' size={40} />
            <Title>{project.name}</Title>
          </Flex>
          <Text.p mt={10}>
            {project.htmlContent
              ? limitString(getTextContentFromHtml(project.htmlContent), 300)
              : t('project.descriptionNotFound')}
          </Text.p>
        </div>
        <Flex justifyContent='end'>
          {role && (
            <Text color={theme.palette.borderPrimary} pt='10px'>
              {t('role', { ns: 'projects' })}
              {role}
            </Text>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}

export default ProjectCard
