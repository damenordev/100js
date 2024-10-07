---
title: 'Cómo crear tu propio Arkanoid con JavaScript y TypeScript'
description: 'Aprende paso a paso cómo desarrollar el clásico juego Arkanoid utilizando JavaScript y TypeScript. Ideal para principiantes en programación.'
published: true
tecnologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript']
image: '/images/arkanoid/screenshot.png'
createdAt: 2024-09-20
---

¿Te gustaría crear tu propio videojuego desde cero? En este tutorial, te guiaré paso a paso para desarrollar el clásico juego **Arkanoid** utilizando **JavaScript** y **TypeScript**. Este proyecto es perfecto para iniciarte en la programación y entender conceptos fundamentales de manera práctica y divertida.

## Introducción al Proyecto

**Arkanoid** es un juego arcade clásico lanzado en 1986 por Taito. El objetivo es controlar una paleta para rebotar una pelota y destruir todos los ladrillos en pantalla. Al recrear este juego, aprenderás conceptos clave como:

- Manipulación del **Canvas** de HTML5.
- Lógica de movimiento y colisiones.
- Organización del código utilizando clases y módulos con **TypeScript**.
- Manejo de eventos del teclado.
- Añadir elementos visuales y sonidos al juego.

## Paso 1: Preparar el Entorno de Desarrollo

Antes de empezar, asegúrate de tener instalado:

- **Node.js** y **npm**: para gestionar dependencias y compilación.
- Un editor de código como **Visual Studio Code**.
- Un navegador web moderno (Chrome, Firefox, Edge).

## Paso 2: Crear la Estructura del Proyecto

Crea una carpeta para tu proyecto y navega hasta ella:

```bash
mkdir arkanoid-game
cd arkanoid-game
```

Inicializa un proyecto de Node.js:

```bash
npm init -y
```

Instala TypeScript y las herramientas necesarias:

```bash
npm install typescript --save-dev
npx tsc --init
```

Esto generará un archivo `tsconfig.json` con la configuración del compilador TypeScript.

## Paso 3: Configurar el HTML y Estilos Básicos

Crea un archivo `index.html` en la raíz de tu proyecto:

```html:index.html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Arkanoid con JavaScript</title>
  <style>
    body {
      background-color: #f0f0f0;
      display: grid;
      place-content: center;
      margin: 0;
      height: 100vh;
    }
    canvas {
      border: 4px solid #000;
      background: url('/images/arkanoid/bkg.png') repeat;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
    }
  </style>
</head>
<body>
  <canvas width="448" height="400"></canvas>
  <img hidden id="sprite" src="/images/arkanoid/sprite.png" alt="Sprite Arkanoid">
  <img hidden id="bricks" src="/images/arkanoid/bricks.png" alt="Sprite Bricks Arkanoid">
  <script src="dist/main.js"></script>
</body>
</html>
```

En este archivo:

- **Canvas**: es el área donde se dibujará el juego.
- **Imágenes ocultas**: contienen los sprites (gráficos) que usaremos.
- **Estilos CSS**: centran el canvas y le dan estilo.

## Paso 4: Configurar las Constantes del Juego

Crea una carpeta `src/modules/arkanoid` y dentro un archivo `Arkanoid.constants.ts` donde definiremos las constantes que usaremos en el juego:

```ts
export const ARKANOID_BALL_RADIUS = 8
export const ARKANOID_BALL_SPEED = 150
export const ARKANOID_PADDLE_WIDTH = 75
export const ARKANOID_PADDLE_HEIGHT = 10

export const ARKANOID_BRICK_ROW_COUNT = 6
export const ARKANOID_BRICK_COLUMN_COUNT = 13
export const ARKANOID_BRICK_WIDTH = 32
export const ARKANOID_BRICK_HEIGHT = 16
export const ARKANOID_BRICK_PADDING = 0
export const ARKANOID_BRICK_OFFSET_TOP = 80
export const ARKANOID_BRICK_OFFSET_LEFT = 16
export const ARKANOID_BRICK_COLORS = 8

export const ARKANOID_COUNTDOWN_START = 3
export const ARKANOID_POINTS_PER_BRICK = 10

export const ARKANOID_PADDLE_SPRITE_X = 29
export const ARKANOID_PADDLE_SPRITE_Y = 174
export const ARKANOID_PADDLE_SPRITE_WIDTH = 48
export const ARKANOID_PADDLE_SPRITE_HEIGHT = 16
```

