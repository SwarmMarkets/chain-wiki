const theme = {
  palette: {
    // Common
    white: '#fff',
    lightGray: '#DCDCDC',
    gray: '#C0C0C0',
    darkGray: '#545454',
    nearBlack: '#A9A9A9',
    black: '#000000',
    nearWhite: '#f8f9fa',
    blueLight: '#E0EFFD',

    // Text Colors
    textPrimary: '#212121',
    linkPrimary: '#4285F4',
    linkPrimaryAccent: '#0078EF',

    // Background colors
    bgPrimary: '#f8f9fa',

    // Border colors
    borderPrimary: '#a2a9b1',
    borderBlue: '#36c',

    // Icon colors
    iconPrimary: '#72777d',

    // Error
    errorPrimary: '#ff3333',
  },
  fontSizes: {
    extraSmall: '10px',
    small: '12px',
    medium: '14px',
    mediumPlus: '18px',
    large: '24px',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  fontFamilies: {
    roboto: "'Inter', sans-serif",
  },
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 960,
    lg: 1024,
    xl: 1440,
  },
}

export default theme
export type Theme = typeof theme
