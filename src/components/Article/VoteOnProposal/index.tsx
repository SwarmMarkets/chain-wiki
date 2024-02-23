import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import useModalState from '@src/hooks/useModalState'
import { useTranslation } from 'react-i18next'
import VoteOnProposalModal from './VoteOnProposalModal'

const VoteOnProposalButton = () => {
  const { t } = useTranslation('article')

  const { isOpen, open, close } = useModalState(false)

  return (
    <Flex $gap='5px' alignItems='center'>
      <Button onClick={open} px={4}>
        {t('vote')}
      </Button>

      <VoteOnProposalModal isOpen={isOpen} onClose={close} />
    </Flex>
  )
}

export default VoteOnProposalButton
