import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import Text from '../ui/Text'
import styled, { useTheme } from 'styled-components'
import Icon from '../ui/Icon'
import Flex from '../ui/Flex'
import Box from '../ui/Box'
import CreateTokenModal from '../CreateToken/CreateTokenModal'
import useModalState from '@src/hooks/useModalState'

const StyledCard = styled(Card)`
  cursor: pointer;
`
const CreateTokenCard = () => {
  const { t } = useTranslation('token')
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
          <Box height={50}>
            <Icon
              name='plus'
              size={50}
              cursor='pointer'
              color={theme.palette.borderPrimary}
            />
          </Box>
          <Text mt={2} color={theme.palette.borderPrimary}>
            {t('addToken')}
          </Text>
        </Flex>
      </StyledCard>
      <CreateTokenModal isOpen={isOpen} onClose={close} />
    </>
  )
}

export default CreateTokenCard
