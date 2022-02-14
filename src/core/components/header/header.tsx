import * as React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ContextApp } from '../../store/reducers/globalStateReducer';
import HeaderContainer from './components/HeaderContainer';
import Logout from './components/logout';
import { logOutAction } from '../../store/thunk/auth';

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
          <Button variant="contained" onClick={onLogout}>
            {t('sign_out')}
          </Button>
        </Logout>
      )}
    </HeaderContainer>
  );
}
