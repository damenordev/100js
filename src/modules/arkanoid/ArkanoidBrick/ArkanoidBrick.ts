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
