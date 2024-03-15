import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolvber'
import yup from '@src/shared/validations/yup'
import { useForm } from 'react-hook-form'

export interface CreateProjectFormInputs {
  name: string
  uri: string
}

const useCreateProjectForm = () => {
  const { t } = useTranslation('project', { keyPrefix: 'createProject' })
  const resolver = useYupValidationResolver(
    yup.object({
      name: yup.string().required(t('formErrors.name.required')),
    })
  )

  return useForm<CreateProjectFormInputs>({ resolver })
}

export default useCreateProjectForm
