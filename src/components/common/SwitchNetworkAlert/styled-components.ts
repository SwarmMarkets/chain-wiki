import Box from '@src/components/ui/Box'
import styled from 'styled-components'

export const AlertWrap = styled(Box)`
  border: solid 1px;
  border-radius: 5px;
  padding: 20px;
  background: ${({ theme }) => theme.palette.nearWhite};
`
