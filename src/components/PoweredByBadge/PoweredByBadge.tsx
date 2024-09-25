import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Logo from '../../assets/logo.png'
import Text from '../ui/Text'
import Box from '../ui/Box'

const PoweredByBox = styled.div`
  position: fixed;
  bottom: 10px;
  left: 120px;
  padding: 8px 8px 4px 8px;
  background-color: ${({ theme }) => theme.palette.white};
  color: #212121;
  border: 0.2px solid #a2a9b1;
  border-radius: 4px;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.xl}px) {  
      left: 50px;
    }
  `}
`

const PoweredByBadge = () => {
  const { t } = useTranslation('layout')
  return (
    <PoweredByBox>
      <Text fontWeight={700} fontSize={12} mb={1}>
        {t('Powered by')}
      </Text>
      <Box ml={2}>
        <img
          src={Logo}
          alt='Chain Wiki'
          style={{ width: '110px', height: 'auto' }}
        />
      </Box>
    </PoweredByBox>
  )
}

export default PoweredByBadge
