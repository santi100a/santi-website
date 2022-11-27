// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./App.d.ts" />

import * as React from 'react';
import moon from './.\\moon.png';
import cat from './.\\cat.gif';
import land from './.\\land.png';
const { Parallax, ParallaxLayer } = await import('@react-spring/parallax');

function App(): JSX.Element {
    return (
        <>
            <Parallax pages={4}>
                <ParallaxLayer
                offset={0}
                speed={1}
                factor={2}
                style={{
                    backgroundImage: `url(${moon})`,
                    backgroundSize: 'cover'
                }}
                />
                <ParallaxLayer sticky={{start: 0.9, end: 2.5}}>
                    <img src={cat} />
                </ParallaxLayer>
                <ParallaxLayer
                offset={2}
                speed={1}
                factor={4}
                style={{
                    backgroundImage: `url(${land})`,
                    backgroundSize: 'cover'
                }}
                ></ParallaxLayer>
                <ParallaxLayer 
                offset={1/5} 
                speed={1/20}
                >
                    <h2>Bienvenido/a a mi sitio web.</h2>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={1/2}>
                    <h2>¡El desarrollo web es divertido!</h2> 
                </ParallaxLayer>
                
            </Parallax>
        </>
    )
}

export default App;