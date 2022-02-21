import styled from 'styled-components';
import { devices } from '../../../style/devices';

const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  width: 250px;
  padding: 5px;

  @media ${devices.tablet} {
    flex-direction: column;
    justify-content: center;
    width: 140px;
  }
`;

export default Logout;
