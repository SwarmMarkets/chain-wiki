import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import ExplorerLink from 'src/components/common/ExplorerLink'
import Button from 'src/components/ui-kit/Button/Button'
import Table from 'src/components/ui-kit/Table'
import useNFT from 'src/hooks/subgraph/useNFT'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import SettingCard from '../../SettingCard'
import MakePreferredForm from './MakePreferredForm'

const AttestatorsSetting = () => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation('nft', { keyPrefix: 'attestatorsManager' })
  const { nft } = useNFT(nftId)
  const { signTransaction, tx } = useNFTUpdate(nftId)

  const [latestRemovePreferred, setLatestRemovePreferred] = useState('')

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
      {nft && nft.preferredAttestators.length > 0 && (
        <Table.Root className='mb-4'>
          <Table.Header>
            <Table.HeaderRow>
              <Table.HeadCell>{t('tableHead.address')}</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.HeaderRow>
          </Table.Header>
          <Table.Body>
            {nft?.preferredAttestators.map(address => (
              <Table.Row key={address}>
                <Table.Cell>
                  <ExplorerLink type='address' hash={address}>
                    {address}
                  </ExplorerLink>
                </Table.Cell>
                <Table.Cell align='right'>
                  <Button
                    className='w-full'
                    onClick={() => handleRemovePreferred(address)}
                    loading={latestRemovePreferred === address && tx.txLoading}
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
