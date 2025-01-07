import TokenContentSkeleton from 'src/components/Token/TokenContentSkeleton'
import TokenView from 'src/components/Token/TokenView'
import {
  TokenStyledContent,
  TokenStyledIndexPages,
} from 'src/components/Token/styled-components'
import HistoryToken from 'src/components/History/HistoryToken'
import { TokenContextProvider } from 'src/components/providers/TokenContext'
import Box from 'src/components/ui/Box'
import Breadcrumbs from 'src/components/ui/Breadcrumbs'
import Flex from 'src/components/ui/Flex'
import Tabs from 'src/components/ui/Tabs'
import Tab from 'src/components/ui/Tabs/Tab'
import TabContext from 'src/components/ui/Tabs/TabContext'
import TabPanel from 'src/components/ui/Tabs/TabPanel'
import Text from 'src/components/ui/Text'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useNFT from 'src/hooks/subgraph/useNFT'
import useToken from 'src/hooks/subgraph/useToken'
import useTokens from 'src/hooks/subgraph/useTokens'
import { TokenTabs } from 'src/shared/enums/tabs'
import { Tab as ITab } from 'src/shared/types/ui-components'
import { unifyAddressToId } from 'src/shared/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useParams } from 'react-router-dom'
import useTabs from 'src/hooks/useTabs'
import EditView from 'src/components/Token/TokenEditView'
import RoutePaths from 'src/shared/enums/routes-paths'

const TokenPage = () => {
  const { tokenId = '', nftId = '' } = useParams()
  const { t } = useTranslation('token')
  const { permissions } = useNftPermissions(nftId)

  const { activeTab, changeTab, resetTab } = useTabs<TokenTabs>({
    defaultTab: TokenTabs.READ,
  })

  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)

  const { token, loadingToken, refetchingToken } = useToken(tokenId)
  const { nft } = useNFT(nftId, { fetchFullData: true })
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
    token && [
      { label: nft.name, to: generatePath(RoutePaths.NFT, { nftId }) },
      { label: token.name || token.id },
    ]

  return (
    <TokenContextProvider value={token}>
      <Box as='nav' mb='20px'>
        <Breadcrumbs items={breadCrumbs || []} />
      </Box>
      <Flex
        justifyContent={isReadTab && allLoaded ? 'space-between' : 'center'}
        $gap='20px'
      >
        {isReadTab && <TokenStyledIndexPages tokens={fullTokens} nft={nft} />}
        <Box width='900px'>
          <Text.h1 size='24px' weight={700}>
            {token?.name}
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
              <EditView
                handleSuccessUpdate={handleSuccessUpdate}
                nftAddress={nft?.id || ''}
                token={token}
              />
            </TabPanel>
            <TabPanel value={TokenTabs.HISTORY}>
              <HistoryToken />
            </TabPanel>
          </TabContext>
        </Box>

        {isReadTab && <TokenStyledContent contentElem={contentElem} />}
      </Flex>
    </TokenContextProvider>
  )
}

export default TokenPage
