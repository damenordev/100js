---
title: '¡Explora un nuevo proyecto JS recreando el clásico juego Arkanoid!'
description: 'Arkanoid es un juego de arcade clásico desarrollado por Taito en 1986. El objetivo del juego es destruir bloques que se encuentran en la parte superior de la pantalla utilizando una paleta.'
published: true
tecnologies: ['HTML', 'CSS', 'JavaScript']
image: '/images/arkanoid/screenshot.png'
createdAt: 2024-09-20
---

En este proyecto, crearemos un canvas interactivo para jugar a un clon del famoso juego Arkanoid. Se trata de un excelente ejemplo para practicar manipulación de gráficos en un lienzo HTML5, así como la lógica básica de colisiones y físicas con JavaScript.

## Características del proyecto

1. El canvas será nuestro espacio de juego, donde controlaremos una paleta que rebota una pelota para destruir ladrillos.
2. Sprites y gráficos: se utilizan imágenes ocultas para los sprites de la paleta y los ladrillos, cargados dinámicamente en el canvas.
3. Colisiones: la pelota interactúa con los ladrillos y la paleta, destruyendo los ladrillos cuando hay un choque y rebotando según las reglas del juego.
4. Eventos del teclado: utiliza las teclas de flechas o "A/D" para mover la paleta, lo que te permitirá mantener la pelota en juego.

## Estructura del HTML y el Canvas

El siguiente código representa una parte esencial de la estructura HTML para el juego. Utilizamos un canvas donde dibujamos los elementos del juego, como la pelota, los ladrillos y la paleta, y escondemos las imágenes de los sprites:

```astro
<Layout title="100 proyectos JS - Arkanoid">
  <canvas></canvas>

  <img hidden id="sprite" src="/images/arkanoid/sprite.png" alt="Sprite Arkanoid" />
  <img hidden id="bricks" src="/images/arkanoid/bricks.png" alt="Sprite Bricks Arkanoid" />
</Layout>

<style>
  body {
    background-color: #f0f0f0;
    display: grid;
    place-content: center;
  }

  canvas {
    border: 4px solid #000;
    background: url('/images/arkanoid/bkg.png') repeat;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
  }
</style>
```

En este bloque se definen dos imágenes ocultas (sprite y bricks), las cuales contienen los recursos visuales del juego. El canvas es el área donde dibujamos el juego en sí.

## Lógica de colisiones

La detección de colisiones es una parte crítica del juego, ya que permite saber cuándo la pelota golpea los ladrillos, destruyéndolos, y cuándo rebota en la paleta o en los bordes del canvas.

Aquí tienes el código que implementa esta lógica de colisiones:

```js
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r]
      if (currentBrick.status === BRICK_STATUS.DESTROYED) continue

      if (x > currentBrick.x && x < currentBrick.x + brickWidth && y > currentBrick.y && y < currentBrick.y + brickHeight) {
        dy = -dy
        currentBrick.status = BRICK_STATUS.DESTROYED
      }
    }
  }
}
```

Este código utiliza dos bucles anidados para recorrer la matriz de ladrillos. Por cada ladrillo, se comprueba si la posición de la pelota está dentro de las coordenadas del ladrillo. Si es así, la pelota cambia de dirección y el ladrillo se "destruye" actualizando su estado.

### ¿Por qué es importante la detección de colisiones?

Sin la detección de colisiones, la pelota simplemente atravesaría los ladrillos sin interactuar con ellos, eliminando la mecánica principal del juego. Además, esta lógica también puede expandirse para detectar colisiones con la paleta, los bordes del canvas y añadir efectos más avanzados como power-ups o diferentes tipos de ladrillos.

Sigamos explorando las diferentes partes del proyecto Arkanoid para profundizar en el funcionamiento del juego. Ya vimos cómo dibujar los elementos básicos como la paleta, la pelota y los ladrillos, además de manejar las colisiones. Ahora continuemos con la lógica de movimiento y eventos clave, además de la configuración general del bucle de juego y cómo controlar la velocidad de los frames por segundo (FPS).

## Movimiento de la pelota y la paleta

Uno de los aspectos clave del juego es cómo se mueve la pelota dentro del canvas y cómo interactúa con los bordes y la paleta. Aquí tenemos la lógica básica para gestionar estos movimientos y colisiones:

