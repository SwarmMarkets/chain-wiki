import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.palette.bgColor};
    color: ${({ theme }) => theme.palette.textColor};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-family: ${({ theme }) => theme.fontFamilies.roboto};
  }
`