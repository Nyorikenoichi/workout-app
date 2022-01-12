import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import App from './core/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCeDhvuYWoaH3h5ifKioEBSYv4FU7z0RpQ',
  authDomain: 'nyorikenoichi-workout-app.firebaseapp.com',
  projectId: 'nyorikenoichi-workout-app',
  storageBucket: 'nyorikenoichi-workout-app.appspot.com',
  messagingSenderId: '213314023639',
  appId: '1:213314023639:web:6412b78558677db1714092',
  measurementId: 'G-0T84E20Z00',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

ReactDOM.render(<App />, document.querySelector('#root'));
