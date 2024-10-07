import type { IArkanoidPaddleArgs, IArkanoidPaddleMoveArgs } from './Arkanoid.types'
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
  spriteX: number = 0
  spriteY: number = 0
  spriteWidth: number = 0
  spriteHeight: number = 0
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
    this.spriteX = ARKANOID_PADDLE_SPRITE_X
    this.spriteY = ARKANOID_PADDLE_SPRITE_Y
    this.spriteWidth = ARKANOID_PADDLE_SPRITE_WIDTH
    this.spriteHeight = ARKANOID_PADDLE_SPRITE_HEIGHT
  }

  draw() {
    this.ctx.drawImage(
      this.sprite,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight,
      Math.round(this.x), // Redondear la posición x
      Math.round(this.y), // Redondear la posición y
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
