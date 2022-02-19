import { devices } from 'src/core/style/devices';
import styled from 'styled-components';

export const RegisterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  height: 500px;
  margin-top: 100px;

  @media ${devices.laptop} {
    width: 60%;
  }
  @media ${devices.tablet} {
    width: 80%;
  }
  @media ${devices.mobileL} {
    width: 90%;
  }
`;