Estas constantes nos ayudarán a mantener valores clave en un solo lugar, facilitando ajustes y mantenimiento.

## Paso 5: Clase Principal del Juego `Arkanoid`

Creamos la clase principal que inicializará el juego y gestionará el bucle principal:

```ts
import { ArkanoidGame } from './ArkanoidGame'
import { ArkanoidEventHandler } from './ArkanoidEventHandler'
import { ArkanoidRenderer } from './ArkanoidRenderer'
import { ArkanoidFontLoader } from './ArkanoidFontLoader'

export class Arkanoid {
  private game: ArkanoidGame
  private eventHandler: ArkanoidEventHandler
  private renderer: ArkanoidRenderer
  private fontLoader: ArkanoidFontLoader

  constructor(canvas: HTMLCanvasElement, sprite: HTMLImageElement, bricksImage: HTMLImageElement) {
    this.game = new ArkanoidGame(canvas, sprite, bricksImage)
    this.eventHandler = new ArkanoidEventHandler(this.game)
    this.renderer = new ArkanoidRenderer(this.game)
    this.fontLoader = new ArkanoidFontLoader()

    this.init()
  }

  private async init() {
    await this.fontLoader.load()
    this.eventHandler.initEvents()
    this.renderer.draw()
    this.loop()
  }

  private loop(currentTime: number = performance.now()) {
    const deltaTime = (currentTime - this.game.lastTime) / 1000
    this.game.lastTime = currentTime

    this.game.update(deltaTime)
    this.renderer.draw()

    this.game.animationFrameId = requestAnimationFrame(this.loop.bind(this))
  }
}
```

En esta clase:

- **Constructor**: inicializa las clases necesarias.
- **init()**: carga fuentes y comienza el juego.
- **loop()**: es el bucle principal que actualiza y dibuja el juego.

## Paso 6: La Lógica del Juego `ArkanoidGame`

Creamos la lógica central del juego que gestionará la pelota, la paleta, los ladrillos y el estado del juego:

```ts
import { ArkanoidBall } from './ArkanoidBall'
import { ArkanoidPaddle } from './ArkanoidPaddle'
import { ArkanoidBrickManager } from './ArkanoidBrick/ArkanoidBrickManager'
import { ArkanoidGameState } from './ArkanoidGameState'
import { ArkanoidUI } from './ArkanoidUI/ArkanoidUI'

export class ArkanoidGame {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  ball: ArkanoidBall
  paddle: ArkanoidPaddle
  brickManager: ArkanoidBrickManager
  gameState: ArkanoidGameState
  ui: ArkanoidUI
  lastTime: number = 0
  animationFrameId: number = 0

  constructor(canvas: HTMLCanvasElement, sprite: HTMLImageElement, bricksImage: HTMLImageElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.ball = new ArkanoidBall(this.ctx, canvas.width / 2, canvas.height - 30)
    this.paddle = new ArkanoidPaddle({
      ctx: this.ctx,
      sprite,
      x: (canvas.width - 75) / 2,
      y: canvas.height - 20,
      scaleX: 1,
      scaleY: 1,
    })
    this.brickManager = new ArkanoidBrickManager(this.ctx, bricksImage)
    this.gameState = new ArkanoidGameState()
    this.ui = new ArkanoidUI(this.ctx, this.canvas)
  }

  startGame() {
    this.resetGame()
    this.gameState.startCountdown()
  }

  resetGame() {
    this.ball = new ArkanoidBall(this.ctx, this.canvas.width / 2, this.canvas.height - 30)
    this.paddle = new ArkanoidPaddle({
      ctx: this.ctx,
      sprite: this.paddle.sprite,
      x: (this.canvas.width - 75) / 2,
      y: this.canvas.height - 20,
      scaleX: 1,
      scaleY: 1,
    })
    this.brickManager.reset()
    this.gameState.reset()
  }

  update(deltaTime: number) {
    if (this.gameState.isPlaying() && !this.gameState.isPaused) {
      const ballInPlay = this.ball.move({
        deltaTime,
        canvasWidth: this.canvas.width,
        canvasHeight: this.canvas.height,
        paddleX: this.paddle.x,
        paddleY: this.paddle.y,
        paddleWidth: this.paddle.width,
        paddleHeight: this.paddle.height,
      })

      if (!ballInPlay) {
        this.gameOver()
        return
      }

      if (this.ball.hitPaddle) {
        // Sonido de rebote en paleta
      }

      const brickHit = this.brickManager.checkCollision(this.ball)
      if (brickHit) {
        this.gameState.score += 10
        // Sonido de ladrillo destruido
      }

      this.paddle.move({
        leftPressed: this.gameState.leftPressed,
        rightPressed: this.gameState.rightPressed,
        canvasWidth: this.canvas.width,
        deltaTime,
      })

      this.gameState.updateTime(deltaTime)

      if (this.brickManager.allBricksDestroyed()) {
        // Nivel completado
        this.gameOver()
      }
    }
  }

  private gameOver() {
    this.gameState.gameState = 'gameover'
    // Sonido de game over
  }
}
```

