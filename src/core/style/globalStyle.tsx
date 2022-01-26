import { createGlobalStyle } from 'styled-components';
import { Theme } from './mainTheme';

export default createGlobalStyle`
  body, #root {
    padding: 0;
    margin: 0;
    background-color: ${(props: { theme: Theme }) =>
      props.theme.colors.background};
  }
  
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
