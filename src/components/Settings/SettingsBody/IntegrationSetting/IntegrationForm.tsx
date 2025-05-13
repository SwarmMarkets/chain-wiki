import { useAddress } from '@thirdweb-dev/react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from 'src/components/ui-kit/Button/Button'
import TextField from 'src/components/ui-kit/TextField/TextField'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import useIntegrationForm, { IntegrationFormInputs } from './useIntegrationForm'
interface IntegrationFormProps {
  onSuccessSubmit(): void
  onErrorSubmit(e: Error): void
}

const IntegrationForm: React.FC<IntegrationFormProps> = ({
  onSuccessSubmit,
  onErrorSubmit,
}) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings.import' })

  const account = useAddress()
  const { smartAccountInfo } = useSmartAccount()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useIntegrationForm()
  const onSubmit: SubmitHandler<IntegrationFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account) return

    const { username, repoName, branchName } = data

    console.log(username, repoName, branchName)

    try {
      onSuccessSubmit()
    } catch (e) {
      onErrorSubmit(e)
      // TODO: Add error handler
    }
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p className='typo-body1'>{t('form.username')}</p>
        <TextField
          inputProps={{
            placeholder: t('formPlaceholders.username'),
            ...register('username'),
          }}
          errorMessage={errors.username?.message}
        />
      </div>
      <div>
        <p className='typo-body1'>{t('form.repoName')}</p>
        <TextField
          inputProps={{
            placeholder: t('formPlaceholders.repoName'),
            ...register('repoName'),
          }}
          errorMessage={errors.repoName?.message}
        />
      </div>
      <div>
        <p className='typo-body1'>{t('form.branchName')}</p>
        <TextField
          inputProps={{
            placeholder: t('formPlaceholders.branchName'),
            ...register('branchName'),
          }}
          errorMessage={errors.branchName?.message}
        />
      </div>

      <Button type='submit'>{t('form.submit')}</Button>
    </form>
  )
}

export default IntegrationForm
