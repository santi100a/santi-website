import React from "react";
import './Button.css';

const Button = function(props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const { children } = props;
    return <button {...props}>{children}</button>
}

export default Button;