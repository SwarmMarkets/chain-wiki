import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import styled from 'styled-components'

export const AlertWrap = styled(Flex)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: solid 1px;
  padding: 5px;
  background: ${({ theme }) => theme.palette.black};
`

export const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.palette.white};
  border-color: ${({ theme }) => theme.palette.white};
  line-height: 1;
  &:hover {
    color: ${({ theme }) => theme.palette.black};
    background-color: ${({ theme }) => theme.palette.white};
    border-color: ${({ theme }) => theme.palette.white};
  }
`
