import React from 'react';
import { ThemeProvider } from 'styled-components';

export interface Theme {
  colors: {
    lightText: string;
    overlayText: string;
    overlayBackground: string;
    userMenuBackground: string;
    pauseButtonBackground: string;
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
    lightText: '#222222',
    overlayText: '#FFFFFF',
    overlayBackground: 'rgba(0, 0, 0, 0.64)',
    userMenuBackground: 'rgba(255, 255, 255, 0.8)',
    pauseButtonBackground: 'rgba(0, 0, 0, 0.3)',
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
