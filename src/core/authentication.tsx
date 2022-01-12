import * as React from 'react';
import { useContext } from 'react';
import { ContextApp } from './reducer';

export default function Authentication() {
  // @ts-ignore
  const { state, dispatch } = useContext(ContextApp);

  return (
    <div>
      <p>{state.count}</p>
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>
        inc
      </button>
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>
        dec
      </button>
    </div>
  );
}
