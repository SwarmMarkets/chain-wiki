import styled from 'styled-components'
import Flex from '../ui/Flex'

export const LogoWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.palette.bgPrimary};
  border-radius: 20px;
`

export const LogoPreview = styled.img`
  max-width: 200px;
  max-height: 100px;
`
