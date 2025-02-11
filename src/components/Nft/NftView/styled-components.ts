import Box from 'src/components/ui/Box'
import Flex from 'src/components/ui/Flex'
import styled from 'styled-components'

export const ColorInputWrapper = styled(Flex)`
  position: relative;
`

export const ColorBox = styled(Flex)<{ color: string }>`
  background-color: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  cursor: pointer;
  border-radius: 4px;
`

export const PickerWrapper = styled(Box)`
  position: absolute;
  top: 50px;
  z-index: 100;
`
