'use client'

import yup from 'src/shared/validations/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolver'

export interface VoteOnProposalFormInputs {
  choice: string
  email: string
}

const useVoteOnProposalForm = () => {
  const { t } = useTranslation('token', {
    keyPrefix: 'voteOnProposal.formErrors',
  })
  const resolver = useYupValidationResolver(
    yup.object({
      choice: yup.string().required(t('choice.required')),
      email: yup
        .string()
        .required(t('email.required'))
        .email(t('email.invalid')),
    })
  )

  return useForm<VoteOnProposalFormInputs>({ resolver })
}

export default useVoteOnProposalForm
