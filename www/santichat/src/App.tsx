import React, { useState, useRef } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAabUE7eqktGKDnR9DixIyJ2WD6f_otIGA",
    authDomain: "santichat-3d8bf.firebaseapp.com",
    projectId: "santichat-3d8bf",
    storageBucket: "santichat-3d8bf.appspot.com",
    messagingSenderId: "667497631293",
    appId: "1:667497631293:web:01a62802dcd9d48dbf2454",
    measurementId: "G-B22361T4GF"
  }
const app = firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const firestore = firebase.firestore();



function App(): JSX.Element {
    const [ user ] = useAuthState(auth);
    return (
        <div className='App'>
            <header className='App-header'>
                <h1 style={{ color: '#0f0' }}>SantiChat</h1>
                <SignOut />
            </header>
            <section>
                {user ? <ChatRoom />: <SignIn />}
            </section>
        </div>
    )
}

function SignIn() {
    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
    );
}
function ChatRoom(): JSX.Element {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [ formValue, setFormValue ] = useState('');
    const [ messages ] = useCollectionData(query, { idField: 'id' });

    async function sendMessage(ev: React.FormEvent) {
        ev.preventDefault();
        const { uid, photoURL } = auth.currentUser;
        await messagesRef.add({ 
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid, photoURL
        })
        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    const dummy = useRef<HTMLDivElement>();

    return (
        <>
            <div>
                {messages && messages.map((msg: Record<any, any>) => 
                <ChatMessage key={msg.id} message={msg} />)}
                <div ref={dummy}></div>
            </div>
            <form onSubmit={sendMessage}>
                <input type="text" value={formValue} onChange={e => setFormValue(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}
function SignOut() {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Cerrar sesión</button>
    );
}

function ChatMessage({ message }: { message: Record<any, any> }): JSX.Element {
    const { text, uid, photoURL } = message;
    const messageClass = uid === auth.currentUser.uid ? 'sent': 'received';
    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} />
            <p>{text}</p>
        </div>
    );
}


export default App;