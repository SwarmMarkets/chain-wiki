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
    borderPrimary: '#c8ccd1',

    // Icon colors
    iconPrimary: '#72777d',
  },
  fontSizes: {
    small: '12px',
    medium: '14px',
    large: '24px',
  },
  fontWeights: {
    regular: 400,
    bold: 700,
  },
  fontFamilies: {
    roboto: "'Roboto', sans-serif",
  }
};

export default theme;
export type Theme = typeof theme;
