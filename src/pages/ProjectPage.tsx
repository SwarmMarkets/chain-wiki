import ArticleList from '@src/components/Article/ArticleList'
import Editor from '@src/components/Editor'
import HistoryProject from '@src/components/History/HistoryProject'
import HtmlRender from '@src/components/HtmlRender'
import ProjectContentSkeleton from '@src/components/Project/ProjectContentSkeleton'
import ProjectRoleManager from '@src/components/Project/ProjectRoleManager'
import {
  ContentPlaceholder,
  InnerContainer,
  StyledContent,
  Wrapper,
} from '@src/components/Project/styled-components'
import ContentMissing from '@src/components/common/ContentMissing'
import ExplorerLink from '@src/components/common/ExplorerLink'
import Flex from '@src/components/ui/Flex'
import Tabs from '@src/components/ui/Tabs'
import Tab from '@src/components/ui/Tabs/Tab'
import TabContext from '@src/components/ui/Tabs/TabContext'
import TabPanel from '@src/components/ui/Tabs/TabPanel'
import Text from '@src/components/ui/Text'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import useNFT from '@src/hooks/subgraph/useNFT'
import { ProjectTabs } from '@src/shared/enums/tabs'
import { Tab as ITab } from '@src/shared/types/ui-components'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'

const ProjectPage = () => {
  const { projectId } = useParams()
  const theme = useTheme()
  const { t } = useTranslation('project')
  const { permissions } = useProjectPermissions(projectId)
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)
  const [activeProjectTab, setActiveProjectTab] = useState<string>(
    ProjectTabs.PROJECT
  )
  const { nft, loadingNft, refetchingNft } = useNFT(projectId || '')

  const contentRef = useRef<HTMLDivElement>(null)
  const showSkeleton = loadingNft && !refetchingNft

  const onMountContent = () => {
    setContentElem(contentRef?.current)
  }

  const onChangeProjectTab = (tab: ITab) => {
    setActiveProjectTab(tab.value)
  }

  const handleSuccessUpdate = () => {
    setActiveProjectTab(ProjectTabs.PROJECT)
  }

  return (
    <Wrapper>
      <InnerContainer>
        {showSkeleton ? (
          <ProjectContentSkeleton />
        ) : (
          <>
            <Flex $gap='15px' alignItems='end'>
              <Text.h1 size={theme.fontSizes.large} weight={700}>
                {nft?.name}
              </Text.h1>
              <ExplorerLink type='address' hash={projectId}>
                {projectId}
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
                {nft?.htmlContent ? (
                  <HtmlRender
                    onMount={onMountContent}
                    ref={contentRef}
                    html={nft.htmlContent}
                  />
                ) : (
                  <ContentMissing message='Project content missing' />
                )}
              </TabPanel>
              <TabPanel value={ProjectTabs.ARTICLES}>
                <ArticleList projectAddress={projectId!} />
              </TabPanel>
              <TabPanel value={ProjectTabs.EDIT}>
                <Editor
                  onSuccessUpdate={handleSuccessUpdate}
                  projectAddress={projectId!}
                  initialContent={nft?.htmlContent || ''}
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
      </InnerContainer>
      {activeProjectTab === ProjectTabs.PROJECT && contentElem ? (
        <StyledContent contentElem={contentElem} />
      ) : (
        <ContentPlaceholder />
      )}
    </Wrapper>
  )
}

export default ProjectPage
