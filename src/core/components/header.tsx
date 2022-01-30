import * as React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useContext } from 'react';
import { auth } from '../firebase/firebaseInit';
import { Theme } from '../style/mainTheme';
import { ContextApp } from '../store/reducers/globalStateReducer';
import {
  setFirebaseDataAction,
  setLoadingAction,
  setWorkoutDataAction,
} from '../store/actions/globalStateActions';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 100px;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.backgroundDark};
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 180px;
  padding: 5px;
`;

export default function Header() {
  const { t } = useTranslation();

  const { state, dispatch } = useContext(ContextApp);

  const logout = async () => {
    dispatch(setLoadingAction({ isLoading: true }));
    await signOut(auth);
    dispatch(setFirebaseDataAction({ firebaseData: null }));
    dispatch(setWorkoutDataAction({ workoutData: null }));
  };

  return (
    <HeaderContainer>
      <Typography variant="h3">{t('main_title')}</Typography>
      {!!state.user && (
        <Logout>
          <Typography variant="h5">{state.user?.displayName}</Typography>
          <Button variant="contained" onClick={logout}>
            {t('sign_out')}
          </Button>
        </Logout>
      )}
    </HeaderContainer>
  );
}
