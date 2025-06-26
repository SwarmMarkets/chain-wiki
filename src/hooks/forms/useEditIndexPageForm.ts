import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolver'
import yup from 'src/shared/validations/yup'
import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'

export interface EditIndexPageFormInputs {
  name: string
  slug: string
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric chars with dash
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
}

const useEditIndexPageForm = (defaultValues?: EditIndexPageFormInputs) => {
  const { t } = useTranslation('edit', {
    keyPrefix: 'indexPages.editPage.form',
  })
  const isSlugManuallyEdited = useRef(false)

  const resolver = useYupValidationResolver(
    yup.object({
      name: yup.string().required(t('name.required')),
      slug: yup.string().required(t('slug.required')),
    })
  )

  const methods = useForm<EditIndexPageFormInputs>({
    resolver,
    defaultValues,
  })

  // Reset the manual edit flag when the form is reset (like when opening the modal)
  useEffect(() => {
    isSlugManuallyEdited.current = false
  }, [defaultValues])

  // Watch name changes and update slug
  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      if (name === 'name' && !isSlugManuallyEdited.current) {
        const newSlug = generateSlug(value.name || '')
        if (methods.getValues('slug') !== newSlug) {
          methods.setValue('slug', newSlug, {
            shouldValidate: true,
          })
        }
      } else if (name === 'slug' && type === 'change') {
        isSlugManuallyEdited.current = true
      }
    })

    return () => subscription.unsubscribe()
  }, [methods])

  return {
    ...methods,
    isSlugManuallyEdited: isSlugManuallyEdited.current,
  }
}

export default useEditIndexPageForm
