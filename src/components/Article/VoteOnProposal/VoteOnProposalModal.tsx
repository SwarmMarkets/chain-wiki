import { useTokenContext } from '@src/components/providers/TokenContext'
import Box from '@src/components/ui/Box'
import Modal from '@src/components/ui/Modal'
import Text from '@src/components/ui/Text'
import { BasicModalProps } from '@src/shared/types/common-props'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import VoteOnProposalForm from './VoteOnProposalForm'

const VoteOnProposalModal: React.FC<BasicModalProps> = ({ ...props }) => {
  const token = useTokenContext()
  const { t } = useTranslation('article', { keyPrefix: 'voteOnProposal' })
  const theme = useTheme()

  const voteProposal = token?.ipfsContent?.voteProposal

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

        <Text.h3 color='nearBlack' mb={3}>
          {voteProposal?.title}
        </Text.h3>
        <Text.p mb={3} lineHeight={1.5}>
          {voteProposal?.body}
        </Text.p>

        <VoteOnProposalForm />
      </Box>
    </Modal>
  )
}

export default VoteOnProposalModal
