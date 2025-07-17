import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ExplorerLink from 'src/components/common/ExplorerLink'
import Button from 'src/components/ui-kit/Button/Button'
import Table from 'src/components/ui-kit/Table'
import useNFT from 'src/hooks/subgraph/useNFT'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import SettingCard from '../../SettingCard'
import MakePreferredForm from './MakePreferredForm'
import { AdditionalRoles } from 'src/shared/enums'
import { isSameEthereumAddress } from 'src/shared/utils'
import { useActiveAccount } from 'thirdweb/react'
import { useAddressNameStore } from 'src/components/Nft/NftRoleManager/addressNameStore'
import useNFTIdParam from 'src/hooks/useNftIdParam'

const AttestatorsSetting = () => {
  const { nftId } = useNFTIdParam()

  const { t } = useTranslation('nft', {
    keyPrefix: 'settings.attestatorsManager',
  })
  const { nft } = useNFT(nftId)
  const { signTransaction, tx } = useNFTUpdate(nftId)

  const [latestRemovePreferred, setLatestRemovePreferred] = useState('')
  const { addressNames } = useAddressNameStore()
  const currentAccount = useActiveAccount()
  const currentAddress = currentAccount?.address

  const formatAttestator = useCallback(
    (address: string) => {
      const isCurrent =
        currentAddress && isSameEthereumAddress(address, currentAddress)
      const key = `${address.toLowerCase()}-${
        AdditionalRoles.PREFERRED_ATTESTOR
      }`
      const displayName = isCurrent
        ? t('messages.you')
        : addressNames[key] || address

      return { address, displayName }
    },
    [addressNames, currentAddress, t]
  )

  const preferredAttestators = useMemo(() => {
    return nft?.preferredAttestators.map(formatAttestator) || []
  }, [formatAttestator, nft?.preferredAttestators])

  const handleRemovePreferred = (attestatorAddress: string) => {
    setLatestRemovePreferred(attestatorAddress)
    signTransaction({ preferredAttestatorToRemove: attestatorAddress })
  }

  return (
    <SettingCard
      title={t('title')}
      subtitle={t('subtitle')}
      description={t('description')}
    >
      {preferredAttestators.length > 0 && (
        <Table.Root className='mb-4'>
          <Table.Header>
            <Table.HeaderRow>
              <Table.HeadCell>{t('tableHead.address')}</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.HeaderRow>
          </Table.Header>
          <Table.Body>
            {preferredAttestators.map(({ address, displayName }) => (
              <Table.Row key={address}>
                <Table.Cell>
                  <ExplorerLink type='address' hash={address}>
                    <div className='font-semibold'>{displayName}</div>
                    {displayName !== address && (
                      <div className='text-sm'>{address}</div>
                    )}
                  </ExplorerLink>
                </Table.Cell>
                <Table.Cell align='right'>
                  <Button
                    className='w-full'
                    onClick={() => handleRemovePreferred(address)}
                    loading={latestRemovePreferred === address && tx.isPending}
                  >
                    {t('actions.removePreferred')}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
      <MakePreferredForm nftAddress={nftId} />
    </SettingCard>
  )
}

export default AttestatorsSetting
