import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import auth from './core/firebase/firebaseInit';
import setUserAction from './core/store/actions/globalStateActions';

export default function App() {
  const [state, dispatch] = React.useReducer(globalStateReducer, initialState);
  const { t } = useTranslation();

  const contextValue = useMemo(() => ({ dispatch, state }), [state]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUserAction(currentUser));
    });
  }, []);

  return (
    <MainTheme>
      <ContextApp.Provider value={contextValue}>
        <Router>
          <Routes>
            <Route path={MainRoutes.auth} element={<Authentication />} />
            <Route path={MainRoutes.register} element={<Register />} />
            <Route path={MainRoutes.main} element={<Workout />} />
            <Route
              path={MainRoutes.exercise}
              element={<p>{t('exerciseTitle')}</p>}
            />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </Router>
        <GlobalStyles />
      </ContextApp.Provider>
    </MainTheme>
  );
}
