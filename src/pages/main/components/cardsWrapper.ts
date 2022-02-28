import { devices } from 'src/core/style/devices';
import styled from 'styled-components';

const CardsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 100px;

  @media ${devices.tablet} {
    margin-top: 20px;
  }
`;

export default CardsWrapper;
