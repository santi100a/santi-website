import * as React from 'react';
import { type DetailedHTMLProps, type ButtonHTMLAttributes } from 'react';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

function RandBackButton(props: ButtonProps): JSX.Element {
    function rando(): string {
        const colors = [
            'red', 'green', 'blue', 
            'cyan', 'magenta', 'yellow',
            'firebrick'
        ];
        const randFromArray = (arr: unknown[]) => Math.floor(Math.random() * arr.length);
        const colorIndex = randFromArray(colors);
        return colors[colorIndex];
    }
    const styles = {
        padding: '1.5pc 3.2pc',
        borderRadius: '10pc',
        background: rando()
    }
    return (
        <button style={styles} {...props}>{props.children}</button>
    )
}

export default RandBackButton;