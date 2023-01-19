import React from 'react';
import { createRoot } from 'react-dom/client';
import json from './manifest.json';
const App = React.lazy(() => import('./App'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
console.log(json);
root.render(
    <React.Suspense fallback={<p>Cargando...</p>}>
        <App />
    </React.Suspense>
); 