import { ARKANOID_BALL_RADIUS, ARKANOID_BALL_SPEED } from './Arkanoid.constants'
import type { IArkanoidBallMoveArgs } from './Arkanoid.types'

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

  move(args: IArkanoidBallMoveArgs): boolean {
    const { deltaTime, canvasWidth, canvasHeight, paddleX, paddleY, paddleWidth, paddleHeight } = args

    // Aplicamos la velocidad multiplicada por deltaTime para un movimiento suave
    this.x += this.dx * deltaTime
    this.y += this.dy * deltaTime

    // Rebote en los bordes laterales
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    // Rebote en el borde superior
    if (this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.hitPaddle = false
    // Colisión con la paleta
    if (this.x > paddleX && this.x < paddleX + paddleWidth && this.y + this.radius > paddleY && this.y + this.radius < paddleY + paddleHeight) {
      // Calculamos el ángulo de rebote basado en dónde golpea la bola en la paleta
      const hitPos = (this.x - paddleX) / paddleWidth
      const angle = hitPos * Math.PI - Math.PI / 2 // Ángulo entre -π/2 y π/2

      // Ajustamos la dirección de la bola basada en el ángulo
      // Esto crea un efecto de rebote más realista dependiendo de dónde golpea la bola
      const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
      this.dx = Math.cos(angle) * speed
      this.dy = -Math.abs(Math.sin(angle) * speed) // Siempre hacia arriba

      this.hitPaddle = true
    } else if (this.y + this.radius > canvasHeight) {
      return false // Game Over
    }

    return true
  }
}
