import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEventHandler, useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RegisterFormContainer from './components/registerFormContainer';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { MainRoutes } from '../../core/constants/mainRoutes';
import { RegisterFormValues } from '../../core/interfaces/formValues';
import { registerAction } from '../../core/store/thunk/auth';

export const Register = React.memo(function Register() {
  const { state, dispatch } = useContext(ContextApp);

  const { t } = useTranslation();

  const [values, setValues] = useState<RegisterFormValues>({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onFormValueChange =
    (key: keyof RegisterFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prevValues) => ({
        ...prevValues,
        [key]: event.target.value,
      }));
    };

  const register: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    dispatch(registerAction(values));
  };

  return state.user ? (
    <Navigate to={MainRoutes.main} />
  ) : (
    <RegisterFormContainer onSubmit={register}>
      <Typography variant="h4">{t('register_form_title')}</Typography>
      <TextField
        type="text"
        label={t('user_name')}
        variant="outlined"
        onChange={onFormValueChange('userName')}
      />
      <TextField
        type="email"
        label={t('email')}
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
  );
});
