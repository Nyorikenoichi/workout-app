import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import auth from '../../core/firebase/firebaseInit';

export default function Workout() {
  const globalState = useContext(ContextApp);

  const logout = async () => {
    await signOut(auth);
  };

  return globalState.state.user ? (
    <div>
      <p>{`current user is ${globalState.state.user.email}`}</p>
      <Button variant="contained" onClick={logout}>
        Sign out
      </Button>
    </div>
  ) : (
    <div>please log in</div>
  );
}
