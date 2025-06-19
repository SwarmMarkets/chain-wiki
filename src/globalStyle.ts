import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    /* background: ${({ theme }) => theme.palette.bgPrimary}; */
    /* color: ${({ theme }) => theme.palette.textPrimary}; */
    font-family: ${({ theme }) => theme.fontFamilies.roboto};
  }
`
