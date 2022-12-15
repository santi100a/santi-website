import React from 'react';
import type FIREBASE from 'firebase/app';

interface SignInProps {
    GoogleAuthProvider: typeof FIREBASE.auth.GoogleAuthProvider;
    auth: FIREBASE.auth.Auth;
}

export default function SignIn({ GoogleAuthProvider, auth }: SignInProps) {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };

    return (
        <>
            <button className="sign-in" onClick={signInWithGoogle}>Iniciar sesión con Google</button>
            <p>Por favor, sé amable.</p>
        </>
    );

}
