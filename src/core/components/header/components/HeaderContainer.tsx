import { devices } from 'src/core/style/devices';
import styled from 'styled-components';
import { Theme } from '../../../style/mainTheme';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 100px;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.backgroundDark};

  @media ${devices.mobileL} {
    padding: 0 10px;
    justify-content: center;
  }
`;

export default HeaderContainer;
