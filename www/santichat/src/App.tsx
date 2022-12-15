/// <reference path="./App.d.ts" />

import React, { Suspense, lazy } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp(
    JSON.parse(
        `{
            "apiKey": "AIzaSyAabUE7eqktGKDnR9DixIyJ2WD6f_otIGA",
            "authDomain": "santichat-3d8bf.firebaseapp.com",
            "projectId": "santichat-3d8bf",
            "storageBucket": "santichat-3d8bf.appspot.com",
            "messagingSenderId": "667497631293",
            "appId": "1:667497631293:web:01a62802dcd9d48dbf2454",
            "measurementId": "G-B22361T4GF"
          }`
    )
); 

const auth = firebase.auth();
const firestore = firebase.firestore();

type Func<T> = (...args: any[]) => T;
function App() {

  const [user] = useAuthState(auth);
  const SignOut = lazy(() => import('./SignOut'));
  const SignIn = lazy(() => import('./SignIn'));
  const ChatRoom = lazy(() => import('./ChatRoom'));


  return (
    <Suspense>
        <div className="App">
          <header>
            <h1 style={{ color: '#0f0' }}>SantiChat</h1>
            <SignOut auth={auth} />
          </header>
          <section>
            {user ? <ChatRoom
            firestore={firestore} auth={auth}
            /> : <SignIn GoogleAuthProvider={firebase.auth.GoogleAuthProvider} auth={auth} />}
          </section>
        </div>
    </Suspense>
  );
}

export default App;