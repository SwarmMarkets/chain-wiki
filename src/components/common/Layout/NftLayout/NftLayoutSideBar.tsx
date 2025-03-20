import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import IndexPages from 'src/components/IndexPages'
import Collapse from 'src/components/ui-kit/Animations/Collapse'
import Tabs from 'src/components/ui/Tabs'
import Tab from 'src/components/ui/Tabs/Tab'
import TabContext from 'src/components/ui/Tabs/TabContext'
import TabPanel from 'src/components/ui/Tabs/TabPanel'
import useTabs from 'src/hooks/useTabs'
import { RoutePathSetting } from 'src/shared/enums'
import { NFTWithMetadata } from 'src/shared/utils'
import NftLayoutSideBarGeneralTab from './NftLayoutSideBarGeneralTab'
import NftLayouSideBarLayout from './NftLayouSideBarLayout'

interface NftLayoutSideBarProps {
  nft: NFTWithMetadata
}

enum CustomizationTab {
  GENERAL = 'general',
  LAYOUT = 'layout',
}

const NftLayoutSideBar: React.FC<NftLayoutSideBarProps> = ({ nft }) => {
  const { t } = useTranslation(['nft', 'layout'])

  const { setting } = useParams()

  const { activeTab, changeTab } = useTabs<CustomizationTab>({
    defaultTab: CustomizationTab.GENERAL,
  })

  if (setting === RoutePathSetting.GENERAL) return null
  if (setting === RoutePathSetting.CUSTOMIZATION)
    return (
      <AnimatePresence>
        <Collapse direction='left'>
          <aside className='w-64 bg-paper flex flex-col border-r-gray-200 border-r overflow-y-auto h-full min-w-96'>
            <h2 className='typo-heading1 font-medium text-main-accent p-4'>
              {t('customization.title', { ns: 'layout' })}
            </h2>
            <div className='px-4'>
              <TabContext value={activeTab}>
                <Tabs<CustomizationTab> onChange={tab => changeTab(tab.value)}>
                  <Tab
                    value={CustomizationTab.GENERAL}
                    label={t('customization.tabs.general', { ns: 'layout' })}
                  />
                  <Tab
                    value={CustomizationTab.LAYOUT}
                    label={t('customization.tabs.layout', { ns: 'layout' })}
                  />
                </Tabs>
                <TabPanel value={CustomizationTab.GENERAL}>
                  <NftLayoutSideBarGeneralTab nft={nft} />
                </TabPanel>
                <TabPanel value={CustomizationTab.LAYOUT}>
                  <NftLayouSideBarLayout nft={nft} />
                </TabPanel>
              </TabContext>
            </div>
          </aside>
        </Collapse>
      </AnimatePresence>
    )

  return (
    <AnimatePresence>
      <Collapse direction='left'>
        <aside className='w-64 bg-paper flex flex-col border-r-gray-200 border-r overflow-y-auto h-full'>
          <nav className='flex-1 overflow-y-auto p-4 flex flex-col gap-1'>
            <IndexPages nft={nft} />
          </nav>
          <footer></footer>
        </aside>
      </Collapse>
    </AnimatePresence>
  )
}

export default NftLayoutSideBar
