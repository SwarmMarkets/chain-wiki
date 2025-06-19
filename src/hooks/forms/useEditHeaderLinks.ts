import { useTranslation } from 'react-i18next'
import yup from 'src/shared/validations/yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { getUniqueId, IpfsHeaderLink } from 'src/shared/utils'
import { TFunction } from 'i18next'
import { useCustomizationStore } from 'src/shared/store/customization-store'
import { useEffect, useCallback } from 'react'
import useYupValidationResolver from '../useYupValidationResolver'

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
        url: yup
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

  const handleUpdate = useCallback(
    (newLinks: IpfsHeaderLink[]) => {
      setHeaderLinks(newLinks)
    },
    [setHeaderLinks]
  )

  useEffect(() => {
    const subscription = watch(value => {
      return (
        value.headerLinks &&
        handleUpdate(
          value.headerLinks.map(
            link =>
              ({
                ...link,
                id: link?.id || getUniqueId(),
              } as IpfsHeaderLink)
          )
        )
      )
    })
    return () => subscription.unsubscribe()
  }, [watch, handleUpdate])

  const errors = form.formState.errors

  return { form, errors, headerLinks, fieldArray }
}

export default useEditHeaderLinks
