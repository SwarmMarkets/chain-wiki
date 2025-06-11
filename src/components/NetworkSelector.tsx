import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import staticConfig from 'src/config'
import { SupportedChainId } from 'src/environment/networks'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'
import { useConfigStore } from 'src/shared/store/config-store'

import { useChainId, useSwitchChain } from '@thirdweb-dev/react'
import Icon from './ui-kit/Icon/Icon'
import OptionSubheader from './ui-kit/Select/OptionSubheader'
import { IconName } from 'src/shared/types/iconNames'

const { supportedChains } = staticConfig

import Select from './ui-kit/Select/Select'
import Option from './ui-kit/Select/Option'

const networksIcons: Record<SupportedChainId, IconName> = {
  [SupportedChainId.Base]: 'base',
  [SupportedChainId.Polygon]: 'polygon',
}

const getNetworkOptions = () => {
  return supportedChains.map(({ chainId, name }) => ({
    id: chainId,
    icon: networksIcons[chainId],
    slug: name,
  }))
}

const NetworkSelector = () => {
  const activeChainId = useChainId()
  const switchChain = useSwitchChain()
  const { lastChainId, setLastChainId } = useConfigStore()

  const { t } = useTranslation('common')
  const isLg = useBreakpoint('lg')

  const handleSwitchChain = async (newChainId: number) => {
    if (!activeChainId && newChainId !== lastChainId) {
      setLastChainId(newChainId)
    }

    if (newChainId === activeChainId || !activeChainId) return
    await switchChain(newChainId)
    setLastChainId(newChainId)
    window.location.reload()
  }

  return (
    <Select<number>
      variant='filled'
      renderedValue={
        isLg ? (
          <Option value={lastChainId}>
            <div className='flex items-center gap-2'>
              <Icon name={networksIcons[lastChainId]} size={20} />
            </div>
          </Option>
        ) : null
      }
      value={lastChainId}
      onChange={handleSwitchChain}
      className={clsx({
        'min-w-44': !isLg,
        'max-w-20': isLg,
      })}
    >
      <OptionSubheader>{t('switchNetwork.title')}</OptionSubheader>
      {getNetworkOptions().map(chain => (
        <Option key={chain.id} value={chain.id}>
          <div className='flex items-center gap-2'>
            <Icon name={chain.icon} size={20} />
            {chain.slug}
          </div>
        </Option>
      ))}
    </Select>
  )
}

export default NetworkSelector
