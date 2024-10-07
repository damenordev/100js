import { ArkanoidGame } from './ArkanoidGame'
import type { IArkanoidDrawArgs } from './Arkanoid.types'

export class ArkanoidRenderer {
  private game: ArkanoidGame

  constructor(game: ArkanoidGame) {
    this.game = game
  }

  draw() {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    this.game.ball.draw()
    this.game.paddle.draw()
    this.game.brickManager.draw()

    const drawArgs: IArkanoidDrawArgs = {
      formattedTime: this.formatTime(this.game.gameState.gameTime),
      gameState: this.game.gameState.gameState,
      countdownValue: this.game.gameState.countdownValue,
      score: this.game.gameState.score,
      isSoundOn: this.game.gameState.isSoundOn,
    }

    this.game.ui.draw(drawArgs)

    if (this.game.gameState.isPaused) {
      this.game.ui.drawPauseOverlay()
    }
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
}
