import React from 'react';
import { ThemeProvider } from 'styled-components';

export interface Theme {
  colors: {
    overlayText: string;
    overlayBackground: string;
    background: string;
    backgroundDark: string;
    workoutSpinnerBar: string;
    workoutSpinnerBackground: string;
    workoutSpinnerPaused: string;
    buttonsBackground: string;
  };
  fonts: string[];
}

const mainTheme = {
  colors: {
    overlayText: '#FFFFFF',
    overlayBackground: '#212121',
    background: '#E5E5E5',
    backgroundDark: '#D9D9D9',
    workoutSpinnerBar: '#1DE9B6',
    workoutSpinnerBackground: '#EEEEEE',
    buttonsBackground: '#AA00FF',
  },
  fonts: ['Roboto'],
};

export function MainTheme({ children }: { children: JSX.Element }) {
  return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>;
}