En esta clase:

- **update()**: actualiza el estado del juego cada frame.
- **startGame() y resetGame()**: inician y reinician el juego.
- **gameOver()**: gestiona el fin del juego.

## Paso 7: La Pelota `ArkanoidBall`

La pelota es un elemento clave. Necesita moverse y detectar colisiones:

```ts
import { ARKANOID_BALL_SPEED, ARKANOID_BALL_RADIUS } from './Arkanoid.constants'

export class ArkanoidBall {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  ctx: CanvasRenderingContext2D
  hitPaddle: boolean = false

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.x = x
    this.y = y
    this.dx = ARKANOID_BALL_SPEED
    this.dy = -ARKANOID_BALL_SPEED
    this.radius = ARKANOID_BALL_RADIUS
    this.ctx = ctx
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = '#fff'
    this.ctx.fill()
    this.ctx.closePath()
  }

  move(args: {
    deltaTime: number
    canvasWidth: number
    canvasHeight: number
    paddleX: number
    paddleY: number
    paddleWidth: number
    paddleHeight: number
  }): boolean {
    const { deltaTime, canvasWidth, canvasHeight, paddleX, paddleY, paddleWidth, paddleHeight } = args

    this.x += this.dx * deltaTime
    this.y += this.dy * deltaTime

    // Rebote en paredes laterales
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    // Rebote en techo
    if (this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.hitPaddle = false

    // Colisión con la paleta
    if (this.x > paddleX && this.x < paddleX + paddleWidth && this.y + this.radius > paddleY && this.y + this.radius < paddleY + paddleHeight) {
      const hitPos = (this.x - paddleX) / paddleWidth
      const angle = hitPos * Math.PI - Math.PI / 2
      const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
      this.dx = Math.cos(angle) * speed
      this.dy = -Math.abs(Math.sin(angle) * speed)
      this.hitPaddle = true
    } else if (this.y + this.radius > canvasHeight) {
      return false // Game over
    }

    return true
  }
}
```

Explicación:

- **draw()**: dibuja la pelota en el canvas.
- **move()**: actualiza la posición y gestiona colisiones con paredes y la paleta.

## Paso 8: La Paleta `ArkanoidPaddle`

La paleta es controlada por el jugador y rebota la pelota:

```ts
import { IArkanoidPaddleArgs, IArkanoidPaddleMoveArgs } from './Arkanoid.types'
import {
  ARKANOID_PADDLE_WIDTH,
  ARKANOID_PADDLE_HEIGHT,
  ARKANOID_PADDLE_SPRITE_X,
  ARKANOID_PADDLE_SPRITE_Y,
  ARKANOID_PADDLE_SPRITE_WIDTH,
  ARKANOID_PADDLE_SPRITE_HEIGHT,
} from './Arkanoid.constants'

export class ArkanoidPaddle {
  x: number
  y: number
  width: number
  height: number
  ctx: CanvasRenderingContext2D
  sprite: HTMLImageElement
  velocity: number = 0
  maxVelocity: number = 10
  acceleration: number = 0.5
  deceleration: number = 0.8
  scaleX: number
  scaleY: number

  constructor(args: IArkanoidPaddleArgs) {
    const { ctx, sprite, x, y, scaleX, scaleY } = args
    this.x = x
    this.y = y
    this.width = ARKANOID_PADDLE_WIDTH * scaleX
    this.height = ARKANOID_PADDLE_HEIGHT * scaleY
    this.ctx = ctx
    this.sprite = sprite
    this.scaleX = scaleX
    this.scaleY = scaleY
  }

  draw() {
    this.ctx.drawImage(
      this.sprite,
      ARKANOID_PADDLE_SPRITE_X,
      ARKANOID_PADDLE_SPRITE_Y,
      ARKANOID_PADDLE_SPRITE_WIDTH,
      ARKANOID_PADDLE_SPRITE_HEIGHT,
      Math.round(this.x),
      Math.round(this.y),
      this.width,
      this.height
    )
  }

  move(args: IArkanoidPaddleMoveArgs) {
    const { leftPressed, rightPressed, canvasWidth, deltaTime } = args

    if (rightPressed && this.x < canvasWidth - this.width) {
      this.velocity = Math.min(this.velocity + this.acceleration, this.maxVelocity)
    } else if (leftPressed && this.x > 0) {
      this.velocity = Math.max(this.velocity - this.acceleration, -this.maxVelocity)
    } else {
      this.velocity *= this.deceleration
    }

    this.x += this.velocity * deltaTime * 60
    this.x = Math.max(0, Math.min(this.x, canvasWidth - this.width))
  }
}
```

