'use client'

import { PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SmartButton from 'src/components/SmartButton'
import useFactoryImplementation from 'src/hooks/contracts/factory/useFactoryImplementation'
import useNftImplementation from 'src/hooks/contracts/nft/useNftImplementation'
import useSX1155NFT from 'src/hooks/contracts/nft/useSX1155NFT'
import useSendTx from 'src/hooks/web3/useSendTx'
import { isSameEthereumAddress } from 'src/shared/utils/web3'

type Props = PropsWithChildren<{
  nftAddress?: string
}>

const NftImplementationGuard: React.FC<Props> = ({ nftAddress, children }) => {
  const { t } = useTranslation('layout', { keyPrefix: 'factoryUpgrade' })
  const [upgradeInitiated, setUpgradeInitiated] = useState(false)
  const {
    data: factoryImplementation,
    isLoading: loadingFactoryImpl,
    refetch: refetchFactoryImpl,
  } = useFactoryImplementation()
  const {
    data: nftImplementation,
    isLoading: loadingNftImpl,
    refetch: refetchNftImpl,
  } = useNftImplementation(nftAddress)
  const { prepareUpgradeToAndCallTx } = useSX1155NFT(nftAddress)
  const { sendTx, isPending } = useSendTx()

  const loading = loadingFactoryImpl || loadingNftImpl
  const mismatch =
    !!factoryImplementation &&
    !!nftImplementation &&
    !isSameEthereumAddress(factoryImplementation, nftImplementation)

  if (!nftAddress || loading || !mismatch || upgradeInitiated) {
    return <>{children}</>
  }

  const handleUpgrade = async () => {
    if (!factoryImplementation) return
    const tx = prepareUpgradeToAndCallTx({
      newImplementation: factoryImplementation,
      data: '0x',
    })
    const res = await sendTx(tx, { successMessage: t('successMessage') })
    if (res) {
      setUpgradeInitiated(true)
    }
    await Promise.all([refetchFactoryImpl(), refetchNftImpl()])
  }

  return (
    <div className='flex h-full items-center justify-center bg-white p-4'>
      <div className='w-full max-w-xl rounded-lg border border-gray-200 bg-white p-4 shadow-lg md:p-6'>
        <div className='flex flex-col gap-3'>
          <h2 className='typo-heading3'>{t('title')}</h2>
          <p className='typo-body1 text-main/80'>{t('description')}</p>
          <div className='space-y-2 rounded-md bg-gray-100 p-3 text-xs'>
            <div>
              <span className='font-semibold'>{t('expected')}:</span>{' '}
              <span className='break-all'>{factoryImplementation}</span>
            </div>
            <div>
              <span className='font-semibold'>{t('current')}:</span>{' '}
              <span className='break-all'>{nftImplementation}</span>
            </div>
          </div>
          <SmartButton
            onClick={handleUpgrade}
            loading={isPending}
            className='w-full'
          >
            {t('action')}
          </SmartButton>
        </div>
      </div>
    </div>
  )
}

export default NftImplementationGuard
