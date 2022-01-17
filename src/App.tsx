import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ContextApp,
  initialState,
  globalStateReducer,
} from './core/store/reducers/globalStateReducer';
import { MainTheme } from './core/style/mainTheme';
import GlobalStyles from './core/style/globalStyle';
import Authentication from './pages/auth/authentication';
import MainRoutes from './core/constants/mainRoutes';

export default function App() {
  const [state, dispatch] = React.useReducer(globalStateReducer, initialState);
  const { t } = useTranslation();

  const contextValue = useMemo(() => ({ dispatch, state }), [state]);

  return (
    <MainTheme>
      <ContextApp.Provider value={contextValue}>
        <Router>
          <Routes>
            <Route path={MainRoutes.auth} element={<Authentication />} />
            <Route path={MainRoutes.main} element={<p>{t('mainTitle')}</p>} />
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
