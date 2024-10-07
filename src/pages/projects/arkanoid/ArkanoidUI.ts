export class ArkanoidUI {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  score: number
  gameTime: number
  countdown: number

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx
    this.canvas = canvas
    this.score = 0
    this.gameTime = 0 // se manejará en segundos
    this.countdown = 3 // tiempo inicial para la cuenta regresiva
  }

  // Actualiza el tiempo de juego
  updateGameTime(deltaTime: number) {
    this.gameTime += deltaTime
  }

  // Actualiza la puntuación
  updateScore(points: number) {
    this.score += points
  }

  // Actualiza la cuenta regresiva
  updateCountdown() {
    if (this.countdown > 0) {
      this.countdown--
    }
  }

  // Renderiza la UI: tiempo, puntuación y cuenta regresiva si está en curso
  draw() {
    this.ctx.font = '16px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.fillText(`Score: ${this.score}`, 8, 20)
    this.ctx.fillText(`Time: ${this.gameTime}s`, this.canvas.width - 100, 20)

    if (this.countdown > 0) {
      this.ctx.font = '48px Arial'
      this.ctx.fillStyle = '#fff'
      this.ctx.fillText(`${this.countdown}`, this.canvas.width / 2 - 12, this.canvas.height / 2)
    }
  }
}
