import React, { useState } from 'react'
import TextField from 'src/components/ui-kit/TextField/TextField'
import useNFT from 'src/hooks/subgraph/useNFT'
import { useTranslation } from 'react-i18next'
import useSendTx from 'src/hooks/web3/useSendTx'
import Button from 'src/components/ui-kit/Button/Button'
import useSX1155NFTFactory from 'src/hooks/contracts/factory/useSX1155NFTFactory'
import { useNftBySlugOrAddress } from 'src/hooks/subgraph/useNftBySlugOrAddress'
import useDebouncedValue from 'src/hooks/useDebouncedValue'

interface SiteSlugSettingProps {
  nftAddress: string
}

const SiteSlugSetting: React.FC<SiteSlugSettingProps> = ({ nftAddress }) => {
  const { nft } = useNFT(nftAddress, { disableRefetch: true })
  const [slug, setSlug] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { t: tButtons } = useTranslation('buttons')
  const { t } = useTranslation('nft', { keyPrefix: 'settings.siteSlug' })
  const { prepareUpdateChainWikiSlugTx } = useSX1155NFTFactory()
  const { sendTx } = useSendTx()

  const handleSlugChange = (value: string) => {
    setSlug(value)
  }

  const handleSlugSave = async () => {
    if (!slug || slug === nft?.slug) return
    setLoading(true)
    try {
      const tx = prepareUpdateChainWikiSlugTx({
        chainWiki: nftAddress,
        slug,
      })
      if (tx) {
        await sendTx(tx, { successMessage: t('save') })
      }
    } finally {
      setLoading(false)
    }
  }

  const slugValue = slug === null ? nft?.slug || '' : slug
  const slugChanged = slugValue && slugValue !== nft?.slug
  const slugError = !slugValue || !/^[A-Za-z0-9-.]+$/.test(slugValue)

  // Check for slug uniqueness when format is valid and value is changed
  const slugToCheck = slugChanged && !slugError ? slugValue : undefined

  // Debounce slug checks to avoid excessive queries
  const debouncedSlug = useDebouncedValue<string | undefined>(slugToCheck)

  const { nft: existingNft, loading: checkingSlug } =
    useNftBySlugOrAddress(debouncedSlug)
  const slugExistsError = !!(
    slugChanged &&
    !slugError &&
    existingNft &&
    existingNft.id !== nft?.id
  )

  return (
    <div className='grid grid-cols-[1fr_auto] gap-2 items-center'>
      <TextField
        value={slugValue}
        onChange={handleSlugChange}
        inputProps={{ placeholder: t('formPlaceholders.slug') }}
        errorMessage={
          slugChanged && slugError
            ? t('formErrors.invalid')
            : slugExistsError
            ? t('formErrors.exists')
            : undefined
        }
      />
      <div className='mb-3'>
        <Button
          onClick={handleSlugSave}
          disabled={
            !slugChanged ||
            slugError ||
            slugExistsError ||
            loading ||
            checkingSlug
          }
          loading={loading}
        >
          {tButtons('save')}
        </Button>
      </div>
    </div>
  )
}

export default SiteSlugSetting
