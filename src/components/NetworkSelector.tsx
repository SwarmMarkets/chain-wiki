import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import staticConfig from 'src/config'
import { SupportedChainId } from 'src/environment/networks'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'
import { useConfigStore } from 'src/shared/store/config-store'

import Icon from './ui-kit/Icon/Icon'
import OptionSubheader from './ui-kit/Select/OptionSubheader'
import { IconName } from 'src/shared/types/iconNames'

const { supportedChains } = staticConfig

import Select from './ui-kit/Select/Select'
import Option from './ui-kit/Select/Option'
import useActiveOrDefaultChain from 'src/hooks/web3/useActiveOrDefaultChain'
import { useSwitchActiveWalletChain } from 'thirdweb/react'
import { getActiveOrDefaultChain } from 'src/shared/utils'

const networksIcons: Record<SupportedChainId, IconName> = {
  [SupportedChainId.Base]: 'base',
  [SupportedChainId.Polygon]: 'polygon',
  [SupportedChainId.ArbitrumSepolia]: 'arbitrum',
}

const getNetworkOptions = () => {
  return supportedChains.map(({ id, name }) => ({
    id,
    icon: networksIcons[id],
    slug: name,
  }))
}

const NetworkSelector = () => {
  const activeChain = useActiveOrDefaultChain()
  const switchChain = useSwitchActiveWalletChain()
  const { lastChainId, setLastChainId } = useConfigStore()

  const { t } = useTranslation('common')
  const isLg = useBreakpoint('lg')

  const handleSwitchChain = async (newChainId: number) => {
    if (!activeChain && newChainId !== lastChainId) {
      setLastChainId(newChainId)
    }

    if (newChainId === activeChain.id || !activeChain) return
    await switchChain(getActiveOrDefaultChain(newChainId))
    setLastChainId(newChainId)
    window.location.reload()
  }

  const chainId = lastChainId || staticConfig.defaultChain.id

  return (
    <Select<number>
      variant='filled'
      renderedValue={
        isLg ? (
          <Option value={chainId}>
            <div className='flex items-center gap-2'>
              <Icon name={networksIcons[chainId]} size={20} />
            </div>
          </Option>
        ) : null
      }
      value={chainId}
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
