import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolvber'
import yup from '@src/shared/validations/yup'
import { useForm } from 'react-hook-form'

export interface CreateProjectFormInputs {
  name: string
  symbol: string
  uri: string
  admin: string
  editor: string
}

const useCreateProjectForm = () => {
  const { t } = useTranslation('project', { keyPrefix: 'createProject' })
  const resolver = useYupValidationResolver(
    yup.object({
      name: yup.string().required(t('formErrors.name.required')),
      symbol: yup.string().required(t('formErrors.symbol.required')),
      admin: yup
        .string()
        .required(t('formErrors.admin.required'))
        .isEthereumAddress(t('formErrors.admin.invalid')),
      editor: yup
        .string()
        .required(t('formErrors.editor.required'))
        .isEthereumAddress(t('formErrors.editor.invalid')),
    })
  )

  return useForm<CreateProjectFormInputs>({ resolver })
}

export default useCreateProjectForm
