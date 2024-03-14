import ArticleList from '@src/components/Article/ArticleList'
import Editor from '@src/components/Editor'
import HistoryProject from '@src/components/History/HistoryProject'
import ProjectContentSkeleton from '@src/components/Project/ProjectContentSkeleton'
import ProjectRoleManager from '@src/components/Project/ProjectRoleManager'
import { ProjectView } from '@src/components/Project/ProjectView'
import {
  StyledIndexPages,
  StyledContent,
} from '@src/components/Project/styled-components'
import ExplorerLink from '@src/components/common/ExplorerLink'
import Box from '@src/components/ui/Box'
import Flex from '@src/components/ui/Flex'
import Tabs from '@src/components/ui/Tabs'
import Tab from '@src/components/ui/Tabs/Tab'
import TabContext from '@src/components/ui/Tabs/TabContext'
import TabPanel from '@src/components/ui/Tabs/TabPanel'
import Text from '@src/components/ui/Text'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import useNFT from '@src/hooks/subgraph/useNFT'
import useTokens from '@src/hooks/subgraph/useTokens'
import { ProjectTabs } from '@src/shared/enums/tabs'
import { Tab as ITab } from '@src/shared/types/ui-components'
import { unifyAddressToId } from '@src/shared/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'

const ProjectPage = () => {
  const { projectId = '' } = useParams()
  const theme = useTheme()
  const { t } = useTranslation('project')
  const { permissions } = useProjectPermissions(projectId)
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)
  const [activeProjectTab, setActiveProjectTab] = useState<string>(
    ProjectTabs.PROJECT
  )
  const { nft, loadingNft, refetchingNft } = useNFT(projectId)
  const { fullTokens, loading: tokensLoading } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(projectId) } },
    },
    { fetchFullData: true }
  )
  const showSkeleton = loadingNft && !refetchingNft
  const isProjectTab = activeProjectTab === ProjectTabs.PROJECT
  const allLoaded = nft && fullTokens

  const onMountContent = (element: HTMLDivElement) => {
    setContentElem(element)
  }

  const onChangeProjectTab = (tab: ITab) => {
    setActiveProjectTab(tab.value)
  }

  const handleSuccessUpdate = () => {
    setActiveProjectTab(ProjectTabs.PROJECT)
  }

  if (showSkeleton) {
    return (
      <Flex justifyContent='center' $gap='20px'>
        <Box width='900px'>
          <ProjectContentSkeleton />
        </Box>
      </Flex>
    )
  }

  return (
    <Flex
      justifyContent={isProjectTab && allLoaded ? 'space-between' : 'center'}
      $gap='20px'
    >
      {activeProjectTab === ProjectTabs.PROJECT && nft && (
        <StyledIndexPages
          articles={fullTokens}
          project={nft}
          indexPages={nft.ipfsContent?.indexPages}
        />
      )}
      <Box width='900px'>
        <Flex $gap='15px' flexDirection='column'>
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
              <Tab value={ProjectTabs.MANAGE} label={t('tabs.manageRoles')} />
            )}
            <Tab value={ProjectTabs.ARTICLES} label={t('tabs.articles')} />
            {permissions.canUpdateContent && (
              <Tab value={ProjectTabs.EDIT} label={t('tabs.edit')} />
            )}
            <Tab value={ProjectTabs.HISTORY} label={t('tabs.history')} />
          </Tabs>
          <TabPanel value={ProjectTabs.PROJECT}>
            <ProjectView project={nft} onMount={onMountContent} />
          </TabPanel>
          <TabPanel value={ProjectTabs.ARTICLES}>
            <ArticleList
              articles={fullTokens}
              loading={tokensLoading}
              projectAddress={projectId!}
            />
          </TabPanel>
          <TabPanel value={ProjectTabs.EDIT}>
            <Editor
              onSuccessUpdate={handleSuccessUpdate}
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
      </Box>
      {isProjectTab && contentElem && (
        <StyledContent contentElem={contentElem} />
      )}
    </Flex>
  )
}

export default ProjectPage
