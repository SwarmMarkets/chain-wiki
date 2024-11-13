import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolvber'
import yup from '@src/shared/validations/yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { IpfsHeaderLink } from '@src/shared/utils'
import { TFunction } from 'i18next'

export interface EditHeaderLinksInputs {
  title: string
  url: string
}

export interface EditHeaderLinksFormValues {
  headerLinks: Omit<IpfsHeaderLink, 'id'>[]
}

const createSchema = (t: TFunction) =>
  yup.object().shape({
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

const useEditHeaderLinks = (initLinks: IpfsHeaderLink[]) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  const schema = createSchema(t)

  const resolver = useYupValidationResolver(schema)

  const { control, watch, ...form } = useForm<EditHeaderLinksFormValues>({
    resolver,
    defaultValues: {
      headerLinks: initLinks,
    },
    mode: 'onChange',
  })

  const fieldArray = useFieldArray({
    control,
    name: 'headerLinks',
  })

  const headerLinks = watch('headerLinks').map((link, index) => ({
    ...link,
    id: fieldArray.fields[index].id,
  }))
  const errors = form.formState.errors

  return { form, errors, headerLinks, fieldArray }
}

export default useEditHeaderLinks
