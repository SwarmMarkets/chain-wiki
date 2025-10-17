'use client'

import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolver'
import yup from 'src/shared/validations/yup'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo, useRef } from 'react'
import useTokens from 'src/hooks/subgraph/useTokens'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import { useEditingStore } from 'src/shared/store/editing-store'
import { unifyAddressToId } from 'src/shared/utils'
import useDebouncedValue from '../useDebouncedValue'

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
      slug: yup
        .string()
        .required(t('slug.required'))
        .matches(/^[A-Za-z0-9-]+$/i, t('slug.invalid')),
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

  const { editedIndexPages, addedTokens, editedTokens } = useEditingStore()
  // Real-time uniqueness validation for manually edited slugs
  const { nftId } = useNFTIdParam()
  const { fullTokens } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(nftId) }, limit: 200 },
      skip: !nftId,
    },
    { fetchFullData: false }
  )

  const occupiedSlugs = useMemo(() => {
    return new Set<string>([
      ...(fullTokens?.map(t => t.slug) || []),
      ...editedIndexPages.items.map(p => p.slug),
      ...addedTokens.map(t => t.slug),
      ...editedTokens.map(t => t.slug),
    ])
  }, [addedTokens, editedIndexPages.items, editedTokens, fullTokens])

  const currentSlug = methods.watch('slug')
  const debouncedSlug = useDebouncedValue(currentSlug, 250)

  useEffect(() => {
    const initialSlug = defaultValues?.slug
    const value = debouncedSlug?.trim()
    if (!value) return

    // Only enforce uniqueness when user changed slug from the initial one
    const changed = value !== initialSlug
    if (changed && occupiedSlugs.has(value)) {
      methods.setError('slug', {
        type: 'validate',
        message: t('slug.exists') as string,
      })
    } else {
      // Don't clear other validation errors (format/required)
      const err = methods.formState.errors.slug
      if (!err || err.type === 'validate') {
        methods.clearErrors('slug')
      }
    }
  }, [debouncedSlug, occupiedSlugs, defaultValues?.slug, methods, t])

  return {
    ...methods,
    isSlugManuallyEdited: isSlugManuallyEdited.current,
  }
}

export default useEditIndexPageForm
