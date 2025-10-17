'use client'

import useModalState from 'src/hooks/useModalState'
import { useTranslation } from 'react-i18next'
import VoteOnProposalModal from './VoteOnProposalModal'
import Button, { ButtonProps } from 'src/components/ui-kit/Button/Button'

const VoteOnProposalButton: React.FC<ButtonProps> = props => {
  const { t } = useTranslation('token')

  const { isOpen, open, close } = useModalState(false)

  const handleFinishVoting = () => {
    close()
  }

  return (
    <>
      <Button onClick={open} {...props}>
        {t('vote')}
      </Button>

      <VoteOnProposalModal
        isOpen={isOpen}
        onClose={close}
        nextStep={handleFinishVoting}
      />
    </>
  )
}

export default VoteOnProposalButton
