import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles/createTheme';
import { viVN } from '@mui/material/locale';

declare module '@mui/material/styles' {
  interface Theme {
    color: {
      red: string;
      lightRed: string;
      black: string;
      lightBlack: string;
      gray: string;
      green: string;
    };
    fontFamily: {
      primary: string;
    };
    palette: {
      secondary: {
        main: string;
      };
      mode: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    color?: {
      red?: string;
      lightRed?: string;
      black?: string;
      lightBlack?: string;
      gray?: string;
      green?: string
    };
    fontFamily?: {
      primary: string;
    };
  }
}

export const theme: Theme = createTheme(
  {
    color: {
      red: '#ee4949',
      lightRed: 'rgba(238, 73, 73, 0.08)',
      black: '#3b3b3b',
      lightBlack: 'rgba(59, 59, 59, 0.08)',
      gray: '#777777',
      green: '#5daa61',
    },
    fontFamily: {
      primary: "'Montserrat', sans-serif",
    },
    typography: {
      fontFamily: ['Montserrat', 'sans-serif'].join(','),
    },
    palette: {
      secondary: {
        main: '#ee4949',
      },
      mode: 'light',
    },
  },
  viVN,
);
