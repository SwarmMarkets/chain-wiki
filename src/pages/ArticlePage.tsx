import ArticleContentSkeleton from '@src/components/Article/ArticleContentSkeleton'
import ArticleView from '@src/components/Article/ArticleView'
import { StyledContent } from '@src/components/Article/styled-components'
import Editor from '@src/components/Editor'
import HistoryArticle from '@src/components/History/HistoryArticle'
import { StyledIndexPages } from '@src/components/Project/styled-components'
import { TokenContextProvider } from '@src/components/providers/TokenContext'
import Box from '@src/components/ui/Box'
import Flex from '@src/components/ui/Flex'
import Tabs from '@src/components/ui/Tabs'
import Tab from '@src/components/ui/Tabs/Tab'
import TabContext from '@src/components/ui/Tabs/TabContext'
import TabPanel from '@src/components/ui/Tabs/TabPanel'
import Text from '@src/components/ui/Text'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import useNFT from '@src/hooks/subgraph/useNFT'
import useToken from '@src/hooks/subgraph/useToken'
import useTokens from '@src/hooks/subgraph/useTokens'
import { ArticleTabs } from '@src/shared/enums/tabs'
import { Tab as ITab } from '@src/shared/types/ui-components'
import { unifyAddressToId } from '@src/shared/utils'
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
  const { nft } = useNFT(projectId)
  const { fullTokens } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(projectId) } },
    },
    { fetchFullData: true }
  )

  const showSkeleton = loadingToken && !refetchingToken
  const allLoaded = token && nft && fullTokens

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

  const handleSuccessUpdate = () => {
    setActiveTab(ArticleTabs.READ)
    const params = queryString.exclude(location.search, ['tab'])
    navigate({ search: params })
  }

  const onMount = (element: HTMLDivElement) => {
    setContentElem(element)
  }

  const isReadTab = activeTab === ArticleTabs.READ

  if (showSkeleton) {
    return (
      <Flex justifyContent='center' $gap='20px'>
        <Box width='900px'>
          <ArticleContentSkeleton />
        </Box>
      </Flex>
    )
  }

  return (
    <TokenContextProvider value={token}>
      <Flex
        justifyContent={isReadTab && allLoaded ? 'space-between' : 'center'}
        $gap='20px'
      >
        {isReadTab && nft && fullTokens && (
          <StyledIndexPages
            articles={fullTokens}
            project={nft}
            indexPages={nft.ipfsContent?.indexPages}
          />
        )}
        <Box width='900px'>
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
              <ArticleView article={token} onMount={onMount} />
            </TabPanel>
            <TabPanel value={ArticleTabs.EDIT}>
              <Editor
                onSuccessUpdate={handleSuccessUpdate}
                initialContent={token?.ipfsContent?.htmlContent || ''}
                projectAddress={projectId}
                articleAddress={token?.id}
              />
            </TabPanel>
            <TabPanel value={ArticleTabs.HISTORY}>
              <HistoryArticle />
            </TabPanel>
          </TabContext>
        </Box>

        {isReadTab && contentElem && (
          <StyledContent contentElem={contentElem} />
        )}
      </Flex>
    </TokenContextProvider>
  )
}

export default ArticlePage
