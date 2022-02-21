import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEventHandler, useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AuthFormContainer } from './components/authFormContainer';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { MainRoutes } from '../../core/constants/mainRoutes';
import { AuthFormValues } from '../../core/interfaces/formValues';
import { loginAction } from '../../core/store/thunk/auth';

export const Authentication = React.memo(function Authentication() {
  const { state, dispatch } = useContext(ContextApp);

  const { t } = useTranslation();

  const [values, setValues] = useState<AuthFormValues>({
    email: '',
    password: '',
  });

  const onFormValueChange =
    (key: keyof AuthFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prevValues) => ({
        ...prevValues,
        [key]: event.target.value,
      }));
    };

  const login: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    dispatch(loginAction(values));
  };

  return state.user ? (
    <Navigate to={MainRoutes.main} />
  ) : (
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
  );
});
