import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FormContainer from '../../core/components/formContainer';
import auth from '../../core/firebase/firebaseInit';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import MainRoutes from '../../core/constants/mainRoutes';

export default function Authentication() {
  const { state } = useContext(ContextApp);

  const { t } = useTranslation();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLoginChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLoginEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLoginPassword(event.target.value);
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  };

  return state.user ? (
    <Navigate to={MainRoutes.main} />
  ) : (
    <FormContainer>
      <Typography variant="h4">{t('auth_form_title')}</Typography>
      <TextField
        label={t('login')}
        variant="outlined"
        onChange={handleLoginChange}
      />
      <TextField
        label={t('password')}
        variant="outlined"
        onChange={handlePasswordChange}
      />
      <Button variant="contained" onClick={login}>
        {t('log_in')}
      </Button>
      <Typography>
        {t('dont_have_account_1')}
        <Link to={MainRoutes.register}>{t('dont_have_account_2')}</Link>
      </Typography>
    </FormContainer>
  );
}
