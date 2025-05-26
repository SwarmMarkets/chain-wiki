import React, { useState } from 'react'
import TextField from 'src/components/ui-kit/TextField/TextField'
import UpdateNftContentButton from 'src/components/UpdateContent/UpdateNftContentButton'
import useNFT from 'src/hooks/subgraph/useNFT'
import { useTranslation } from 'react-i18next'

interface SiteNameSettingProps {
  nftAddress: string
}

const SiteNameSetting: React.FC<SiteNameSettingProps> = ({ nftAddress }) => {
  const { nft } = useNFT(nftAddress, { disableRefetch: true })
  const [name, setName] = useState<string | null>(null)
  const { t } = useTranslation('buttons')

  const handleNameChange = (name: string) => {
    setName(name)
  }

  const nameValue = name === null ? nft?.name : name

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-[1fr_auto] gap-2 items-center'>
        <TextField
          value={nameValue}
          onChange={handleNameChange}
          inputProps={{ placeholder: 'Enter site name' }}
        />
        <div className='mb-3'>
          <UpdateNftContentButton
            nftAddress={nftAddress}
            nftContentToUpdate={{ name: nameValue }}
            disabled={!nameValue || nameValue === nft?.name}
          >
            {t('save')}
          </UpdateNftContentButton>
        </div>
      </div>
    </div>
  )
}

export default SiteNameSetting
