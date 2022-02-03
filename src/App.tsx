import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Backdrop, CircularProgress } from '@mui/material';
import {
  augmentDispatch,
  ContextApp,
  GlobalState,
  globalStateReducer,
  initialState,
} from './core/store/reducers/globalStateReducer';
import { MainTheme } from './core/style/mainTheme';
import GlobalStyles from './core/style/globalStyle';
import Authentication from './pages/auth/authentication';
import MainRoutes from './core/constants/mainRoutes';
import Register from './pages/register/register';
import Workout from './pages/main/workout';
import {
  setLoadingAction,
  setUserAction,
} from './core/store/actions/globalStateActions';
import PrivateRoute from './core/components/PrivateRoute';
import { auth } from './core/firebase/firebaseInit';
import Exercise from './pages/excercise/excercise';
import PageNotFound from './pages/page-not-found/pageNotFound';
import { GlobalStateActionType } from './core/store/action-types/globalStateActionTypes';
import Header from './core/components/header';
import Content from './core/components/content';

export default function App() {
  const [state, dispatch] = React.useReducer(globalStateReducer, initialState);

  const contextValue = useMemo(
    () => ({
      dispatch: augmentDispatch<
        GlobalStateActionType<Partial<GlobalState>>,
        GlobalState
      >(dispatch, state),
      state,
    }),
    [state]
  );

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUserAction({ user: currentUser }));
      dispatch(setLoadingAction({ isLoading: false }));
    });
  }, []);

  return (
    <MainTheme>
      <ContextApp.Provider value={contextValue}>
        {state.isLoading && (
          <Backdrop
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Header />
        <Content>
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
        </Content>
        <GlobalStyles />
      </ContextApp.Provider>
    </MainTheme>
  );
}
