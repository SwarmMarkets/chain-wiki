import styled from 'styled-components'
import Text from '../ui/Text'
import Box from '../ui/Box'
import TextField from '../ui/TextField/TextField'

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