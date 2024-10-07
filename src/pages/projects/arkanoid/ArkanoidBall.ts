export class ArkanoidBall {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, dx: number, dy: number) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.ctx = ctx
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = '#fff'
    this.ctx.fill()
    this.ctx.closePath()
  }

  move(canvasWidth: number, canvasHeight: number, paddleX: number, paddleY: number, paddleWidth: number, paddleHeight: number) {
    // Rebota en las paredes laterales
    if (this.x + this.dx > canvasWidth - this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx
    }

    // Rebota en la parte superior
    if (this.y + this.dy < this.radius) {
      this.dy = -this.dy
    }

    // La pelota toca la pala
    if (this.x > paddleX && this.x < paddleX + paddleWidth && this.y + this.dy > paddleY) {
      this.dy = -this.dy
    } else if (this.y + this.dy > canvasHeight - this.radius) {
      return false // Game Over
    }

    this.x += this.dx
    this.y += this.dy
    return true
  }
}
