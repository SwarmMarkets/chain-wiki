import React from 'react'
import { useTranslation } from 'react-i18next'
import EditHeaderLinks from 'src/components/Nft/NftView/EditHeaderLinks'
import Card from 'src/components/ui/Card'
import { NFTWithMetadata } from 'src/shared/utils'

interface NftLayoutSideBarGeneralTabProps {
  nft: NFTWithMetadata | null
}

const NftLayouSideBarLayout: React.FC<NftLayoutSideBarGeneralTabProps> = ({
  nft,
}) => {
  const { t } = useTranslation(['nft', 'layout'])

  return (
    <div>
      <Card>
        <h4 className='typo-title2 text-main-accent font-semibold'>
          {t('settings.editHeaderLinks.title')}
        </h4>
        <div className='border-b border-main my-4'></div>
        <div className='mb-2'>
          <div className='typo-title2 text-main-accent font-semibold mb-1'>
            {t('settings.editHeaderLinks.subtitle')}
          </div>
          <div>{t('settings.editHeaderLinks.description')}</div>
        </div>
        {nft?.id && (
          <Card>
            <EditHeaderLinks nftAddress={nft.id} />
          </Card>
        )}
      </Card>
    </div>
  )
}

export default NftLayouSideBarLayout