Explicación:

- **draw()**: dibuja la paleta usando el sprite.
- **move()**: actualiza la posición según las teclas presionadas.

## Paso 9: Los Ladrillos `ArkanoidBrick` y su Gestor `ArkanoidBrickManager`

### Clase `ArkanoidBrick`

Representa cada ladrillo en el juego:

```ts
import { ArkanoidBall } from '../ArkanoidBall'
import { ARKANOID_BRICK_WIDTH, ARKANOID_BRICK_HEIGHT } from '../Arkanoid.constants'

export class ArkanoidBrick {
  static BRICK_STATUS = {
    ACTIVE: 1,
    DESTROYED: 0,
  }

  ctx: CanvasRenderingContext2D
  bricksImage: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
  color: number
  status: number
  scaleX: number
  scaleY: number

  constructor(ctx: CanvasRenderingContext2D, bricksImage: HTMLImageElement, x: number, y: number, color: number, scaleX: number, scaleY: number) {
    this.ctx = ctx
    this.bricksImage = bricksImage
    this.x = x
    this.y = y
    this.width = ARKANOID_BRICK_WIDTH * scaleX
    this.height = ARKANOID_BRICK_HEIGHT * scaleY
    this.color = color
    this.status = ArkanoidBrick.BRICK_STATUS.ACTIVE
    this.scaleX = scaleX
    this.scaleY = scaleY
  }

  draw() {
    if (this.status === ArkanoidBrick.BRICK_STATUS.DESTROYED) return

    const clipX = this.color * ARKANOID_BRICK_WIDTH

    this.ctx.drawImage(this.bricksImage, clipX, 0, ARKANOID_BRICK_WIDTH, ARKANOID_BRICK_HEIGHT, this.x, this.y, this.width, this.height)
  }

  detectCollision(ball: ArkanoidBall): boolean {
    if (this.status === ArkanoidBrick.BRICK_STATUS.DESTROYED) return false

    const isBallSameXAsBrick = ball.x > this.x && ball.x < this.x + this.width
    const isBallSameYAsBrick = ball.y > this.y && ball.y < this.y + this.height

    if (isBallSameXAsBrick && isBallSameYAsBrick) {
      ball.dy = -ball.dy
      this.status = ArkanoidBrick.BRICK_STATUS.DESTROYED
      return true
    }

    return false
  }
}
```

### Clase `ArkanoidBrickManager`

Gestiona todos los ladrillos:

