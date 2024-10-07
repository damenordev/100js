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
        bricks[c][r] = new ArkanoidBrick(this.ctx, this.bricksImage, brickX, brickY, color, 1, 1) // Añadimos scaleX y scaleY como 1
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
}
