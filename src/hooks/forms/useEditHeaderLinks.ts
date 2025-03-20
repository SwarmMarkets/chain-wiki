import { useTranslation } from 'react-i18next'
import yup from 'src/shared/validations/yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { IpfsHeaderLink } from 'src/shared/utils'
import { TFunction } from 'i18next'
import useYupValidationResolver from '../useYupValidationResolvber'
import { useCustomizationStore } from 'src/shared/store/customization-store'
import { useEffect } from 'react'

export interface EditHeaderLinksInputs {
  title: string
  url: string
}

export interface EditHeaderLinksFormValues {
  headerLinks: IpfsHeaderLink[]
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

const useEditHeaderLinks = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })
  const { headerLinks, setHeaderLinks } = useCustomizationStore()

  const schema = createSchema(t)
  const resolver = useYupValidationResolver(schema)

  const { control, watch, ...form } = useForm<EditHeaderLinksFormValues>({
    resolver,
    defaultValues: { headerLinks },
    mode: 'onChange',
  })

  const fieldArray = useFieldArray({ control, name: 'headerLinks' })

  // Слежение за изменениями и обновление состояния в zustand
  const watchedLinks = watch('headerLinks')
  useEffect(() => {
    setHeaderLinks(watchedLinks)
  }, [setHeaderLinks, watchedLinks])

  const errors = form.formState.errors

  return { form, errors, headerLinks: watchedLinks, fieldArray }
}

export default useEditHeaderLinks
