import useVoteProposal from 'src/hooks/snapshot/useVoteProposal'
import { VoteProposal } from 'src/shared/types/vote-proposal'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Card from 'src/components/ui-kit/Card'
import Button from 'src/components/ui-kit/Button/Button'
import TextField from 'src/components/ui-kit/TextField/TextField'
import StatusLoader from 'src/components/ui-kit/StatusLoader/StatusLoader'
import Alert from 'src/components/ui-kit/Alert'

interface UploadVoteProposalProps {
  onUploadVoteProposal(value: VoteProposal): void
  nextStep(): void
}

const UploadVoteProposal: React.FC<UploadVoteProposalProps> = ({
  nextStep,
  onUploadVoteProposal,
}) => {
  const { t } = useTranslation('token', { keyPrefix: 'uploadProposal' })
  const { getProposal, loading, error, result } = useVoteProposal()

  const [proposalHash, setProposalHash] = useState('')

  const handleUpdateProposalHash = (value: string) => {
    setProposalHash(value)
  }

  const uploadProposal = async () => {
    const res = await getProposal(proposalHash)
    if (res) {
      onUploadVoteProposal(res)
    }
  }

  const validProposal = Boolean(!loading && !error && result)

  const status: 'pending' | 'loading' | 'success' = loading
    ? 'loading'
    : error
    ? 'pending'
    : validProposal
    ? 'success'
    : 'pending'

  const actionItemText = useMemo(() => {
    if (loading) {
      return t('validating')
    }
    if (error) {
      return error
    }
    if (validProposal) {
      return t('successValidation')
    }
    return t('uploadToValidate')
  }, [error, loading, t, validProposal])

  return (
    <Card style={{ maxWidth: 500, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 16 }}>{t('title')}</h2>
        <div style={{ marginBottom: 16, color: '#666', fontSize: 16, lineHeight: 1.3 }}>
          {t('description')}
        </div>
        <ul style={{ marginBottom: 16, paddingLeft: 20 }}>
          <li>{t('steps.1')}</li>
          <li>{t('steps.2')}</li>
        </ul>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <TextField
            value={proposalHash}
            onChange={handleUpdateProposalHash}
            inputProps={{ placeholder: t('proposalHash') }}
            size='md'
          />
        </div>
        <Button onClick={uploadProposal} loading={loading} style={{ height: 40, minWidth: 100 }}>
          {t('upload')}
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <StatusLoader status={status} />
        <span style={{ fontSize: 14 }}>
          {actionItemText}
        </span>
      </div>
      {error && (
        <Alert color='error' style={{ marginBottom: 16 }}>{error}</Alert>
      )}
      <Button disabled={!validProposal} onClick={nextStep} style={{ width: '100%' }}>
        {t('continue')}
      </Button>
    </Card>
  )
}

export default UploadVoteProposal
