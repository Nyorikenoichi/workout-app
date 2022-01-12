import * as React from 'react';

// @ts-ignore
export const ContextApp = React.createContext();

export const initialState = { count: 0 };

export function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
