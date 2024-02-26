import { useTokenContext } from '@src/components/providers/TokenContext'
import LoadingButton from '@src/components/ui/Button/LoadingButton'
import { Select } from '@src/components/ui/Select'
import api from '@src/services/api'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyledTextField } from './styled-components'
import { useState } from 'react'

type FormInputs = {
  choice: string
  email: string
}

interface VoteOnProposalFormProps {
  onSuccessSubmit(): void
}

const VoteOnProposalForm: React.FC<VoteOnProposalFormProps> = ({
  onSuccessSubmit,
}) => {
  const token = useTokenContext()
  const { t } = useTranslation('article', { keyPrefix: 'voteOnProposal' })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const [loading, setLoading] = useState(false)

  const voteProposal = token?.ipfsContent?.voteProposal

  const onSubmit: SubmitHandler<FormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!voteProposal) return
    const { email, choice } = data
    const choiceIndex = voteProposal.choices.indexOf(choice) + 1

    try {
      setLoading(true)
      await api.citiesdaoVote(
        email,
        voteProposal.space,
        voteProposal.id,
        choiceIndex
      )
      onSuccessSubmit()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {voteProposal?.choices && (
        <Select
          defaultValue=''
          mb={3}
          height='44px'
          {...register('choice', { required: true })}
        >
          <option value='' disabled hidden>
            {t('formPlaceholders.choice')}
          </option>
          {Object.values(voteProposal?.choices).map(choice => (
            <option key={choice} value={choice}>
              {choice.charAt(0).toUpperCase() + choice.slice(1)}
            </option>
          ))}
        </Select>
      )}

      <StyledTextField
        inputProps={register('email', { required: true })}
        error={errors.email?.message}
        placeholder={t('formPlaceholders.email')}
        mb={3}
      />

      <LoadingButton width='100%' height='40px' loading={loading}>
        {t('submit')}
      </LoadingButton>
    </form>
  )
}

export default VoteOnProposalForm
