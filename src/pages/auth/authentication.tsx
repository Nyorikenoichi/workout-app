import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEventHandler, useContext, useState } from 'react';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { Alert, Dialog, DialogActions, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthFormContainer from '../components/authFormContainer';
import { auth } from '../../core/firebase/firebaseInit';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import MainRoutes from '../../core/constants/mainRoutes';
import useNotification from '../../core/hooks/useNotification';

interface StateValues {
  email: string;
  password: string;
}

export default function Authentication() {
  const { state } = useContext(ContextApp);

  const { t } = useTranslation();

  const [notification, showNotification, closeNotification] = useNotification();

  const [values, setValues] = useState<StateValues>({
    email: '',
    password: '',
  });

  const onFormValueChange =
    (key: keyof StateValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prevValues) => ({
        ...prevValues,
        [key]: event.target.value,
      }));
    };

  const login: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      showNotification(t((error as AuthError).code));
    }
  };

  return state.user ? (
    <Navigate to={MainRoutes.main} />
  ) : (
    <>
      <Dialog open={notification.open}>
        <Alert severity="error">{notification.message}</Alert>
        <DialogActions>
          <Button onClick={closeNotification}>{t('close')}</Button>
        </DialogActions>
      </Dialog>
      <AuthFormContainer onSubmit={login}>
        <Typography variant="h4">{t('auth_form_title')}</Typography>
        <TextField
          type="email"
          label={t('login')}
          variant="outlined"
          onChange={onFormValueChange('email')}
        />
        <TextField
          type="password"
          label={t('password')}
          variant="outlined"
          onChange={onFormValueChange('password')}
        />
        <Button variant="contained" type="submit">
          {t('log_in')}
        </Button>
        <Typography>
          {t('dont_have_account_1')}
          <Link to={MainRoutes.register}>{t('dont_have_account_2')}</Link>
        </Typography>
      </AuthFormContainer>
    </>
  );
}
