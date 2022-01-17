import React from 'react';
import { ThemeProvider } from 'styled-components';

export interface Theme {
  colors: {
    background: string;
  };
  fonts: string[];
}

const mainTheme = {
  colors: {
    background: '#E5E5E5',
  },
  fonts: ['Roboto'],
};

export function MainTheme({ children }: { children: JSX.Element }) {
  return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>;
}
