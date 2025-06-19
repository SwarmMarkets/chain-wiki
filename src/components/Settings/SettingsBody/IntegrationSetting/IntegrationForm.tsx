import { useTranslation } from 'react-i18next'
import Button from 'src/components/ui-kit/Button/Button'
import TextField from 'src/components/ui-kit/TextField/TextField'
import useIntegrationForm from './useIntegrationForm'

const IntegrationForm = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings.import' })

  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    loading,
  } = useIntegrationForm()

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

      <Button type='submit' loading={loading}>
        {t('form.submit')}
      </Button>
    </form>
  )
}

export default IntegrationForm
