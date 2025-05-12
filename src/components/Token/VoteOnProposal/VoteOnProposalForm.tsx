import LoadingButton from 'src/components/ui/Button/LoadingButton'
import { Select } from 'src/components/ui/Select'
import api from 'src/services/api'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyledTextField } from './styled-components'
import useVoteOnProposalForm, {
  VoteOnProposalFormInputs,
} from 'src/hooks/forms/useVoteOnProposalForm'
import { TokenQueryFullData } from 'src/shared/utils'

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
    formState: { errors },
  } = useVoteOnProposalForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const voteProposal = token?.voteProposal

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
    <form onSubmit={handleSubmit(onSubmit)}>
      {voteProposal?.choices && (
        <Select
          inputProps={{
            ...register('choice'),
            defaultValue: '',
          }}
          mb='25px'
          error={errors.choice?.message}
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
        error={errors.email?.message || error}
        placeholder={t('formPlaceholders.email')}
        mb='30px'
      />

      <LoadingButton width='100%' height='40px' loading={loading}>
        {t('submit')}
      </LoadingButton>
    </form>
  )
}

export default VoteOnProposalForm
