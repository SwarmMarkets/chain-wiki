import { NFTsQueryFullData } from '@src/shared/types/ipfs'
import {
  getTextContentFromHtml,
  isSameEthereumAddress,
  limitString
} from '@src/shared/utils'
import { shortenAddress, useAddress } from '@thirdweb-dev/react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import ExternalLink from '../common/ExternalLink'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import Text from '../ui/Text'
import { StyledCard, Title } from './styled-components'

interface ProjectCardProps {
  project: NFTsQueryFullData
  showRole?: boolean
}

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
    <StyledCard minHeight='200px'>
      <Flex flexDirection='column' justifyContent='space-between' height='100%'>
        <div>
          <Flex alignItems='center' $gap='3px'>
            <Icon name='document' size={40} />
            <Title>{project.name}</Title>
          </Flex>
          {project.htmlContent && (
            <Text.p mt={10}>
              {limitString(getTextContentFromHtml(project.htmlContent), 300)}
            </Text.p>
          )}
        </div>
        {!project.htmlContent && (
          <Flex
            height='100%'
            flexDirection='column'
            $gap='5px'
            alignItems='center'
            justifyContent='center'
          >
            <Icon name='empty' size={60} color={theme.palette.gray} />
            <Text.p color={theme.palette.gray}>
              {t('project.contentNotFound')}
            </Text.p>
          </Flex>
        )}
        <Flex flexDirection='column' alignItems='end' pt={10} $gap='5px'>
          <ExternalLink type="address" hash={project.id}>
            {shortenAddress(project.id, false)}
          </ExternalLink>
          {role && (
            <Text color={theme.palette.borderPrimary}>
              {t('role', { ns: 'projects' })}
              {role}
            </Text>
          )}
        </Flex>
      </Flex>
    </StyledCard>
  )
}

export default ProjectCard
