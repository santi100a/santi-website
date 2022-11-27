import React from "react";

interface Props extends React.PropsWithChildren {
    todos: string[];
}

const Todos: React.FC<Props> = function ({ todos }) {
    return (
        <ul>
            {todos.map(todo => <li key={todo}>{todo}</li>)}
        </ul>
    )
}

export default Todos;