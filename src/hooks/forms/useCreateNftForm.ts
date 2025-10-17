"use client"

import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolver'
import yup from 'src/shared/validations/yup'
import { useForm } from 'react-hook-form'

export interface CreateNftFormInputs {
  name: string
  slug: string
}

const useCreateNftForm = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'createNft' })
  const resolver = useYupValidationResolver(
    yup.object({
      name: yup.string().required(t('formErrors.name.required')),
      slug: yup.string().required(t('formErrors.slug.required')),
    })
  )

  return useForm<CreateNftFormInputs>({ resolver })
}

export default useCreateNftForm
