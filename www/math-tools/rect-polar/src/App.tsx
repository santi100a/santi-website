import './App.css';
import PolarToRect from './PolarToRect';
import RectToPolar from './RectToPolar';

export default function App() {
  return (
    <>
      <h1>Forma rectangular y polar (precisión de 7 cifras)</h1>

      <div className="container">
        <PolarToRect />
        <RectToPolar />
      </div>
    </>
  );
}
