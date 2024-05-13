import { useCallback, createRef, FormEvent } from 'react';
import { ComplexNumber } from '@santi100a/complexia-lib';

export default function PolarToRect() {
  const argumentRef = createRef<HTMLInputElement>();
  const modulusRef = createRef<HTMLInputElement>();
  const resultRef = createRef<HTMLParagraphElement>();
  const unitRef = createRef<HTMLSelectElement>();
  const degToRad: (x: number) => number = deg => 1/180 * Math.PI * deg;

  const callback = useCallback((event: FormEvent) => {
      event.preventDefault();
      const rawArgument = Number(argumentRef.current?.value);
      const argument = unitRef.current?.value == 'deg' ? degToRad(rawArgument) : rawArgument;
      const modulus = Number(modulusRef.current?.value);

      const complex = ComplexNumber.fromPolar(modulus, argument);
      if (resultRef.current !== null)
          resultRef.current.innerText = `Coordenadas rectangulares: (${complex.real.toFixed(7)}, ${complex.imaginary.toFixed(7)})`;
  }, []);

  return (
    <form id="polar-to-rect" onSubmit={callback}>
      <h2>Convertir coordenadas polares a rectangulares</h2>
      <label htmlFor="modulus">Magnitud: </label>
      <input
        type="number"
        id="modulus"
        min={0}
        step="0.0000000000000001"
        ref={modulusRef}
      />
      <br />
      <label htmlFor="argument">Argumento o fase: </label>
      <input
        type="number"
        id="argument"
        step="0.0000000000000001"
        ref={argumentRef}
      />
      <select
        defaultValue="rad"
        ref={unitRef}
        className="unit"
      >
        <option value="deg">grados</option>
        <option value="rad">radianes</option>
      </select>
      <br />
      <input type="submit" value="Enviar" className="button" />
      <p ref={resultRef}></p>
    </form>
  );
}

