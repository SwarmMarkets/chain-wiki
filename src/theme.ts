const theme = {
  palette: {
    // Common
    white: '#fff',

    // Text Colors
    textPrimary: '#212121',
    linkPrimary: '#3366cc',

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
    small: '12px',
    medium: '14px',
    mediumPlus: '18px',
    large: '24px',
  },
  fontWeights: {
    regular: 400,
    bold: 700,
  },
  fontFamilies: {
    roboto: "'Roboto', sans-serif",
  },
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 960,
    lg: 1024,
    xl: 1440,
  }
};

export default theme;
export type Theme = typeof theme;
