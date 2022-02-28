import styled from 'styled-components';
import { devices } from '../style/devices';

const Content = styled.div`
  position: relative;
  overflow: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 160px;

  @media ${devices.tablet} {
    padding: 0 80px;
  }
  @media ${devices.mobileL} {
    padding: 0 5px;
  }
`;

export default Content;
