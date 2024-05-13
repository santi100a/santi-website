import App from './App';
import { createRoot } from 'react-dom/client';

const rootElement = document.querySelector('#root')!;
const root = createRoot(rootElement);

root.render(<App />);