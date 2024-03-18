import TokenContentSkeleton from '@src/components/Token/TokenContentSkeleton'
import TokenView from '@src/components/Token/TokenView'
import { StyledContent } from '@src/components/Token/styled-components'
import Editor from '@src/components/Editor'
import HistoryToken from '@src/components/History/HistoryToken'
import { StyledIndexPages } from '@src/components/Nft/styled-components'
import { TokenContextProvider } from '@src/components/providers/TokenContext'
import Box from '@src/components/ui/Box'
import Breadcrumbs from '@src/components/ui/Breadcrumbs'
import Flex from '@src/components/ui/Flex'
import Tabs from '@src/components/ui/Tabs'
import Tab from '@src/components/ui/Tabs/Tab'
import TabContext from '@src/components/ui/Tabs/TabContext'
import TabPanel from '@src/components/ui/Tabs/TabPanel'
import Text from '@src/components/ui/Text'
import useNftPermissions from '@src/hooks/permissions/useNftPermissions'
import useNFT from '@src/hooks/subgraph/useNFT'
import useToken from '@src/hooks/subgraph/useToken'
import useTokens from '@src/hooks/subgraph/useTokens'
import { TokenTabs } from '@src/shared/enums/tabs'
import { Tab as ITab } from '@src/shared/types/ui-components'
import { unifyAddressToId } from '@src/shared/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import useTabs from '@src/hooks/useTabs'

const TokenPage = () => {
  const { tokenId = '', nftId = '' } = useParams()
  const { t } = useTranslation('token')
  const { permissions } = useNftPermissions(nftId)

  const { activeTab, changeTab, resetTab } = useTabs<TokenTabs>({
    defaultTab: TokenTabs.READ,
  })

  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)

  const { token, loadingToken, refetchingToken } = useToken(tokenId)
  const { nft } = useNFT(nftId)
  const { fullTokens } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(nftId) } },
    },
    { fetchFullData: true }
  )

  const showSkeleton = loadingToken && !refetchingToken
  const allLoaded = token && nft && fullTokens

  const onChangeTab = (tab: ITab<TokenTabs>) => {
    changeTab(tab.value)
  }

  const handleSuccessUpdate = () => {
    resetTab()
  }

  const handleEditSite = () => {
    changeTab(TokenTabs.EDIT)
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
    token && [{ label: nft.name, to: `/nft/${nftId}` }, { label: token.id }]

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
            nft={nft}
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
              <TokenView
                onClickEditSite={handleEditSite}
                token={token}
                onMount={onMount}
              />
            </TabPanel>
            <TabPanel value={TokenTabs.EDIT}>
              <Editor
                onSuccessUpdate={handleSuccessUpdate}
                initialContent={token?.ipfsContent?.htmlContent || ''}
                nftAddress={nftId}
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
