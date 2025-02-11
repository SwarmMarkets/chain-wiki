import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolvber'
import yup from 'src/shared/validations/yup'
import { useForm } from 'react-hook-form'

export interface CreateNftFormInputs {
  name: string
  uri: string
}

const useCreateNftForm = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'createNft' })
  const resolver = useYupValidationResolver(
    yup.object({
      name: yup.string().required(t('formErrors.name.required')),
    })
  )

  return useForm<CreateNftFormInputs>({ resolver })
}

export default useCreateNftForm
