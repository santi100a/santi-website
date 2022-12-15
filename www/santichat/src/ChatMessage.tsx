import type FIREBASE from 'firebase';
import React from 'react';

interface MessageProps {
  message: Record<PropertyKey, any>;
  auth: FIREBASE.auth.Auth;
}

export default function ChatMessage(props: MessageProps) {
  const {
    text,
    uid,
    photoURL,
    auth
  } = props.message;
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';
  return <>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>;
}
  