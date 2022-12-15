import React from 'react';
import { type auth as AUTH } from 'firebase/app';

interface SignOutProps {
    auth: AUTH.Auth;
}

export default function SignOut(props: SignOutProps) {
    const auth = props.auth;
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Cerrar sesión</button>
    );
}
