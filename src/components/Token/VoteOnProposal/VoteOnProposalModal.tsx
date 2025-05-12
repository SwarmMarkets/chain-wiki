import Box from 'src/components/ui/Box'
import Modal from 'src/components/ui/Modal'
import Text from 'src/components/ui/Text'
import { BasicModalProps } from 'src/shared/types/common-props'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import VoteOnProposalForm from './VoteOnProposalForm'
import { VoteProposalWrap } from '../UploadVoteProposal/styled-components'
import useToken from 'src/hooks/subgraph/useToken'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'

interface VoteOnProposalModalProps extends BasicModalProps {
  nextStep(): void
}

const VoteOnProposalModal: React.FC<VoteOnProposalModalProps> = ({
  nextStep,
  ...props
}) => {
  const fullTokenId = useFullTokenIdParam()
  const { token } = useToken(fullTokenId)
  const { t } = useTranslation('token', { keyPrefix: 'voteOnProposal' })
  const theme = useTheme()

  const voteProposal = token?.voteProposal

  return (
    <Modal {...props} maxWidth='500px' width='100%' minHeight='300px'>
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

        <VoteProposalWrap mb={3}>
          <Text.h3 color='nearBlack' mb={3}>
            {voteProposal?.title}
          </Text.h3>
          <Text.p lineHeight={1.5}>{voteProposal?.body}</Text.p>
        </VoteProposalWrap>

        <VoteOnProposalForm token={token} onSuccessSubmit={nextStep} />
      </Box>
    </Modal>
  )
}

export default VoteOnProposalModal
