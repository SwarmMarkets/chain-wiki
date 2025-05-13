import { useTranslation } from 'react-i18next'
import yup from 'src/shared/validations/yup'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from 'src/hooks/useYupValidationResolvber'

export interface IntegrationFormInputs {
  username: string
  repoName: string
  branchName: string
}

const useCreateNftForm = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings.import' })

  const resolver = useYupValidationResolver(
    yup.object({
      username: yup.string().required(t('formErrors.username.required')),
      repoName: yup.string().required(t('formErrors.repoName.required')),
      branchName: yup.string().required(t('formErrors.branchName.required')),
    })
  )

  return useForm<IntegrationFormInputs>({ resolver })
}

export default useCreateNftForm
