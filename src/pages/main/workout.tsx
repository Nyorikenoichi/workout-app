import * as React from 'react';
import { useContext, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { db } from '../../core/firebase/firebaseInit';
import {
  setFirebaseDataAction,
  setLoadingAction,
  setWorkoutDataAction,
} from '../../core/store/actions/globalStateActions';
import WorkoutCard from './components/workoutCard';
import CardsWrapper from './components/cardsWrapper';
import ExerciseGroup from '../../core/interfaces/exerciseGroup';

export default function Workout() {
  const { state, dispatch } = useContext(ContextApp);

  useEffect(() => {
    async function getWorkoutData() {
      const api = process.env.REACT_APP_WORKOUT_API as string;
      const response = await fetch(api);
      const dataJson = await response.json();
      dispatch(
        setWorkoutDataAction({
          workoutData: dataJson.data,
        })
      );
    }

    async function getFirestoreData() {
      const docRef = doc(db, 'users', state.user?.uid as string);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      dispatch(
        setFirebaseDataAction({
          firebaseData: data,
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

  function renderCards(cards: ExerciseGroup[]): JSX.Element[] {
    return cards.map((card) => <WorkoutCard key={card.title} card={card} />);
  }

  return (
    <CardsWrapper>
      {state.workoutData && renderCards(state.workoutData.questions)}
    </CardsWrapper>
  );
}
