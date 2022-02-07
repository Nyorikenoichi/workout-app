import { createGlobalStyle } from 'styled-components';
import { Theme } from './mainTheme';

export default createGlobalStyle`
  html, body {
    position: relative;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  
  body {
    min-height: 100vh;
    background-color: ${(props: { theme: Theme }) =>
      props.theme.colors.background};
  }
  
  #root {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    height: 100%;
  }
`;
