import * as React from 'react';
import { useContext, useEffect } from 'react';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import WorkoutCard from './components/workoutCard';
import CardsWrapper from './components/cardsWrapper';
import ExerciseGroup from '../../core/interfaces/exerciseGroup';
import { getInitialDataAction } from '../../core/store/thunk/firestore';

export const Main = React.memo(function Main() {
  const { state, dispatch } = useContext(ContextApp);

  useEffect(() => {
    if (!state.workouts || !state.statistics) {
      dispatch(getInitialDataAction());
    }
  }, []);

  const renderCards = (cards: ExerciseGroup[]): JSX.Element[] => {
    return cards.map((card) => (
      <WorkoutCard
        key={card.title}
        card={card}
        completeCount={state.statistics?.exercisesPerformedCount[card.title]}
      />
    ));
  };

  return (
    <CardsWrapper>
      {state.workouts && renderCards(state.workouts.questions)}
    </CardsWrapper>
  );
});
