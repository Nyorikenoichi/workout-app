import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import auth from '../../core/firebase/firebaseInit';

export default function Workout() {
  const { state } = useContext(ContextApp);

  const logout = async () => {
    await signOut(auth);
  };

  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h3">{t('main_title')}</Typography>
      <Typography>{`${t('current_user')} ${state.user?.email}`}</Typography>
      <Button variant="contained" onClick={logout}>
        {t('sign_out')}
      </Button>
    </div>
  );
}
