// @src/components/Nft/NftPage.tsx
import Content from '@src/components/Content'
import HistoryNft from '@src/components/History/HistoryNft'
import IndexPages from '@src/components/IndexPages'
import NftContentSkeleton from '@src/components/Nft/NftContentSkeleton'
import { NftView } from '@src/components/Nft/NftView'
import { SideContentWrap } from '@src/components/Nft/styled-components'
import Settings from '@src/components/Settings/Settings'
import TokenList from '@src/components/Token/TokenList'
import ExplorerLink from '@src/components/common/ExplorerLink'
import Box from '@src/components/ui/Box'
import Flex from '@src/components/ui/Flex'
import Tabs from '@src/components/ui/Tabs'
import Tab from '@src/components/ui/Tabs/Tab'
import TabContext from '@src/components/ui/Tabs/TabContext'
import TabPanel from '@src/components/ui/Tabs/TabPanel'
import Text from '@src/components/ui/Text'
import useNftPermissions from '@src/hooks/permissions/useNftPermissions'
import useNFT from '@src/hooks/subgraph/useNFT'
import useTokens from '@src/hooks/subgraph/useTokens'
import useTabs from '@src/hooks/useTabs'
import { NftTabs } from '@src/shared/enums/tabs'
import { Tab as ITab } from '@src/shared/types/ui-components'
import { unifyAddressToId } from '@src/shared/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'

const NftPage = () => {
  const { nftId = '' } = useParams()
  const theme = useTheme()
  const { t } = useTranslation('nft')
  const { permissions } = useNftPermissions(nftId)
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })
  const { fullTokens, loading: tokensLoading } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(nftId) } },
    },
    { fetchFullData: true }
  )
  const { activeTab, changeTab } = useTabs<NftTabs>({
    defaultTab: NftTabs.NFT,
  })
  const showSkeleton = loadingNft && !refetchingNft
  const isNftTab = activeTab === NftTabs.NFT

  const allLoaded = nft && fullTokens
  const onMountContent = (element: HTMLDivElement) => {
    setContentElem(element)
  }

  const onChangeNftTab = (tab: ITab<NftTabs>) => {
    changeTab(tab.value)
  }

  const handleSettingsSite = () => {
    changeTab(NftTabs.SETTINGS)
  }

  if (showSkeleton) {
    return (
      <Flex justifyContent='center' $gap='20px'>
        <Box width='900px'>
          <NftContentSkeleton />
        </Box>
      </Flex>
    )
  }

  return (
    <Flex
      justifyContent={isNftTab && allLoaded ? 'space-between' : 'center'}
      $gap='20px'
    >
      {activeTab === NftTabs.NFT && (
        <SideContentWrap>
          <IndexPages tokens={fullTokens} nft={nft} />
        </SideContentWrap>
      )}
      <Box width='900px'>
        <Flex $gap='5px' flexDirection='column'>
          <Text.h1 size={theme.fontSizes.large} weight={700}>
            {nft?.name}
          </Text.h1>
          <ExplorerLink
            iconSize={10}
            iconsPosition='right'
            type='address'
            hash={nftId}
          >
            <Text
              fontSize={theme.fontSizes.small}
              color={theme.palette.linkPrimary}
            >
              {nftId}
            </Text>
          </ExplorerLink>
        </Flex>

        <TabContext value={activeTab}>
          <Tabs onChange={onChangeNftTab}>
            <Tab value={NftTabs.NFT} label={t('tabs.nft')} />
            <Tab value={NftTabs.TOKENS} label={t('tabs.tokens')} />
            <Tab value={NftTabs.HISTORY} label={t('tabs.history')} />
            {permissions.canUpdateSettings && (
              <Tab value={NftTabs.SETTINGS} label={t('tabs.settings')} />
            )}
          </Tabs>
          <TabPanel value={NftTabs.NFT}>
            <NftView
              nft={nft}
              onMount={onMountContent}
              onClickEditSite={handleSettingsSite}
            />
          </TabPanel>
          <TabPanel value={NftTabs.TOKENS}>
            <TokenList
              tokens={fullTokens}
              loading={tokensLoading}
              nftAddress={nftId!}
            />
          </TabPanel>
          <TabPanel value={NftTabs.SETTINGS}>
            <Settings />
          </TabPanel>
          <TabPanel value={NftTabs.HISTORY}>
            <HistoryNft />
          </TabPanel>
        </TabContext>
      </Box>
      {isNftTab && (
        <SideContentWrap>
          <Content contentElem={contentElem} />
        </SideContentWrap>
      )}
    </Flex>
  )
}

export default NftPage
