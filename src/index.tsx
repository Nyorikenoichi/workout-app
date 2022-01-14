import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './core/components/App';
import './core/localization/i18n';
// import { app, database } from './core/firebase/firebaseInit';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
