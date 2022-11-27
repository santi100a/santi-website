import React from "react";
import './TodoForm.css';

interface Props extends React.PropsWithChildren {
    addTodo: (ev: React.FormEvent, todoValue: string) => void | never;
    state: [unknown[], React.Dispatch<React.SetStateAction<unknown[]>>];
}

const TodoForm: React.FC<Props> = function({ addTodo, state: [todos, setTodos] }) {
    const todoText = React.useRef<HTMLInputElement>();
    const o = (e: React.FormEvent) => {
        addTodo(e, todoText.current.value);
    } 
    return (
        <form onSubmit={o}>
                <input type="text" ref={todoText} placeholder="¿Qué debe ser terminado?" />
                <br />
                <input type="submit" value="Agregar pendiente" />
                <input onClick={() => {
                    const doIt = confirm('¿Borrar TODAS las tareas pendientes PERMANENTEMENTE?');
                    if (doIt) {
                        setTodos([]);
                        localStorage.setItem('todos', '[]');
                        if (localStorage.getItem('todos') === '[]')
                            alert('Eliminado con éxito.')
                        else alert('Ocurrió un error...')
                    } else {
                        localStorage.setItem('todos', localStorage.getItem('todos'));
                    }
                }} 
                className="danger" 
                type="submit" 
                value="Borrar todos los pendientes" /> 
                <input className="warning" 
                type="submit" 
                value="Borrar uno o varios pendientes"
                onClick={() => {
                    const todosToErase = 
                    prompt(`
                    Ingresa las tareas a borrar. 
                    Ten en cuenta que la primera tarea es 0, la segunda es 1, ...,
                    y deben estar separadas por espacios, así:
                    5 3 8 
                    `).split(' ').map(i => Number(i));
                    todosToErase.forEach(todoIndex => {
                        const theTodos = todos;
                        theTodos.splice(todoIndex, 1);
                        setTodos(theTodos);
                        localStorage.setItem('todos', JSON.stringify(theTodos));
                    });
                }} />
            </form>
    );
}

export default TodoForm;