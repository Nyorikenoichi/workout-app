import * as React from 'react';
import { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { auth, db } from '../../core/firebase/firebaseInit';

export default function Workout() {
  const { state } = useContext(ContextApp);

  useEffect(() => {
    async function apiFetch() {
      const api = process.env.REACT_APP_WORKOUT_API as string;
      let data = await fetch(api);
      data = await data.json();
      console.log(data);
    }

    apiFetch();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const fetchFirestore = async () => {
    const docRef = doc(db, 'users', state.user?.uid as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h3">{t('main_title')}</Typography>
      <Typography>{`${t('current_user')} ${state.user?.email}`}</Typography>
      <Button variant="contained" onClick={logout}>
        {t('sign_out')}
      </Button>
      <Button variant="contained" onClick={fetchFirestore}>
        Test
      </Button>
    </div>
  );
}
