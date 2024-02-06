import React, { MouseEvent, useMemo } from 'react'
import { NftFullData } from '@src/shared/types/ipfs'
import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import {
  getExplorerUrl,
  getTextContentFromHtml,
  isSameEthereumAddress,
  limitString,
} from '@src/shared/utils'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import Text from '../ui/Text'
import styled, { useTheme } from 'styled-components'
import { shortenAddress, useAddress, useChainId } from '@thirdweb-dev/react'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
  project: NftFullData
  showRole?: boolean
}

const Title = styled(Text.h2)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ExplorerLink = styled(Link)`
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }
`

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  showRole = false,
}) => {
  const { t } = useTranslation(['errors', 'projects'])
  const theme = useTheme()
  const account = useAddress()
  const chainId = useChainId()

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

  const explorerUrl = useMemo(
    () =>
      getExplorerUrl({
        type: 'address',
        chainId,
        hash: project.id,
      }),
    [chainId, project.id]
  )

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

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
        <Flex flexDirection='column' alignItems='end' pt={10} $gap='5px'>
          <ExplorerLink
            onClick={handleLinkClick}
            target='_blank'
            to={explorerUrl}
          >
            {shortenAddress(project.id)}
          </ExplorerLink>
          {role && (
            <Text color={theme.palette.borderPrimary}>
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
