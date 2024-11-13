import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolvber'
import yup from '@src/shared/validations/yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { IpfsHeaderLink } from '@src/shared/utils'

export interface EditHeaderLinksInputs {
  title: string
  url: string
}

export interface EditHeaderLinksFormValues {
  headerLinks: Omit<IpfsHeaderLink, 'id'>[]
}

const useEditHeaderLinks = (initLinks: IpfsHeaderLink[]) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  const schema = yup.object().shape({
    headerLinks: yup.array().of(
      yup.object().shape({
        title: yup
          .string()
          .required(t('editHeaderLinks.formErrors.title.required')),
        link: yup
          .string()
          .url(t('editHeaderLinks.formErrors.link.url'))
          .required(t('editHeaderLinks.formErrors.link.required')),
      })
    ),
  })

  const resolver = useYupValidationResolver(schema)

  const { control, ...form } = useForm<EditHeaderLinksFormValues>({
    resolver: resolver,
    defaultValues: {
      headerLinks: initLinks,
    },
  })

  const fieldArray = useFieldArray({
    control,
    name: 'headerLinks',
  })

  const errors = form.formState.errors

  return { form, errors, fieldArray }
}

export default useEditHeaderLinks
