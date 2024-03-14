import TokenContentSkeleton from '@src/components/Token/TokenContentSkeleton'
import TokenView from '@src/components/Token/TokenView'
import { StyledContent } from '@src/components/Token/styled-components'
import Editor from '@src/components/Editor'
import HistoryToken from '@src/components/History/HistoryToken'
import { StyledIndexPages } from '@src/components/Project/styled-components'
import { TokenContextProvider } from '@src/components/providers/TokenContext'
import Box from '@src/components/ui/Box'
import Breadcrumbs from '@src/components/ui/Breadcrumbs'
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
import { TokenTabs } from '@src/shared/enums/tabs'
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

const TokenPage = () => {
  const { tokenId = '', projectId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation('token')
  const { permissions } = useProjectPermissions(projectId)

  const initialTab = searchParams.get('tab') || TokenTabs.READ
  const [activeTab, setActiveTab] = useState(initialTab)

  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)

  const { token, loadingToken, refetchingToken } = useToken(tokenId)
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
    if (tab.value === TokenTabs.READ) {
      const params = queryString.exclude(location.search, ['tab'])
      navigate({ search: params })
      return
    }
    const params = queryString.stringify({ tab: tab.value })
    navigate({ search: `?${params}` }, { replace: true })
  }

  const handleSuccessUpdate = () => {
    setActiveTab(TokenTabs.READ)
    const params = queryString.exclude(location.search, ['tab'])
    navigate({ search: params })
  }

  const onMount = (element: HTMLDivElement) => {
    setContentElem(element)
  }

  const isReadTab = activeTab === TokenTabs.READ

  if (showSkeleton) {
    return (
      <Flex justifyContent='center' $gap='20px'>
        <Box width='900px'>
          <TokenContentSkeleton />
        </Box>
      </Flex>
    )
  }

  const breadCrumbs = nft &&
    token && [
      { label: nft.name, to: `/project/${projectId}` },
      { label: token.id },
    ]

  return (
    <TokenContextProvider value={token}>
      <Breadcrumbs items={breadCrumbs || []} />
      <Flex
        justifyContent={isReadTab && allLoaded ? 'space-between' : 'center'}
        $gap='20px'
      >
        {isReadTab && (
          <StyledIndexPages
            tokens={fullTokens}
            project={nft}
            indexPages={nft?.ipfsContent?.indexPages}
          />
        )}
        <Box width='900px'>
          <Text.h1 size='24px' weight={700}>
            {token?.ipfsContent?.name}
          </Text.h1>

          <TabContext value={activeTab}>
            <Tabs onChange={onChangeTab}>
              <Tab value={TokenTabs.READ} label={t('tabs.read')} />
              {permissions.canUpdateContent && (
                <Tab value={TokenTabs.EDIT} label={t('tabs.edit')} />
              )}
              <Tab value={TokenTabs.HISTORY} label={t('tabs.history')} />
            </Tabs>

            <TabPanel value={TokenTabs.READ}>
              <TokenView token={token} onMount={onMount} />
            </TabPanel>
            <TabPanel value={TokenTabs.EDIT}>
              <Editor
                onSuccessUpdate={handleSuccessUpdate}
                initialContent={token?.ipfsContent?.htmlContent || ''}
                projectAddress={projectId}
                tokenAddress={token?.id}
              />
            </TabPanel>
            <TabPanel value={TokenTabs.HISTORY}>
              <HistoryToken />
            </TabPanel>
          </TabContext>
        </Box>

        {isReadTab && <StyledContent contentElem={contentElem} />}
      </Flex>
    </TokenContextProvider>
  )
}

export default TokenPage
