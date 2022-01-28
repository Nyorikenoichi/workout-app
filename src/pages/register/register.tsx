import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEventHandler, useContext, useState } from 'react';
import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { Alert, Dialog, DialogActions, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { setDoc, doc } from 'firebase/firestore';
import RegisterFormContainer from './components/registerFormContainer';
import { auth, db } from '../../core/firebase/firebaseInit';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import MainRoutes from '../../core/constants/mainRoutes';
import useNotification from '../../core/hooks/useNotification';

interface StateValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const globalState = useContext(ContextApp);

  const { t } = useTranslation();

  const [notification, showNotification, closeNotification] = useNotification();

  const [values, setValues] = useState<StateValues>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onFormValueChange =
    (key: keyof StateValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prevValues) => ({
        ...prevValues,
        [key]: event.target.value,
      }));
    };

  const register: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      if (values.password !== values.confirmPassword) {
        const error: AuthError = {
          customData: { appName: '' },
          stack: '',
          message: '',
          name: 'FirebaseError',
          code: 'confirm-password-error',
        };
        throw error;
      }
      const cred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await setDoc(doc(db, 'users', cred.user.uid), {
        someData: Math.random() * 100,
      });
    } catch (error) {
      showNotification(t((error as AuthError).code));
    }
  };

  return globalState.state.user ? (
    <Navigate to={MainRoutes.main} />
  ) : (
    <>
      <Dialog open={notification.open}>
        <Alert severity="error">{notification.message}</Alert>
        <DialogActions>
          <Button onClick={closeNotification}>{t('close')}</Button>
        </DialogActions>
      </Dialog>
      <RegisterFormContainer onSubmit={register}>
        <Typography variant="h4">{t('register_form_title')}</Typography>
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
        <TextField
          type="password"
          label={t('confirm_password')}
          variant="outlined"
          onChange={onFormValueChange('confirmPassword')}
        />
        <Button variant="contained" type="submit">
          {t('sign_up')}
        </Button>
        <Typography>
          {t('already_have_account_1')}
          <Link to={MainRoutes.auth}>{t('already_have_account_2')}</Link>
        </Typography>
      </RegisterFormContainer>
    </>
  );
}
