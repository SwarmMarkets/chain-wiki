'use client'

import api from 'src/services/api'
import { useState, useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useVoteOnProposalForm, {
  VoteOnProposalFormInputs,
} from 'src/hooks/forms/useVoteOnProposalForm'
import { TokenQueryFullData } from 'src/shared/utils'
import Select from 'src/components/ui-kit/Select/Select'
import Option from 'src/components/ui-kit/Select/Option'
import TextField from 'src/components/ui-kit/TextField/TextField'
import Button from 'src/components/ui-kit/Button/Button'

interface VoteOnProposalFormProps {
  onSuccessSubmit(): void
  token: TokenQueryFullData | null
}

const VoteOnProposalForm: React.FC<VoteOnProposalFormProps> = ({
  onSuccessSubmit,
  token,
}) => {
  const { t } = useTranslation(['token', 'errors'], {
    keyPrefix: 'voteOnProposal',
  })
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useVoteOnProposalForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const voteProposal = token?.voteProposal
  const selectedChoice = watch('choice')
  const emailValue = watch('email')

  // Register email field on mount for validation
  useEffect(() => {
    register('email', { required: true })
  }, [register])

  const onSubmit: SubmitHandler<VoteOnProposalFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!voteProposal) return
    const { email, choice } = data
    const choiceIndex = voteProposal.choices.indexOf(choice) + 1

    try {
      setError(null)
      setLoading(true)
      await api.citiesdaoVote(
        email,
        voteProposal.space,
        voteProposal.id,
        choiceIndex
      )

      onSuccessSubmit()
    } catch {
      setError(t('genericError', { ns: 'errors' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      {voteProposal?.choices && (
        <div className="w-full">
          <Select
            value={selectedChoice || ''}
            onChange={val => setValue('choice', val as string, { shouldValidate: true })}
            placeholder={t('formPlaceholders.choice')}
            className="w-full"
          >
            <Option value="" selectable={false}>
              {t('formPlaceholders.choice')}
            </Option>
            {voteProposal.choices.map(choice => (
              <Option key={choice} value={choice}>
                {choice.charAt(0).toUpperCase() + choice.slice(1)}
              </Option>
            ))}
          </Select>
          {errors.choice?.message && (
            <div className="text-error text-xs mt-1">{errors.choice.message}</div>
          )}
        </div>
      )}

      <div className="w-full">
        <TextField
          value={emailValue || ''}
          onChange={val => setValue('email', val, { shouldValidate: true })}
          inputProps={{
            placeholder: t('formPlaceholders.email'),
            type: 'email',
          }}
          errorMessage={errors.email?.message || error || undefined}
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full h-10"
        variant="contained"
        color="primary"
      >
        {t('submit')}
      </Button>
    </form>
  )
}

export default VoteOnProposalForm
