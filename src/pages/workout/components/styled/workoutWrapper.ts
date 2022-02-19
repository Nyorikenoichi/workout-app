import { devices } from 'src/core/style/devices';
import styled from 'styled-components';

export const WorkoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 160px;

  @media ${devices.laptop} {
    padding: 0 5px;
  }
`;
