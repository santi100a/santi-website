import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
const App = lazy(() => import('./App'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
	<Suspense fallback={<p>Cargando...</p>}>
		<App />
	</Suspense>
);
