import * as React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ContextApp } from '../../store/reducers/globalStateReducer';
import HeaderContainer from './components/HeaderContainer';
import Logout from './components/logout';
import { logOutAction } from '../../store/thunk/auth';
import { LogoutButton } from './components/logoutButton';

export default function Header() {
  const { t } = useTranslation();

  const { state, dispatch } = useContext(ContextApp);

  const onLogout = () => {
    dispatch(logOutAction());
  };

  return (
    <HeaderContainer>
      <Typography variant="h3">{t('main_title')}</Typography>
      {!!state.user && (
        <Logout>
          <Typography variant="h5">{state.user?.displayName}</Typography>
          <LogoutButton variant="contained" onClick={onLogout}>
            {t('sign_out')}
          </LogoutButton>
        </Logout>
      )}
    </HeaderContainer>
  );
}
