import * as React from 'react';
import { useContext, useEffect } from 'react';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import WorkoutCard from './components/workoutCard';
import CardsWrapper from './components/cardsWrapper';
import ExerciseGroup from '../../core/interfaces/exerciseGroup';
import { getInitialDataAction } from '../../core/store/thunk/firestore';

export default function Main() {
  const { state, dispatch } = useContext(ContextApp);

  useEffect(() => {
    dispatch(getInitialDataAction());
  }, []);

  function renderCards(cards: ExerciseGroup[]): JSX.Element[] {
    return cards.map((card) => <WorkoutCard key={card.title} card={card} />);
  }

  return (
    <CardsWrapper>
      {state.workouts && renderCards(state.workouts.questions)}
    </CardsWrapper>
  );
}
