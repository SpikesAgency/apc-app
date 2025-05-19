export const COLORS = {
  primary: {
    DEFAULT: '#e97d2b',
    light: '#f3a56b',
    dark: '#c05e11',
  },
  secondary: {
    DEFAULT: '#dfd8c8', // beige
    light: '#ece7dc',
    dark: '#c7bfab',
  },
  charcoal: {
    DEFAULT: '#333333',
    light: '#555555',
    dark: '#222222',
  },
  success: {
    DEFAULT: '#4ade80',
    light: '#86efac',
    dark: '#16a34a',
  },
  warning: {
    DEFAULT: '#fbbf24',
    light: '#fcd34d',
    dark: '#d97706',
  },
  error: {
    DEFAULT: '#f87171',
    light: '#fca5a5',
    dark: '#dc2626',
  },
  white: '#FFFFFF',
  light: '#F5F5F5',
  black: '#000000',
  gray: {
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  transparent: 'transparent',
};

export const FONT = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

export const SIZES = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
};

const theme = { COLORS, FONT, SIZES, SPACING, SHADOWS };

export default theme;