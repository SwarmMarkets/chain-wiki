import { useChainId } from '@thirdweb-dev/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import HistoryNft from 'src/components/History/HistoryNft'
import NftContentSkeleton from 'src/components/Nft/NftContentSkeleton'
import { NftView } from 'src/components/Nft/NftView'
import Settings from 'src/components/Settings/Settings'
import TokenList from 'src/components/Token/TokenList'
import Box from 'src/components/ui/Box'
import Flex from 'src/components/ui/Flex'
import Tabs from 'src/components/ui/Tabs'
import Tab from 'src/components/ui/Tabs/Tab'
import TabContext from 'src/components/ui/Tabs/TabContext'
import TabPanel from 'src/components/ui/Tabs/TabPanel'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useNFT from 'src/hooks/subgraph/useNFT'
import useTokens from 'src/hooks/subgraph/useTokens'
import useTabs from 'src/hooks/useTabs'
import { NftTabs } from 'src/shared/enums/tabs'
import { Tab as ITab } from 'src/shared/types/ui-components'
import { unifyAddressToId } from 'src/shared/utils'

const NftPage = () => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation(['nft', 'buttons'])
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

  const chainId = useChainId()

  return (
    <div>
      {/* {activeTab === NftTabs.NFT && (
        <IndexPages tokens={fullTokens} nft={nft} />
      )} */}
      {showSkeleton ? (
        <NftContentSkeleton />
      ) : (
        <div className='w-full flex flex-col gap-4'>
          <h1 className='typo-heading1 text-main-accent'>{nft?.name}</h1>

          <NftView
            nft={nft}
            onMount={onMountContent}
          />
        </div>
      )}
      {/* {isNftTab && (
        <SideContentWrap>
          <Content contentElem={contentElem} />
        </SideContentWrap>
      )} */}
    </div>
  )
}

export default NftPage
