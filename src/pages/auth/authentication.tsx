import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FormContainer from '../../core/components/formContainer';
import auth from '../../core/firebase/firebaseInit';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';

export default function Authentication() {
  const globalState = useContext(ContextApp);

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
      <Button variant="contained" onClick={login}>
        Log in
      </Button>
    </FormContainer>
  );
}
