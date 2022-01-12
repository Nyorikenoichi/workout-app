import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { ContextApp, initialState, reducer } from './reducer';
import GlobalStyles from './globalStyle';
import Authentication from './authentication';

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ContextApp.Provider value={useMemo(() => ({ dispatch, state }), [state])}>
      <Router>
        <Routes>
          <Route path="auth" element={<Authentication />} />
          <Route path="" element={<p>Main page</p>} />
          <Route path="exercise" element={<p>Exercise page</p>} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </Router>
      <GlobalStyles />
    </ContextApp.Provider>
  );
}
