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
import History from '@src/components/History'
import { Tab } from '@src/shared/types/ui-components'
import useToken from '@src/hooks/subgraph/useToken'
import ArticleContentSkeleton from '@src/components/Article/ArticleContentSkeleton'
import ContentMissing from '@src/components/common/ContentMissing'

const ArticleWrapper = styled.div`
  display: flex;
  gap: 20px;
`

const ArticleContent = styled.div`
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

const ArticlePage = () => {
  const { articleId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation('article')
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)
  const initialTab = Number(searchParams.get('tab')) || 1
  const [activeTab, setActiveTab] = useState(initialTab)
  const { token, loadingToken, refetchingToken } = useToken(articleId || '')

  const contentRef = useRef<HTMLDivElement>(null)

  const showSkeleton = loadingToken && !refetchingToken

  const onMountContent = () => {
    setContentElem(contentRef?.current)
  }

  const onChangeTab = (tab: Tab) => {
    setActiveTab(tab.id)
    if (tab.id === 1) {
      const params = queryString.exclude(location.search, ['tab'])
      navigate({ search: params })
      return
    }
    const params = queryString.stringify({ tab: tab.id })
    navigate({ search: `?${params}` }, { replace: true })
  }

  const tabs = token
    ? [
        {
          id: 1,
          title: t('tabs.read'),
          content: token.ipfsContent?.htmlContent ? (
            <HtmlRender
              onMount={onMountContent}
              ref={contentRef}
              html={token.ipfsContent.htmlContent}
            />
          ) : (
            <ContentMissing message='Article content missing' />
          ),
        },
        {
          id: 2,
          title: t('tabs.edit'),
          content: (
            <Editor
              initialContent={token.ipfsContent?.htmlContent || ''}
              projectAddress={''}
            />
          ),
        },
        {
          id: 3,
          title: t('tabs.history'),
          content: <History />,
        },
      ]
    : []
  console.log(token)
  return (
    <ArticleWrapper>
      {activeTab === 1 && contentElem ? (
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
            <Tabs tabs={tabs} activeTab={activeTab} onChange={onChangeTab} />
          </>
        )}
      </ArticleContent>
    </ArticleWrapper>
  )
}

export default ArticlePage
