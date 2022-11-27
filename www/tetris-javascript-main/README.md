# tetris-javascript
 Tetris escrito con JavaScript. Se usa canvas para dibujar el tablero.
 
 ![Parzibyte jugando Tetris programado con JavaScript](https://parzibyte.me/blog/wp-content/uploads/2020/11/Jugando-Tetris-en-JavaScript-juego-open-source.png)
 
 **By parzibyte**
 
 **Tutorial**: https://parzibyte.me/blog/2020/11/02/tetris-javascript-open-source/
 
 **Demo**: https://parzibyte.github.io/tetris-javascript/
 

# Documentación del estilo de código
Preferimos algo legible a algo "optimizado". Por ejemplo, en lugar de:
```javascript
return !tablero[y][x].ocupado;
```
Se prefiere:
```javascript
if (tablero[y][x].ocupado){
    return false
}else {
    return true;
}
```

# Docs

**Absolute point**: A point with x and y that is absolute to the game board

**Relative point**: A point with inner x and y; for example, a point that conforms a figure

# Files
**script.js**: just a legacy code file. It is not necessary at all,
it's just to remember the early development of this port

**tetris.js**: the main file. It contains 3 classes. If you want, you
can separate all of them; they are independent.

# About
Proudly brought to you by parzibyte (https://parzibyte.me/blog)