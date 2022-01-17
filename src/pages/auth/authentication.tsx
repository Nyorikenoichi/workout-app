import * as React from 'react';
import { useContext } from 'react';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import {
  incrementAction,
  decrementAction,
} from '../../core/store/actions/globalStateActions';

export default function Authentication() {
  const { state, dispatch } = useContext(ContextApp);

  const onIncrement = () => dispatch(incrementAction());
  const onDecrement = () => dispatch(decrementAction());

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
