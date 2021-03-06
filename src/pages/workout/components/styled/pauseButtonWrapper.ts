import { Theme } from 'src/core/style/mainTheme';
import styled from 'styled-components';

export const PauseButtonWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  bottom: 0;
  z-index: 4;
  overflow: hidden;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.pauseButtonBackground};
`;
