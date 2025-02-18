import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    /* background: ${({ theme }) => theme.palette.bgPrimary}; */
    color: ${({ theme }) => theme.palette.textPrimary};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-family: ${({ theme }) => theme.fontFamilies.roboto};
  }
`