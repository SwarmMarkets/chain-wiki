import {
  ActionStateItem,
  ActionStateWrap,
} from '@src/components/ui/ActionState'
import Box from '@src/components/ui/Box'
import Button from '@src/components/ui/Button/Button'
import LoadingButton from '@src/components/ui/Button/LoadingButton'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import useVoteProposal from '@src/hooks/snapshot/useVoteProposal'
import { VoteProposal } from '@src/shared/types/vote-proposal'
import { ChangeEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import {
  StyledList,
  StyledListItem,
  StyledTextField,
} from './styled-components'

interface UploadVoteProposalProps {
  onUploadVoteProposal(value: VoteProposal): void
  nextStep(): void
}

const UploadVoteProposal: React.FC<UploadVoteProposalProps> = ({
  nextStep,
  onUploadVoteProposal,
}) => {
  const { t } = useTranslation('article', { keyPrefix: 'uploadProposal' })
  const { getProposal, loading, error, result } = useVoteProposal()

  const [proposalHash, setProposalHash] = useState('')

  const handleUpdateProposalHash = (e: ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value
    setProposalHash(res)
  }

  const uploadProposal = async () => {
    const res = await getProposal(proposalHash)
    if (res) {
      onUploadVoteProposal(res)
    }
  }

  const theme = useTheme()

  const validProposal = Boolean(!loading && !error && result)

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
    <Box py={2} px={2}>
      <Text.h2 mb={3}>{t('title')}</Text.h2>

      <Text.p
        mb={3}
        lineHeight={1.3}
        fontSize={16}
        color={theme.palette.darkGray}
      >
        {t('description')}
      </Text.p>

      <StyledList>
        <StyledListItem>{t('steps.1')}</StyledListItem>
        <StyledListItem>{t('steps.2')}</StyledListItem>
      </StyledList>

      <Flex flexDirection='row' $gap='10px' height='50px' mb={1}>
        <StyledTextField
          onChange={handleUpdateProposalHash}
          width='100%'
          placeholder={t('proposalHash')}
        />

        <LoadingButton height='40px' onClick={uploadProposal} loading={loading}>
          {t('upload')}
        </LoadingButton>
      </Flex>

      <ActionStateWrap mb={3}>
        <ActionStateItem
          loading={loading}
          success={validProposal}
          error={!!error}
        >
          {actionItemText}
        </ActionStateItem>
      </ActionStateWrap>

      <Button disabled={!validProposal} onClick={nextStep} width='100%'>
        {t('continue')}
      </Button>
    </Box>
  )
}

export default UploadVoteProposal
