import { ArkanoidBall } from './ArkanoidBall'
import { ArkanoidPaddle } from './ArkanoidPaddle'
import { ArkanoidBrickManager } from './ArkanoidBrick'
import { ArkanoidAudioManager } from './ArkanoidAudioManager'
import { ArkanoidGameState } from './ArkanoidGameState'
import { ARKANOID_PADDLE_WIDTH, ARKANOID_POINTS_PER_BRICK } from './Arkanoid.constants'
import { ArkanoidUI } from './ArkanoidUI/ArkanoidUI'

export class ArkanoidGame {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  ball: ArkanoidBall
  paddle: ArkanoidPaddle
  brickManager: ArkanoidBrickManager
  audioManager: ArkanoidAudioManager
  gameState: ArkanoidGameState
  lastTime: number = 0
  animationFrameId: number | null = null
  ui: ArkanoidUI

  constructor(canvas: HTMLCanvasElement, sprite: HTMLImageElement, bricksImage: HTMLImageElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.ball = new ArkanoidBall(this.ctx, canvas.width / 2, canvas.height - 30)
    this.paddle = new ArkanoidPaddle({
      ctx: this.ctx,
      sprite: sprite,
      x: (canvas.width - ARKANOID_PADDLE_WIDTH) / 2,
      y: canvas.height - 20,
      scaleX: 1,
      scaleY: 1,
    })
    this.brickManager = new ArkanoidBrickManager(this.ctx, bricksImage)
    this.audioManager = new ArkanoidAudioManager()
    this.gameState = new ArkanoidGameState()
    this.ui = new ArkanoidUI(this.ctx, canvas)
  }

  update(deltaTime: number) {
    if (this.gameState.isPlaying() && !this.gameState.isPaused) {
      this.updateGameElements(deltaTime)
      this.checkCollisions()
      this.gameState.updateTime(deltaTime)
    }
  }

  private updateGameElements(deltaTime: number) {
    if (
      !this.ball.move({
        deltaTime,
        canvasWidth: this.canvas.width,
        canvasHeight: this.canvas.height,
        paddleX: this.paddle.x,
        paddleY: this.paddle.y,
        paddleWidth: this.paddle.width,
        paddleHeight: this.paddle.height,
      })
    ) {
      this.gameState.setGameOver()
      this.audioManager.playGameOver()
      return
    }

    if (this.ball.hitPaddle && this.gameState.isSoundOn) {
      this.audioManager.playPaddleHit()
    }

    this.paddle.move({
      leftPressed: this.gameState.leftPressed,
      rightPressed: this.gameState.rightPressed,
      canvasWidth: this.canvas.width,
      deltaTime,
    })
  }

  private checkCollisions() {
    const hitBrick = this.brickManager.checkCollision(this.ball)
    if (hitBrick) {
      this.gameState.increaseScore(ARKANOID_POINTS_PER_BRICK)
      this.ui.updateScore(this.gameState.score) // Actualizamos el score en la UI
      if (this.gameState.isSoundOn) {
        this.audioManager.playBrickHit()
      }
    }
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
      x: (this.canvas.width - ARKANOID_PADDLE_WIDTH) / 2,
      y: this.canvas.height - 20,
      scaleX: 1,
      scaleY: 1,
    })
    this.brickManager.reset()
    this.gameState.reset()
    this.ui.updateScore(0) // Usamos el nuevo método updateScore de ArkanoidUI
  }

  toggleSound() {
    this.gameState.toggleSound()
    this.audioManager.toggleMute(!this.gameState.isSoundOn)
  }

  togglePause() {
    this.gameState.togglePause()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ball.draw()
    this.paddle.draw()
    this.brickManager.draw()

    this.ui.draw({
      gameState: this.gameState.gameState,
      score: this.gameState.score,
      formattedTime: this.formatTime(this.gameState.gameTime),
      isSoundOn: this.gameState.isSoundOn,
      countdownValue: this.gameState.countdownValue,
    })

    if (this.gameState.isPaused) {
      this.ui.drawPauseOverlay()
    }
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
}
