import { useAddress } from '@thirdweb-dev/react'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSX1155NFTFactory } from 'src/hooks/contracts/useSX1155NFTFactory'
import useCreateNftForm, {
  CreateNftFormInputs,
} from 'src/hooks/forms/useCreateNftForm'
import { generateSymbolFromString } from 'src/shared/utils'
import UploadFileButton from '../common/UploadFileButton'
import Button from '../ui-kit/Button/Button'
import TextField from '../ui-kit/TextField/TextField'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'

interface CreateNftFormProps {
  onSuccessSubmit(): void
  onErrorSubmit(e: Error): void
}

const CreateNftForm: React.FC<CreateNftFormProps> = ({
  onSuccessSubmit,
  onErrorSubmit,
}) => {
  const { t } = useTranslation('nft', { keyPrefix: 'createNft' })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreateNftForm()
  const { call, txLoading } = useSX1155NFTFactory()
  const account = useAddress()
  const { smartAccountInfo } = useSmartAccount()
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)
  const onSubmit: SubmitHandler<CreateNftFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account || !smartAccountInfo?.address) return

    const { name } = data
    const symbol = generateSymbolFromString(name)
    const owner = account
    const admins = [account, smartAccountInfo.address]
    const editors = [account, smartAccountInfo.address]
    const kya = JSON.stringify({
      logoUrl: uploadedLogoUrl,
    })

    try {
      const response = await call('deployChainWiki', [
        name,
        symbol,
        kya,
        owner,
        admins,
        editors,
      ])
      if (!response) throw new Error('Failed to deploy NFT contract')
      onSuccessSubmit()
    } catch (e) {
      onErrorSubmit(e)
      // TODO: Add error handler
    }
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
        <div className='mb-2'>
          {uploadedLogoUrl && (
            <div className='p-5 flex justify-center bg-gray-100 rounded'>
              <img className='max-w-52 max-h-28' src={uploadedLogoUrl} />
            </div>
          )}
          <UploadFileButton className='w-full mt-2' onUpload={handleUploadLogo}>
            {t('form.uploadLogo')}
          </UploadFileButton>
        </div>
        <Button type='submit' loading={txLoading}>
          {t('form.submit')}
        </Button>
      </form>
    </div>
  )
}

export default CreateNftForm
