import React from 'react'
import { useTranslation } from 'react-i18next'
import EditHeaderLinks from 'src/components/Nft/NftView/EditHeaderLinks'
import Card from 'src/components/ui-kit/Card'
import { useCustomizationStore } from 'src/shared/store/customization-store'
import { NFTWithMetadata } from 'src/shared/utils'
import ColorField from '../../ColorFIeld'

interface NftLayoutSideBarGeneralTabProps {
  nft: NFTWithMetadata
}

const NftLayouSideBarLayoutTab: React.FC<NftLayoutSideBarGeneralTabProps> = ({
  nft,
}) => {
  const { t } = useTranslation(['nft', 'layout'])
  const { headerBackground, setHeaderBackground } = useCustomizationStore()

  return (
    <div>
      <Card>
        <h4 className='typo-title2 text-main-accent font-semibold'>
          {t('settings.editHeaderLinks.title')}
        </h4>
        <div className='border-b border-main my-4'></div>
        <div>
          <div className='typo-title2 text-main-accent font-semibold mb-1'>
            {t('settings.headerColor.title')}
          </div>
          <div>{t('settings.headerColor.description')}</div>
        </div>
        <ColorField
          color={headerBackground}
          onChange={setHeaderBackground}
          className='mt-2'
        />
        <div className='mb-2'>
          <div className='typo-title2 text-main-accent font-semibold mb-1'>
            {t('settings.editHeaderLinks.subtitle')}
          </div>
          <div>{t('settings.editHeaderLinks.description')}</div>
        </div>
        {nft?.id && (
          <Card>
            <EditHeaderLinks />
          </Card>
        )}
      </Card>
    </div>
  )
}

export default NftLayouSideBarLayoutTab
