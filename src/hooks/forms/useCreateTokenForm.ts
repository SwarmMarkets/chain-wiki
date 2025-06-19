import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolver'
import yup from 'src/shared/validations/yup'
import { useForm } from 'react-hook-form'

export interface CreateTokenFormInputs {
  name: string
}

const useCreateTokenForm = () => {
  const { t } = useTranslation('token', { keyPrefix: 'createToken' })
  const resolver = useYupValidationResolver(
    yup.object({
      name: yup.string().required(t('formErrors.name.required')),
    })
  )

  return useForm<CreateTokenFormInputs>({ resolver })
}

export default useCreateTokenForm
