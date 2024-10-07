import { ArkanoidBall } from './ArkanoidBall'
import { ArkanoidBrick } from './ArkanoidBrick'
import { ArkanoidPaddle } from './ArkanoidPaddle'
import { ArkanoidUI } from './ArkanoidUI'

export class Arkanoid {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  ball: ArkanoidBall
  paddle: ArkanoidPaddle
  bricks: ArkanoidBrick[][]
  rightPressed: boolean
  leftPressed: boolean
  sprite: HTMLImageElement
  bricksImage: HTMLImageElement
  gameOver: boolean
  isPaused: boolean
  ballSpeed: number
  ui: ArkanoidUI // Instancia de la clase UI

  constructor(canvas: HTMLCanvasElement, sprite: HTMLImageElement, bricksImage: HTMLImageElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.sprite = sprite
    this.bricksImage = bricksImage
    this.ballSpeed = 0.5

    this.ball = new ArkanoidBall(this.ctx, canvas.width / 2, canvas.height - 30, 3, -this.ballSpeed, -this.ballSpeed)
    this.paddle = new ArkanoidPaddle(this.ctx, this.sprite, (canvas.width - 50) / 2, canvas.height - 20, 50, 10, 8)
    this.bricks = this.createBricks()
    this.rightPressed = false
    this.leftPressed = false
    this.gameOver = false
    this.isPaused = true

    this.ui = new ArkanoidUI(this.ctx, this.canvas) // Inicializamos la clase UI
    this.initEvents()
  }

  createBricks(): ArkanoidBrick[][] {
    const brickRowCount = 6
    const brickColumnCount = 13
    const brickWidth = 32
    const brickHeight = 16
    const brickPadding = 0
    const brickOffsetTop = 80
    const brickOffsetLeft = 16

    const bricks: ArkanoidBrick[][] = []

    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = []
      for (let r = 0; r < brickRowCount; r++) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
        const randomColor = Math.floor(Math.random() * 8)

        bricks[c][r] = new ArkanoidBrick(this.ctx, this.bricksImage, brickX, brickY, brickWidth, brickHeight, randomColor)
      }
    }
    return bricks
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ball.draw()
    this.paddle.draw()

    for (const column of this.bricks) {
      for (const brick of column) {
        brick.draw()
      }
    }

    // Llamamos al método `draw` de la clase `UI` para renderizar la interfaz de usuario
    this.ui.draw()
  }

  update(deltaTime: number) {
    if (!this.ball.move(this.canvas.width, this.canvas.height, this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height)) {
      this.gameOver = true
      alert('Game Over!')
      document.location.reload()
    }

    this.paddle.move(this.leftPressed, this.rightPressed, this.canvas.width)

    for (const column of this.bricks) {
      for (const brick of column) {
        if (brick.detectCollision(this.ball)) {
          this.ui.updateScore(10) // Actualizamos la puntuación cuando se destruye un ladrillo
        }
      }
    }

    this.ui.updateGameTime(deltaTime) // Incrementamos el tiempo de juego en segundos
  }

  countdownStart(callback: () => void) {
    const interval = setInterval(() => {
      this.ui.updateCountdown() // Actualizamos la cuenta regresiva
      if (this.ui.countdown === 0) {
        clearInterval(interval)
        this.isPaused = false
        callback()
      }
    }, 1000) // La cuenta regresiva se actualiza cada segundo
  }

  loop() {
    if (this.gameOver || this.isPaused) return

    const deltaTime = 1 / 60 // Aproximadamente 1 segundo dividido entre los frames por segundo (FPS)
    this.draw()
    this.update(deltaTime)

    requestAnimationFrame(() => this.loop())
  }

  initEvents() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
        this.rightPressed = true
      } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
        this.leftPressed = true
      }
    })

    document.addEventListener('keyup', e => {
      if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
        this.rightPressed = false
      } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
        this.leftPressed = false
      }
    })

    const startButton = document.querySelector('#start')!
    startButton.addEventListener('click', () => {
      this.countdownStart(() => this.loop()) // Iniciar la cuenta regresiva y luego el juego
    })
  }
}
