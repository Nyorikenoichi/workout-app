import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  ContextApp,
  globalStateReducer,
  initialState,
} from './core/store/reducers/globalStateReducer';
import { MainTheme } from './core/style/mainTheme';
import GlobalStyles from './core/style/globalStyle';
import Authentication from './pages/auth/authentication';
import MainRoutes from './core/constants/mainRoutes';
import Register from './pages/register/register';
import Workout from './pages/main/workout';
import setUserAction from './core/store/actions/globalStateActions';
import PrivateRoute from './core/components/PrivateRoute';
import auth from './core/firebase/firebaseInit';
import Exercise from './pages/excercise/excercise';
import PageNotFound from './pages/page-not-found/pageNotFound';

export default function App() {
  const [state, dispatch] = React.useReducer(globalStateReducer, initialState);
  const [userLoggedIn, setUserLoginState] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUserAction(currentUser));
      setUserLoginState(true);
    });
  }, []);

  const contextValue = useMemo(() => ({ dispatch, state }), [state]);

  if (!userLoggedIn) return <div>there will be loader</div>;

  return (
    <MainTheme>
      <ContextApp.Provider value={contextValue}>
        <Router>
          <Routes>
            <Route path={MainRoutes.auth} element={<Authentication />} />
            <Route path={MainRoutes.register} element={<Register />} />
            <Route path={MainRoutes.main} element={<PrivateRoute />}>
              <Route path={MainRoutes.main} element={<Workout />} />
            </Route>
            <Route path={MainRoutes.exercise} element={<PrivateRoute />}>
              <Route path={MainRoutes.exercise} element={<Exercise />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <GlobalStyles />
      </ContextApp.Provider>
    </MainTheme>
  );
}
