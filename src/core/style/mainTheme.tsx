import React from 'react';
import { ThemeProvider } from 'styled-components';

export interface Theme {
  colors: {
    background: string;
    backgroundDark: string;
    workoutSpinner: string;
    workoutSpinnerSecondary: string;
    workoutSpinnerPaused: string;
    buttonsBackground: string;
  };
  fonts: string[];
}

const mainTheme = {
  colors: {
    background: '#E5E5E5',
    backgroundDark: '#D9D9D9',
    workoutSpinner: '#1DE9B6',
    workoutSpinnerSecondary: '#EEEEEE',
    buttonsBackground: '#AA00FF',
  },
  fonts: ['Roboto'],
};

export function MainTheme({ children }: { children: JSX.Element }) {
  return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>;
}
