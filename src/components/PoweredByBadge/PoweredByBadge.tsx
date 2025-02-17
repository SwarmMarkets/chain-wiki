import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Text from '../ui/Text'
import Box from '../ui/Box'
import Flex from '../ui/Flex'

const PoweredByBox = styled(Flex)`
  /* position: fixed; */
  /* bottom: 10px; */
  /* left: 120px; */
  padding: 8px 8px 4px 8px;
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.textPrimary};
  border: 0.2px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 4px;
  z-index: 1000;

  /* ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.xl}px) {  
      left: 50px;
    }
  `} */
`

const PoweredByBadge = () => {
  const { t } = useTranslation('layout')
  return (
    <PoweredByBox
      flexDirection='column'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <Text fontWeight={700} fontSize={12} mb={1}>
        {t('Powered by')}
      </Text>
      <Box
        as='img'
        src={'/assets/logo.png'}
        alt='Chain Wiki'
        style={{ width: '110px', height: 'auto' }}
        ml={2}
      />
    </PoweredByBox>
  )
}

export default PoweredByBadge
