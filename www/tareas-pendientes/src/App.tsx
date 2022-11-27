import React, { useState, useEffect, lazy, Suspense } from 'react';

const Todos = lazy(() => import('./components/Todos'));
const TodoForm = lazy(() => import('./components/TodoForm'));

function App(): JSX.Element {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const existingTodos = localStorage.getItem('todos');
        setTodos(existingTodos? JSON.parse(existingTodos): []);
    }, []);
    
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <Todos todos={todos.length ? todos : []} />
            <TodoForm addTodo={(ev, todoValue) => {
                ev.preventDefault();
                const next = [...todos, todoValue];
                setTodos(next);
                localStorage.setItem('todos', JSON.stringify(next));
            }}
            state={[todos, setTodos]}
            />
        </Suspense>
    )
}

export default App;