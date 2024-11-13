import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolvber'
import yup from '@src/shared/validations/yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { IpfsHeaderLink } from '@src/shared/utils'

export interface EditHeaderLinksInputs {
  title: string
  url: string
}

const useEditHeaderLinks = (initLinks: IpfsHeaderLink[]) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  const schema = yup.object().shape({
    headerLink: yup.array().of(
      yup.object().shape({
        title: yup
          .string()
          .required(t('editHeaderLinks.formErrorsTitle.name.required')),
        link: yup
          .string()
          .required(t('editHeaderLinks.formErrorsHttps.name.required')),
      })
    ),
  })

  const resolver = useYupValidationResolver(schema)

  const { control, ...form } = useForm<{
    headerLink: Omit<IpfsHeaderLink, 'id'>[]
  }>({
    resolver: resolver,
    defaultValues: {
      headerLink: initLinks,
    },
  })

  const fieldArray = useFieldArray({
    control,
    name: 'headerLink',
  })

  return { form, fieldArray }
}

export default useEditHeaderLinks
