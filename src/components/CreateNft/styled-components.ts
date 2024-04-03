import styled from 'styled-components'
import Text from '../ui/Text'
import Box from '../ui/Box'
import TextField from '../ui/TextField/TextField'
import Flex from '../ui/Flex'

export const TextFieldTitle = styled(Text.h3)`
  margin-bottom: 0.5em;
`

export const TextFieldBox = styled(Box)`
  width: 100%;
  margin-bottom: 2em;
`

export const StyledTextField = styled(TextField)`
  width: 100%;

  input {
    height: 40px;
  }
`

export const LogoWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.palette.bgPrimary};
  border-radius: 20px;
`

export const LogoPreview = styled.img`
  max-width: 200px;
  max-height: 100px;
`
