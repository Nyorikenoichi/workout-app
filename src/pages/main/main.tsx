import * as React from 'react';
import { useContext, useEffect } from 'react';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { getBackendDataAction } from '../../core/store/thunk/thunkActions';
import WorkoutCard from './components/workoutCard';
import CardsWrapper from './components/cardsWrapper';
import ExerciseGroup from '../../core/interfaces/exerciseGroup';

export default function Main() {
  const { state, dispatch } = useContext(ContextApp);

  useEffect(() => {
    dispatch(getBackendDataAction());
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
