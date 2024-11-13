import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolvber'
import yup from '@src/shared/validations/yup'
import { useForm } from 'react-hook-form'

export interface EditHeaderLinksInputs {
  title: string
  url: string
}

const useEditHeaderLinks = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })
  const resolver = useYupValidationResolver(
    yup.object({
      title: yup
        .string()
        .required(t('editHeaderLinks.formErrorsTitle.name.required')),
      url: yup
        .string()
        .required(t('editHeaderLinks.formErrorsHttps.name.required')),
    })
  )

  return useForm<EditHeaderLinksInputs>({ resolver })
}

export default useEditHeaderLinks
