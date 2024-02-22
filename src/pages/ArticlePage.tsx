import ArticleContentSkeleton from '@src/components/Article/ArticleContentSkeleton'
import ArticleView from '@src/components/Article/ArticleView'
import {
  ContentPlaceholder,
  InnerContainer,
  StyledContent,
  Wrapper,
} from '@src/components/Article/styled-components'
import Editor from '@src/components/Editor'
import HistoryArticle from '@src/components/History/HistoryArticle'
import Tabs from '@src/components/ui/Tabs'
import Tab from '@src/components/ui/Tabs/Tab'
import TabContext from '@src/components/ui/Tabs/TabContext'
import TabPanel from '@src/components/ui/Tabs/TabPanel'
import Text from '@src/components/ui/Text'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import useToken from '@src/hooks/subgraph/useToken'
import { ArticleTabs } from '@src/shared/enums/tabs'
import { Tab as ITab } from '@src/shared/types/ui-components'
import queryString from 'query-string'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

const ArticlePage = () => {
  const { articleId = '', projectId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation('article')
  const { permissions } = useProjectPermissions(projectId)

  const initialTab = searchParams.get('tab') || ArticleTabs.READ
  const [activeTab, setActiveTab] = useState(initialTab)

  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)

  const { token, loadingToken, refetchingToken } = useToken(articleId)

  const showSkeleton = loadingToken && !refetchingToken

  const onChangeTab = (tab: ITab) => {
    setActiveTab(tab.value)
    if (tab.value === ArticleTabs.READ) {
      const params = queryString.exclude(location.search, ['tab'])
      navigate({ search: params })
      return
    }
    const params = queryString.stringify({ tab: tab.value })
    navigate({ search: `?${params}` }, { replace: true })
  }

  const onMount = (element: HTMLDivElement) => {
    setContentElem(element)
  }

  const tokenId = Number(token?.id.split('-')[1])
  const isReadTab = activeTab === ArticleTabs.READ

  if (showSkeleton) {
    return (
      <Wrapper>
        <InnerContainer>
          <ArticleContentSkeleton />
        </InnerContainer>

        <ContentPlaceholder />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <InnerContainer>
        <Text.h1 size='24px' weight={700}>
          {token?.ipfsContent?.name}
        </Text.h1>

        <TabContext value={activeTab}>
          <Tabs onChange={onChangeTab}>
            <Tab value={ArticleTabs.READ} label={t('tabs.read')} />
            {permissions.canUpdateContent && (
              <Tab value={ArticleTabs.EDIT} label={t('tabs.edit')} />
            )}
            <Tab value={ArticleTabs.HISTORY} label={t('tabs.history')} />
          </Tabs>

          <TabPanel value={ArticleTabs.READ}>
            <ArticleView token={token} onMount={onMount} />
          </TabPanel>
          <TabPanel value={ArticleTabs.EDIT}>
            <Editor
              initialContent={token?.ipfsContent?.htmlContent || ''}
              projectAddress={projectId}
              articleId={tokenId}
            />
          </TabPanel>
          <TabPanel value={ArticleTabs.HISTORY}>
            <HistoryArticle />
          </TabPanel>
        </TabContext>
      </InnerContainer>

      {contentElem && isReadTab ? (
        <StyledContent contentElem={contentElem} />
      ) : (
        <ContentPlaceholder />
      )}
    </Wrapper>
  )
}

export default ArticlePage
