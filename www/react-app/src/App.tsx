import * as React from 'react';
import { useState, version as VERSION, lazy, Suspense } from 'react';

const Button = lazy(() => import('./components/Button'));

function App(): JSX.Element {
    const [ count, setCount ] = useState(0);
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <p>Contador: {count}</p>
            <Button onClick={() => setCount(count + 1)}>Aumentar conteo</Button>
            <hr />
            <p>Hecho en React v{VERSION}.</p> 
        </Suspense>
    )
}

export default App;