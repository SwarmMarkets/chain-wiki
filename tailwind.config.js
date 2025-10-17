/** @type {import('tailwindcss').Config} */
module.exports = {
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/typography')],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
    },
    colors: {
      transparent: 'transparent', // TODO: Check if it's possible to avoid hadrdcoding basic TW properties
      primary: {
        DEFAULT: '#511DD7',
        accent: '#4317B2',
        muted: '#f9f6ff',
        contrast: '#FFF',
      },
      secondary: {
        DEFAULT: '#f9f6ff',
        accent: '#f3edff',
        muted: '#fff',
        contrast: '#5C6670',
      },
      error: {
        DEFAULT: '#EB5757',
        accent: '#901111',
        lightAccent: '#FBDDDD',
        muted: '#FBDDDD',
        contrast: '#5C6670',
      },
      success: {
        DEFAULT: '#219653',
        accent: '#1d8549',
        lightAccent: '#CDF4DE',
        muted: '#EEFBF4',
        contrast: '#5C6670',
      },
      warn: {
        DEFAULT: '#F2882C',
        accent: 'd47727',
        lightAccent: '#FDEADA',
        muted: '#FDEADA',
        contrast: '#2E3338',
      },
      info: {
        DEFAULT: '#511DD7',
        accent: '#4317B2',
        lightAccent: '#ADD8E6',
        muted: '#f9f6ff',
        contrast: '#5C6670',
      },
      chart: {
        DEFAULT: '#96CAFE', // Main range color
        accent: '#96CAFE', // Selected bars
        muted: '#E3E5E8', // Not selected Bars
        contrast: '#FFF',
        text: '#2E3338',
      },
      paper: {
        DEFAULT: '#FFFFFF',
        hover: '#f9f6ff',
        accent: '#f9f6ff',
        muted: '#FFF',
        contrast: '#5C6670',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
    },
    textColor: theme => ({
      ...theme('colors'),
      main: {
        DEFAULT: '#5C6670',
        accent: '#2E3338',
        muted: '#ABB2BA',
      },
    }),
    fill: theme => ({
      // NOTE: It's copied from text color. IDK If it's OK
      ...theme('colors'),
      main: {
        DEFAULT: '#5C6670',
        accent: '#2E3338',
        muted: '#ABB2BA',
      },
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      main: '#F4F5F6',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      main: {
        DEFAULT: '#E3E5E8',
        hover: '#96CAFE',
        active: '#511DD7',
        muted: '#ABB2BA',
      },
    }),
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    fontSize: {
      caption: '0.625rem',

      body1: '0.75rem',
      body2: '0.875rem',
      body3: '1rem',

      button: '0.875rem',

      label1: '0.75rem',
      label2: '0.875rem',

      title1: '0.875rem',
      title2: '1rem',
      title3: '1.375rem',

      heading1: '1.5rem',
      heading2: '1.75rem',
      heading3: '2rem',

      display1: '2.5rem',
      display2: '3rem',
      display3: '4rem',
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border)-.+/,
      variants: ['hover', 'focus', 'enabled:hover'],
    },
  ],
}
