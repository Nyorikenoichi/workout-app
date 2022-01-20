import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useContext, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FormContainer from '../../core/components/formContainer';
import auth from '../../core/firebase/firebaseInit';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import MainRoutes from '../../core/constants/mainRoutes';

export default function Register() {
  const globalState = useContext(ContextApp);

  const { t } = useTranslation();

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLoginChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRegisterEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRegisterPassword(event.target.value);
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  };

  return globalState.state.user ? (
    <Navigate to={MainRoutes.main} />
  ) : (
    <FormContainer>
      <Typography variant="h4">{t('register_form_title')}</Typography>
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
      <Button variant="contained" onClick={register}>
        {t('sign_up')}
      </Button>
      <Typography>
        {t('already_have_account_1')}
        <Link to={MainRoutes.auth}>{t('already_have_account_2')}</Link>
      </Typography>
    </FormContainer>
  );
}
