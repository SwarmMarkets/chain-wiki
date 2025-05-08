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
import StatusLoader from '../ui-kit/StatusLoader/StatusLoader'

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
  const { call } = useSX1155NFTFactory()
  const account = useAddress()
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)

  const [approveStatus, setApproveStatus] = useState<
    'pending' | 'loading' | 'success'
  >('pending')
  const [confirmStatus, setConfirmStatus] = useState<
    'pending' | 'loading' | 'success'
  >('pending')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit: SubmitHandler<CreateNftFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account) return

    const { name } = data
    const symbol = generateSymbolFromString(name)
    const admin = account
    const editor = account
    const jsonData = JSON.stringify({
      logoUrl: uploadedLogoUrl,
    })

    try {
      setIsSubmitting(true)
      setApproveStatus('loading')
      await new Promise(res => setTimeout(res, 1500))
      setApproveStatus('success')

      setConfirmStatus('loading')
      const response = await call('deployChainWiki', [
        { name, symbol, kya: jsonData },
        admin,
        editor,
      ])
      if (!response) throw new Error('Failed to deploy NFT contract')

      setConfirmStatus('success')
      onSuccessSubmit()
    } catch (e) {
      onErrorSubmit(e)
    } finally {
      setIsSubmitting(false)
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
        <div className='mb-4'>
          {uploadedLogoUrl && (
            <div className='p-5 flex justify-center bg-gray-100 rounded'>
              <img className='max-w-52 max-h-28' src={uploadedLogoUrl} />
            </div>
          )}
        </div>
        <div className='flex flex-col items-start gap-4 mb-4'>
          <div className='flex items-center gap-2'>
            <StatusLoader status={approveStatus} />
            <div>
              <p className='typo-body2 font-semibold'>{t('approve.title')}</p>
              <p className='typo-caption text-gray-500'>
                {t('approve.subtitle')}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <StatusLoader status={confirmStatus} />
            <div>
              <p className='typo-body2 font-semibold'>{t('confirm.title')}</p>
              <p className='typo-caption text-gray-500'>
                {t('confirm.subtitle')}
              </p>
            </div>
          </div>
        </div>
        <UploadFileButton className='w-full mb-2' onUpload={handleUploadLogo}>
          {t('form.uploadLogo')}
        </UploadFileButton>

        <Button type='submit' loading={isSubmitting}>
          {t('form.submit')}
        </Button>
      </form>
    </div>
  )
}

export default CreateNftForm
