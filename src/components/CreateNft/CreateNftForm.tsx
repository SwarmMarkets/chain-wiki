"use client"

import { useActiveAccount } from 'thirdweb/react'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useCreateNftForm, {
  CreateNftFormInputs,
} from 'src/hooks/forms/useCreateNftForm'
import { generateSymbolFromString } from 'src/shared/utils'
import UploadFileButton from '../common/UploadFileButton'
import Button from '../ui-kit/Button/Button'
import TextField from '../ui-kit/TextField/TextField'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { generateSlug } from '../Edit/utils'
import { useEffect } from 'react'
import useSX1155NFTFactory from 'src/hooks/contracts/factory/useSX1155NFTFactory'
import useSendTx from 'src/hooks/web3/useSendTx'
import { useNftBySlugOrAddress } from 'src/hooks/subgraph/useNftBySlugOrAddress'
import useDebouncedValue from 'src/hooks/useDebouncedValue'

interface CreateNftFormProps {
  onSuccessSubmit(): void
}

const CreateNftForm: React.FC<CreateNftFormProps> = ({ onSuccessSubmit }) => {
  const { t } = useTranslation('nft', { keyPrefix: 'createNft' })
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useCreateNftForm()
  const { prepareDeployChainWikiTx } = useSX1155NFTFactory()
  const { sendTx, isPending } = useSendTx()
  const account = useActiveAccount()
  const { smartAccountInfo } = useSmartAccount()
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)

  const name = watch('name')
  const slug = watch('slug')

  useEffect(() => {
    if (name) {
      setValue('slug', generateSlug(name))
    }
  }, [name, setValue])

  // Slug validation (format + uniqueness)
  const slugValue = slug || ''
  const slugInvalid = !!slugValue && !/^[A-z0-9-]+$/.test(slugValue)
  const slugToCheck = slugValue && !slugInvalid ? slugValue : undefined
  const debouncedSlug = useDebouncedValue<string | undefined>(slugToCheck)
  const { nft: existingNft, loading: checkingSlug } = useNftBySlugOrAddress(
    debouncedSlug
  )
  const slugExistsError = !!existingNft

  const onSubmit: SubmitHandler<CreateNftFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account?.address || !smartAccountInfo?.address) return

    const { name, slug } = data
    const symbol = generateSymbolFromString(name)
    const owner = account.address
    const admins = [account.address, smartAccountInfo.address]
    const editors = [account.address, smartAccountInfo.address]
    const kya = JSON.stringify({
      logoUrl: uploadedLogoUrl,
    })

    const tx = prepareDeployChainWikiTx({
      data: {
        name,
        symbol,
        kya,
      },
      slug,
      roles: {
        owner,
        admins,
        editors,
      },
    })
    await sendTx(tx, { successMessage: t('successMessage') })
    onSuccessSubmit()
  }

  const handleUploadLogo = (url: string) => {
    setUploadedLogoUrl(url)
  }

  return (
    <div>
      <h1 className='mb-1 text-center'>{t('title')}</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <p className='typo-body1'>{t('form.name')}</p>
        <TextField
          inputProps={{
            placeholder: t('formPlaceholders.name'),
            ...register('name'),
          }}
          errorMessage={errors.name?.message}
        />
        <p className='typo-body1 mt-1'>{t('form.slug')}</p>
        <TextField
          inputProps={{
            placeholder: t('formPlaceholders.slug'),
            ...register('slug'),
          }}
          errorMessage={
            errors.slug?.message ||
            (slugInvalid
              ? t('formErrors.slug.invalid')
              : slugExistsError
              ? t('formErrors.slug.exists')
              : undefined)
          }
        />
        <div className='mb-2 mt-2'>
          {uploadedLogoUrl && (
            <div className='p-5 flex justify-center bg-gray-100 rounded'>
              <img className='max-w-52 max-h-28' src={uploadedLogoUrl} />
            </div>
          )}
          <UploadFileButton className='w-full mt-2' onUpload={handleUploadLogo}>
            {t('form.uploadLogo')}
          </UploadFileButton>
        </div>
        <Button
          type='submit'
          loading={isPending}
          disabled={isPending || slugInvalid || slugExistsError || checkingSlug}
        >
          {t('form.submit')}
        </Button>
      </form>
    </div>
  )
}

export default CreateNftForm
