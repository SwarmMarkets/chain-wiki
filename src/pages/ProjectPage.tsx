import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import Content from '@src/components/Content'
import Editor from '@src/components/Editor'
import HtmlRender from '@src/components/HtmlRender'
import Tabs from '@src/components/ui/Tabs'
import Text from '@src/components/ui/Text'
import ArticleList from '@src/components/Article/ArticleList'
import { useTranslation } from 'react-i18next'
import useNFT from '@src/hooks/subgraph/useNFT'
import ProjectContentSkeleton from '@src/components/Project/ProjectContentSkeleton'
import ContentMissing from '@src/components/common/ContentMissing'
import { getExplorerUrl } from '@src/shared/utils'
import { useChainId } from '@thirdweb-dev/react'
import Flex from '@src/components/ui/Flex'
import Icon from '@src/components/ui/Icon'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import ProjectRoleManager from '@src/components/Project/ProjectRoleManager'
import HistoryProject from '@src/components/History/HistoryProject'
import TabContext from '@src/components/ui/Tabs/TabContext'
import TabPanel from '@src/components/ui/Tabs/TabPanel'
import Tab from '@src/components/ui/Tabs/Tab'
import { Tab as ITab } from '@src/shared/types/ui-components'
import { ProjectTabs } from '@src/shared/enums/tabs'

const ProjectWrapper = styled.div`
  display: flex;
  gap: 20px;
`

const ProjectContent = styled.div`
  max-width: 1052px;
  width: 100%;
`

const StyledContent = styled(Content)`
  width: 210px;
  margin-top: 20px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  position: sticky;
  top: 24px;
  contain: paint;
  box-sizing: border-box;
  max-height: calc(100vh - (24px * 2));
`

const ContentPlaceholder = styled.div`
  width: 210px;
  margin-top: 20px;
  word-wrap: break-word;
`

const ExplorerLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`

const ProjectPage = () => {
  const { projectId } = useParams()
  const chainId = useChainId()
  const theme = useTheme()
  const { t } = useTranslation('project')
  const { permissions } = useProjectPermissions(projectId)
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)
  const [activeProjectTab, setActiveProjectTab] = useState<string>(ProjectTabs.PROJECT)
  const { nft, loadingNft, refetchingNft } = useNFT(projectId || '')
  const explorerUrl = useMemo(
    () =>
      getExplorerUrl({
        type: 'address',
        chainId,
        hash: projectId,
      }),
    [chainId, projectId]
  )
  const contentRef = useRef<HTMLDivElement>(null)
  const showSkeleton = loadingNft && !refetchingNft

  const onMountContent = () => {
    setContentElem(contentRef?.current)
  }

  const onChangeProjectTab = (tab: ITab) => {
    setActiveProjectTab(tab.value)
  }

  return (
    <ProjectWrapper>
      {activeProjectTab === ProjectTabs.PROJECT && contentElem ? (
        <StyledContent contentElem={contentElem} />
      ) : (
        <ContentPlaceholder />
      )}
      <ProjectContent>
        {showSkeleton ? (
          <ProjectContentSkeleton />
        ) : (
          <>
            <Flex $gap='15px' alignItems='end'>
              <Text.h1 size={theme.fontSizes.large} weight={700}>
                {nft?.name}
              </Text.h1>
              <ExplorerLink target='_blank' to={explorerUrl}>
                <Flex $gap='3px' alignItems='end'>
                  <Icon name='externalLink' color={theme.palette.linkPrimary} />
                  <Text color={theme.palette.linkPrimary}>{projectId}</Text>
                </Flex>
              </ExplorerLink>
            </Flex>

            <TabContext value={activeProjectTab}>
              <Tabs onChange={onChangeProjectTab}>
                <Tab value={ProjectTabs.PROJECT} label={t('tabs.project')} />
                {permissions.canManageRoles && (
                  <Tab
                    value={ProjectTabs.MANAGE}
                    label={t('tabs.manageRoles')}
                  />
                )}
                <Tab value={ProjectTabs.ARTICLES} label={t('tabs.articles')} />
                {permissions.canUpdateContent && (
                  <Tab value={ProjectTabs.EDIT} label={t('tabs.edit')} />
                )}
                <Tab value={ProjectTabs.HISTORY} label={t('tabs.history')} />
              </Tabs>
              <TabPanel value={ProjectTabs.PROJECT}>
                {nft?.ipfsContent?.htmlContent ? (
                  <HtmlRender
                    onMount={onMountContent}
                    ref={contentRef}
                    html={nft.ipfsContent.htmlContent}
                  />
                ) : (
                  <ContentMissing message='Project content missing' />
                )}
              </TabPanel>
              <TabPanel value={ProjectTabs.ARTICLES}>
                <ArticleList
                  projectAddress={projectId!}
                  articles={nft?.tokens}
                />
              </TabPanel>
              <TabPanel value={ProjectTabs.EDIT}>
                <Editor
                  projectAddress={projectId!}
                  initialContent={nft?.ipfsContent?.htmlContent || ''}
                />
              </TabPanel>
              <TabPanel value={ProjectTabs.MANAGE}>
                <ProjectRoleManager projectAddress={projectId!} />
              </TabPanel>
              <TabPanel value={ProjectTabs.HISTORY}>
                <HistoryProject />
              </TabPanel>
            </TabContext>
          </>
        )}
      </ProjectContent>
    </ProjectWrapper>
  )
}

export default ProjectPage
