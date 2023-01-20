import React from 'react';
import { createRoot } from 'react-dom/client';
const App = React.lazy(() => import('./App'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <React.Suspense fallback={<p>Cargando...</p>}>
        <App />
    </React.Suspense>
); 
import('./post.js');