Movimiento de la pelota:

```js
function ballMovement() {
  if (x + dx > canvas!.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;  // Cambia de dirección cuando toca los bordes laterales
  }

  if (y + dy < ballRadius) {
    dy = -dy;  // Rebota en la parte superior
  }

  // Detección de colisión con la paleta
  const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;
  const isBallTouchingPaddle = y + dy > paddleY;

  if (isBallSameXAsPaddle && isBallTouchingPaddle) {
    dy = -dy;  // Rebote en la paleta
  } else if (y + dy > canvas!.height - ballRadius) {
    // Si la pelota toca el fondo, termina el juego
    gameOver = true;
    console.log('Game Over');
    document.location.reload();
  }

  x += dx;  // Actualiza la posición horizontal
  y += dy;  // Actualiza la posición vertical
}
```

Movimiento de la paleta:

El jugador puede mover la paleta utilizando las teclas de flecha o las letras "A" y "D". Aquí se define el comportamiento de la paleta:

```js
function paddleMovement() {
  if (rightPressed && paddleX < canvas!.width - paddleWidth) {
    paddleX += PADDLE_SENSITIVITY;  // Mueve a la derecha
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SENSITIVITY;  // Mueve a la izquierda
  }
}
```

Para capturar los eventos de teclado, se usan funciones que detectan cuándo una tecla está presionada o liberada:

```js
function initEvents() {
  document.addEventListener('keydown', keyDownHandler)
  document.addEventListener('keyup', keyUpHandler)

  function keyDownHandler(event) {
    const { key } = event
    if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') {
      rightPressed = true
    } else if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') {
      leftPressed = true
    }
  }

  function keyUpHandler(event) {
    const { key } = event
    if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') {
      rightPressed = false
    } else if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') {
      leftPressed = false
    }
  }
}
```

## Lógica del juego: FPS y el bucle principal

El bucle principal del juego es esencial para renderizar los frames, calcular las posiciones y detectar colisiones en cada frame. Este código controla la velocidad de actualización del juego usando los FPS:

```js
const fps = 60 // Cuántos frames por segundo queremos
let msPrev = window.performance.now()
const msPerFrame = 1000 / fps

function draw() {
  if (gameOver) return // Si el juego termina, detenemos el bucle

  window.requestAnimationFrame(draw) // Llamar de nuevo a draw en el siguiente frame

  const msNow = window.performance.now()
  const msPassed = msNow - msPrev

  if (msPassed < msPerFrame) return // Si no ha pasado suficiente tiempo, no renderizamos un nuevo frame

  msPrev = msNow

  // Limpiamos el canvas y renderizamos todo de nuevo
  cleanCanvas()
  drawBall()
  drawPaddle()
  drawBricks()
  drawUI() // FPS y cualquier otro indicador en pantalla

  // Procesamos la lógica del juego
  collisionDetection()
  ballMovement()
  paddleMovement()
}
```

Este bucle se repite a través de requestAnimationFrame(), que permite que el juego se actualice en sincronía con la tasa de refresco del monitor, asegurando una experiencia de juego fluida.

Finalización del juego y reinicio
Cuando la pelota toca el fondo del canvas (debajo de la paleta), el juego se reinicia mostrando el mensaje "Game Over":

```js
if (y + dy > canvas!.height - ballRadius) {
  gameOver = true;
  console.log('Game Over');
  document.location.reload();  // Recarga la página para reiniciar el juego
}
```

## Conclusión

Este proyecto de Arkanoid es una excelente oportunidad para explorar conceptos clave de animación y juegos en JavaScript como el manejo de eventos, manipulación de gráficos en un canvas, lógica de colisiones, y control de FPS. Además, es muy flexible para personalizar: puedes agregar nuevos niveles, mejorar los gráficos, o incluso incorporar mejoras como power-ups y sonidos.

Si estás interesado en expandirlo, aquí hay algunas ideas:

- _Power-ups_: Pelotas múltiples, paletas más grandes o más pequeñas.
- _Niveles_: Cambiar la disposición de los ladrillos o la velocidad de la pelota en cada nivel.
- _Puntuaciones_: Implementar un sistema de puntuaciones que se muestre en la pantalla.

¡Conviértete en el desarrollador de tu propio juego clásico y diviértete programando!
