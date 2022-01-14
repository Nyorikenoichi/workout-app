import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ContextApp, initialState, reducer } from './reducer';
import { MainTheme } from '../style/mainTheme';
import GlobalStyles from '../style/globalStyle';
import Authentication from '../pages/authentication';
import MainRoutes from '../constants/mainRoutes';

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
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