```ts
import { ArkanoidBall } from '../ArkanoidBall'
import {
  ARKANOID_BRICK_ROW_COUNT,
  ARKANOID_BRICK_COLUMN_COUNT,
  ARKANOID_BRICK_WIDTH,
  ARKANOID_BRICK_HEIGHT,
  ARKANOID_BRICK_PADDING,
  ARKANOID_BRICK_OFFSET_TOP,
  ARKANOID_BRICK_OFFSET_LEFT,
  ARKANOID_BRICK_COLORS,
} from '../Arkanoid.constants'
import { ArkanoidBrick } from './ArkanoidBrick'

export class ArkanoidBrickManager {
  bricks: ArkanoidBrick[][]
  ctx: CanvasRenderingContext2D
  bricksImage: HTMLImageElement

  constructor(ctx: CanvasRenderingContext2D, bricksImage: HTMLImageElement) {
    this.ctx = ctx
    this.bricksImage = bricksImage
    this.bricks = this.createBricks()
  }

  createBricks(): ArkanoidBrick[][] {
    const bricks: ArkanoidBrick[][] = []
    for (let c = 0; c < ARKANOID_BRICK_COLUMN_COUNT; c++) {
      bricks[c] = []
      for (let r = 0; r < ARKANOID_BRICK_ROW_COUNT; r++) {
        const brickX = c * (ARKANOID_BRICK_WIDTH + ARKANOID_BRICK_PADDING) + ARKANOID_BRICK_OFFSET_LEFT
        const brickY = r * (ARKANOID_BRICK_HEIGHT + ARKANOID_BRICK_PADDING) + ARKANOID_BRICK_OFFSET_TOP
        const color = Math.floor(Math.random() * ARKANOID_BRICK_COLORS)
        bricks[c][r] = new ArkanoidBrick(this.ctx, this.bricksImage, brickX, brickY, color, 1, 1)
      }
    }
    return bricks
  }

  draw() {
    for (let c = 0; c < ARKANOID_BRICK_COLUMN_COUNT; c++) {
      for (let r = 0; r < ARKANOID_BRICK_ROW_COUNT; r++) {
        this.bricks[c][r].draw()
      }
    }
  }

  checkCollision(ball: ArkanoidBall): boolean {
    for (let c = 0; c < ARKANOID_BRICK_COLUMN_COUNT; c++) {
      for (let r = 0; r < ARKANOID_BRICK_ROW_COUNT; r++) {
        const brick = this.bricks[c][r]
        if (brick.status === ArkanoidBrick.BRICK_STATUS.ACTIVE && brick.detectCollision(ball)) {
          return true
        }
      }
    }
    return false
  }

  reset() {
    this.bricks = this.createBricks()
  }

  allBricksDestroyed(): boolean {
    for (let c = 0; c < ARKANOID_BRICK_COLUMN_COUNT; c++) {
      for (let r = 0; r < ARKANOID_BRICK_ROW_COUNT; r++) {
        if (this.bricks[c][r].status === ArkanoidBrick.BRICK_STATUS.ACTIVE) {
          return false
        }
      }
    }
    return true
  }
}
```

Explicación:

- **createBricks()**: crea la matriz de ladrillos.
- **draw()**: dibuja todos los ladrillos.
- **checkCollision()**: verifica colisiones con la pelota.

## Paso 10: Manejar el Estado del Juego `ArkanoidGameState`

Necesitamos una forma de saber en qué estado se encuentra el juego (jugando, pausado, game over):

```ts
export class ArkanoidGameState {
  gameState: 'start' | 'countdown' | 'playing' | 'gameover'
  score: number
  gameTime: number
  countdownValue: number
  isSoundOn: boolean
  isPaused: boolean
  leftPressed: boolean
  rightPressed: boolean
  private countdownInterval: number | null

  constructor() {
    this.gameState = 'start'
    this.score = 0
    this.gameTime = 0
    this.countdownValue = 3
    this.isSoundOn = true
    this.isPaused = false
    this.leftPressed = false
    this.rightPressed = false
    this.countdownInterval = null
  }

  isPlaying(): boolean {
    return this.gameState === 'playing'
  }

  isStartOrGameOver(): boolean {
    return this.gameState === 'start' || this.gameState === 'gameover'
  }

  startCountdown() {
    this.gameState = 'countdown'
    this.countdownValue = 3
    this.countdownInterval = window.setInterval(() => {
      this.countdownValue--
      if (this.countdownValue <= 0) {
        window.clearInterval(this.countdownInterval!)
        this.gameState = 'playing'
      }
    }, 1000)
  }

  updateTime(deltaTime: number) {
    if (this.gameState === 'playing' && !this.isPaused) {
      this.gameTime += deltaTime
    }
  }

  reset() {
    this.score = 0
    this.gameTime = 0
    this.countdownValue = 3
    this.isPaused = false
    this.leftPressed = false
    this.rightPressed = false
    if (this.countdownInterval) {
      window.clearInterval(this.countdownInterval)
      this.countdownInterval = null
    }
  }
}
```

Explicación:

- **startCountdown()**: inicia una cuenta regresiva antes de comenzar.
- **updateTime()**: actualiza el tiempo del juego.
- **reset()**: reinicia el estado.

## Paso 11: La Interfaz de Usuario `ArkanoidUI`

Gestiona lo que se muestra en pantalla, como menús y puntuación:

