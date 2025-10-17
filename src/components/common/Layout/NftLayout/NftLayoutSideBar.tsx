'use client'

import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import IndexPages from 'src/components/IndexPages'
import Collapse from 'src/components/ui-kit/Animations/Collapse'
import Tabs from 'src/components/ui-kit/Tabs'
import Tab from 'src/components/ui-kit/Tabs/Tab'
import TabContext from 'src/components/ui-kit/Tabs/TabContext'
import TabPanel from 'src/components/ui-kit/Tabs/TabPanel'
import useTabs from 'src/hooks/useTabs'
import { RoutePathSetting } from 'src/shared/enums'
import { NFTWithMetadata } from 'src/shared/utils'
import NftLayouSideBarLayoutTab from './NftLayouSideBarLayoutTab'
import NftLayoutSideBarGeneralTab from './NftLayoutSideBarGeneralTab'
import NftSideBarSkeleton from './NftSideBarSkeleton'
import { useParams } from 'next/navigation'
import { MParams } from 'src/shared/consts/routes'

interface NftLayoutSideBarProps {
  nft: NFTWithMetadata | null
  loading: boolean
}

enum CustomizationTab {
  GENERAL = 'general',
  LAYOUT = 'layout',
}

const NftLayoutSideBar: React.FC<NftLayoutSideBarProps> = ({
  nft,
  loading,
}) => {
  const { t } = useTranslation(['nft', 'layout'])
  const { setting } = useParams<MParams['settings']>()
  const { activeTab, changeTab } = useTabs<CustomizationTab>({
    defaultTab: CustomizationTab.GENERAL,
  })

  if (setting === RoutePathSetting.GENERAL) return null

  return (
    <AnimatePresence>
      <Collapse direction='left' layout>
        <aside className='bg-paper flex flex-col border-r-gray-200 border-r overflow-y-auto h-full transition-all'>
          {loading ? (
            <NftSideBarSkeleton />
          ) : setting === RoutePathSetting.CUSTOMIZATION ? (
            <>
              <h2 className='typo-heading1 font-medium text-main-accent p-4'>
                {t('customization.title', { ns: 'layout' })}
              </h2>
              <div className='px-4 w-96'>
                <TabContext value={activeTab}>
                  <Tabs<CustomizationTab>
                    onChange={tab => changeTab(tab.value)}
                  >
                    <Tab
                      value={CustomizationTab.GENERAL}
                      label={t('customization.tabs.general', { ns: 'layout' })}
                    />
                    <Tab
                      value={CustomizationTab.LAYOUT}
                      label={t('customization.tabs.layout', { ns: 'layout' })}
                    />
                  </Tabs>
                  {nft && (
                    <>
                      <TabPanel value={CustomizationTab.GENERAL}>
                        <NftLayoutSideBarGeneralTab nft={nft} />
                      </TabPanel>
                      <TabPanel value={CustomizationTab.LAYOUT}>
                        <NftLayouSideBarLayoutTab nft={nft} />
                      </TabPanel>
                    </>
                  )}
                </TabContext>
              </div>
            </>
          ) : (
            <>
              <nav className='flex-1 overflow-y-auto p-4 w-[300px]'>
                <IndexPages nft={nft} />
              </nav>
              <footer></footer>
            </>
          )}
        </aside>
      </Collapse>
    </AnimatePresence>
  )
}

export default NftLayoutSideBar
