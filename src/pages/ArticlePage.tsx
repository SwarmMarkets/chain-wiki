import { useRef, useState } from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import queryString from 'query-string'
import Content from '@src/components/Content'
import Editor from '@src/components/Editor'
import HtmlRender from '@src/components/HtmlRender'
import Tabs from '@src/components/ui/Tabs'
import Text from '@src/components/ui/Text'
import HistoryArticle from '@src/components/History/HistoryArticle'
import { Tab as ITab } from '@src/shared/types/ui-components'
import useToken from '@src/hooks/subgraph/useToken'
import ArticleContentSkeleton from '@src/components/Article/ArticleContentSkeleton'
import ContentMissing from '@src/components/common/ContentMissing'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import TabContext from '@src/components/ui/Tabs/TabContext'
import Tab from '@src/components/ui/Tabs/Tab'
import TabPanel from '@src/components/ui/Tabs/TabPanel'
import { ArticleTabs } from '@src/shared/enums/tabs'

const ArticleWrapper = styled.div`
  display: flex;
  gap: 20px;
`

const ArticleContent = styled.div`
  max-width: 980px;
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

const ArticlePage = () => {
  const { articleId = '', projectId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation('article')
  const { permissions } = useProjectPermissions(projectId)
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)
  const initialTab = searchParams.get('tab') || ArticleTabs.READ
  const [activeTab, setActiveTab] = useState(initialTab)
  const { token, loadingToken, refetchingToken } = useToken(articleId)

  const contentRef = useRef<HTMLDivElement>(null)

  const showSkeleton = loadingToken && !refetchingToken

  const onMountContent = () => {
    setContentElem(contentRef?.current)
  }

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

  const tokenId = Number(token?.id.split('-')[1])

  return (
    <ArticleWrapper>
      {activeTab === '1' && contentElem ? (
        <StyledContent contentElem={contentElem} />
      ) : (
        <ContentPlaceholder />
      )}
      <ArticleContent>
        {showSkeleton ? (
          <ArticleContentSkeleton />
        ) : (
          <>
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
                {token?.ipfsContent?.htmlContent ? (
                  <HtmlRender
                    onMount={onMountContent}
                    ref={contentRef}
                    html={token.ipfsContent.htmlContent}
                  />
                ) : (
                  <ContentMissing message='Article content missing' />
                )}
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
          </>
        )}
      </ArticleContent>
    </ArticleWrapper>
  )
}

export default ArticlePage
