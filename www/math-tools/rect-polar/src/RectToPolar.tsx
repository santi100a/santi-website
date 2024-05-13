import { ComplexNumber } from '@santi100a/complexia-lib';
import { useCallback, createRef, FormEvent } from 'react';

export default function RectToPolar() {
    const xRef = createRef<HTMLInputElement>();
    const yRef = createRef<HTMLInputElement>();
    const resultRef = createRef<HTMLInputElement>();

    const callback = useCallback((event: FormEvent) => {
        event.preventDefault();
        const xValue = Number(xRef.current?.value);
        const yValue = Number(yRef.current?.value);

        const complex = new ComplexNumber(xValue, yValue);
        if (resultRef.current !== null)
            resultRef.current.innerText = `Magnitud: ${complex.modulus().toFixed(7)}\nFase: ${complex.argument().toFixed(7)} rad`;
    }, []);

  return (
    <form id="polar-to-rect" onSubmit={callback}>
      <h2>Convertir coordenadas rectangulares a polares</h2>
      <label htmlFor="x">Coordenada X: </label>
      <input
        type="number"
        id="modulus"
        step="0.0000000000000001"
        ref={xRef}
      />
      <br />
      <label htmlFor="y">Coordenada Y: </label>
      <input
        type="number"
        id="argument"
        step="0.0000000000000001"
        ref={yRef}
      />
      <br /> <br />
      <input type="submit" value="Enviar" className="button" />

      <p ref={resultRef}></p>
    </form>
  );
}
