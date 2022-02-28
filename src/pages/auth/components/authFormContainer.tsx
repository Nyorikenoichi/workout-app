import { devices } from 'src/core/style/devices';
import styled from 'styled-components';

export const AuthFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  height: 350px;
  margin-top: 100px;

  @media ${devices.laptop} {
    width: 60%;
  }
  @media ${devices.tablet} {
    width: 80%;
  }
`;
