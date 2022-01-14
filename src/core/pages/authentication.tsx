import * as React from 'react';
import { useContext } from 'react';
import { ContextApp } from '../components/reducer';

export default function Authentication() {
  const { state, dispatch } = useContext(ContextApp);

  const onIncrement = () => dispatch({ type: 'increment' });
  const onDecrement = () => dispatch({ type: 'decrement' });

  return (
    <div>
      <p>{state.count}</p>
      <button type="button" onClick={onIncrement}>
        inc
      </button>
      <button type="button" onClick={onDecrement}>
        dec
      </button>
    </div>
  );
}
