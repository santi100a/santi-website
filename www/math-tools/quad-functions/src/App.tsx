import { FormEvent, createRef, useCallback } from 'react';
import './App.css';
import QuadraticFunction from '@santi100a/quadratic-function';

const PRECISION_FIGURES = 7;

export default function App() {
  const aRef = createRef<HTMLInputElement>();
  const bRef = createRef<HTMLInputElement>();
  const cRef = createRef<HTMLInputElement>();
  const inputRef = createRef<HTMLInputElement>();
  const resultRef = createRef<HTMLParagraphElement>();
  const evalRef = createRef<HTMLSpanElement>();

  const callback = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      const a = Number(aRef.current?.value);
      const b = Number(bRef.current?.value);
      const c = Number(cRef.current?.value);
      if (!resultRef.current) return;
      if (a == 0) {
        resultRef.current.innerHTML = `<span style="color: red;">El primer coeficiente no puede ser cero.</span>`;
        return;
      }
      const quad = new QuadraticFunction(a, b, c);
      const turningPoint = quad.vertex();
      const stringRoots: string[] = [];
      const xInterceptStrings = [];
      const realRoots = quad.roots();
      for (const realRoot of realRoots) {
        stringRoots.push(Number(realRoot).toFixed(PRECISION_FIGURES));
      } 
      for (const stringRoot of stringRoots) {
        xInterceptStrings.push(`(${stringRoot}, ${(0).toFixed(PRECISION_FIGURES)})`);
      }


      if (resultRef.current !== null)
      
        resultRef.current.innerText = `La parábola se abre hacia ${a > 0 ? 'arriba' : 'abajo'}.\n` +
                                      `Punto de inflexión: (${turningPoint.x.toFixed(PRECISION_FIGURES)}, ${turningPoint.y.toFixed(PRECISION_FIGURES)})\n` + 
                                      `Raíces reales: ${stringRoots.join(', ') || '(ninguna)'}\n` + 
                                      `Intersección(es) con el eje X: ${xInterceptStrings.join(', ') || '(ninguna)'}\n` + 
                                      `Intersección con el eje Y: (${(0).toFixed(PRECISION_FIGURES)}, ${c.toFixed(PRECISION_FIGURES)})\n`


      if (evalRef.current !== null)
        evalRef.current.innerText = `${quad.evaluate(Number(inputRef.current?.value)).toFixed(PRECISION_FIGURES)}`;
     
    },
    [aRef, bRef, cRef]
  );

  return (
    <>
      <h1>Información de función cuadrática (precisión de {PRECISION_FIGURES} cifras)</h1>
      <form onSubmit={callback}>
        Para la función f(x) = <input type="number" ref={aRef} defaultValue={1} step={0.0000000000000001} />
        x^2 + <input type="number" ref={bRef} defaultValue={0} step={0.0000000000000001} />x +{' '}
        <input type="number" ref={cRef} defaultValue={0} step={0.0000000000000001} />: <br /> <br />
        
        f(<input type="number" ref={inputRef} defaultValue={0} step={0.0000000000000001} />) = <span ref={evalRef}></span>
        
        <p ref={resultRef}></p>
        <input type="submit" value="Calcular información" />
      </form>
    </>
  );
}