```ts
import { ArkanoidUIBase } from './ArkanoidUIBase'
import { ArkanoidUIMenu } from './ArkanoidUIMenu'
import { ArkanoidUIGame } from './ArkanoidUIGame'
import { ArkanoidUIGameOver } from './ArkanoidUIGameOver'
import { ArkanoidUICountdown } from './ArkanoidUICountdown'
import { IArkanoidDrawArgs } from '../Arkanoid.types'

export class ArkanoidUI {
  private ctx: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private uiGame: ArkanoidUIGame
  private uiMenu: ArkanoidUIMenu
  private uiGameOver: ArkanoidUIGameOver
  private uiCountdown: ArkanoidUICountdown

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx
    this.canvas = canvas
    this.uiGame = new ArkanoidUIGame(ctx, canvas)
    this.uiMenu = new ArkanoidUIMenu(ctx, canvas)
    this.uiGameOver = new ArkanoidUIGameOver(ctx, canvas)
    this.uiCountdown = new ArkanoidUICountdown(ctx, canvas)
  }

  draw(args: IArkanoidDrawArgs) {
    switch (args.gameState) {
      case 'start':
        this.uiMenu.draw({ isSoundOn: args.isSoundOn })
        break
      case 'countdown':
        this.uiCountdown.draw({ countdownValue: args.countdownValue! })
        break
      case 'playing':
        this.uiGame.draw({ formattedTime: args.formattedTime })
        break
      case 'gameover':
        this.uiGameOver.draw({ score: args.score, isSoundOn: args.isSoundOn })
        break
    }
  }

  drawPauseOverlay() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.font = '24px "Press Start 2P", monospace'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('PAUSADO', this.canvas.width / 2, this.canvas.height / 2 - 20)

    this.ctx.font = '10px "Press Start 2P", monospace'
    this.ctx.fillText('Presiona ESPACIO para continuar', this.canvas.width / 2, this.canvas.height / 2 + 20)
  }
}
```

Explicación:

- **draw()**: muestra la interfaz según el estado del juego.
- **drawPauseOverlay()**: dibuja una pantalla de pausa.

## Paso 12: Manejar Eventos del Usuario `ArkanoidEventHandler`

Captura entradas del teclado y clics:

```ts
import { ArkanoidGame } from './ArkanoidGame'

export class ArkanoidEventHandler {
  private game: ArkanoidGame

  constructor(game: ArkanoidGame) {
    this.game = game
  }

  initEvents() {
    this.game.canvas.addEventListener('click', this.handleClick.bind(this))
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  private handleClick(e: MouseEvent) {
    // Maneja clics en el canvas
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.code === 'ArrowRight') {
      this.game.gameState.rightPressed = true
    } else if (e.code === 'ArrowLeft') {
      this.game.gameState.leftPressed = true
    } else if (e.code === 'Space') {
      // Pausar o reanudar
      this.game.gameState.isPaused = !this.game.gameState.isPaused
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.code === 'ArrowRight') {
      this.game.gameState.rightPressed = false
    } else if (e.code === 'ArrowLeft') {
      this.game.gameState.leftPressed = false
    }
  }
}
```

Explicación:

- **initEvents()**: inicializa los eventos.
- **handleKeyDown() y handleKeyUp()**: manejan las teclas presionadas.

## Paso 13: Iniciar el Juego

Enlazamos todo en el punto de entrada:

```ts
import { Arkanoid } from './modules/arkanoid/Arkanoid'

const canvas = document.querySelector('canvas')!
const sprite = document.querySelector('#sprite') as HTMLImageElement
const bricksImage = document.querySelector('#bricks') as HTMLImageElement

const game = new Arkanoid(canvas, sprite, bricksImage)
```

Compila tu código con TypeScript y carga el archivo JavaScript resultante en `index.html`.

## Conclusión

¡Felicidades! Has creado tu propio clon del clásico Arkanoid. A lo largo de este tutorial, aprendiste:

- A manipular el canvas de HTML5.
- Principios básicos de movimiento y colisiones.
- Cómo estructurar un proyecto en TypeScript.
- A manejar eventos de teclado.

### Próximos Pasos

- **Agregar sonidos**: para mejorar la experiencia de juego.
- **Implementar niveles**: con diferentes diseños de ladrillos.
- **Añadir power-ups**: como paletas más grandes o bolas extra.
- **Optimizar para móviles**: adaptar controles táctiles.

La programación es un viaje continuo de aprendizaje y creatividad. Sigue explorando y desarrollando tus habilidades. ¡El límite es tu imaginación!

---

Espero que este tutorial te haya sido útil y te inspire a seguir creando proyectos emocionantes. ¡Disfruta programando!
