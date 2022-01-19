import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useContext, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import FormContainer from '../../core/components/formContainer';
import auth from '../../core/firebase/firebaseInit';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';

export default function Register() {
  const globalState = useContext(ContextApp);

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
    } catch (error: any) {
      alert(error.message);
    }
  };

  return globalState.state.user ? (
    <>
      <h1>You are already logged in</h1>
      <p>{globalState.state.user.email}</p>
    </>
  ) : (
    <FormContainer>
      <TextField
        label="Login"
        variant="outlined"
        onChange={handleLoginChange}
      />
      <TextField
        label="Password"
        variant="outlined"
        onChange={handlePasswordChange}
      />
      <Button variant="contained" onClick={register}>
        Sign up
      </Button>
    </FormContainer>
  );
}
