import useModalState from '@src/hooks/useModalState'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import CreateNftModal from '../CreateNft/CreateNftModal'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import Text from '../ui/Text'
import { StyledCard } from './styled-components'

const AddNftCard: React.FC = () => {
  const { t } = useTranslation(['errors', 'projects'])
  const theme = useTheme()
  const { isOpen, open, close } = useModalState(false)

  return (
    <>
      <StyledCard onClick={open}>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          height='100%'
          $gap='5px'
        >
          <Icon name='plus' size={70} color={theme.palette.borderPrimary} />
          <Text color={theme.palette.borderPrimary}>
            {t('addNft', { ns: 'projects' })}
          </Text>
        </Flex>
      </StyledCard>
      <CreateNftModal isOpen={isOpen} onClose={close} />
    </>
  )
}

export default AddNftCard
