import * as React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ContextApp } from '../../store/reducers/globalStateReducer';
import HeaderContainer from './components/HeaderContainer';
import Logout from './components/logout';
import { logOutAction } from '../../store/thunk/auth';
import { LogoutButton } from './components/logoutButton';
import { UserNameLabel } from './components/userNameLabel';
import { HeaderTitle } from './components/headerTitle';

export const Header = React.memo(function Header() {
  const { t } = useTranslation();

  const { state, dispatch } = useContext(ContextApp);

  const onLogout = () => {
    dispatch(logOutAction());
  };

  return (
    <HeaderContainer>
      <HeaderTitle variant="h3">{t('main_title')}</HeaderTitle>
      {!!state.user && (
        <Logout>
          <UserNameLabel variant="h5">{state.user?.displayName}</UserNameLabel>
          <LogoutButton variant="contained" onClick={onLogout}>
            {t('sign_out')}
          </LogoutButton>
        </Logout>
      )}
    </HeaderContainer>
  );
});
