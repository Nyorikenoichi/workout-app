import * as React from 'react';
import { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { auth, db } from '../../core/firebase/firebaseInit';
import MainRoutes from '../../core/constants/mainRoutes';
import {
  setFirebaseDataAction,
  setLoadingAction,
  setWorkoutDataAction,
} from '../../core/store/actions/globalStateActions';

export default function Workout() {
  const { state, dispatch } = useContext(ContextApp);

  useEffect(() => {
    async function getWorkoutData() {
      const api = process.env.REACT_APP_WORKOUT_API as string;
      let data = await fetch(api);
      data = await data.json();
      dispatch(
        setWorkoutDataAction({
          workoutData: data as unknown as Record<string, unknown>,
        })
      );
    }

    async function getFirestoreData() {
      const docRef = doc(db, 'users', state.user?.uid as string);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      dispatch(
        setFirebaseDataAction({
          firebaseData: data as unknown as Record<string, unknown>,
        })
      );
    }

    async function getData() {
      dispatch(setLoadingAction({ isLoading: true }));
      await getWorkoutData();
      await getFirestoreData();
      dispatch(setLoadingAction({ isLoading: false }));
    }

    getData();
  }, []);

  console.log(state);

  const logout = async () => {
    await signOut(auth);
  };

  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h3">{t('main_title')}</Typography>
      <Typography>{`${t('current_user')} ${
        state.user?.displayName
      } with email ${state.user?.email}`}</Typography>
      <Button variant="contained" onClick={logout}>
        {t('sign_out')}
      </Button>
      <Typography>
        <Link to={MainRoutes.exercise}>go to exercise</Link>
      </Typography>
    </div>
  );
}
