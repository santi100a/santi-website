import ChatMessage from './ChatMessage';
import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';


interface ChatRoomProps {
    firestore: firebase.firestore.Firestore; 
    auth: firebase.auth.Auth;
}

export default function ChatRoom({ firestore, auth }: ChatRoomProps) {
    const dummy = useRef(null);
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' }) as [
        Record<PropertyKey, any>, boolean, Error];

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (<>
        <main>

            {messages && messages.map((msg: Record<PropertyKey, any>) => <ChatMessage key={msg.id} message={msg} auth={auth} />)}

            <span ref={dummy}></span>

        </main>

        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Di algo lindo..." />

            <button type="submit" disabled={!formValue}>Enviar</button>

        </form>
    </>);
}
