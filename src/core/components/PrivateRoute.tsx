import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ContextApp } from '../store/reducers/globalStateReducer';
import { MainRoutes } from '../constants/mainRoutes';

export const PrivateRoute = React.memo(function PrivateRoute() {
  const { state } = useContext(ContextApp);

  const isAuth = !!state.user;

  return isAuth ? <Outlet /> : <Navigate to={MainRoutes.auth} />;
});
