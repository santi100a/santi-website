import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
    // left to add props as needed
}
function WarningButton(props: Props) {
    return (
        <button className="warning" {...props}>{props.children}</button>
    );
}

export default WarningButton;