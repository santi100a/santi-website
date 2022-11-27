import React from 'react';
import './Button.css';

type ButtonProps = React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

function Button(props: ButtonProps): JSX.Element {
    return (
        <button {...props}>{props.children}</button>
    )
}

export default Button;