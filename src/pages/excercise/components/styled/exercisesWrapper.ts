import { devices } from 'src/core/style/devices';
import styled from 'styled-components';

export const ExercisesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 160px;

  @media ${devices.laptop} {
    padding: 0;
  }
`;
