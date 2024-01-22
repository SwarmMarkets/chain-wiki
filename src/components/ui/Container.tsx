import { Theme } from '@src/theme'
import styled from 'styled-components'

type MaxWidth = Exclude<keyof Theme['breakpoints'], 'xs'>

interface ContainerProps {
  $maxWidth?: MaxWidth
}

const Container = styled.div<ContainerProps>`
  max-width: ${({ theme, $maxWidth = 'xl' }) => theme.breakpoints[$maxWidth]}px;
  margin: 0 auto;
  padding: 0 52px;
  background: ${({ theme }) => theme.palette.white};
`

export default Container
