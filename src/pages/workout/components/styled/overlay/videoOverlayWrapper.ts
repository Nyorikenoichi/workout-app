import styled from 'styled-components';
import { Theme } from '../../../../../core/style/mainTheme';

export const VideoOverlayWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 3;
  background: ${(props: { theme: Theme }) =>
    props.theme.colors.overlayBackground};
  opacity: 0.64;
  color: ${(props: { theme: Theme }) => props.theme.colors.overlayText};
`;
